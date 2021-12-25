import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import StudentClassCard from "./StudentClassCard";

const mockStore = configureStore([]);

describe("tes <StudentClassCard/> component", () => {
  let wrapper: ReactWrapper,
    classDetails = {
      Students: ["recoQBxwU83QJq69L", "recDImTGoac20jjl6"],
      Name: "Class 101",
    };

  beforeEach(() => {
    let store = mockStore({
      studentsIDNameMap: {
        recDImTGoac20jjl6: "Alice",
        recoQBxwU83QJq69L: "John",
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <StudentClassCard classDetails={classDetails} />
      </Provider>
    );
  });

  test("shoud render the class name text", () => {
    expect(wrapper.text()).toEqual(expect.stringContaining("Class 101"));
  });

  test("should render other students in the class", () => {
    expect(wrapper.text()).toEqual(expect.stringContaining("John, Alice"));
  });
});
