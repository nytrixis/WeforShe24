import React, { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() !== '') {
      const newMessage = { sender: 'user', message: userInput };
      setChatMessages([...chatMessages, newMessage]);
      setUserInput('');
      setIsThinking(true);

      try {
        const response = await axios.post('http://localhost:4000/api/chatbot', { message: userInput });
        const botResponse = { sender: 'bot', message: response.data.response };
        setChatMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error getting chatbot response:', error);
        const errorMessage = { sender: 'bot', message: 'Sorry, I encountered an error. Please try again.' };
        setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsThinking(false);
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="bg-secondary text-white rounded-full p-2 cursor-pointer"
        onClick={toggleChat}
      >
        <FaCommentDots size={24} />
      </div>
      {showChat && (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-2 w-80">
          <h3 className="text-lg font-bold mb-2">Glitzie</h3>
          <div
            ref={chatContainerRef}
            className="max-h-64 overflow-y-auto mb-4"
            style={{ maxHeight: '400px'}}
          >
            {chatMessages.map((message, index) => (
              <div key={index} className="mb-2">
                <div
                  className={`text-sm mb-1 opacity-50 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.sender === 'user' ? 'You' : 'Glitzie'}
                </div>
                <div
                  className={`${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block px-2 py-1 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.message}
                  </span>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="text-left">
                <div className="text-sm mb-1 opacity-50">Glitzie</div>
                <span className="inline-block px-2 py-1 rounded-lg bg-gray-200 text-gray-800 opacity-50">
                  Glittering...
                </span>
              </div>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white rounded-r-lg py-2 px-4 ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
