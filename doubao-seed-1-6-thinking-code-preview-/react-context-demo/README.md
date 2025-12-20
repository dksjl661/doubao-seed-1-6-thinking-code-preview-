# React Hooks Demo: Theme Toggle App

This is a simple React application demonstrating the use of three essential React Hooks:
- `useState`: For managing component state
- `useEffect`: For handling side effects and lifecycle events
- `useContext`: For sharing state across components without prop drilling

## Getting Started

The app is already running at **http://localhost:5173/**

## What This Demo Shows

### 🎨 Theme Toggle Functionality
- Switch between **Light Mode** and **Dark Mode**
- Theme preference is saved to localStorage and persists between sessions
- System-wide color scheme is automatically detected on first load

### 📚 Hook Explanations

#### 1. `useState` - State Management
- Located in `/src/ThemeContext.jsx`
- Manages the current theme state (`light` or `dark`)
- Used to toggle between themes with `setTheme()`

#### 2. `useEffect` - Side Effects
- Located in `/src/ThemeContext.jsx`
- **First useEffect**: Loads saved theme from localStorage on initial render
- **Second useEffect**: Saves theme to localStorage and updates document attribute whenever theme changes

#### 3. `useContext` - Context API
- Located in `/src/ThemeContext.jsx`
- Creates a theme context to share state across components
- `ThemeProvider` wraps the app to provide theme state
- `useTheme()` hook allows easy access to theme state in any component

### 📁 Project Structure
- `src/ThemeContext.jsx`: Context creation and theme management logic
- `src/App.jsx`: Main application components
- `src/App.css`: Theme-based styling with CSS variables
- `src/main.jsx`: App entry point with ThemeProvider

## Usage
1. Open the app at `http://localhost:5173/`
2. Click the "Switch to Dark/Light Mode" button to toggle themes
3. Refresh the page to see theme persistence
4. Inspect localStorage to see the saved preference
