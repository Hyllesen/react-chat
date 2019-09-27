import React from "react";
import App, { joinWithUsername, messageListener } from "../App";
import { shallow } from "enzyme";
import io from "socket.io-client";
import * as eventTypes from "eventTypes";

let wrapper, setState, useStateSpy;
jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe("App", () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
    setState = jest.fn();
    useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(init => [init, setState]);
  });

  afterEach(() => jest.clearAllMocks());

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

  it("listens for the MESSAGE event", () => {
    joinWithUsername("John");
    const socket = io();
    expect(socket.on).toHaveBeenCalledWith(eventTypes.MESSAGE, messageListener);
  });

  it("Appends a message to state when message is received", () => {
    const testData = {
      from: "John",
      message: "Hello everyone!"
    };
    messageListener(testData);
    expect(setState).toHaveBeenCalledWith(testData);
  });
});
