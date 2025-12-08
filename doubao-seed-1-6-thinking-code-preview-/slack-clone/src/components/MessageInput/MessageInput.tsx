import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, placeholder = 'Message #general' }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  // Handle Enter key (Shift+Enter for new line)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="message-input">
      <div className="input-container">
        <textarea
          ref={textareaRef}
          className="input-field"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          rows={1}
        />

        <div className="input-actions">
          <button className="input-button" title="Attach file">
            <span>=Î</span>
          </button>
          <button className="input-button" title="Formatting">
            <span>(</span>
          </button>
          <button className="input-button" title="Emoji">
            <span>=
</span>
          </button>
        </div>

        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={!message.trim()}
          title="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;