import React, { useState } from 'react';
import Tetris from './Tetris';
import AIChatInterface from './components/AIChatInterface';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'tetris' | 'ai'>('ai');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#333',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          TypeScript AI Agent Demo
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#666'
        }}>
          Interactive demonstration of AI-powered programming assistant with React + TypeScript
        </p>
      </header>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveView('ai')}
          style={{
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: activeView === 'ai' ? '#2196F3' : '#e0e0e0',
            color: activeView === 'ai' ? 'white' : '#333',
            transition: 'background-color 0.3s ease'
          }}
        >
          AI Programming Assistant
        </button>
        <button
          onClick={() => setActiveView('tetris')}
          style={{
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: activeView === 'tetris' ? '#4CAF50' : '#e0e0e0',
            color: activeView === 'tetris' ? 'white' : '#333',
            transition: 'background-color 0.3s ease'
          }}
        >
          Tetris Game
        </button>
      </div>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {activeView === 'ai' ? (
          <div style={{
            height: '700px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <AIChatInterface />
          </div>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Tetris />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#888',
        fontSize: '0.9rem'
      }}>
        <p>Built with React + TypeScript | Features AI agent integration for programming assistance</p>
      </footer>
    </div>
  );
};

export default App;
