import React from 'react';
import { Message } from '@/types';

interface MessageToastProps {
  messages: Message[];
  onRemove: (id: number) => void;
}

const MessageToast: React.FC<MessageToastProps> = ({ messages, onRemove }) => {
  return (
    <div className="message-toast-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message-toast message-${message.type}`}
          style={{ animation: message.animation }}
        >
          <div className="message-content">
            <div className="message-icon">
              {message.type === 'success' && '✅'}
              {message.type === 'error' && '❌'}
              {message.type === 'info' && 'ℹ️'}
            </div>
            <div className="message-text">
              <h4>{message.text}</h4>
              {message.details && <p>{message.details}</p>}
            </div>
          </div>
          <button
            className="message-close"
            onClick={() => onRemove(message.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default MessageToast;

<style jsx>{`
  .message-toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message-toast {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px 20px;
    min-width: 300px;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: slideIn 0.3s ease-out;
  }

  .message-toast.message-success {
    border-left: 4px solid #42b983;
  }

  .message-toast.message-error {
    border-left: 4px solid #e53e3e;
  }

  .message-toast.message-info {
    border-left: 4px solid #4299e1;
  }

  .message-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .message-icon {
    font-size: 20px;
    flex-shrink: 0;
  }

  .message-text h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
    color: #212529;
  }

  .message-text p {
    margin: 0;
    font-size: 13px;
    color: #6c757d;
    line-height: 1.4;
  }

  .message-close {
    background: none;
    border: none;
    font-size: 20px;
    color: #6c757d;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .message-close:hover {
    background: #f8f9fa;
    color: #212529;
  }

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`}</style>