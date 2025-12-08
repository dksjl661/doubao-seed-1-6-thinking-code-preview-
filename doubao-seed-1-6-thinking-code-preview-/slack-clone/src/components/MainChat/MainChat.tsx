import React, { useEffect, useRef } from 'react';
import Avatar from '../Avatar/Avatar';

interface Message {
  id: string;
  author: string;
  avatar?: string;
  timestamp: Date;
  content: string;
  isCodeBlock?: boolean;
}

interface MainChatProps {
  channelName: string;
  messages: Message[];
}

const MainChat: React.FC<MainChatProps> = ({ channelName, messages }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on mount and when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTimestamp = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Format message content
  const formatMessageContent = (content: string, isCodeBlock?: boolean) => {
    if (isCodeBlock) {
      return <div className="code-block">{content}</div>;
    }

    // Split content into paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

    return (
      <div>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="main-chat">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-title">Welcome to #{channelName}</div>
        <div className="chat-header-subtitle">This is the start of the #{channelName} channel.</div>
      </div>

      {/* Messages */}
      {messages.map((message) => (
        <div key={message.id} className="message">
          <div className="message-avatar">
            <Avatar name={message.author} src={message.avatar} size="medium" />
          </div>
          <div className="message-content">
            <div className="message-header">
              <span className="message-author">{message.author}</span>
              <span className="message-timestamp">{formatTimestamp(message.timestamp)}</span>
            </div>
            <div className="message-body">
              {formatMessageContent(message.content, message.isCodeBlock)}
            </div>
          </div>
        </div>
      ))}

      {/* Empty div to scroll to */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default MainChat;