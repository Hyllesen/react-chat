import UsernameInput from "components/Usernameinput";
import React from "react";
import { mount, shallow } from "enzyme";

const mockSubmitLogin = jest.fn();
const event = {
  preventDefault: jest.fn()
};

let wrapper;

describe("UsernameInput", () => {
  beforeEach(() => {
    wrapper = shallow(<UsernameInput onSubmit={mockSubmitLogin} />);
  });

  it("Has a form", () => {
    expect(wrapper.find("form").length).toBe(1);
  });

  it("has a username input field", () => {
    expect(wrapper.find("form > input#username").length).toBe(1);
  });

  it("has a username input label", () => {
    expect(wrapper.find("form > label[htmlFor='username']").length).toBe(1);
  });

  it("call login function prop with entered username", () => {
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "Bobby" } });
    wrapper.simulate("submit", event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockSubmitLogin).toHaveBeenCalledWith("Bobby");
  });
});
