import React, { useRef } from 'react';

const Chatform = ({ setChatHistory, generateBotResponse, chatHistory, setIsTyping }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Update chat history with user's message
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    // Show typing indicator
    setIsTyping(true);

    // Call generateBotResponse after a short delay
    setTimeout(() => {
      generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above , please address this query: ${userMessage}` }]);
    }, 600);
  }

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default Chatform;
