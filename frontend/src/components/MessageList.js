// src/components/MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={index}>{msg.message}</li>
      ))}
    </ul>
  );
};

export default MessageList;
