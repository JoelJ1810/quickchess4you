import React, { useState, useEffect } from 'react';
import ChessBoard from './ChessBoard';
import { puzzles } from '../data/puzzles';
import './PuzzleContainer.css';

interface PuzzleContainerProps {
  userId: string;
}

const PuzzleContainer: React.FC<PuzzleContainerProps> = ({ userId }) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    setStartTime(Date.now());
    setMessage(puzzles[currentPuzzleIndex].description);
  }, [currentPuzzleIndex]);

  const handleMove = async (from: string, to: string) => {
    const currentPuzzle = puzzles[currentPuzzleIndex];
    const move = `${from}${to}`;

    if (currentPuzzle.moves.includes(move)) {
      // Correct move
      const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      setMessage('Correct! Well done!');

      try {
        await fetch(`http://localhost:5000/api/users/${userId}/progress`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            puzzleId: currentPuzzle.id,
            timeSpent,
            completed: true
          }),
        });

        // Move to next puzzle after a delay
        setTimeout(() => {
          if (currentPuzzleIndex < puzzles.length - 1) {
            setCurrentPuzzleIndex(prev => prev + 1);
          } else {
            setMessage('Congratulations! You have completed all puzzles!');
          }
        }, 1500);
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    } else {
      // Wrong move
      setMessage('Try again!');
    }
  };

  const currentPuzzle = puzzles[currentPuzzleIndex];
  const progress = ((currentPuzzleIndex) / puzzles.length) * 100;

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <div className="puzzle-info">
          <div className="puzzle-message">{message}</div>
          <div className="puzzle-progress">
            Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <ChessBoard
        fen={currentPuzzle.fen}
        onMove={handleMove}
      />
    </div>
  );
};

export default PuzzleContainer; 