import React, { useRef, useState } from 'react';

const Chatform = ({ setChatHistory, generateBotResponse, chatHistory, setIsTyping }) => {
  const inputRef = useRef();
  const [isListening, setIsListening] = useState(false);

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputRef.current.value = transcript;
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

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
      <button type="button" className={`material-symbols-rounded mic-button ${isListening ? 'listening' : ''}`} onClick={startVoiceRecognition}>
        mic
      </button>
      <button type="submit" className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default Chatform;
