import React, { useState } from 'react';
import './UserRegistration.css';

interface UserRegistrationProps {
  onRegister: (userId: string) => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name.trim() || !phoneNumber.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending registration request:', { name, phoneNumber });
      
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ 
          name, 
          phoneNumber,
          puzzleProgress: [],
          totalTimeSpent: 0,
          totalPuzzlesCompleted: 0,
          progressPercentage: 0
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 0) {
          throw new Error('Network error - Make sure the server is running on port 5000');
        }
        const data = await response.json();
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      onRegister(data._id);
    } catch (err) {
      console.error('Registration error details:', err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Cannot connect to server. Please make sure the server is running on port 5000');
      } else {
        setError(err instanceof Error ? err.message : 'Error registering user. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register to Play</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
            disabled={isLoading}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Start Playing'}
        </button>
      </form>
    </div>
  );
};

export default UserRegistration; 