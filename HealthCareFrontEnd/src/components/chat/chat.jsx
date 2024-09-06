import React, { useState } from 'react';
import axios from 'axios';
import './utils/Chat.css';

const Chat = () => {
  
  const [messages, setMessages] = useState([
    { role: 'admin', text: 'Hi! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === '') return; 

    const newMessages = [
      ...messages,
      { role: 'user', text: input },
    ];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'user', content: input }  
          ]
        },
        {
          headers: {
            'Authorization': '',
            'Content-Type': 'application/json',
          }
        }
      );

      const adminMessage = {
        role: 'admin',
        text: response.data.choices[0].message.content,
      };

      setMessages(prevMessages => [...prevMessages, adminMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
      
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'admin', text: 'Error: Unable to get a response from the server.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'admin-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chat;
