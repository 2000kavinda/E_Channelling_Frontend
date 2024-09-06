import { useState } from 'react';
import axios from 'axios';
import './Chat.css';
import FloatingButton from '../FloatingButton/FloatingButton';
import { IoSend } from "react-icons/io5";

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'admin', text: 'Welcome to MediCare Help Center ..! How Can I Help You Today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For toggling popup

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
            'Authorization': 'Bearer sk-proj-gMJ2i6pc81rlfAZD9rnKT3BlbkFJic8JE5LUhTfmF45JMhi5',
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
    <>
      {/* Floating Button */}
      <FloatingButton onClick={togglePopup} />

      <div className={`chat-popup ${isOpen ? 'open' : ''}`}>
        <div className='w-[400px] h-[400px] overflow-y-auto justify-between flex flex-col'>
          
          <div className='flex flex-col w-full'>
            <div className="w-full h-10 px-4 py-2 text-lg font-bold text-center text-white rounded-t-lg chat-header bg-[#005F7E]" onClick={togglePopup}>
              MediCare Help Center
            </div>
            <div className="px-4 py-2 overflow-y-auto chat-container">
              <div className="flex flex-col text-sm messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.role === 'user' ? 'user-message' : 'admin-message'}`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              
            </div>
          </div>

          <div className='flex flex-row justify-between w-full px-4 py-2'>
            <form onSubmit={handleSubmit} className="sticky bottom-0 flex flex-row justify-between w-full input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
                className='w-[300px] border-2 rounded-lg border-[#005F7E] px-4 text-base'
              />
              <button type="submit" disabled={loading} className='w-12 rounded-full h-12 flex flex-col justify-center items-center bg-[#005F7E]'>
                <IoSend className='w-6 h-6 text-white'/>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
