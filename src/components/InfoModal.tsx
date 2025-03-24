import React, { useState, useEffect } from 'react';
import '../styles/InfoModal.css';

interface InfoModalProps {
  onClose: () => void;
}

const chessFacts = [
  "The longest official chess game ever was 269 moves long and ended in a draw.",
  "The number of possible unique chess games is greater than the number of atoms in the universe.",
  "The word 'Checkmate' comes from the Persian phrase 'Shah Mat,' which means 'the king is dead.'",
  "The folding chess board was invented by a priest who was forbidden to play chess.",
  "The first chess computer program was developed in 1951 by Alan Turing.",
  // Add more facts as needed
];

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const randomFact = chessFacts[Math.floor(Math.random() * chessFacts.length)];
    setFact(randomFact);
  }, []);

  return (
    <div id="info-modal">
      <div>
        <button className="close-button" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
          </svg>
          <span>close</span>
        </button>
        <h1 id="title">
          <img src="/media/chess_knight_dark.svg" alt="Knight" className="title-icon" height="36" />
          Chess Puzzles
        </h1>
        <h2>How to Play</h2>
        <p>Solve chess puzzles by finding the best move. Click on a piece to select it, then click on a highlighted square to move.</p>
        <p>The game will tell you if your move is correct. Complete puzzles to increase your rating!</p>
        <h3>Did You Know?</h3>
        <p className="chess-fact">{fact}</p>
      </div>
    </div>
  );
};

export default InfoModal; 