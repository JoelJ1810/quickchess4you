import React from 'react';
import '../styles/Message.css';

interface MessageProps {
  text: string;
  type: string;
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  if (!text) return null;

  return (
    <footer id="message" className={type}>
      <p>{text}</p>
    </footer>
  );
};

export default Message; 