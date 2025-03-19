import React, { useEffect, useRef, useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon'
import Chatform from './components/Chatform'
import ChatMessage from './components/ChatMessage'
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
  const chatBodyRef = useRef()
  const generateBotResponse = async (history) =>{
    // helper fun to update chat history
    const updateHistory =(text) =>{
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."),{role:"model",text}]);
    }
    // Formate chat history for API request 
    history = history.map(({role,text})=> ({role,parts:[{text}]}));
    const requestOptions = {
      method:"POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({contents:history})
    }
    try{
      // Make APi call to get the bot's response
      const response = await fetch(import.meta.env.VITE_API_URL,requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!")
        // Clean and update chat history with bot's response
        const apiResponseText = data.candidates[0].contents.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
      updateHistory(apiResponseText)
    }catch(error){
      console.log(error);  
    }
  };
  useEffect(() =>{
// Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight,behaviour:"smooth"});
  },[chatHistory])
  return (
    <div className="container">
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
              <p className='message-text'>
                Hey Dear 👋 <br /> How can i help You?
              </p>
              </div>
              {/* render the chat history dynamically */}
              {chatHistory.map((chat,index)=>(
                <ChatMessage key={index} chat={chat} />
              ))}
         </div>
         {/*Chatbot Footer */}
         <div className="chat-footer">
          <Chatform chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
         </div>
      </div>
    </div>
  )
}

export default App
