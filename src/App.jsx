import React, { useEffect, useRef, useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon'
import Chatform from './components/Chatform'
import ChatMessage from './components/ChatMessage'
import TypingIndicator from './components/TypingIndicator'
import QuickActions from './components/QuickActions'
import { companyInfo } from './Companyinfo'

const App = () => {
  const [chatHistory,setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    }
  ]);
  const [showChatbot,setShowChatBot] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef()

  const handleQuickAction = (action) => {
    let response = '';
    switch(action) {
      case 'menu':
        response = `Here's our menu:\n\nSignature Coffee:\n- Espresso Shot - $3.50\n- Cappuccino - $4.00\n- Latte (Classic/Vanilla/Caramel) - $4.50\n- Mocha - $5.00\n\nSpecialty Brews:\n- Cold Brew - $4.50\n- Nitro Cold Brew - $5.50\n- Single-Origin Pour Over - $5.00\n\nSeasonal Favorites:\n- Pumpkin Spice Latte - $5.50\n- Peppermint Mocha - $5.50\n\nTea & Alternatives:\n- Matcha Latte - $5.00\n- Chai Latte - $4.50\n- Hot Chocolate - $4.00\n\nSnacks & Pastries:\n- Croissant (Butter/Almond) - $3.50\n- Muffins (Blueberry/Chocolate Chip) - $3.00\n- Avocado Toast - $6.00\n- Bagel with Cream Cheese - $4.00`;
        break;
      case 'hours':
        response = "We're open:\nMonday to Friday: 7:00 AM - 9:00 PM\nWeekends: 8:00 AM - 10:00 PM";
        break;
      default:
        return;
    }

    setChatHistory(prev => [...prev, { role: "model", text: response }]);
  };

  const generateBotResponse = async (history) =>{
    // helper fun to update chat history
    const updateHistory =(text,isError = false) =>{
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."),{role: "model", text, isError}]);
      setIsTyping(false);
    }
    // Formate chat history for API request 
    history = history.map(({role,text})=> ({role,parts:[{text}]}));
    const requestOptions = {
      method:"POST",
      headers:  { "Content-Type": "application/json" },
      body: JSON.stringify({contents: history})
    }

    try{
      // Make APi call to get the bot's response
      const response = await fetch(import.meta.env.VITE_API_URL,requestOptions);
      const data = await response.json();
    
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!")
        // Clean and update chat history with bot's response
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText)
    }catch(error){
      updateHistory(error.message, true)
    }
  };

  useEffect(() =>{
    // Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight,behaviour:"smooth"});
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={()=> setShowChatBot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        {/*Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">ChatBot</h2>
          </div>
          <button  onClick={()=> setShowChatBot(prev => !prev)} className="material-symbols-rounded">
              keyboard_arrow_down
          </button>
        </div>
         {/*Chatbot Body */}
         <div ref={chatBodyRef} className="chat-body">
              <div className="message bot-message">
                <ChatbotIcon/>
                <div className="message-content">
                  <p className='message-text'>
                    Hey Dear 👋 <br /> How can i help You?
                  </p>
                  <span className="message-timestamp">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <QuickActions onActionClick={handleQuickAction} />
              {/* render the chat history dynamically */}
              {chatHistory.map((chat,index)=>(
                <ChatMessage key={index} chat={chat} />
              ))}
              {isTyping && (
                <div className="message bot-message">
                  <ChatbotIcon/>
                  <TypingIndicator />
                </div>
              )}
         </div>
         {/*Chatbot Footer */}
         <div className="chat-footer">
          <Chatform 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
            setIsTyping={setIsTyping}
          />
         </div>
      </div>
    </div>
  )
}

export default App
