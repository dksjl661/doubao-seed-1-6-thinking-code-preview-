import React from 'react';
import { useTheme } from './ThemeContext';
import './App.css';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>React Hooks Demo</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();

  return (
    <main className="content">
      <section className="card">
        <h2>What We're Learning</h2>
        <ul>
          <li><strong>useState:</strong> Manages theme state (light/dark)</li>
          <li><strong>useEffect:</strong> Persists theme to localStorage and applies it to document</li>
          <li><strong>useContext:</strong> Shares theme across components without prop drilling</li>
        </ul>
      </section>

      <section className="card">
        <h2>Theme Status</h2>
        <p>Current theme: <span className="theme-indicator">{theme}</span></p>
        <p>This demo shows how React Context API works with Hooks to manage global state.</p>
      </section>
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
