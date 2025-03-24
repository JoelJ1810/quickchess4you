import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header>
      <button id="menu-button" onClick={onMenuClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
        <span>menu</span>
      </button>
      <h1 id="title">
        <img src="/media/chess_knight_dark.svg" alt="Knight" className="title-icon" height="36" />
        Chess Puzzles
      </h1>
    </header>
  );
};

export default Header; 