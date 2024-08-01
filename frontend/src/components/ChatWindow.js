// src/components/ChatWindow.js
import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:8080/ws');
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    // Cleanup on component unmount
    return () => {
      ws.close();
      console.log('WebSocket connection closed from cleanup');
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      const messageData = JSON.stringify(message);
      console.log('Sending message:', messageData);
      socket.send(messageData);
    }
  };

  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
