import React from "react";
import App, { joinWithUsername } from "../App";
import { shallow } from "enzyme";
import io from "socket.io-client";
import * as eventTypes from "eventTypes";

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const socket = { emit };
  return jest.fn(() => socket);
});

let wrapper;

describe("App", () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("has a usernameinput component", () => {
    expect(wrapper.find("UsernameInput").length).toBe(1);
  });

  it("has a joinWithUsername function", () => {
    const usernameInput = wrapper.find("UsernameInput").props();
    console.log(usernameInput.onSubmit);
    expect(usernameInput.onSubmit).toBe(joinWithUsername);
  });

  it("connect to socket.io server", () => {
    joinWithUsername("Bobby");
    expect(io).toHaveBeenCalledWith("http://localhost:3001");
  });

  it("emits the USER_JOIN event", () => {
    joinWithUsername("John");
    const socket = io();
    expect(socket.emit).toHaveBeenCalledWith(eventTypes.USER_JOIN, {
      username: "John"
    });
  });
});
