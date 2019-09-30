import React from "react";
import App from "../App";
import { shallow } from "enzyme";
import io, { serverSocket } from "socket.io-client";
import * as eventTypes from "eventTypes";
import UsernameInput from "components/UsernameInput";
import MessageFeed from "components/MessageFeed";

let wrapper, socket;

socket = io.connect("");
jest.spyOn(io, "connect");
jest.spyOn(socket, "emit");
jest.spyOn(socket, "on");

describe("App", () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  afterEach(() => jest.clearAllMocks());

  it("has a usernameinput component", () => {
    expect(wrapper.find("UsernameInput").length).toBe(1);
  });

  it("has a MesssageFeed component", () => {
    expect(wrapper.find("MessageFeed").length).toBe(1);
  });

  it("connects to socket io on username submit", () => {
    wrapper
      .find(UsernameInput)
      .props()
      .onSubmit("_testuser_");
    expect(io.connect).toHaveBeenCalledWith("http://localhost:3001");
    expect(socket.emit).toHaveBeenCalledWith(eventTypes.USER_JOIN, {
      username: "_testuser_"
    });
    expect(socket.on).toHaveBeenCalledTimes(2);
    expect(socket.on.mock.calls[0][0]).toEqual(eventTypes.USER_JOIN);
  });

  it("adds message after server responded", () => {
    wrapper
      .find(UsernameInput)
      .props()
      .onSubmit("__testuser__");
    serverSocket.emit(eventTypes.MESSAGE, { from: "Bob", message: "What up?" });
    expect(wrapper.find(MessageFeed).props().messages).toStrictEqual([
      { from: "Bob", message: "What up?" }
    ]);
  });
});
