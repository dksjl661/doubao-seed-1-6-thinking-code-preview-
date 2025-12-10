# React Tetris

A pure React implementation of the classic Tetris game.

## Features

- 🎮 Classic Tetris gameplay
- 🎨 Colorful tetrominoes with traditional colors
- ⌨️ Full keyboard controls
- 📊 Score, level, and lines tracking
- 🔄 Next tetromino preview
- ⏸️ Pause/Resume functionality
- 🎯 Hard drop with score bonus
- 🚀 Progressive difficulty with faster falling speeds

## Controls

- **←/→** - Move tetromino left/right
- **↑** - Rotate tetromino
- **↓** - Soft drop (increase fall speed)
- **Space** - Hard drop (instant drop) / Pause/Resume

## Installation

```bash
npm install
```

## Running the Game

```bash
npm start
```

The game will open in your default browser at `http://localhost:3000` (or the next available port if 3000 is in use).

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `build` directory.

## How to Play

1. Press **Start** to begin the game
2. Use the arrow keys to move and rotate the falling tetromino
3. Press **Space** to instantly drop the tetromino
4. Complete lines by filling them with tetromino blocks
5. Each completed line awards points and increases your line count
6. Every 10 lines, you advance to the next level with faster falling speeds
7. The game ends when tetrominoes stack up to the top of the playfield

## Scoring

- **Single line**: 100 × level
- **Double lines**: 200 × level
- **Triple lines**: 300 × level
- **Tetris (4 lines)**: 400 × level
- **Hard drop**: 2 points per cell dropped

## Technologies Used

- **React 18** - UI framework
- **React Hooks** - State management and side effects
- **SVG** - Rendering the game board and tetrominoes
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
react-tetris/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── Tetris.jsx          # Main Tetris component
│   └── index.js             # React entry point
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Game Mechanics

### Tetrominoes

The game includes all 7 classic tetromino shapes:

- **I** - Straight line (4 blocks)
- **O** - Square (4 blocks)
- **T** - T-shape (4 blocks)
- **S** - S-shape (4 blocks)
- **Z** - Z-shape (4 blocks)
- **J** - J-shape (4 blocks)
- **L** - L-shape (4 blocks)

### Rotation System

The game uses a simple rotation system where each tetromino can rotate into 4 different positions (except the O-shape which only has 1 position).

### Collision Detection

The game checks for collisions with the walls, floor, and other tetrominoes to prevent illegal moves.

### Line Clearing

When a horizontal line is completely filled with blocks, it is cleared from the playfield. Any blocks above the cleared line fall down to fill the space.

## License

MIT License - feel free to use this project for learning or as a starting point for your own Tetris implementation.

## Enjoy the Game! 🎮