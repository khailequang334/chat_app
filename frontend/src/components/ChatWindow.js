// src/components/ChatWindow.js
import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:8080/ws');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    setSocket(ws);
    return () => ws.close(); // Clean up on component unmount
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify({ message }));
    }
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
