import React from 'react';

interface ChessPieceProps {
  piece: string;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => {
  // Simple SVG paths for chess pieces (placeholder design)
  const paths: { [key: string]: string } = {
    'p': 'M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z',
    'r': 'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14',
    'n': 'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18',
    'b': 'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z',
    'q': 'M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,11 L 14,25 L 7,14 L 9,26 z',
    'k': 'M 22.5,11.63 L 22.5,6 M 20,8 L 25,8 M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25'
  };

  const color = piece === piece.toLowerCase() ? '#000' : '#fff';
  const pathKey = piece.toLowerCase();

  return (
    <svg viewBox="0 0 45 45" width="100%" height="100%">
      <g
        style={{
          fill: 'none',
          fillOpacity: 1,
          fillRule: 'evenodd',
          stroke: '#000',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 4,
          strokeDasharray: 'none',
          strokeOpacity: 1
        }}
      >
        <path
          d={paths[pathKey] || ''}
          style={{
            fill: color,
            stroke: '#000',
          }}
        />
      </g>
    </svg>
  );
};

export default ChessPiece; 