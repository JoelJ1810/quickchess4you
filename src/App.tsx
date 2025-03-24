import React, { useState } from 'react';
import './App.css';
import UserRegistration from './components/UserRegistration';
import PuzzleContainer from './components/PuzzleContainer';

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const handleRegister = (newUserId: string) => {
    setUserId(newUserId);
  };

  return (
    <div className="app">
      <main>
        {userId ? (
          <div className="game-container">
            <PuzzleContainer userId={userId} />
          </div>
        ) : (
          <UserRegistration onRegister={handleRegister} />
        )}
      </main>
    </div>
  );
};

export default App; 