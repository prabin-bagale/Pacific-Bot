import React from 'react'
import ChatbotIcon from './components/ChatbotIcon'
import Chatform from './components/Chatform'

const App = () => {
  return (
    <div className='container'>
      <div className="chatbot-popup">
        {/*Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">ChatBot</h2>
          </div>
          <button className="material-symbols-rounded">
              keyboard_arrow_down
          </button>
        </div>
         {/*Chatbot Body */}
         <div className="chat-body">
              <div className="message bot-message">
              <ChatbotIcon/>
              <p className='message-text'>
                Hey Dear 👋 <br /> How can i help You?
              </p>
              </div>
              <div className="message user-message">
          
              <p className='message-text'>
                Lorem ipsum dolor sit amet consectetur.
              </p>
              </div>
         </div>
         {/*Chatbot Footer */}
         <div className="chat-footer">
          <Chatform />
         </div>
      </div>
    </div>
  )
}

export default App
