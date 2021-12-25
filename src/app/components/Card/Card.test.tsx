import { shallow, ShallowWrapper } from "enzyme";

import Card from "./Card";

describe("test <Card/> component", () => {
  let wrapper: ShallowWrapper;
  let style = { color: "red" };

  beforeEach(
    () =>
      (wrapper = shallow(
        <Card style={style}>
          <p>Yeah</p>
        </Card>
      ))
  );

  test("should render all the children", () => {
    expect(wrapper.find("p")).toHaveLength(1);
    expect(wrapper.text()).toEqual("Yeah");
  });

  test("should pass all the props to wrapper element", () => {
    expect(wrapper.find("div").prop("style")).toEqual({ color: "red" });
  });
});
