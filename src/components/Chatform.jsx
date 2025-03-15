import React, { useRef } from 'react';

const Chatform = ({ setChatHistory, generateBotResponse, chatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Update chat history with user's message
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    // Adding "Thinking..." placeholder for the bot's response
    setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);

    // Call generateBotResponse after 600ms delay
    setTimeout(() => {
      generateBotResponse(
        [...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }],
        userMessage // Pass userMessage instead of undefined userText
      );
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default Chatform;
