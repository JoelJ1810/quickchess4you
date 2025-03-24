const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Environment variables
const isDevelopment = process.env.NODE_ENV !== 'production';

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://Utkal:JJJ@chess.hk08b.mongodb.net/chess_puzzles';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    puzzleProgress: [{
        puzzleId: Number,
        timeSpent: Number,
        completed: Boolean,
        completedAt: Date
    }],
    totalTimeSpent: {
        type: Number,
        default: 0
    },
    totalPuzzlesCompleted: {
        type: Number,
        default: 0
    },
    progressPercentage: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

// API Routes
app.use('/api', (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.post('/api/users', async(req, res) => {
    try {
        console.log('Received registration request:', req.body);
        const user = new User(req.body);
        await user.save();
        console.log('User created successfully:', user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user: ' + error.message });
    }
});

app.get('/api/users/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user: ' + error.message });
    }
});

app.put('/api/users/:userId/progress', async(req, res) => {
    try {
        const { puzzleId, timeSpent, completed } = req.body;
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const puzzleIndex = user.puzzleProgress.findIndex(p => p.puzzleId === puzzleId);
        if (puzzleIndex === -1) {
            user.puzzleProgress.push({
                puzzleId,
                timeSpent,
                completed,
                completedAt: completed ? new Date() : null
            });
        } else {
            user.puzzleProgress[puzzleIndex] = {
                ...user.puzzleProgress[puzzleIndex],
                timeSpent,
                completed,
                completedAt: completed ? new Date() : null
            };
        }

        user.totalTimeSpent = user.puzzleProgress.reduce((total, puzzle) => total + puzzle.timeSpent, 0);
        user.totalPuzzlesCompleted = user.puzzleProgress.filter(p => p.completed).length;
        user.progressPercentage = (user.totalPuzzlesCompleted / 10) * 100;

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Error updating progress: ' + error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

if (isDevelopment) {
    // In development, only handle API routes
    app.get('/', (req, res) => {
        res.json({ message: 'API is running. Please start the React development server.' });
    });
} else {
    // Serve static files from the React app in production
    app.use(express.static(path.join(__dirname, 'build')));

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${isDevelopment ? 'development' : 'production'} mode on port ${PORT}`);
});