import React, { useState } from "react";

const UsernameInput = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  console.log("state", username);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(username);
      }}
    >
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        onChange={e => {
          console.log("event value", e.target.value);
          setUsername(e.target.value);
        }}
        value={username}
      />
    </form>
  );
};

export default UsernameInput;
