import React from "react";
import mockio, { serverSocket } from "socket.io-client";
import Chat from "components/Chat";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("App should get messages", () => {
  // first render the app
  // const utils = render(<Chat />); // then send a message
  // act(() => {
  //   serverSocket.emit("message", "Hey Wizy!");
  // });
  // expect(utils.getByText("Hey Wizy!")).toBeTruthy();
});
