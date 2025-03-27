import ChatbotIcon from "./ChatbotIcon";
const ChatMessage = ({chat}) => {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    !chat.hideInChat && (
      <div className={`message ${chat.role === "model" ? "bot": "user" }-message ${chat.isError ? "error": ""}`}>     
        {chat.role === "model" && <ChatbotIcon/>}
        <p className='message-text'>
          {chat.text}
        </p>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    )
  )
}

export default ChatMessage;
