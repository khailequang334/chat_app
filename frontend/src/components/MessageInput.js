// src/components/MessageInput.js
import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({ sender: 'User', text: message }); // Replace 'User' with dynamic user info if available
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
