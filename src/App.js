import React from "react";
import UsernameInput from "components/UsernameInput";
import MessageFeed from "components/MessageFeed";
import io from "socket.io-client";
import * as eventTypes from "eventTypes";

function joinWithUsername(username) {
  const socket = io("http://localhost:3001");
  socket.emit(eventTypes.USER_JOIN, { username });
  socket.on(eventTypes.MESSAGE, messageListener);
}

function messageListener(data) {
  setMessages([...messages, data]);
}

const App = () => {
  const [messages, setMessages] = React.useState([]);

  return (
    <div className="App">
      <UsernameInput onSubmit={joinWithUsername} />
      <MessageFeed messages={messages} />
    </div>
  );
};

export default App;
export { joinWithUsername, messageListener };
