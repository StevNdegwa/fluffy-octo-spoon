import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import store from "./redux/store";
import { showStudentClasses } from "./redux/actions";
import Home from "./pages/Home";
import App from "./App";
import StudentClasses from "./pages/StudentClasses";

describe("test <App/>", () => {
  let wrapper: ReactWrapper;

  beforeEach(
    () =>
      (wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      ))
  );

  test("should render the home (<Home/>) page", () => {
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  test("should display classes list", () => {
    expect(wrapper.find(StudentClasses)).toHaveLength(0);
    store.dispatch(showStudentClasses(true));

    wrapper.update();

    expect(wrapper.find(StudentClasses)).toHaveLength(1);
  });
});
