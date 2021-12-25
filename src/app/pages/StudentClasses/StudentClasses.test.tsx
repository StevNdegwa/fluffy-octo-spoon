import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { setStudentClasses } from "../../redux/actions";
import StudentClassCard from "../../components/StudentClassCard";
import StudentClasses from "./StudentClasses";
import { act } from "@testing-library/react";

describe("tes <StudentClassCard/> component", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <StudentClasses />
      </Provider>
    );
  });

  test("should render a message if student has no assigned classes", () => {
    expect(wrapper.find(StudentClassCard)).toHaveLength(0);
    expect(wrapper.text()).toEqual(
      expect.stringContaining("Student has no assigned classes")
    );
  });

  test("should render student class cards", () => {
    store.dispatch(
      setStudentClasses([
        { Students: [], Name: "Class A" },
        { Students: [], Name: "Class B" },
      ])
    );

    wrapper.update();

    expect(wrapper.find(StudentClassCard)).toHaveLength(2);
  });

  test("should logout application", () => {
    act(() => {
      wrapper.find("button.logout_btn").simulate("click");
    });

    expect(store.getState().showStudentClasses).toEqual(false);
  });
});
