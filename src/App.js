import React, { useEffect } from "react";
import UsernameInput from "components/UsernameInput";
import MessageFeed from "components/MessageFeed";
import io from "socket.io-client";
import * as eventTypes from "eventTypes";

const App = () => {
  const [messages, setMessages] = React.useState([]);

  function joinWithUsername(username) {
    const socket = io.connect("http://localhost:3001");
    socket.on(eventTypes.USER_JOIN, userJoinHandler);
    socket.emit(eventTypes.USER_JOIN, { username });
    socket.on("message", messageListener);
  }

  function userJoinHandler(data) {
    setMessages([...messages, data]);
  }

  function messageListener(data) {
    setMessages([...messages, data]);
  }

  return (
    <div className="App">
      <UsernameInput onSubmit={joinWithUsername} />
      <MessageFeed messages={messages} />
    </div>
  );
};

export default App;
