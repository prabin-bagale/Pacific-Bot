import ChatbotIcon from "./ChatbotIcon";
const ChatMessage = ({chat}) => {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'sent':
        return 'check';
      case 'delivered':
        return 'done_all';
      case 'read':
        return 'done_all';
      default:
        return 'schedule';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'sent':
        return '#888';
      case 'delivered':
        return '#888';
      case 'read':
        return '#6D4FC2';
      default:
        return '#888';
    }
  };
  
  return (
    !chat.hideInChat && (
      <div className={`message ${chat.role === "model" ? "bot": "user" }-message ${chat.isError ? "error": ""}`}>     
        {chat.role === "model" && <ChatbotIcon/>}
        <div className="message-wrapper">
          <p className='message-text'>
            {chat.text}
          </p>
          <div className="message-info">
            <span className="message-timestamp">{timestamp}</span>
            {chat.role === "user" && (
              <span className="message-status" style={{ color: getStatusColor(chat.status) }}>
                <span className="material-symbols-rounded">{getStatusIcon(chat.status)}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default ChatMessage;
