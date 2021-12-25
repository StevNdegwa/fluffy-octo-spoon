import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import Home from "./Home";
import store from "../../redux/store";
import {
  fetchStudentClassesError,
  fetchingStudentClasses,
} from "../../redux/actions";
import { act } from "@testing-library/react";

describe("test <Home/> page component", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  test("should update student name on input", () => {
    act(() => {
      wrapper
        .find("input[name='student']")
        .simulate("change", { target: { value: "Steve" } });
    });

    wrapper.update();

    expect(wrapper.find("input[name='student']").prop("value")).toEqual(
      "Steve"
    );
  });

  test("should render error message", () => {
    expect(wrapper.find("div.error_message")).toHaveLength(0);

    store.dispatch(
      fetchStudentClassesError({ code: "UNKNOWN", message: "A bad error" })
    );

    wrapper.update();

    expect(wrapper.find("div.error_message")).toHaveLength(1);
  });

  test("should update submit button label", () => {
    expect(wrapper.find("input[type='submit']").prop("value")).toEqual(
      "Log in"
    );

    store.dispatch(fetchingStudentClasses(true));

    wrapper.update();

    expect(wrapper.find("input[type='submit']").prop("value")).toEqual(
      "Loading..."
    );

    store.dispatch(fetchingStudentClasses(false));

    wrapper.update();

    expect(wrapper.find("input[type='submit']").prop("value")).toEqual(
      "Log in"
    );
  });

  test("should fetch student classes", () => {
    act(() => {
      wrapper
        .find("input[name='student']")
        .simulate("change", { target: { value: "Steve" } });
    });
    wrapper.find("form").first().simulate("submit");
    expect(store.getState().fetchingStudentClasses).toEqual(true);
  });
});
