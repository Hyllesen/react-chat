import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io.connect("http://localhost:3001");
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  });

  const renderedMessages = messages.map(message => (
    <div key={message}>{message}</div>
  ));

  return <div>{renderedMessages}</div>;
};

export default Chat;
