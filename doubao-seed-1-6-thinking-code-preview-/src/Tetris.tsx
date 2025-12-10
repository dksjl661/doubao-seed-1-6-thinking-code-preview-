import React, { useState, useEffect, useCallback, useRef } from 'react';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

// TypeScript类型定义
type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

interface Piece {
  type: PieceType;
  shape: number[][];
  rotation: number;
  x: number;
  y: number;
}

interface LineClearEffect {
  row: number;
  progress: number;
  timestamp: number;
}

const SHAPES = {
  I: [
    [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    [[0,0,1,0], [0,0,1,0], [0,0,1,0], [0,0,1,0]],
    [[0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0]],
    [[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]]
  ],
  O: [
    [[0,1,1,0], [0,1,1,0], [0,0,0,0], [0,0,0,0]]
  ],
  T: [
    [[0,1,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
    [[0,1,0,0], [0,1,1,0], [0,1,0,0], [0,0,0,0]],
    [[0,0,0,0], [1,1,1,0], [0,1,0,0], [0,0,0,0]],
    [[0,1,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]]
  ],
  S: [
    [[0,1,1,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]],
    [[0,1,0,0], [0,1,1,0], [0,0,1,0], [0,0,0,0]],
    [[0,0,0,0], [0,1,1,0], [1,1,0,0], [0,0,0,0]],
    [[1,0,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]]
  ],
  Z: [
    [[1,1,0,0], [0,1,1,0], [0,0,0,0], [0,0,0,0]],
    [[0,0,1,0], [0,1,1,0], [0,1,0,0], [0,0,0,0]],
    [[0,0,0,0], [1,1,0,0], [0,1,1,0], [0,0,0,0]],
    [[0,1,0,0], [1,1,0,0], [1,0,0,0], [0,0,0,0]]
  ],
  J: [
    [[1,0,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
    [[0,1,1,0], [0,1,0,0], [0,1,0,0], [0,0,0,0]],
    [[0,0,0,0], [1,1,1,0], [0,0,1,0], [0,0,0,0]],
    [[0,1,0,0], [0,1,0,0], [1,1,0,0], [0,0,0,0]]
  ],
  L: [
    [[0,0,1,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
    [[0,1,0,0], [0,1,0,0], [0,1,1,0], [0,0,0,0]],
    [[0,0,0,0], [1,1,1,0], [1,0,0,0], [0,0,0,0]],
    [[1,1,0,0], [0,1,0,0], [0,1,0,0], [0,0,0,0]]
  ]
};

const COLORS = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000'
};

const createBoard = (): (PieceType | 0)[][] => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

const getRandomShape = (): Piece => {
  const shapes = Object.keys(SHAPES) as PieceType[];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  return {
    type: randomShape,
    shape: SHAPES[randomShape][0],
    rotation: 0,
    x: Math.floor(COLS / 2) - 2,
    y: 0
  };
};

const checkCollision = (
  board: (PieceType | 0)[][],
  shape: number[][],
  x: number,
  y: number
): boolean => {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = x + col;
        const newY = y + row;
        if (newX < 0 || newX >= COLS || newY >= ROWS) {
          return true;
        }
        if (newY >= 0 && board[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
};

const mergeBoard = (
  board: (PieceType | 0)[][],
  shape: number[][],
  x: number,
  y: number,
  type: PieceType
): (PieceType | 0)[][] => {
  const newBoard = [...board];
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newY = y + row;
        const newX = x + col;
        if (newY >= 0) {
          newBoard[newY][newX] = type; // Store the piece type instead of just 1
        }
      }
    }
  }
  return newBoard;
};

const clearLines = (board: (PieceType | 0)[][]): {
  board: (PieceType | 0)[][],
  linesCleared: number,
  clearedRows: number[]
} => {
  let newBoard = [...board];
  let linesCleared = 0;
  const clearedRows: number[] = [];

  for (let row = ROWS - 1; row >= 0; row--) {
    if (newBoard[row].every(cell => cell !== 0)) {
      clearedRows.push(row);
      newBoard.splice(row, 1);
      newBoard.unshift(Array(COLS).fill(0));
      linesCleared++;
      row++;
    }
  }

  return { board: newBoard, linesCleared, clearedRows };
};

const Tetris = () => {
  const [board, setBoard] = useState<(PieceType | 0)[][]>(createBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece>(getRandomShape());
  const [nextPiece, setNextPiece] = useState<Piece>(getRandomShape());
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lines, setLines] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(() => {
    // Load high score from localStorage on component mount
    const saved = localStorage.getItem('tetrisHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lineClearEffects, setLineClearEffects] = useState<LineClearEffect[]>([]);
  const animationFrameRef = useRef<number>(0);
  const effectStartTimeRef = useRef<number>(0);

  // Effect animation loop
  useEffect(() => {
    const animateEffects = (timestamp: number) => {
      if (!effectStartTimeRef.current) {
        effectStartTimeRef.current = timestamp;
      }

      setLineClearEffects(prevEffects => {
        const updatedEffects = prevEffects.map(effect => {
          const elapsed = timestamp - effect.timestamp;
          const duration = 500; // Effect duration in ms
          const progress = Math.min(elapsed / duration, 1);

          return { ...effect, progress };
        });

        // Remove finished effects
        return updatedEffects.filter(effect => effect.progress < 1);
      });

      if (lineClearEffects.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animateEffects);
      } else {
        effectStartTimeRef.current = 0;
      }
    };

    if (lineClearEffects.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animateEffects);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lineClearEffects.length]);

  // Touch controls state
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (gameOver || isPaused) return;

    touchEndX.current = e.changedTouches[0].screenX;
    touchEndY.current = e.changedTouches[0].screenY;
    handleSwipe();
  };

  const handleSwipe = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;

    const minSwipeDistance = 30;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe right
          movePiece(1);
        } else {
          // Swipe left
          movePiece(-1);
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          // Swipe down - soft drop
          moveDown();
        } else {
          // Swipe up - rotate
          rotatePiece();
        }
      }
    }
  };

  const handleTouchTap = () => {
    if (gameOver || isPaused) return;
    // Double tap for hard drop? Or single tap?
    // Let's use single tap for hard drop
    hardDrop();
  };

  // Check if device is mobile and show/hide appropriate controls
  useEffect(() => {
    const mobileControls = document.getElementById('mobile-controls');
    const keyboardControls = mobileControls?.previousElementSibling; // Get keyboard controls div

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (mobileControls && keyboardControls) {
      if (isMobile) {
        (mobileControls as HTMLElement).style.display = 'block';
        (keyboardControls as HTMLElement).style.display = 'none';
      } else {
        (mobileControls as HTMLElement).style.display = 'none';
        (keyboardControls as HTMLElement).style.display = 'block';
      }
    }
  }, []);

  const resetHighScore = () => {
    if (window.confirm('Are you sure you want to reset the high score?')) {
      setHighScore(0);
      localStorage.removeItem('tetrisHighScore');
    }
  };

  const movePiece = useCallback((dir: number) => {
    if (gameOver || isPaused) return;

    const newX = currentPiece.x + dir;
    if (!checkCollision(board, currentPiece.shape, newX, currentPiece.y)) {
      setCurrentPiece(prev => ({ ...prev, x: newX }));
    }
  }, [board, currentPiece, gameOver, isPaused]);

  const rotatePiece = useCallback(() => {
    if (gameOver || isPaused) return;

    const shapes = SHAPES[currentPiece.type];
    const nextRotation = (currentPiece.rotation + 1) % shapes.length;
    const nextShape = shapes[nextRotation];

    if (!checkCollision(board, nextShape, currentPiece.x, currentPiece.y)) {
      setCurrentPiece(prev => ({ ...prev, rotation: nextRotation, shape: nextShape }));
    }
  }, [board, currentPiece, gameOver, isPaused]);

  const moveDown = useCallback(() => {
    if (gameOver || isPaused) return;

    const newY = currentPiece.y + 1;
    if (checkCollision(board, currentPiece.shape, currentPiece.x, newY)) {
      const newBoard = mergeBoard(board, currentPiece.shape, currentPiece.x, currentPiece.y, currentPiece.type);
      const { board: clearedBoard, linesCleared, clearedRows } = clearLines(newBoard);

      // Add line clear effects
      if (clearedRows.length > 0) {
        const effects = clearedRows.map(row => ({
          row,
          progress: 0,
          timestamp: Date.now()
        }));
        setLineClearEffects(effects);
      }

      setBoard(clearedBoard);
      setLines(prev => prev + linesCleared);
      setScore(prev => {
        const newScore = prev + linesCleared * 100 * level;
        // Update high score if new score is higher
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('tetrisHighScore', newScore.toString());
        }
        return newScore;
      });

      if (linesCleared > 0 && (lines + linesCleared) >= level * 10) {
        setLevel(prev => prev + 1);
      }

      setCurrentPiece(nextPiece);
      setNextPiece(getRandomShape());

      if (checkCollision(clearedBoard, nextPiece.shape, nextPiece.x, nextPiece.y)) {
        setGameOver(true);
      }
    } else {
      setCurrentPiece(prev => ({ ...prev, y: newY }));
    }
  }, [board, currentPiece, nextPiece, lines, level, gameOver, isPaused, highScore]);

  const hardDrop = useCallback(() => {
    if (gameOver || isPaused) return;

    let newY = currentPiece.y;
    while (!checkCollision(board, currentPiece.shape, currentPiece.x, newY + 1)) {
      newY++;
    }

    const newBoard = mergeBoard(board, currentPiece.shape, currentPiece.x, newY, currentPiece.type);
    const { board: clearedBoard, linesCleared, clearedRows } = clearLines(newBoard);

    // Add line clear effects
    if (clearedRows.length > 0) {
      const effects = clearedRows.map(row => ({
        row,
        progress: 0,
        timestamp: Date.now()
      }));
      setLineClearEffects(effects);
    }

    setBoard(clearedBoard);
    setLines(prev => prev + linesCleared);
    setScore(prev => {
      const newScore = prev + linesCleared * 100 * level + (newY - currentPiece.y) * 2;
      // Update high score if new score is higher
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('tetrisHighScore', newScore.toString());
      }
      return newScore;
    });

    if (linesCleared > 0 && (lines + linesCleared) >= level * 10) {
      setLevel(prev => prev + 1);
    }

    setCurrentPiece(nextPiece);
    setNextPiece(getRandomShape());

    if (checkCollision(clearedBoard, nextPiece.shape, nextPiece.x, nextPiece.y)) {
      setGameOver(true);
    }
  }, [board, currentPiece, nextPiece, lines, level, gameOver, isPaused, highScore]);

  const startGame = useCallback(() => {
    setBoard(createBoard());
    setCurrentPiece(getRandomShape());
    setNextPiece(getRandomShape());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setLineClearEffects([]);
  }, []);

  const togglePause = useCallback(() => {
    if (gameOver) return;
    setIsPaused(prev => !prev);
  }, [gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!gameOver && !isPaused) {
          hardDrop();
        } else if (!gameOver) {
          togglePause();
        } else {
          startGame();
        }
        return;
      }

      if (isPaused || gameOver) return;

      switch (e.code) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePiece();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, moveDown, rotatePiece, hardDrop, togglePause, startGame, gameOver, isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && !isPaused) {
        moveDown();
      }
    }, Math.max(100, 1000 - (level - 1) * 100));

    return () => clearInterval(interval);
  }, [moveDown, level, gameOver, isPaused]);

  const drawBlock = (x: number, y: number, color: string) => {
    return (
      <rect
        x={x * BLOCK_SIZE}
        y={y * BLOCK_SIZE}
        width={BLOCK_SIZE}
        height={BLOCK_SIZE}
        fill={color}
        stroke="#000"
        strokeWidth="1"
      />
    );
  };

  const drawBoard = () => {
    const blocks = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cellValue = board[row][col];
        if (cellValue && COLORS[cellValue]) {
          // Use the stored piece type to get the color directly
          blocks.push(drawBlock(col, row, COLORS[cellValue]));
        }
      }
    }
    return blocks;
  };

  const getGhostPieceY = () => {
    let y = currentPiece.y;
    while (!checkCollision(board, currentPiece.shape, currentPiece.x, y + 1)) {
      y++;
    }
    return y;
  };

  const drawGhostPiece = () => {
    const blocks = [];
    const ghostY = getGhostPieceY();
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          blocks.push(
            <rect
              x={(currentPiece.x + col) * BLOCK_SIZE}
              y={(ghostY + row) * BLOCK_SIZE}
              width={BLOCK_SIZE}
              height={BLOCK_SIZE}
              fill="rgba(255, 255, 255, 0.2)"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1"
            />
          );
        }
      }
    }
    return blocks;
  };

  const drawPiece = () => {
    const blocks = [];
    const color = COLORS[currentPiece.type];
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          blocks.push(drawBlock(
            currentPiece.x + col,
            currentPiece.y + row,
            color
          ));
        }
      }
    }
    return blocks;
  };

  const drawNextPiece = () => {
    const blocks = [];
    const color = COLORS[nextPiece.type];
    for (let row = 0; row < nextPiece.shape.length; row++) {
      for (let col = 0; col < nextPiece.shape[row].length; col++) {
        if (nextPiece.shape[row][col]) {
          blocks.push(
            <rect
              x={col * 20 + 20}
              y={row * 20 + 20}
              width={20}
              height={20}
              fill={color}
              stroke="#000"
              strokeWidth="1"
            />
          );
        }
      }
    }
    return blocks;
  };

  const drawLineClearEffects = () => {
    const effects: React.ReactNode[] = [];

    lineClearEffects.forEach((effect) => {
      const { row, progress } = effect;

      // Create wave effect across the row
      for (let col = 0; col < COLS; col++) {
        const x = col * BLOCK_SIZE;
        const y = row * BLOCK_SIZE;

        // Calculate wave offset based on column position
        const waveOffset = Math.sin((col / COLS) * Math.PI * 2 + progress * Math.PI * 2) * 5;

        // Opacity decreases as effect progresses
        const opacity = 1 - progress;

        // Scale effect - starts small, grows, then shrinks
        const scale = 0.5 + Math.sin(progress * Math.PI) * 0.5;

        // Create a rectangle for each block in the cleared row
        effects.push(
          <g key={`effect-${row}-${col}`} opacity={opacity}>
            <rect
              x={x + BLOCK_SIZE/2 - (BLOCK_SIZE * scale)/2}
              y={y + BLOCK_SIZE/2 - (BLOCK_SIZE * scale)/2 + waveOffset}
              width={BLOCK_SIZE * scale}
              height={BLOCK_SIZE * scale}
              fill="#ffffff"
              stroke="#ffff00"
              strokeWidth="2"
              rx="2"
            />
            {/* Add a shine effect */}
            <rect
              x={x + BLOCK_SIZE/2 - (BLOCK_SIZE * scale)/2 + 2}
              y={y + BLOCK_SIZE/2 - (BLOCK_SIZE * scale)/2 + waveOffset + 2}
              width={BLOCK_SIZE * scale - 4}
              height={(BLOCK_SIZE * scale - 4)/2}
              fill="rgba(255, 255, 255, 0.3)"
              rx="1"
            />
          </g>
        );
      }

      // Add particles effect
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = progress * 30 + 5;
        const x = (COLS * BLOCK_SIZE) / 2 + Math.cos(angle) * distance;
        const y = row * BLOCK_SIZE + BLOCK_SIZE / 2 + Math.sin(angle) * distance;

        effects.push(
          <circle
            key={`particle-${row}-${i}`}
            cx={x}
            cy={y}
            r={2}
            fill="#ffff00"
            opacity={1 - progress}
          />
        );
      }
    });

    return effects;
  };

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Tetris</h1>
        <svg
          width={COLS * BLOCK_SIZE}
          height={ROWS * BLOCK_SIZE}
          style={{ border: '2px solid #000', backgroundColor: '#111' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={(e) => e.preventDefault()} // Prevent scrolling while playing
        >
          {drawBoard()}
          {drawGhostPiece()}
          {drawPiece()}
          {drawLineClearEffects()}
        </svg>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
          <button onClick={startGame} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            {gameOver ? 'Restart' : 'Start'}
          </button>
          <button onClick={togglePause} disabled={gameOver} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', opacity: gameOver ? 0.5 : 1 }}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '200px' }}>
        <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Score</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>{score}</div>
        </div>

        <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>High Score</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#f00' }}>{highScore}</div>
          <button onClick={resetHighScore} style={{ marginTop: '10px', padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }}>
            Reset High Score
          </button>
        </div>

        <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Level</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>{level}</div>
        </div>

        <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Lines</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>{lines}</div>
        </div>

        <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Next</h3>
          <svg width="100" height="100" style={{ backgroundColor: '#111', display: 'block', margin: '0 auto' }}>
            {drawNextPiece()}
          </svg>
        </div>

        <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#fff' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Controls</h3>
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
            <div>← → : Move</div>
            <div>↑ : Rotate</div>
            <div>↓ : Soft Drop</div>
            <div>Space : Hard Drop/Pause</div>
          </div>
        </div>

        <div style={{ border: '2px solid #000', padding: '15px', backgroundColor: '#fff' }} id="mobile-controls">
          <h3 style={{ margin: '0 0 10px 0' }}>Touch Controls</h3>
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
            <div>← Swipe → : Move</div>
            <div>↑ Swipe : Rotate</div>
            <div>↓ Swipe : Soft Drop</div>
            <div>Tap : Hard Drop</div>
          </div>
        </div>
      </div>

      {gameOver && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', border: '4px solid #000', padding: '30px', textAlign: 'center', zIndex: 1000 }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#f00' }}>Game Over!</h2>
          <div style={{ fontSize: '18px', marginBottom: '20px' }}>
            <div>Final Score: <strong>{score}</strong></div>
            <div>Level Reached: <strong>{level}</strong></div>
            <div>Lines Cleared: <strong>{lines}</strong></div>
          </div>
          <button onClick={startGame} style={{ padding: '12px 24px', fontSize: '18px', cursor: 'pointer' }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Tetris;