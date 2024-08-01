// src/components/MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul className="message-list">
      {messages.map((msg, index) => (
        <li key={index} className="message">
          <strong>{msg.sender}</strong>: {msg.text}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
