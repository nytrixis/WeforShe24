import React, { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaArrowRight } from 'react-icons/fa'; // Import FaArrowRight for the arrow icon

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatContainerRef = useRef(null);

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

  const sendMessage = () => {
    if (userInput.trim() !== '') {
      const newMessage = { sender: 'user', message: userInput };
      setChatMessages([...chatMessages, newMessage]);
      setUserInput('');
      setIsThinking(true);

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        const updatedMessage = { sender: 'bot', message: botResponse };
        setChatMessages((prevMessages) => [...prevMessages, updatedMessage]);
        setIsThinking(false);
      }, 1000); // Simulate a shorter delay for responsiveness
    }
  };

  const getBotResponse = (userMessage) => {
    // Replace this with your AI bot logic to generate a response
    return 'This is a sample response from the AI bot.';
  };

  // Scroll to bottom of chat on chatMessages update
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
          <h3 className="text-lg font-bold mb-2">Glitzie</h3> {/* Update the name here */}
          <div
            ref={chatContainerRef}
            className="max-h-64 overflow-y-auto mb-4"
            style={{ maxHeight: '300px', overflowY: 'hidden' }} // Hide scrollbar
          >
            {chatMessages.map((message, index) => (
              <div key={index} className="mb-2">
                <div
                  className={`text-sm mb-1 opacity-50 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.sender === 'user' ? 'You' : 'Glitzie'} {/* Update the name here */}
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
                <div className="text-sm mb-1 opacity-50">Glitzie</div> {/* Update the name here */}
                <span className="inline-block px-2 py-1 rounded-lg bg-gray-200 text-gray-800 opacity-50">
                  Glittering... {/* Update the text here */}
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
              <FaArrowRight /> {/* Arrow icon for Send button */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
