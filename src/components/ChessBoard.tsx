import React, { useState } from 'react';
import './ChessBoard.css';

interface ChessBoardProps {
  fen: string;
  onMove?: (from: string, to: string) => void;
}

class SimpleChessEngine {
  private board: { [key: string]: string };

  constructor(fen: string = '') {
    this.board = {};
    this.loadFEN(fen);
  }

  loadFEN(fen: string) {
    // Simple FEN parser for initial position
    const defaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const fenToUse = fen || defaultFEN;
    const [position] = fenToUse.split(' ');
    const ranks = position.split('/');
    
    this.board = {};
    ranks.forEach((rank, rankIndex) => {
      let fileIndex = 0;
      for (let char of rank) {
        if (/[1-8]/.test(char)) {
          fileIndex += parseInt(char);
        } else {
          const file = String.fromCharCode(97 + fileIndex); // 'a' is 97 in ASCII
          const square = `${file}${8 - rankIndex}`;
          this.board[square] = char;
          fileIndex++;
        }
      }
    });
  }

  getBoard() {
    return this.board;
  }
}

const ChessBoard: React.FC<ChessBoardProps> = ({ fen, onMove }) => {
  const [game, setGame] = useState<SimpleChessEngine | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  React.useEffect(() => {
    const newGame = new SimpleChessEngine(fen);
    setGame(newGame);
  }, [fen]);

  const handleSquareClick = (square: string) => {
    if (!game) return;

    if (selectedSquare) {
      if (selectedSquare !== square) {
        onMove?.(selectedSquare, square);
      }
      setSelectedSquare(null);
    } else {
      const piece = game.getBoard()[square];
      if (piece) {
        setSelectedSquare(square);
      }
    }
  };

  const renderSquare = (square: string) => {
    const piece = game?.getBoard()[square] || '';
    const isSelected = square === selectedSquare;

    return (
      <div
        key={square}
        id={square}
        className={`square ${isSelected ? 'selected' : ''} ${piece ? piece.toLowerCase() : ''}`}
        onClick={() => handleSquareClick(square)}
      >
        <span></span>
      </div>
    );
  };

  const renderBoard = () => {
    const squares = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    for (const rank of ranks) {
      for (const file of files) {
        squares.push(renderSquare(file + rank));
      }
    }

    return squares;
  };

  return (
    <main id="board">
      {game && renderBoard()}
    </main>
  );
};

export default ChessBoard; 