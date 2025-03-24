# Chess Puzzle App

A React-based chess puzzle application that helps players improve their chess skills through interactive puzzles.

## Features

- Interactive chess board with piece movement
- Puzzle rating system
- Progress tracking
- Random chess facts
- Mobile-responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd chess-puzzle-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
chess-puzzle-app/
├── src/
│   ├── components/      # React components
│   ├── styles/         # CSS files
│   ├── services/       # API and database services
│   └── utils/          # Utility functions
├── public/
│   └── media/         # Chess piece images and other assets
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 