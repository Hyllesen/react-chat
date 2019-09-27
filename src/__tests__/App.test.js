import React from "react";
import App from "../App";
import { shallow } from "enzyme";

describe("App", () => {
  const wrapper = shallow(<App />);

  it("Renders with username component", () => {
    expect(wrapper.find("UsernameInput").length).toBe(1);
  });
});
