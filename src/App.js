import React from "react";
import UsernameInput from "./components/UsernameInput";
import io from "socket.io-client";
import * as eventTypes from "eventTypes";

function joinWithUsername(username) {
  const socket = io("http://localhost:3001");
  socket.emit(eventTypes.USER_JOIN, { username });
}

const App = () => {
  return (
    <div className="App">
      <UsernameInput onSubmit={joinWithUsername} />
    </div>
  );
};

export default App;
export { joinWithUsername };
