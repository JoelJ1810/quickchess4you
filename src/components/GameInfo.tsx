import React from 'react';
import '../styles/GameInfo.css';

interface GameInfoProps {
  rating: number;
  timeRemaining?: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ rating, timeRemaining }) => {
  return (
    <div id="game-info">
      <div className="rating">
        Rating: {rating}
      </div>
      {timeRemaining !== undefined && (
        <div className="timer">
          Time: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
        </div>
      )}
    </div>
  );
};

export default GameInfo; 