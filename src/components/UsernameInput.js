import React, { useState } from "react";

const UsernameInput = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

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
          setUsername(e.target.value);
        }}
        value={username}
      />
    </form>
  );
};

export default UsernameInput;
