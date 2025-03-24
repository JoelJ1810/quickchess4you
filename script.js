// Add this standalone confetti function to the very top of the file
// Standalone confetti function as a fallback
if (typeof confetti === 'undefined') {
    // Simple confetti implementation as fallback
    window.confetti = function(options = {}) {
        console.log("Using fallback confetti with options:", options);

        const defaults = {
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6, x: 0.5 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
        };

        // Merge options with defaults
        const config = {...defaults, ...options };

        // Create a simple visual effect if confetti doesn't load
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        // Create particles
        for (let i = 0; i < config.particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '10px';
                particle.style.height = '10px';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = config.colors[Math.floor(Math.random() * config.colors.length)];

                // Set starting position
                const startX = (config.origin.x * window.innerWidth);
                const startY = (config.origin.y * window.innerHeight);
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';

                // Add to container
                container.appendChild(particle);

                // Animate
                const angle = Math.random() * Math.PI * 2;
                const velocity = 1 + Math.random() * 3;
                const spread = (Math.random() - 0.5) * config.spread;

                let posX = startX;
                let posY = startY;

                const intervalId = setInterval(() => {
                    posX += Math.cos(angle) * velocity + spread;
                    posY += Math.sin(angle) * velocity + 2; // Add gravity

                    particle.style.left = posX + 'px';
                    particle.style.top = posY + 'px';

                    // Remove when out of screen
                    if (posY > window.innerHeight) {
                        clearInterval(intervalId);
                        particle.remove();
                    }
                }, 20);

                // Remove particles after animation
                setTimeout(() => {
                    clearInterval(intervalId);
                    particle.remove();
                }, 3000);
            }, Math.random() * 500);
        }

        // Remove container after animation
        setTimeout(() => {
            container.remove();
        }, 4000);

        // Return an empty object to maintain API compatibility
        return {};
    };
}


import validateFEN from './fen-validator/index.js';


import { Game } from './js-chess-engine/lib/js-chess-engine.mjs';
let game = new Game();

const fenPositions = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'];
const pieces = ['r', 'n', 'b', 'q', 'k', 'p', 'R', 'N', 'B', 'Q', 'K', 'P'];
const speed = 300;
const game_version = '0.0.2';
const chessFacts = [
    "The longest official chess game ever was 269 moves long and ended in a draw.",
    "The number of possible unique chess games is greater than the number of atoms in the universe.",
    "The word 'Checkmate' comes from the Persian phrase 'Shah Mat,' which means 'the king is dead.'",
    "The folding chess board was invented by a priest who was forbidden to play chess.",
    "The first chess computer program was developed in 1951 by Alan Turing.",
    "The shortest possible chess game ending in checkmate is just two moves.",
    "The longest chess game theoretically possible is 5,949 moves.",
    "The first chess tournament was held in London in 1851.",
    "The chess piece originally known as the 'vizier' later became the queen we know today.",
    "Chess is included in the curriculum in over 30 countries.",
    "The oldest recorded chess game in history dates back to the 10th century.",
    "In medieval times, chess was used to teach war strategy.",
    "The knight is the only chess piece that can jump over other pieces.",
    "The modern chess board design with alternating light and dark squares appeared in Europe in 1090.",
    "Bobby Fischer became a chess grandmaster at the age of 15, the youngest ever at that time.",
    "The first AI to defeat a world chess champion was IBM's Deep Blue in 1997.",
    "The longest time for a player to make a move in a chess tournament was 2 hours and 20 minutes.",
    "The most expensive chess set ever made is the Jewel Royale Chess Set, valued at $9.8 million.",
    "In 1997, Garry Kasparov played against the entire world via the Internet and won.",
    "The term 'Stalemate' comes from the Old French 'estale' meaning 'at a standstill.'",
    "The queen is the most powerful piece on the chessboard, but was originally one of the weakest.",
    "The International Chess Federation (FIDE) was founded in Paris in 1924.",
    "Chess is one of the oldest games still played today, with origins dating back to 6th century India.",
    "The longest chess marathon lasted 50 hours and 30 minutes.",
    "The first chess book was written by Luis Ramirez de Lucena in 1497."
];

// Custom puzzles from simple to complex
const customPuzzles = [
    // Puzzle 1: Mate in 2 - White to play (Queen sacrifice followed by Rook mate)
    { puzzle_id: 'custom1', fen: 'r2qb1rk/ppb2p1p/2n1pPp1/B3N3/2B1P2Q/2P2R2/1P4PP/7K w - - 0 1', moves: ['h4h7', 'h8h7', 'f3h3'], rating: 500 },

    // Puzzle 2: Knight fork leading to bishop checkmate - White to play
    { puzzle_id: 'custom2', fen: '8/8/6p1/7k/3r2NP/B5PK/2br1R2/8 w - - 0 1', moves: ['g4f6', 'h5h6', 'a3f8'], rating: 600 },

    // Puzzle 3: Queen sacrifice leading to bishop checkmate - White to play
    { puzzle_id: 'custom3', fen: 'q1nrrk2/6pp/5pbb/8/8/1B6/3B1Q2/4RK2 w - - 0 1', moves: ['f2f6', 'g7f6', 'b3h6'], rating: 800 },

    // Puzzle 4: Rook Sacrifice Mate in Two - White to play
    { puzzle_id: 'custom4', fen: 'kbK5/pp6/1P6/8/8/8/8/R7 w - - 0 1', moves: ['a1a6', 'b7a6', 'b6b7'], rating: 1500 },

    // Puzzle 5: Brilliant Checkmate in Two - White to play
    { puzzle_id: 'custom5', fen: '8/8/8/2P3R1/5B2/2rP1p2/p1P1PP2/RnQ1K2k w Q - 5 3', moves: ['c1b2', 'b1a3', 'c1d1'], rating: 1200 },

    // Puzzle 6: Mate in 2 - White to play with multiple variations
    {
        puzzle_id: 'custom6',
        fen: '2b3N1/8/1r2pN1b/1p2kp2/1P1R4/8/4K3/6Q1 w - - 0 1',
        moves: [
            'd4f4', // 1.Rf4!
            'h6f4', // 1...Bxf4 (main line)
            'g1c5' // 2.Qc5#
        ],
        rating: 1800
    },

    // Puzzle 7: Queen Sacrifice to Knight Promotion Mate - White to play
    {
        puzzle_id: 'custom7',
        fen: '1B2q1B1/2n1kPR1/R1b2n1Q/2p1r3/8/3Q2B1/4p3/4K3 w - - 0 1',
        moves: [
            'd3d6', // 1.Qd6+
            'e7d6', // 1...Kxd6
            'f7e8n' // 2.fxe8=N#
        ],
        rating: 1800
    },

    // Puzzle 8: Mate in 2 with Multiple Variations - White to play
    {
        puzzle_id: 'custom8',
        fen: '3N4/KPP1p3/3k4/4R3/3P4/6R1/7B/8 w - - 1 1',
        moves: [
            'e1c1', // 1.O-O-O (castling queenside)
            'd6c7', // 1...Kxc7 (main line)
            'd5d5' // 2.Rd5#
        ],
        rating: 1800
    },

    // Puzzle 9: Mate in Two with Multiple Variations - White to play
    {
        puzzle_id: 'custom9',
        fen: '8/p4p2/Q7/3P4/1p1kB3/1K4N1/5R2/8 w - - 0 1',
        moves: [
            'f2f6', // 1.Rf6
            'd4e5', // 1...Ke5 (main line)
            'a6a1' // 2.Qa1#
        ],
        rating: 2200
    },

    // Puzzle 10: Mate in Two with Multiple Variations - Black to play
    {
        puzzle_id: 'custom10',
        fen: '5B2/8/K7/8/kpp5/7R/8/1B6 w - - 0 1',
        moves: [
            'h3c3', // 1.Rc3
            'b4c3', // 1...bxc3 (main line)
            'b1c2' // 2.Bc2#
        ],
        rating: 2200
    }
];

let puzzle_solved = false;
let puzzle_solved_clean = true;
let currentPuzzle = '';
let currentFEN = '';
let currentStatus = '';
let lastPuzzleMoveIndex = 0;
let puzzles = {};
let params = '';
let playerRating = 400;
let timerInterval = null;
let timeRemaining = 600; // 10 minutes in seconds
let puzzleIndex = 0;

// Add this after the other global variables (like timeRemaining)
let currentPuzzleIndex = 1;

// Initialize timer display when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    // Set initial timer display to 10:00
    const timerDisplay = document.querySelector('.timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = '10:00';
    }

    // Set up the buttons
    setUpButtons();

    // Initialize the board and load puzzles
    fetchPuzzlesWithFallback();

    // Note: We don't auto-load the first puzzle here anymore
    // The puzzle will be loaded after the user submits the popup form
});

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    // Display a random chess fact
    displayRandomChessFact();

    // Hide the no-js message since JavaScript is clearly working
    if (document.getElementById('no-js')) {
        document.getElementById('no-js').style.display = 'none';
    }

    // Clear all pieces from the board to start with a clean state
    clearAllPieces();

    // Set up the board with proper event listeners
    setUpBoard();
    setUpButtons();

    // Check if confetti is available and provide fallback if needed
    if (typeof confetti === 'undefined') {
        console.warn("Confetti library not loaded. Using fallback.");
        window.confetti = function(options) {
            console.log("Fallback confetti called");
            return {};
        };
    }

    // Add board-wide event delegation for handling clicks
    const board = document.getElementById('board');
    board.addEventListener('click', function(event) {
        let targetSquare = event.target;

        // If we clicked on a span, get its parent div (the square)
        if (targetSquare.tagName.toLowerCase() === 'span') {
            targetSquare = targetSquare.parentElement;
        }

        // Only handle clicks on board squares (divs)
        if (targetSquare.tagName.toLowerCase() === 'div' && targetSquare.id) {
            console.log(`Board click detected on square ${targetSquare.id}`);
            squareClicked(targetSquare);
        }
    });

    // Get URL parameters
    params = getURLSearchParams();

    // force set player rating if in params and is a number
    if (params.get('rating') != null && !isNaN(params.get('rating'))) {
        playerRating = params.get('rating');
        storeLocalPlayerRating(playerRating);
    } else {
        playerRating = getLocalPlayerRating();
    }

    // Add timer display to the UI
    const gameInfoElement = document.getElementById('game-info');

    // Note: Timer container is now defined in HTML
    // No need to create it dynamically

    // Create a container for buttons with improved styles
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button-container';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '15px';
    buttonContainer.style.margin = '20px auto';
    buttonContainer.style.maxWidth = '400px';
    buttonContainer.style.padding = '0 20px';

    // Add custom puzzles button with improved visibility
    const customPuzzlesButton = document.createElement('button');
    customPuzzlesButton.id = 'custom-puzzles-button';
    customPuzzlesButton.innerHTML = 'Start 10-Puzzle Challenge (10 mins per puzzle)';
    customPuzzlesButton.style.backgroundColor = '#4CAF50';
    customPuzzlesButton.style.color = 'white';
    customPuzzlesButton.style.border = 'none';
    customPuzzlesButton.style.borderRadius = '8px';
    customPuzzlesButton.style.padding = '15px 25px';
    customPuzzlesButton.style.fontSize = '18px';
    customPuzzlesButton.style.fontWeight = 'bold';
    customPuzzlesButton.style.cursor = 'pointer';
    customPuzzlesButton.style.marginBottom = '10px';
    customPuzzlesButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    customPuzzlesButton.addEventListener('click', startCustomPuzzleChallenge);
    buttonContainer.appendChild(customPuzzlesButton);

    // Add force start button with improved visibility
    const forceStartButton = document.createElement('button');
    forceStartButton.id = 'force-start-button';
    forceStartButton.innerHTML = 'Start Chess Puzzles (1-10)';
    forceStartButton.style.backgroundColor = '#FF9D23';
    forceStartButton.style.color = 'white';
    forceStartButton.style.border = 'none';
    forceStartButton.style.borderRadius = '8px';
    forceStartButton.style.padding = '15px 25px';
    forceStartButton.style.fontSize = '18px';
    forceStartButton.style.fontWeight = 'bold';
    forceStartButton.style.cursor = 'pointer';
    forceStartButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    forceStartButton.addEventListener('click', forceCustomPuzzleStart);
    buttonContainer.appendChild(forceStartButton);

    // Create puzzle selection menu with improved visibility
    const puzzleSelectContainer = document.createElement('div');
    puzzleSelectContainer.id = 'puzzle-selector';
    puzzleSelectContainer.style.display = 'flex';
    puzzleSelectContainer.style.flexWrap = 'wrap';
    puzzleSelectContainer.style.justifyContent = 'center';
    puzzleSelectContainer.style.gap = '12px';
    puzzleSelectContainer.style.margin = '20px auto';
    puzzleSelectContainer.style.maxWidth = '600px';
    puzzleSelectContainer.style.padding = '15px';
    puzzleSelectContainer.style.backgroundColor = '#f5f5f5';
    puzzleSelectContainer.style.borderRadius = '10px';
    puzzleSelectContainer.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';

    // Add title for the puzzle selection with improved visibility
    const puzzleSelectTitle = document.createElement('div');
    puzzleSelectTitle.textContent = 'Select a Specific Puzzle:';
    puzzleSelectTitle.style.width = '100%';
    puzzleSelectTitle.style.textAlign = 'center';
    puzzleSelectTitle.style.marginBottom = '15px';
    puzzleSelectTitle.style.fontSize = '18px';
    puzzleSelectTitle.style.fontWeight = 'bold';
    puzzleSelectTitle.style.color = '#333';
    puzzleSelectContainer.appendChild(puzzleSelectTitle);

    // Create buttons for each puzzle with improved visibility
    const puzzleTitles = [
        "Puzzle 1: Queen Sacrifice Mate",
        "Puzzle 2: Knight Fork to Bishop Mate",
        "Puzzle 3: Queen Sacrifice to Bishop Mate",
        "Puzzle 4: Rook Sacrifice Mate in Two",
        "Puzzle 5: Multi-Variation Mate in Two",
        "Puzzle 6: Mate in Two (Black)",
        "Puzzle 7: Knight Dance to Checkmate",
        "Puzzle 8: Mate in Two with Multiple Lines",
        "Puzzle 9: Brilliant Checkmate Sequence",
        "Puzzle 10: Force Checkmate (Black)"
    ];

    for (let i = 0; i < customPuzzles.length; i++) {
        const puzzleButton = document.createElement('button');
        puzzleButton.textContent = `${i + 1}`;
        puzzleButton.title = puzzleTitles[i];
        puzzleButton.style.width = '45px';
        puzzleButton.style.height = '45px';
        puzzleButton.style.borderRadius = '50%';
        puzzleButton.style.border = 'none';
        puzzleButton.style.backgroundColor = '#ddd';
        puzzleButton.style.cursor = 'pointer';
        puzzleButton.style.fontSize = '18px';
        puzzleButton.style.fontWeight = 'bold';
        puzzleButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

        // Different colors based on difficulty
        if (i < 2) {
            puzzleButton.style.backgroundColor = '#90EE90'; // Light green for easy
        } else if (i < 6) {
            puzzleButton.style.backgroundColor = '#FFFF99'; // Light yellow for medium
        } else {
            puzzleButton.style.backgroundColor = '#FFA07A'; // Light salmon for hard
        }

        puzzleButton.addEventListener('click', () => {
            loadSpecificPuzzle(i);
        });

        // Add hover effect
        puzzleButton.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            this.style.transition = 'all 0.2s ease';
        });
        puzzleButton.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });

        puzzleSelectContainer.appendChild(puzzleButton);
    }

    // Create a puzzle tracking panel to show progress
    const puzzleTrackingPanel = document.createElement('div');
    puzzleTrackingPanel.id = 'puzzle-tracking-panel';
    puzzleTrackingPanel.style.display = 'flex';
    puzzleTrackingPanel.style.flexDirection = 'column';
    puzzleTrackingPanel.style.alignItems = 'center';
    puzzleTrackingPanel.style.margin = '15px auto';
    puzzleTrackingPanel.style.padding = '15px';
    puzzleTrackingPanel.style.backgroundColor = '#f5f5f5';
    puzzleTrackingPanel.style.borderRadius = '10px';
    puzzleTrackingPanel.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    puzzleTrackingPanel.style.maxWidth = '600px';

    // Add a title for the tracking panel
    const trackingTitle = document.createElement('div');
    trackingTitle.textContent = 'Puzzle Progress:';
    trackingTitle.style.fontSize = '18px';
    trackingTitle.style.fontWeight = 'bold';
    trackingTitle.style.marginBottom = '10px';
    puzzleTrackingPanel.appendChild(trackingTitle);

    // Create a container for the indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.style.display = 'flex';
    indicatorsContainer.style.flexWrap = 'wrap';
    indicatorsContainer.style.justifyContent = 'center';
    indicatorsContainer.style.gap = '10px';
    indicatorsContainer.style.marginBottom = '10px';

    // Create an indicator for each puzzle
    for (let i = 0; i < customPuzzles.length; i++) {
        const indicator = document.createElement('div');
        indicator.id = `puzzle-indicator-${i}`;
        indicator.textContent = i + 1;
        indicator.style.width = '30px';
        indicator.style.height = '30px';
        indicator.style.borderRadius = '50%';
        indicator.style.backgroundColor = '#ddd'; // Default color (unsolved)
        indicator.style.display = 'flex';
        indicator.style.justifyContent = 'center';
        indicator.style.alignItems = 'center';
        indicator.style.fontWeight = 'bold';
        indicator.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        indicatorsContainer.appendChild(indicator);
    }

    puzzleTrackingPanel.appendChild(indicatorsContainer);

    // Add an overall progress indicator
    const overallProgress = document.createElement('div');
    overallProgress.id = 'overall-progress';
    overallProgress.textContent = 'Solved: 0/10';
    overallProgress.style.fontSize = '16px';
    overallProgress.style.fontWeight = 'bold';
    puzzleTrackingPanel.appendChild(overallProgress);

    // Get the board element to insert containers
    const boardElement = document.getElementById('board');

    // Make sure we insert the elements in the correct order
    // First, add puzzleSelectContainer before buttonContainer
    document.body.insertBefore(puzzleSelectContainer, boardElement.nextSibling);

    // Then, add the tracking panel after puzzleSelectContainer
    document.body.insertBefore(puzzleTrackingPanel, puzzleSelectContainer.nextSibling);

    // Then, add buttonContainer after puzzleTrackingPanel
    document.body.insertBefore(buttonContainer, puzzleTrackingPanel.nextSibling);

    // Initialize game with empty board
    game = new Game();
    currentStatus = game.exportJson();
    currentFEN = '';

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    Array.from(buttons).forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
            this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        });
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
        });
    });

    // Ensure the board is clear of all classes
    console.log("Initial board setup complete");

    // Create and add the hints panel
    createHintsPanel();
    updateHints(0); // Show hints for the first puzzle initially
});

function setUpBoard() {
    console.log("Setting up board");

    if (document.getElementById("no-js")) {
        document.getElementById("no-js").remove();
    }

    // First, clear all pieces from the board
    clearAllPieces();

    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');

    console.log("Setting up board with", squares.length, "squares");

    // Remove any existing event listeners
    squares.forEach(square => {
        const newSquare = square.cloneNode(true);
        square.parentNode.replaceChild(newSquare, square);
    });

    // Get the updated squares after cloning
    const updatedSquares = board.querySelectorAll('div');

    // Ensure all squares have a span element and no piece classes
    updatedSquares.forEach(square => {
        // Remove all piece classes
        pieces.forEach(piece => {
            square.classList.remove(piece);
        });

        if (square.querySelector('span') === null) {
            const span = document.createElement('span');
            square.appendChild(span);
        }

        // Add event listeners directly
        square.addEventListener('pointerdown', function(event) {
            console.log(`Square ${square.id} was clicked!`);
            squareClicked(square);
        });
    });

    console.log("Board setup complete with all pieces cleared");
}

function setUpButtons() {
    console.log("Setting up puzzle buttons");

    // Set up puzzle selection buttons
    const puzzleButtons = document.querySelectorAll('.puzzle-btn');
    puzzleButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const puzzleNumber = index + 1; // 1-based puzzle number
            console.log(`Puzzle button ${puzzleNumber} clicked`);
            currentPuzzleIndex = puzzleNumber; // Update global state
            loadSpecificPuzzle(puzzleNumber);
        });
    });

    // Set up navigation buttons with direct implementation for reliability
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    if (prevButton) {
        prevButton.removeEventListener('click', prevButtonHandler);
        prevButton.addEventListener('click', prevButtonHandler);
    }

    if (nextButton) {
        nextButton.removeEventListener('click', nextButtonHandler);
        nextButton.addEventListener('click', nextButtonHandler);
    }

    // Also set up the original menu button if it exists (for backward compatibility)
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            const infoModal = document.getElementById('info-modal');
            if (infoModal) {
                infoModal.style.display = 'flex';
                displayRandomChessFact();
            }
        });
    }

    // Set up close buttons for any modals
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('div[id$="-modal"]');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Separated button handlers for easier management
function prevButtonHandler() {
    if (currentPuzzleIndex > 1) {
        const prevIndex = currentPuzzleIndex - 1;
        console.log(`Navigating to previous puzzle (${prevIndex})`);
        currentPuzzleIndex = prevIndex;
        loadSpecificPuzzle(prevIndex);
    } else {
        console.log("Already at first puzzle");
    }
}

function nextButtonHandler() {
    if (currentPuzzleIndex < 10) {
        const nextIndex = currentPuzzleIndex + 1;
        console.log(`Navigating to next puzzle (${nextIndex})`);
        currentPuzzleIndex = nextIndex;
        loadSpecificPuzzle(nextIndex);
    } else {
        console.log("Already at last puzzle");
    }
}

function unselectAll() {
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    squares.forEach(square => {
        square.classList.remove('selected');
        square.classList.remove('circle');
    });
}

function clearBoard() {
    console.log("Clearing board");
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    squares.forEach(square => {
        // Preserve the span element
        const span = square.querySelector('span');
        square.className = '';

        // Re-add the span if it was removed
        if (!square.contains(span) && span) {
            square.appendChild(span);
        } else if (!square.querySelector('span')) {
            const newSpan = document.createElement('span');
            square.appendChild(newSpan);
        }
    });
}

function loadBoard(fen) {
    console.log("Loading board with FEN:", fen);
    const fenArr = fen.split(' ');
    const piecePlacement = fenArr[0];

    // Clear the board first by removing all piece classes
    clearAllPieces();

    // Process the FEN string: replace numbers with spaces and remove forward slashes
    let newPiecePlacement = piecePlacement
        .replace(/[0-8]/g, match => " ".repeat(parseInt(match)))
        .replace(/\//g, '');

    console.log("Processed piece placement:", newPiecePlacement);

    // Add only the pieces specified in the FEN
    for (let i = 0; i < newPiecePlacement.length; i++) {
        const square = document.getElementById(fenPositions[i]);
        if (!square) {
            console.error(`Square with ID ${fenPositions[i]} not found!`);
            continue;
        }

        if (newPiecePlacement[i] !== ' ') {
            console.log(`Adding ${newPiecePlacement[i]} to ${fenPositions[i]}`);
            square.classList.add(newPiecePlacement[i]);

            // Ensure the square has a span element
            if (!square.querySelector('span')) {
                const span = document.createElement('span');
                square.appendChild(span);
            }
        }
    }

    // Re-apply event listeners
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    squares.forEach(square => {
        square.addEventListener('pointerdown', function(event) {
            console.log(`Square ${square.id} was clicked!`);
            squareClicked(square);
        });
    });
}

function flipBoard(shouldFlip) {
    const board = document.getElementById('board');
    if (shouldFlip) {
        board.classList.add('flip');
    } else {
        board.classList.remove('flip');
    }
}

function selectPiece(element) {
    console.log("Selecting piece:", element.id, element.className);

    const selectedPiece = currentStatus.pieces[element.id.toUpperCase()];
    console.log("Selected piece from game state:", selectedPiece);

    let canSelectPiece = false;
    if (currentStatus.turn === 'white' && selectedPiece === selectedPiece.toUpperCase()) {
        // white turn and white piece selected
        canSelectPiece = true;
    } else if (currentStatus.turn === 'black' && selectedPiece === selectedPiece.toLowerCase()) {
        // black turn and black piece selected
        canSelectPiece = true;
    }

    console.log("Can select piece:", canSelectPiece, "Current turn:", currentStatus.turn);

    const selectedPieceValidMoves = currentStatus.moves[element.id.toUpperCase()];
    console.log("Valid moves:", selectedPieceValidMoves);

    if (canSelectPiece) {
        element.classList.add('selected');

        if (selectedPieceValidMoves && selectedPieceValidMoves.length) {
            for (let i = 0; i < selectedPieceValidMoves.length; i++) {
                const square = document.getElementById(selectedPieceValidMoves[i].toLowerCase());
                square.classList.add('circle');
            }
        }
    }
}

function computerMove(from, to, promote = null) {
    console.log(`Computer moving from ${from} to ${to} with promotion: ${promote}`);

    try {
        // Normalize input
        const normalizedFrom = from.toLowerCase();
        const normalizedTo = to.toLowerCase();

        // Highlight the from and to squares
        const fromSquare = document.querySelector(`[data-square="${normalizedFrom}"]`);
        const toSquare = document.querySelector(`[data-square="${normalizedTo}"]`);

        if (fromSquare) fromSquare.classList.add('highlight-from');
        if (toSquare) toSquare.classList.add('highlight-to');

        // Remove highlights after a delay
        setTimeout(() => {
            if (fromSquare) fromSquare.classList.remove('highlight-from');
            if (toSquare) toSquare.classList.remove('highlight-to');
        }, 2000);

        // Check if this is a promotion move
        if (promote) {
            console.log(`This is a promotion move to ${promote}`);
            // Special handling for promotion moves
            movePiece(normalizedFrom, normalizedTo, promote);
        } else {
            movePiece(normalizedFrom, normalizedTo);
        }

        // Special handling for puzzles 7-10 to make sure the board stays interactive
        if (puzzleIndex >= 6 && puzzleIndex <= 9) {
            // Explicitly make sure the board is interactive after the computer's move
            setTimeout(() => {
                ensureBoardIsInteractive();
                console.log("Board interactivity restored after computer move");

                // Update message to indicate it's the player's turn
                updateMessage(`<p>Your Move</p><p>Find the best continuation</p>`, '');
            }, 500);
        }

        return true;
    } catch (error) {
        console.error("Error in computerMove:", error);

        // Try to recover board state
        try {
            // Reset game state to current FEN
            game = new Game(currentFEN);
            currentStatus = game.exportJson();
            loadBoard(currentFEN);
        } catch (recoveryError) {
            console.error("Failed to recover board state:", recoveryError);
        }

        return false;
    }
}

function playerMove(from, to) {
    console.log(`Attempting to move from ${from} to ${to}`);
    console.log(`Player move: ${from}${to}`);
    console.log(`Current puzzle index: ${puzzleIndex}`);
    console.log(`Current puzzle: ${JSON.stringify(currentPuzzle)}`);
    console.log(`Current FEN: ${currentFEN}`);
    console.log(`Last puzzle move index: ${lastPuzzleMoveIndex}`);

    // Double check the board is interactive
    ensureBoardIsInteractive();

    try {
        // Normalize input to lowercase for consistent handling
        const normalizedFrom = from.toLowerCase();
        const normalizedTo = to.toLowerCase();

        // Make the move first to check for checkmate
        console.log("Checking if move results in checkmate");
        game.move(normalizedFrom, normalizedTo);
        const newStatus = game.exportJson();
        const isCheckmate = newStatus.isFinished && newStatus.checkMate;
        console.log(`Move results in checkmate: ${isCheckmate}`);

        // Undo the move to continue with normal flow
        console.log("Resetting game to current FEN");
        game = new Game(currentFEN);
        currentStatus = game.exportJson();

        // Rest of the function continues as before...

        // Special handling for puzzle 1 (Queen sacrifice mate)
        if (puzzleIndex === 0) {
            // First player move in puzzle 1 - Queen sacrifice
            if (lastPuzzleMoveIndex === 0 && from === "h4" && to === "h7") {
                console.log("Correct! Queen sacrifice move detected");
                puzzleMoveGood(from, to);
                return;
            }
            // Third player move in puzzle 1 - Rook mate
            else if (lastPuzzleMoveIndex === 2 && from === "f3" && to === "h3") {
                console.log("Correct! Checkmate move detected");
                puzzleMoveGood(from, to);
                return;
            } else {
                // Any other move in puzzle 1 is wrong
                console.log(`Incorrect move for puzzle 1. lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}, move: ${from}${to}`);
                console.log(`Expected moves for puzzle 1: 0:h4h7, 2:f3h3`);
                puzzleMoveBad(from, to);
                return;
            }
        }

        // Special handling for puzzle 3 (Queen sacrifice to Bishop mate)
        if (puzzleIndex === 2) {
            // First move in puzzle 3 - Queen sacrifice
            if (lastPuzzleMoveIndex === 0 && from === "f2" && to === "f6") {
                console.log("Correct! Queen sacrifice move detected in puzzle 3");
                puzzleMoveGood(from, to);
                return;
            }
            // Final move in puzzle 3 - Bishop checkmate
            else if (lastPuzzleMoveIndex === 2 && from === "b3" && to === "h6") {
                console.log("Correct! Bishop checkmate move detected in puzzle 3");
                puzzleMoveGood(from, to);
                return;
            } else {
                console.log(`Incorrect move for puzzle 3. lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}, move: ${from}${to}`);
                puzzleMoveBad(from, to);
                return;
            }
        }

        // Special handling for puzzle 4 (Rook sacrifice to pawn mate)
        if (puzzleIndex === 3) {
            console.log(`Puzzle 4 move validation - lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}, move: ${from}${to}`);
            console.log(`Current expected move: ${currentPuzzle.moves[lastPuzzleMoveIndex]}`);
            console.log(`All expected moves: ${JSON.stringify(currentPuzzle.moves)}`);

            // First move in puzzle 4 - Rook sacrifice
            if (lastPuzzleMoveIndex === 0 && from === "a1" && to === "a6") {
                console.log("Correct! Rook sacrifice move detected in puzzle 4");
                puzzleMoveGood(from, to);
                return;
            } else {
                console.log(`Incorrect move for puzzle 4. lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}, move: ${from}${to}`);
                console.log(`Expected move at index ${lastPuzzleMoveIndex}: ${currentPuzzle.moves[lastPuzzleMoveIndex]}`);
                puzzleMoveBad(from, to);
                return;
            }
        }

        // Special handling for puzzle 7 (Knight dance to checkmate)
        if (puzzleIndex === 6) {
            console.log(`Puzzle 7 player move attempt: ${from}${to}`);
            console.log(`Current lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}`);

            // Use the validation function for more reliable validation
            if (validatePuzzle7Move(from, to, lastPuzzleMoveIndex)) {
                console.log(`CORRECT! Player made the expected move ${from}${to}`);

                // Make the move on the board immediately
                movePiece(normalizedFrom, normalizedTo);

                // Increment the move index for the computer's response
                lastPuzzleMoveIndex++;

                // Check if we've reached the end of the puzzle
                if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                    console.log("Puzzle 7 completed!");
                    updateMessage(`<p>Checkmate!</p><p>Brilliant knight maneuver!</p>`, 'good');
                    puzzle_solved = true;

                    // Auto advance to next puzzle
                    showCongratulations(true);
                    return;
                }

                // If more moves remain, make the computer's move after a slight delay
                setTimeout(() => {
                    // Get the next computer move from the moves array
                    const nextComputerMove = currentPuzzle.moves[lastPuzzleMoveIndex];
                    console.log(`Next computer move: ${nextComputerMove}`);

                    if (nextComputerMove) {
                        const computerFrom = nextComputerMove.substring(0, 2);
                        const computerTo = nextComputerMove.substring(2, 4);

                        // Check if this is a promotion move
                        let computerPromote = null;
                        if (nextComputerMove.length > 4) {
                            computerPromote = nextComputerMove.substring(4, 5);
                            console.log(`Computer promotion move: ${computerPromote}`);
                        }

                        console.log(`Computer moving from ${computerFrom} to ${computerTo} with promotion: ${computerPromote}`);

                        // Execute the computer move
                        computerMove(computerFrom, computerTo, computerPromote);

                        // Increment move index for the next player move
                        lastPuzzleMoveIndex++;

                        // Check if puzzle is solved after computer's move
                        if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                            console.log("Puzzle 7 completed after computer's move!");
                            updateMessage(`<p>Checkmate!</p><p>Brilliant knight maneuver!</p>`, 'good');
                            puzzle_solved = true;

                            // Auto advance to next puzzle
                            showCongratulations(true);
                        } else {
                            // Provide feedback to indicate player's next move
                            updateMessage('<p>Good move! Now continue with your next move...</p>');
                        }
                    }
                }, 500); // 0.5 second delay for the computer move

                // Provide immediate feedback after player's move
                updateMessage('<p>Good move! Wait for computer response...</p>');
                return;
            } else {
                console.log(`INCORRECT move for puzzle 7. Got: ${from}${to}`);

                // Increment wrong move counter
                if (!window.wrongMoveCount) window.wrongMoveCount = {};
                if (!window.wrongMoveCount[currentPuzzleIndex]) window.wrongMoveCount[currentPuzzleIndex] = 0;
                window.wrongMoveCount[currentPuzzleIndex]++;

                console.log(`Wrong move count for puzzle ${currentPuzzleIndex}: ${window.wrongMoveCount[currentPuzzleIndex]}`);

                updateMessage('Incorrect move. Try again.', 'bad');
                showWrongMoveAnimation();
                return;
            }
        }

        // Special handling for puzzle 8
        if (puzzleIndex === 7) {
            console.log(`Puzzle 8 player move attempt: ${from}${to}`);
            console.log(`Current lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}`);

            // Use the validation function for more reliable validation
            if (validatePuzzle8Move(from, to, lastPuzzleMoveIndex)) {
                console.log(`CORRECT! Player made the expected move ${from}${to}`);

                // Make the move on the board immediately
                movePiece(normalizedFrom, normalizedTo);

                // Increment the move index for the computer's response
                lastPuzzleMoveIndex++;

                // Check if we've reached the end of the puzzle
                if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                    console.log("Puzzle 8 completed!");
                    updateMessage(`<p>Checkmate!</p><p>Brilliant rook maneuver!</p>`, 'good');
                    puzzle_solved = true;

                    // Auto advance to next puzzle
                    showCongratulations(true);
                    return;
                }

                // If more moves remain, make the computer's move after a slight delay
                setTimeout(() => {
                    // Get the next computer move from the moves array
                    const nextComputerMove = currentPuzzle.moves[lastPuzzleMoveIndex];
                    console.log(`Next computer move: ${nextComputerMove}`);

                    if (nextComputerMove) {
                        const computerFrom = nextComputerMove.substring(0, 2);
                        const computerTo = nextComputerMove.substring(2, 4);

                        // Check if this is a promotion move
                        let computerPromote = null;
                        if (nextComputerMove.length > 4) {
                            computerPromote = nextComputerMove.substring(4, 5);
                            console.log(`Computer promotion move: ${computerPromote}`);
                        }

                        console.log(`Computer moving from ${computerFrom} to ${computerTo} with promotion: ${computerPromote}`);

                        // Execute the computer move
                        computerMove(computerFrom, computerTo, computerPromote);

                        // Increment move index for the next player move
                        lastPuzzleMoveIndex++;

                        // Check if puzzle is solved after computer's move
                        if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                            console.log("Puzzle 8 completed after computer's move!");
                            updateMessage(`<p>Checkmate!</p><p>Brilliant rook maneuver!</p>`, 'good');
                            puzzle_solved = true;

                            // Auto advance to next puzzle
                            showCongratulations(true);
                        } else {
                            updateMessage(`<p>Good move!</p><p>Continue with the best move...</p>`);
                        }
                    } else {
                        console.error("No computer move found at index", lastPuzzleMoveIndex);
                    }
                }, 800);

                return;
            } else {
                console.log(`INCORRECT! Player made a wrong move ${from}${to}`);
                puzzleMoveBad(from, to);
                return;
            }
        }

        // Special handling for puzzle 9
        if (puzzleIndex === 8) {
            console.log(`Puzzle 9 player move attempt: ${from}${to}`);
            console.log(`Current lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}`);

            // Use the validation function for more reliable validation
            if (validatePuzzle9Move(from, to, lastPuzzleMoveIndex)) {
                console.log(`CORRECT! Player made the expected move ${from}${to}`);

                // Make the move on the board immediately
                movePiece(normalizedFrom, normalizedTo);

                // Increment the move index for the computer's response
                lastPuzzleMoveIndex++;

                // Check if we've reached the end of the puzzle
                if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                    console.log("Puzzle 9 completed!");
                    updateMessage(`<p>Checkmate!</p><p>Brilliant bishop maneuver!</p>`, 'good');
                    puzzle_solved = true;

                    // Auto advance to next puzzle
                    showCongratulations(true);
                    return;
                }

                // If more moves remain, make the computer's move after a slight delay
                setTimeout(() => {
                    // Get the next computer move from the moves array
                    const nextComputerMove = currentPuzzle.moves[lastPuzzleMoveIndex];
                    console.log(`Next computer move: ${nextComputerMove}`);

                    if (nextComputerMove) {
                        const computerFrom = nextComputerMove.substring(0, 2);
                        const computerTo = nextComputerMove.substring(2, 4);

                        // Check if this is a promotion move
                        let computerPromote = null;
                        if (nextComputerMove.length > 4) {
                            computerPromote = nextComputerMove.substring(4, 5);
                            console.log(`Computer promotion move: ${computerPromote}`);
                        }

                        console.log(`Computer moving from ${computerFrom} to ${computerTo} with promotion: ${computerPromote}`);

                        // Execute the computer move
                        computerMove(computerFrom, computerTo, computerPromote);

                        // Increment move index for the next player move
                        lastPuzzleMoveIndex++;

                        // Check if puzzle is solved after computer's move
                        if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                            console.log("Puzzle 9 completed after computer's move!");
                            updateMessage(`<p>Checkmate!</p><p>Brilliant bishop maneuver!</p>`, 'good');
                            puzzle_solved = true;

                            // Auto advance to next puzzle
                            showCongratulations(true);
                        } else {
                            // Provide feedback to indicate player's next move
                            updateMessage('<p>Good move! Now continue with your next move...</p>');
                        }
                    }
                }, 500); // 0.5 second delay for the computer move

                // Provide immediate feedback after player's move
                updateMessage('<p>Good move! Wait for computer response...</p>');
                return;
            } else {
                console.log(`INCORRECT move for puzzle 9. Got: ${from}${to}`);

                // Increment wrong move counter
                if (!window.wrongMoveCount) window.wrongMoveCount = {};
                if (!window.wrongMoveCount[currentPuzzleIndex]) window.wrongMoveCount[currentPuzzleIndex] = 0;
                window.wrongMoveCount[currentPuzzleIndex]++;

                console.log(`Wrong move count for puzzle ${currentPuzzleIndex}: ${window.wrongMoveCount[currentPuzzleIndex]}`);

                updateMessage('Incorrect move. Try again.', 'bad');
                showWrongMoveAnimation();
                return;
            }
        }

        // Special handling for puzzle 10
        if (puzzleIndex === 9) {
            console.log(`Puzzle 10 player move attempt: ${from}${to}`);
            console.log(`Current lastPuzzleMoveIndex: ${lastPuzzleMoveIndex}`);

            // Use the validation function for more reliable validation
            if (validatePuzzle10Move(from, to, lastPuzzleMoveIndex)) {
                console.log(`CORRECT! Player made the expected move ${from}${to}`);

                // Make the move on the board immediately
                movePiece(normalizedFrom, normalizedTo);

                // Increment the move index for the computer's response
                lastPuzzleMoveIndex++;

                // Check if we've reached the end of the puzzle
                if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                    console.log("Puzzle 10 completed!");
                    updateMessage(`<p>Checkmate!</p><p>Brilliant mate in two!</p>`, 'good');
                    puzzle_solved = true;

                    // Show congratulations as this is the last puzzle
                    showCongratulations(false);
                    return;
                }

                // If more moves remain, make the computer's move after a slight delay
                setTimeout(() => {
                    // Get the next computer move from the moves array
                    const nextComputerMove = currentPuzzle.moves[lastPuzzleMoveIndex];
                    console.log(`Next computer move: ${nextComputerMove}`);

                    if (nextComputerMove) {
                        const computerFrom = nextComputerMove.substring(0, 2);
                        const computerTo = nextComputerMove.substring(2, 4);

                        // Check if this is a promotion move
                        let computerPromote = null;
                        if (nextComputerMove.length > 4) {
                            computerPromote = nextComputerMove.substring(4, 5);
                            console.log(`Computer promotion move: ${computerPromote}`);
                        }

                        console.log(`Computer moving from ${computerFrom} to ${computerTo} with promotion: ${computerPromote}`);

                        // Execute the computer move
                        computerMove(computerFrom, computerTo, computerPromote);

                        // Increment move index for the next player move
                        lastPuzzleMoveIndex++;

                        // Check if puzzle is solved after computer's move
                        if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                            console.log("Puzzle 10 completed after computer's move!");
                            updateMessage(`<p>Checkmate!</p><p>Brilliant mate in two!</p>`, 'good');
                            puzzle_solved = true;

                            // Show congratulations as this is the last puzzle
                            showCongratulations(false);
                        } else {
                            // Provide feedback to indicate player's next move
                            updateMessage('<p>Good move! Now continue with your next move...</p>');
                        }
                    }
                }, 500); // 0.5 second delay for the computer move

                // Provide immediate feedback after player's move
                updateMessage('<p>Good move! Wait for computer response...</p>');
                return;
            } else {
                console.log(`INCORRECT move for puzzle 10. Got: ${from}${to}`);

                // Increment wrong move counter
                if (!window.wrongMoveCount) window.wrongMoveCount = {};
                if (!window.wrongMoveCount[currentPuzzleIndex]) window.wrongMoveCount[currentPuzzleIndex] = 0;
                window.wrongMoveCount[currentPuzzleIndex]++;

                console.log(`Wrong move count for puzzle ${currentPuzzleIndex}: ${window.wrongMoveCount[currentPuzzleIndex]}`);

                updateMessage('Incorrect move. Try again.', 'bad');
                showWrongMoveAnimation();
                return;
            }
        }

        // For other puzzles, proceed with normal move validation
        try {
            const expectedMove = currentPuzzle.moves[lastPuzzleMoveIndex];
            console.log("Expected move:", expectedMove);
            console.log("Player's move:", `${from}${to}`);

            // Check if the move results in checkmate or is the expected move
            if (isCheckmate || expectedMove === `${from}${to}`) {
                console.log("Correct move detected!");
                puzzleMoveGood(from, to);
            } else {
                console.log(`Incorrect move: Expected '${expectedMove}', got '${from}${to}'`);
                puzzleMoveBad(from, to);
            }
        } catch (error) {
            console.error("Error in playerMove:", error);
            updateMessage('<p>Please try a different move.</p>');
        }
    } catch (error) {
        console.error("Error in playerMove:", error);
        updateMessage('<p>Please try a different move.</p>');
    }
}

function puzzleMoveGood(from, to) {
    try {
        // Make the move on the board
        movePiece(from, to);

        // Increment move index
        lastPuzzleMoveIndex++;

        // Add a slight delay before checking if puzzle is complete
        setTimeout(() => {
            // Check if puzzle is solved
            if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                console.log("Puzzle solved! All required moves completed.");
                updateMessage('<p>Correct!</p><p>Puzzle solved!</p>', 'good');

                // Mark puzzle as solved
                puzzle_solved = true;

                // Update the puzzle button to green
                const puzzleBtn = document.querySelector(`.puzzle-btn:nth-child(${currentPuzzleIndex})`);
                if (puzzleBtn) {
                    puzzleBtn.style.backgroundColor = '#4CAF50'; // Green for success
                    puzzleBtn.style.color = 'white';
                }

                // Show congratulations and advance to next puzzle
                showCongratulations(true);

                return;
            }

            // If puzzle isn't completely solved yet, make the computer's move
            const nextComputerMove = currentPuzzle.moves[lastPuzzleMoveIndex];

            if (nextComputerMove) {
                const computerFrom = nextComputerMove.substring(0, 2);
                const computerTo = nextComputerMove.substring(2, 4);

                setTimeout(() => {
                    try {
                        // Make computer's move
                        computerMove(computerFrom, computerTo);

                        // Increment move index again
                        lastPuzzleMoveIndex++;

                        // Check if puzzle is now solved after computer's move
                        if (lastPuzzleMoveIndex >= currentPuzzle.moves.length) {
                            console.log("Puzzle solved after computer's move!");
                            updateMessage('<p>Correct!</p><p>Puzzle solved!</p>', 'good');

                            // Mark puzzle as solved
                            puzzle_solved = true;

                            // Update the puzzle button to green
                            const puzzleBtn = document.querySelector(`.puzzle-btn:nth-child(${currentPuzzleIndex})`);
                            if (puzzleBtn) {
                                puzzleBtn.style.backgroundColor = '#4CAF50'; // Green for success
                                puzzleBtn.style.color = 'white';
                            }

                            // Show congratulations and advance to next puzzle
                            showCongratulations(true);
                        } else {
                            updateMessage('<p>Good move!</p><p>Keep going...</p>');
                        }
                    } catch (error) {
                        console.error("Error making computer's move:", error);
                    }
                }, speed);
            }
        }, 300);
    } catch (error) {
        console.error("Error in puzzleMoveGood:", error);
    }
}

function puzzleMoveBad(from, to) {
    // Don't show wrong move if the puzzle is already solved
    if (puzzle_solved) {
        console.log("Puzzle already solved, ignoring bad move");
        return;
    }

    // Check if the move resulted in checkmate - if so, treat as correct
    game.move(from, to);
    const newStatus = game.exportJson();
    const isCheckmate = newStatus.isFinished && newStatus.checkMate;

    // If move resulted in checkmate, handle as a good move instead
    if (isCheckmate) {
        console.log("Move resulted in checkmate, treating as correct!");
        game = new Game(currentFEN); // Reset to before the move
        currentStatus = game.exportJson();
        puzzleMoveGood(from, to); // Process as a good move
        return;
    }

    // Reset the game state before continuing with bad move handling
    game = new Game(currentFEN);
    currentStatus = game.exportJson();

    console.log("Wrong move detected");
    const backupStatus = currentFEN;
    const backupPrevious = document.querySelectorAll('.previous');
    movePiece(from, to);
    updateMessage('Incorrect move. Moving to next puzzle...', 'bad');
    puzzle_solved_clean = false;

    // Update the puzzle button to red for failed
    const puzzleBtn = document.querySelector(`.puzzle-btn:nth-child(${currentPuzzleIndex})`);
    if (puzzleBtn) {
        puzzleBtn.style.backgroundColor = '#FF6347'; // Red for failed
        puzzleBtn.style.color = 'white';
    }

    // Show wrong move animation with big red X
    showWrongMoveAnimation();

    // Calculate rating change for incorrect move
    calculateRatingChange(currentPuzzle.rating, false);

    // Move to the next puzzle after a delay
    setTimeout(() => {
        // Load backup state for a moment so the user can see what happened
        loadFen(backupStatus);
        backupPrevious.forEach(element => {
            element.classList.add('previous');
        });

        // Move to the next puzzle after showing the error
        setTimeout(() => {
            puzzleIndex++;
            if (puzzleIndex < customPuzzles.length) {
                // Load the next puzzle
                loadCustomPuzzle(puzzleIndex);
            } else {
                // All puzzles completed
                updateMessage('<p>All puzzles attempted!</p><p>Try again to improve your score.</p>', 'good');
                document.getElementById('custom-puzzles-button').disabled = false;
            }
        }, 2000);
    }, 500);
}

// Function to show wrong move animation with a big red X
function showWrongMoveAnimation() {
    // Don't show wrong move animation if puzzle is solved (checkmate achieved)
    if (puzzle_solved) {
        console.log("Puzzle already solved, not showing wrong move animation");
        return;
    }

    // Create overlay for the wrong move animation
    const overlay = document.createElement('div');
    overlay.id = 'wrong-move-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease-in-out';

    // Create the X symbol
    const xSymbol = document.createElement('div');
    xSymbol.style.fontSize = '150px';
    xSymbol.style.fontWeight = 'bold';
    xSymbol.style.color = 'red';
    xSymbol.style.textShadow = '0 0 20px rgba(0, 0, 0, 0.7)';
    xSymbol.innerHTML = '&#10006;'; // X symbol
    xSymbol.style.transform = 'scale(0.5)';
    xSymbol.style.transition = 'transform 0.5s ease-in-out';

    overlay.appendChild(xSymbol);
    document.body.appendChild(overlay);

    // Animate the overlay and X
    setTimeout(() => {
        overlay.style.opacity = '1';
        xSymbol.style.transform = 'scale(1.5)';

        // Fade out after showing
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }, 1500);
    }, 10);
}

function movePiece(from, to, promote = null) {
    console.log(`Moving piece from ${from} to ${to} with promotion: ${promote}`);

    try {
        // Normalize input for consistent handling
        const normalizedFrom = from.toLowerCase();
        const normalizedTo = to.toLowerCase();

        // Special handling for puzzles 7-10 to ensure proper state preservation
        if (puzzleIndex >= 6 && puzzleIndex <= 9) {
            console.log(`Special handling for puzzle ${puzzleIndex + 1}`);
            // Save the current state so we can restore it if needed
            const backupFEN = currentFEN;

            try {
                // Handle promotion moves correctly based on whose turn it is
                if (promote) {
                    console.log(`This is a promotion move to ${promote}`);
                    // For promotion moves, we need to use the proper format
                    const promotionMove = `${normalizedFrom}${normalizedTo}${promote}`;
                    console.log(`Making promotion move: ${promotionMove}`);
                    game.move(normalizedFrom, normalizedTo, promote);
                } else {
                    console.log(`Making regular move: ${normalizedFrom}${normalizedTo}`);
                    game.move(normalizedFrom, normalizedTo);
                }

                // Update current status
                currentStatus = game.exportJson();
                currentFEN = game.exportFEN();

                // Update the board display
                loadBoard(currentFEN);

                // Ensure the board is interactive after the move
                ensureBoardIsInteractive();

                return true;
            } catch (error) {
                console.error(`Error making move in puzzle ${puzzleIndex + 1}:`, error);

                // Restore the previous board state
                game = new Game(backupFEN);
                currentStatus = game.exportJson();
                currentFEN = backupFEN;
                loadBoard(currentFEN);

                console.log(`Restored board state to: ${backupFEN}`);
                return false;
            }
        }

        // Normal move handling for other puzzles
        game.move(normalizedFrom, normalizedTo, promote);
        currentStatus = game.exportJson();
        currentFEN = game.exportFEN();
        loadBoard(currentFEN);
        return true;
    } catch (error) {
        console.error("Error in movePiece:", error);
        return false;
    }
}

const loadRandomPuzzle = () => {
    console.log("Loading random puzzle");
    try {
        // Get a random puzzle from our custom puzzles
        const randomIndex = Math.floor(Math.random() * customPuzzles.length);
        const puzzle = customPuzzles[randomIndex];

        // Set up the puzzle
        currentPuzzle = puzzle;
        currentFEN = puzzle.fen;
        game = new Game(puzzle.fen);
        currentStatus = game.exportJson();

        // Load the board
        loadBoard(currentFEN);

        // Update message
        updateMessage(`<p>Random Puzzle ${randomIndex + 1}</p><p>Find the best move</p>`, '');

        // Make sure board is interactive
        ensureBoardIsInteractive();

        console.log("Random puzzle loaded successfully");
    } catch (error) {
        console.error("Error loading random puzzle:", error);
        updateMessage('<p>Error loading random puzzle. Please try again.</p>', 'bad');
    }
};

function updateMessage(text, type = '') {
    document.getElementById('message').className = type;
    document.getElementById('message').innerHTML = text;

    // Add extra space on top to position puzzle titles lower
    if (text.includes('Puzzle')) {
        document.getElementById('message').style.paddingTop = '20px';
    } else {
        document.getElementById('message').style.paddingTop = '';
    }
}

function loadFen(fen) {
    console.log("Loading FEN:", fen);
    try {
        if (validateFEN(fen)) {
            // First, completely clear the board
            clearAllPieces();

            // Create a completely new game instance with the FEN string
            game = new Game(fen);

            // Update our state variables
            currentFEN = fen;
            currentStatus = game.exportJson();
            console.log("Game status after loading FEN:", currentStatus);

            // Now load only the pieces specified in the FEN
            loadBoard(currentFEN);

            console.log("Board loaded with specified pieces only");
        } else {
            console.error('Invalid FEN:', fen);
            throw new Error('Invalid FEN');
        }
    } catch (error) {
        console.error("Error in loadFen:", error);
        // Fall back to starting position if there's an error
        const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        currentFEN = startingFen;
        game = new Game(startingFen);
        currentStatus = game.exportJson();
        loadBoard(currentFEN);
    }
}

function loadPuzzle(puzzle) {
    puzzle_solved = false;
    currentPuzzle = puzzle;
    loadFen(currentPuzzle.fen);
    if (currentStatus.turn === 'white') {
        updateMessage('<p>Find the best move for <u>black</u>.</p>');
        flipBoard(true);
    } else {
        updateMessage('<p>Find the best move for <u>white</u>.</p>');
        flipBoard(false);
    }
    computerMove(currentPuzzle.moves[0].substring(0, 2), currentPuzzle.moves[0].substring(2, 4));
    lastPuzzleMoveIndex = 0;

    updateGameInfo();
    updateDebug();

    // Start the timer if it's not already running
    if (!timerInterval) {
        startTimer();
    }
}

function enableNextPuzzle() {
    document.getElementById('message').addEventListener('click', loadRandomPuzzle);
    document.getElementById('message').classList.add('clickable');
}

function disableNextPuzzle() {
    document.getElementById('message').removeEventListener('click', loadRandomPuzzle);
}

function updateDebug() {
    document.getElementById('debug').innerHTML = `
    <strong>DEBUG INFO</strong>: 
    Puzzle ID: <a href="https://lichess.org/training/${currentPuzzle.puzzle_id}">${currentPuzzle.puzzle_id}</a> - 
    Puzzle Rating: ${currentPuzzle.rating} - 
    Player Rating: ${getLocalPlayerRating()} 
    `;
}

function updateGameInfo() {
    document.getElementById('game-info').innerHTML = `
    <em>Build v${game_version}</em><br>
    Current Rating: <strong>${getLocalPlayerRating()}</strong><br>
    `;
}

function initPuzzles(csvString) {
    const lines = csvString.split('\n');
    const puzzles = {};

    lines.forEach(line => {
        if (line.trim() !== '') {
            const [puzzle_id, fen, moves, rating] = line.split(',');
            const puzzle = { puzzle_id, fen, moves: moves.split(' '), rating };

            if (!puzzles[rating]) {
                puzzles[rating] = [];
            }

            puzzles[rating].push(puzzle);

            // if a puzzle id was specified via URL
            if (params.get('puzzle') === puzzle_id) {
                puzzles['param'] = puzzle;
            }
        }
    });

    return puzzles;
}

function calculateRatingChange(puzzleRating, solved) {
    const kFactor = 32; // K-factor determines the maximum rating change per game
    const playerWinProbability = 1 / (1 + Math.pow(10, (puzzleRating - getLocalPlayerRating()) / 400));

    const ratingChange = Math.round(kFactor * (solved ? 1 - playerWinProbability : 0 - playerWinProbability));

    storeLocalPlayerRating(getLocalPlayerRating() + ratingChange);
}

// Store the player's rating in localStorage, if available
function storeLocalPlayerRating(rating) {
    try {
        localStorage.setItem("quickChess4YouPlayerRating", rating);
    } catch (error) {
        console.error("Error storing player rating:", error);
    }
    playerRating = rating;
}

// Retrieve the player's rating from localStorage, if available
function getLocalPlayerRating() {
    try {
        const rating = localStorage.getItem("quickChess4YouPlayerRating");
        return rating ? parseInt(rating, 10) : 400;
    } catch (error) {
        console.error("Error retrieving player rating:", error);
        return playerRating;
    }
}

function getURLSearchParams() {
    // Get the full URL (Example: https://puzzlechess.ca/?puzzle=123456)
    const url = new URL(window.location.href);

    // Access the URLSearchParams object
    return new URLSearchParams(url.search);
}

function displayRandomChessFact() {
    const factElement = document.querySelector('.chess-fact');
    if (factElement) {
        const randomIndex = Math.floor(Math.random() * chessFacts.length);
        factElement.textContent = chessFacts[randomIndex];
    }
}

// Function to show congratulations and progress to next puzzle
function showCongratulations(advanceToNext = true) {
    // Display congratulations message
    const congratsElem = document.getElementById('congrats-message');
    if (congratsElem) {
        congratsElem.style.display = 'block';
        setTimeout(() => {
            congratsElem.style.display = 'none';

            // Auto advance to next puzzle if specified
            if (advanceToNext) {
                const nextPuzzleNumber = currentPuzzleIndex + 1;
                if (nextPuzzleNumber <= 10) {
                    console.log(`Auto-advancing to puzzle ${nextPuzzleNumber}`);
                    loadSpecificPuzzle(nextPuzzleNumber);
                } else {
                    updateMessage('<p>Congratulations!</p><p>You\'ve completed all puzzles!</p>', 'good');
                }
            }
        }, 3000);
    }

    // Play confetti effect
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Start the custom puzzle challenge with 10 puzzles and a timer
function startCustomPuzzleChallenge() {
    console.log("Starting custom puzzle challenge");
    puzzleIndex = 0; // Reset to first puzzle
    currentPuzzleIndex = 1; // Set to first puzzle

    try {
        // Load the first puzzle directly
        loadSpecificPuzzle(1);

        // Reset puzzle state
        puzzle_solved = false;
        lastPuzzleMoveIndex = 0;

        // Disable the start button
        const customPuzzlesButton = document.getElementById('custom-puzzles-button');
        if (customPuzzlesButton) {
            customPuzzlesButton.disabled = true;
        }

        // Update game info and debug
        updateGameInfo();
        updateDebug();

        // Make sure the board is oriented correctly
        if (currentStatus && currentStatus.turn === 'white') {
            flipBoard(false);
        } else if (currentStatus) {
            flipBoard(true);
        }

    } catch (error) {
        console.error("Error starting puzzle challenge:", error);
        // Fallback to try loading the first puzzle directly
        loadSpecificPuzzle(1);
    }
}

// Function to completely clear all pieces from the board
function clearAllPieces() {
    console.log("Clearing all pieces from the board");

    try {
        const board = document.getElementById('board');
        if (!board) {
            console.error("Board element not found!");
            return;
        }

        const squares = board.querySelectorAll('div');
        if (squares.length === 0) {
            console.error("No squares found on the board!");
            return;
        }

        console.log(`Clearing ${squares.length} squares`);

        // Remove all piece classes from each square
        squares.forEach(square => {
            // Clear all classes first
            const squareId = square.id;
            const squareClasses = [...square.classList];

            // Remove each piece class individually
            pieces.forEach(piece => {
                if (square.classList.contains(piece)) {
                    console.log(`Removing ${piece} from ${squareId}`);
                    square.classList.remove(piece);
                }
            });

            // As a fallback, reset all classes completely
            if (squareClasses.some(cls => pieces.includes(cls))) {
                const originalClasses = square.className;
                square.className = ''; // Clear all classes
                console.log(`Reset all classes on ${squareId} from "${originalClasses}" to ""`);
            }

            // Ensure each square has a span element
            if (!square.querySelector('span')) {
                const span = document.createElement('span');
                square.appendChild(span);
                console.log(`Added missing span to ${squareId}`);
            }
        });

        console.log("Board completely cleared of all pieces");
    } catch (error) {
        console.error("Error in clearAllPieces:", error);
    }
}

// Load a custom puzzle by index
function loadCustomPuzzle(index) {
    console.log("Loading custom puzzle", index);
    if (index >= customPuzzles.length) {
        updateMessage('<p>Challenge completed!</p><p>All 10 puzzles finished!</p>', 'good');
        stopTimer();
        document.getElementById('custom-puzzles-button').disabled = false;
        return;
    }

    // Special case for puzzle 7
    if (index === 6) {
        setupPuzzle7();
        return;
    }

    // Special case for puzzle 8
    if (index === 7) {
        setupPuzzle8();
        return;
    }

    // Special case for puzzle 9
    if (index === 8) {
        setupPuzzle9();
        return;
    }

    // Special case for puzzle 10
    if (index === 9) {
        setupPuzzle10();
        return;
    }

    // Reset puzzle state
    puzzle_solved = false;
    lastPuzzleMoveIndex = 0; // Reset move index to start

    currentPuzzle = customPuzzles[index];

    // Debug the puzzle being loaded
    console.log("Current puzzle:", currentPuzzle);
    console.log("Puzzle FEN:", currentPuzzle.fen);
    console.log("Puzzle moves:", JSON.stringify(currentPuzzle.moves));
    console.log(`Initial lastPuzzleMoveIndex value: ${lastPuzzleMoveIndex}`);

    try {
        // First clear all pieces
        clearAllPieces();

        // Create a new game instance with the FEN
        game = new Game(currentPuzzle.fen);
        currentStatus = game.exportJson();
        currentFEN = currentPuzzle.fen;

        // Load the board with the puzzle FEN
        loadBoard(currentFEN);

        // Prepare puzzle descriptions
        const puzzleDescriptions = [
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "Black to play"
        ];

        const puzzleTitles = [
            "Puzzle 1",
            "Puzzle 2",
            "Puzzle 3",
            "Puzzle 4",
            "Puzzle 5",
            "Puzzle 6",
            "Puzzle 7",
            "Puzzle 8",
            "Puzzle 9",
            "Puzzle 10"
        ];

        // Update puzzle message
        updateMessage(`<p>${puzzleTitles[index]}</p><p>Your Move: ${puzzleDescriptions[index]}</p>`, '');

        // Flip the board based on whose turn it is
        if (currentStatus.turn === 'white') {
            flipBoard(false);
        } else {
            flipBoard(true);
        }

        // Highlight the current puzzle button
        highlightCurrentPuzzleButton(index);

        // Note: We no longer start the timer here since it should already be running
        // The timer is started only once after the user submits their information

        // Update game info and debug
        updateGameInfo();
        updateDebug();

    } catch (error) {
        console.error("Error loading puzzle:", error);
        // Try to load the next puzzle
        puzzleIndex++;
        loadCustomPuzzle(puzzleIndex);
    }
}

// Function to start the timer
function startTimer() {
    // Only initialize time to 10 minutes (600 seconds) if not already running
    if (typeof timeRemaining === 'undefined' || timeRemaining <= 0) {
        timeRemaining = 600;
    }

    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Update display immediately
    updateTimerDisplay();

    // Start countdown
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            // Stop the timer when time is up
            stopTimer();
            // End the puzzle
            handleTimeUp();
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Update the timer display element
    const timerDisplay = document.querySelector('.timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = formattedTime;

        // Update timer color based on time remaining
        timerDisplay.classList.remove('warning', 'critical');

        if (timeRemaining <= 60) { // Last minute
            timerDisplay.classList.add('warning');
        }

        if (timeRemaining <= 10) { // Last 10 seconds
            timerDisplay.classList.remove('warning');
            timerDisplay.classList.add('critical');
        }
    }
}

// Handle when time runs out
function handleTimeUp() {
    // Show message that time is up
    updateMessage('Time is up! Your puzzle session has ended.', 'bad');

    // Disable board interaction
    const board = document.getElementById('board');
    if (board) {
        // Remove event listeners or add a class to indicate game over
        board.classList.add('game-over');
    }

    // Show timeout animation/message
    showTimeoutAnimation();
}

// Show timeout animation
function showTimeoutAnimation() {
    const timeoutMessage = document.createElement('div');
    timeoutMessage.id = 'timeout-message';
    timeoutMessage.innerHTML = `
        <h2>Time's Up!</h2>
        <p>Your 10-minute puzzle session has ended.</p>
        <button id="restart-btn">Try Again</button>
    `;

    document.body.appendChild(timeoutMessage);

    // Add event listener to restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // Remove the timeout message
            timeoutMessage.remove();

            // Reset and start a new puzzle session
            startTimer();
            loadRandomPuzzle();
        });
    }
}

// Function to fetch puzzles with fallback
function fetchPuzzlesWithFallback() {
    console.log("Fetching puzzles with fallback");
    try {
        // Use our custom puzzles directly
        puzzles = {};
        customPuzzles.forEach((puzzle, index) => {
            puzzles[index + 1] = puzzle;
        });

        console.log("Loaded custom puzzles successfully");

        // Initialize the board with the first puzzle
        if (customPuzzles.length > 0) {
            const firstPuzzle = customPuzzles[0];
            currentPuzzle = firstPuzzle;
            currentFEN = firstPuzzle.fen;
            game = new Game(firstPuzzle.fen);
            currentStatus = game.exportJson();
            loadBoard(currentFEN);
            console.log("Initialized board with first puzzle");
        }
    } catch (error) {
        console.error("Error loading puzzles:", error);
        // If there's an error, show a message to the user
        updateMessage('<p>Error loading puzzles. Please refresh the page.</p>', 'bad');
    }
}

const squareClicked = (square) => {
    console.log(`${square.id} was clicked!`);

    if (puzzle_solved) {
        console.log("Puzzle already solved, ignoring click");
        return;
    }

    // You may be tempted to refactor, but why?
    // unselectAll is catching **edge case** for multiple selected squares
    // you still need to unselect the selected square, if user wants to undo selection
    if (square.classList.contains('selected')) {
        console.log("Unselecting selected square");
        unselectAll();
    } else if (square.classList.contains('circle')) {
        console.log("Moving to highlighted square");
        const selected = document.querySelector('.selected');
        if (selected) {
            console.log("Found selected piece:", selected.id);
            unselectAll();
            playerMove(selected.id, square.id);
        } else {
            console.error("No selected piece found!");
        }
    } else {
        console.log("Checking if square contains a piece");
        unselectAll();

        let containsPiece = false;
        for (let i = 0; i < pieces.length; i++) {
            if (square.classList.contains(pieces[i])) {
                containsPiece = true;
                console.log(`Square contains piece: ${pieces[i]}`);
                break;
            }
        }

        // only add selected if piece exists
        if (containsPiece) {
            console.log("Selecting piece");
            selectPiece(square);
        } else {
            console.log("No piece to select");
        }
    }
};

// This function helps ensure we're ready to play
function forceCustomPuzzleStart() {
    console.log("Forcing custom puzzle start");

    try {
        // Clear the UI and reset state
        console.log("Clearing board for fresh start");
        clearAllPieces();
        puzzleIndex = 0;
        puzzle_solved = false;
        lastPuzzleMoveIndex = 0;

        // Load the first puzzle
        console.log("Loading first puzzle");
        currentPuzzle = customPuzzles[puzzleIndex];

        // Initialize with the puzzle's FEN
        game = new Game(currentPuzzle.fen);
        currentStatus = game.exportJson();
        currentFEN = currentPuzzle.fen;

        console.log("Puzzle FEN:", currentFEN);
        console.log("Current turn:", currentStatus.turn);

        // Load the board with just the pieces in the FEN
        loadBoard(currentFEN);

        // Update message with puzzle info
        const puzzleTitles = [
            "Puzzle 1",
            "Puzzle 2",
            "Puzzle 3",
            "Puzzle 4",
            "Puzzle 5",
            "Puzzle 6",
            "Puzzle 7",
            "Puzzle 8",
            "Puzzle 9",
            "Puzzle 10"
        ];

        const puzzleDescriptions = [
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "White to play",
            "Black to play"
        ];

        updateMessage(`<p>${puzzleTitles[puzzleIndex]}</p><p>Your Move: ${puzzleDescriptions[puzzleIndex]}</p>`, '');

        // Flip the board based on whose turn it is
        if (currentStatus.turn === 'white') {
            flipBoard(false);
        } else {
            flipBoard(true);
        }

        // Show the user details popup to collect information before starting the timer
        showStartChallengePopup();

        // Update game info and debug
        updateGameInfo();
        updateDebug();

        // Highlight the current puzzle button
        highlightCurrentPuzzleButton(puzzleIndex);

        console.log("First puzzle loaded successfully");
    } catch (error) {
        console.error("Error forcing custom puzzle start:", error);
        // Silent error handling - don't display an error message to users
        puzzleIndex = 0;
        // Try to recover by restarting
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
}

// Function to load a specific puzzle by index
function loadSpecificPuzzle(index) {
    console.log(`Loading specific puzzle ${index}`);

    // Store color state of all puzzle buttons before loading new puzzle
    const puzzleButtons = document.querySelectorAll('.puzzle-btn');
    const buttonColorStates = [];

    puzzleButtons.forEach((button, i) => {
        buttonColorStates[i] = {
            backgroundColor: button.style.backgroundColor,
            color: button.style.color
        };
    });

    try {
        // Reset the wrong move counter for new puzzles
        if (!window.wrongMoveCount) {
            window.wrongMoveCount = {};
        }

        // Reset the puzzle state
        puzzle_solved = false;
        lastPuzzleMoveIndex = 0;

        // Validate index
        if (index < 1 || index > customPuzzles.length) {
            console.error(`Invalid puzzle index: ${index}`);
            updateMessage('<p>Invalid puzzle index</p>', 'bad');
            return;
        }

        // Set the puzzle index (0-based for array)
        puzzleIndex = index - 1;

        // Get the selected puzzle
        const puzzle = customPuzzles[puzzleIndex];
        if (!puzzle) {
            console.error(`Puzzle not found for index ${index}`);
            updateMessage('<p>Puzzle not found</p>', 'bad');
            return;
        }

        // Deep copy the puzzle to prevent issues
        currentPuzzle = JSON.parse(JSON.stringify(puzzle));

        console.log(`Loading puzzle ${index} with FEN: ${currentPuzzle.fen}`);

        // Create a new game with the puzzle FEN
        game = new Game(currentPuzzle.fen);
        currentStatus = game.exportJson();
        currentFEN = currentPuzzle.fen;

        // Load the board
        loadBoard(currentFEN);

        // Update message with puzzle info
        updateMessage(`<p>Puzzle ${index}: ${currentPuzzle.name || 'Chess Puzzle'}</p><p>${currentPuzzle.description || 'Find the best move'}</p>`, '');

        // Make sure board is oriented with white at the bottom (unless specified otherwise)
        flipBoard(false);

        // Highlight current puzzle button
        highlightCurrentPuzzleButton(index);

        // Ensure the board is interactive
        ensureBoardIsInteractive();

        // Update game info and debug
        updateGameInfo();
        updateDebug();

        console.log(`Puzzle ${index} loaded successfully`);

        // Restore color state of all puzzle buttons
        puzzleButtons.forEach((button, i) => {
            if (buttonColorStates[i].backgroundColor) {
                button.style.backgroundColor = buttonColorStates[i].backgroundColor;
                button.style.color = buttonColorStates[i].color;
            }
        });

    } catch (error) {
        console.error(`Error loading puzzle ${index}:`, error);
        updateMessage(`<p>Error loading puzzle ${index}. Please try again.</p>`, 'bad');
    }
}

// Function to highlight the current puzzle button
function highlightCurrentPuzzleButton(index) {
    console.log(`Highlighting puzzle button: ${index}`);

    // Update puzzle button highlight
    const puzzleButtons = document.querySelectorAll('.puzzle-btn');
    console.log(`Found ${puzzleButtons.length} puzzle buttons`);

    if (puzzleButtons.length === 0) {
        console.warn("No puzzle buttons found to highlight");
        return;
    }

    // Ensure index is within valid range
    if (index < 1 || index > puzzleButtons.length) {
        console.warn(`Invalid button index: ${index}. Valid range is 1-${puzzleButtons.length}`);
        index = Math.max(1, Math.min(index, puzzleButtons.length));
    }

    puzzleButtons.forEach((button, btnIndex) => {
        // btnIndex is 0-based, index is 1-based
        const buttonNumber = btnIndex + 1;

        // Don't change the background color of buttons that are already green or red
        const currentBgColor = button.style.backgroundColor;
        const isGreen = currentBgColor === '#4CAF50';
        const isRed = currentBgColor === '#FF6347';

        if (buttonNumber === index) {
            console.log(`  Activating button ${buttonNumber}`);
            button.classList.add('active');

            // Only change the border for this button if it's not already colored
            if (!isGreen && !isRed) {
                // Highlight with border but keep original background
                button.style.border = '2px solid yellow';
            }
        } else {
            button.classList.remove('active');

            // Remove the border from inactive buttons (but keep their colors)
            if (!isGreen && !isRed) {
                button.style.border = 'none';
            }
        }
    });

    // Also update global state
    currentPuzzleIndex = index;

    // Update the UI with current puzzle info
    const puzzleTitles = [
        "Puzzle 1: Queen Sacrifice Mate",
        "Puzzle 2: Knight Fork to Bishop Mate",
        "Puzzle 3: Queen Sacrifice to Bishop Mate",
        "Puzzle 4: Rook Sacrifice Mate in Two",
        "Puzzle 5: Multi-Variation Mate in Two",
        "Puzzle 6: Mate in Two (Black)",
        "Puzzle 7: Knight Dance to Checkmate",
        "Puzzle 8: Mate in Two with Multiple Lines",
        "Puzzle 9: Brilliant Checkmate Sequence",
        "Puzzle 10: Force Checkmate (Black)"
    ];

    const puzzleTitle = puzzleTitles[index - 1] || `Puzzle ${index}`;
    updateMessage(`<p>${puzzleTitle}</p>`, '');
}

// Add this function to update overall progress if tracking panel exists
function updateOverallProgress() {
    // Check if tracking panel exists
    if (!document.getElementById('puzzle-tracking-panel')) {
        console.log("Puzzle tracking panel not found, skipping progress update");
        return;
    }

    const indicators = document.querySelectorAll('[id^="puzzle-indicator-"]');
    if (indicators.length === 0) {
        console.log("No puzzle indicators found, skipping progress update");
        return;
    }

    let solvedCount = 0;

    indicators.forEach(indicator => {
        // Check the background color to determine if solved
        const bgColor = window.getComputedStyle(indicator).backgroundColor;
        if (bgColor === 'rgb(144, 238, 144)') { // #90EE90 Green
            solvedCount++;
        }
    });

    const overallProgress = document.getElementById('overall-progress');
    if (overallProgress) {
        overallProgress.textContent = `Solved: ${solvedCount}/${customPuzzles.length}`;
    }
}

// Function to manually validate moves for puzzle 7
function validatePuzzle7Move(from, to, moveIndex) {
    // Get the correct moves from the customPuzzles array
    const puzzle7 = customPuzzles[6]; // Index 6 is the 7th puzzle

    // Debug logging
    console.log(`Validating puzzle 7 move (index ${moveIndex}): ${from}${to}`);
    console.log(`Expected move: ${puzzle7.moves[moveIndex]}`);

    // Check if there's a move at this index
    if (moveIndex >= puzzle7.moves.length) {
        console.error(`Invalid moveIndex: ${moveIndex}, only ${puzzle7.moves.length} moves available`);
        return false;
    }

    // Get the expected move from the puzzle moves array
    const expectedMove = puzzle7.moves[moveIndex];

    // Extract the from and to squares from the expected move
    const expectedFrom = expectedMove.substring(0, 2);
    const expectedTo = expectedMove.substring(2, 4);

    // Normalize input to lowercase for flexible comparison
    const normalizedFrom = from.toLowerCase();
    let normalizedTo = to.toLowerCase();

    // For promotion moves, normalize the format
    if (moveIndex === 2) { // The promotion move
        // If user enters f7e8=n or f7e8n or similar
        if (normalizedTo.includes('=')) {
            const parts = normalizedTo.split('=');
            normalizedTo = parts[0];
        } else if (normalizedTo.length > 2) {
            // Format might be e8n, so extract just the square
            normalizedTo = normalizedTo.substring(0, 2);
        }

        // For the promotion move, we need to be more flexible
        if (normalizedFrom === 'f7' && normalizedTo === 'e8') {
            console.log("Promotion move detected - Knight promotion is correct!");
            return true;
        }
    }

    // Handle regular moves
    const normalizedExpectedFrom = expectedFrom.toLowerCase();
    const normalizedExpectedTo = expectedTo.toLowerCase();

    // Check if this is a promotion move from the expected move
    let isPromotion = false;
    let expectedPromote = null;

    if (expectedMove.length > 4) {
        isPromotion = true;
        expectedPromote = expectedMove.substring(4, 5).toLowerCase();
        console.log(`Expected promotion piece: ${expectedPromote}`);
    }

    // Check if the move matches the expected move
    const isCorrect = (normalizedFrom === normalizedExpectedFrom && normalizedTo === normalizedExpectedTo);

    console.log(`Move validation result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);

    return isCorrect;
}

// Function to validate moves for puzzle 8
function validatePuzzle8Move(from, to, moveIndex) {
    // Get the correct moves from the customPuzzles array
    const puzzle8 = customPuzzles[7]; // Index 7 is the 8th puzzle

    // Debug logging
    console.log(`Validating puzzle 8 move (index ${moveIndex}): ${from}${to}`);
    console.log(`Expected move: ${puzzle8.moves[moveIndex]}`);

    // Check if there's a move at this index
    if (moveIndex >= puzzle8.moves.length) {
        console.error(`Invalid moveIndex: ${moveIndex}, only ${puzzle8.moves.length} moves available`);
        return false;
    }

    // Normalize input to lowercase for flexible comparison
    const normalizedFrom = from.toLowerCase();
    const normalizedTo = to.toLowerCase();

    // Special handling for castling move (O-O-O)
    if (moveIndex === 0 &&
        ((normalizedFrom === 'e1' && normalizedTo === 'c1') ||
            (normalizedFrom === 'e1' && normalizedTo === 'g3') ||
            (normalizedFrom === 'g3' && normalizedTo === 'g7'))) {
        console.log("Valid first move detected - correct!");
        return true;
    }

    // Get the expected move from the puzzle moves array
    const expectedMove = puzzle8.moves[moveIndex];

    // Extract the from and to squares from the expected move
    const expectedFrom = expectedMove.substring(0, 2).toLowerCase();
    const expectedTo = expectedMove.substring(2, 4).toLowerCase();

    // Check if this is a promotion move
    let isPromotion = false;
    let expectedPromote = null;
    let actualPromote = null;

    if (expectedMove.length > 4) {
        isPromotion = true;
        expectedPromote = expectedMove.substring(4, 5).toLowerCase();
        console.log(`Expected promotion piece: ${expectedPromote}`);
    }

    // Check for promotion in the actual move
    if (typeof normalizedTo === 'string' && normalizedTo.includes('=')) {
        const parts = normalizedTo.split('=');
        if (parts.length > 1) {
            actualPromote = parts[1].toLowerCase();
            console.log(`Actual promotion piece: ${actualPromote}`);
        }
    }

    // Check if the move matches the expected move
    let isCorrect = (normalizedFrom === expectedFrom && normalizedTo === expectedTo);

    // If promotion is involved, check that too
    if (isPromotion) {
        isCorrect = isCorrect && (expectedPromote === actualPromote);
    }

    console.log(`Move validation result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);

    return isCorrect;
}

// Function to validate moves for puzzle 9
function validatePuzzle9Move(from, to, moveIndex) {
    // Get the correct moves from the customPuzzles array
    const puzzle9 = customPuzzles[8]; // Index 8 is the 9th puzzle

    // Debug logging
    console.log(`Validating puzzle 9 move (index ${moveIndex}): ${from}${to}`);
    console.log(`Expected move: ${puzzle9.moves[moveIndex]}`);

    // Check if there's a move at this index
    if (moveIndex >= puzzle9.moves.length) {
        console.error(`Invalid moveIndex: ${moveIndex}, only ${puzzle9.moves.length} moves available`);
        return false;
    }

    // Get the expected move from the puzzle moves array
    const expectedMove = puzzle9.moves[moveIndex];

    // Extract the from and to squares from the expected move
    const expectedFrom = expectedMove.substring(0, 2).toLowerCase();
    const expectedTo = expectedMove.substring(2, 4).toLowerCase();

    // Normalize input to lowercase for flexible comparison
    const normalizedFrom = from.toLowerCase();
    const normalizedTo = to.toLowerCase();

    // Check if this is a promotion move
    let isPromotion = false;
    let expectedPromote = null;
    let actualPromote = null;

    if (expectedMove.length > 4) {
        isPromotion = true;
        expectedPromote = expectedMove.substring(4, 5).toLowerCase();
        console.log(`Expected promotion piece: ${expectedPromote}`);
    }

    // Check for promotion in the actual move
    if (normalizedTo.length > 2) {
        const parts = normalizedTo.split('=');
        if (parts.length > 1) {
            actualPromote = parts[1].toLowerCase();
            console.log(`Actual promotion piece: ${actualPromote}`);
        }
    }

    // Check if the move matches the expected move
    let isCorrect = (normalizedFrom === expectedFrom && normalizedTo === expectedTo);

    // If promotion is involved, check that too
    if (isPromotion) {
        isCorrect = isCorrect && (expectedPromote === actualPromote);
    }

    console.log(`Move validation result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);

    return isCorrect;
}

// Function to validate moves for puzzle 10
function validatePuzzle10Move(from, to, moveIndex) {
    // Get the correct moves from the customPuzzles array
    const puzzle10 = customPuzzles[9]; // Index 9 is the 10th puzzle

    // Debug logging
    console.log(`Validating puzzle 10 move (index ${moveIndex}): ${from}${to}`);
    console.log(`Expected move: ${puzzle10.moves[moveIndex]}`);

    // Check if there's a move at this index
    if (moveIndex >= puzzle10.moves.length) {
        console.error(`Invalid moveIndex: ${moveIndex}, only ${puzzle10.moves.length} moves available`);
        return false;
    }

    // Get the expected move from the puzzle moves array
    const expectedMove = puzzle10.moves[moveIndex];

    // Extract the from and to squares from the expected move
    const expectedFrom = expectedMove.substring(0, 2);
    const expectedTo = expectedMove.substring(2, 4);

    // Normalize input to lowercase for flexible comparison
    const normalizedFrom = from.toLowerCase();
    const normalizedTo = to.toLowerCase();
    const normalizedExpectedFrom = expectedFrom.toLowerCase();
    const normalizedExpectedTo = expectedTo.toLowerCase();

    // Check if this is a promotion move
    let isPromotion = false;
    let expectedPromote = null;
    let actualPromote = null;

    if (expectedMove.length > 4) {
        isPromotion = true;
        expectedPromote = expectedMove.substring(4, 5).toLowerCase();
        console.log(`Expected promotion piece: ${expectedPromote}`);
    }

    // Check for promotion in the actual move
    if (normalizedTo.length > 2) {
        const parts = normalizedTo.split('=');
        if (parts.length > 1) {
            actualPromote = parts[1].toLowerCase();
            console.log(`Actual promotion piece: ${actualPromote}`);
        }
    }

    // Check if the move matches the expected move
    let isCorrect = (normalizedFrom === normalizedExpectedFrom && normalizedTo === normalizedExpectedTo);

    // If promotion is involved, check that too
    if (isPromotion) {
        isCorrect = isCorrect && (expectedPromote === actualPromote);
    }

    console.log(`Move validation result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);

    return isCorrect;
}

// Add a dedicated function to set up puzzle 7 properly
function setupPuzzle7() {
    console.log("Setting up puzzle 7 - Knight Dance to Checkmate");

    try {
        // Set the indices correctly
        puzzleIndex = 6; // Adjust this to 6 (0-based index for puzzle 7)
        currentPuzzleIndex = 7; // UI shows 7

        // Reset puzzle state
        puzzle_solved = false;
        lastPuzzleMoveIndex = 0;

        // Reset wrong move counter for this puzzle
        if (window.wrongMoveCount) {
            window.wrongMoveCount[currentPuzzleIndex] = 0;
        }

        console.log("Clearing the board for puzzle 7");
        // First clear all pieces from the board
        clearAllPieces();

        // Get puzzle 7 from customPuzzles array
        const puzzle7 = customPuzzles[6]; // Index 6 is the 7th puzzle

        // Create a new game with the puzzle 7 position from customPuzzles
        console.log("Creating game with FEN:", puzzle7.fen);
        game = new Game(puzzle7.fen);
        currentStatus = game.exportJson();
        currentFEN = puzzle7.fen;

        // Deep copy the puzzle to prevent issues
        currentPuzzle = JSON.parse(JSON.stringify(puzzle7));

        console.log("Loading board for puzzle 7");
        loadBoard(currentFEN);

        updateMessage('<p>Puzzle 7: Knight Dance to Checkmate</p><p>White to play: Find the forced mate sequence</p>', '');

        // Make sure board is oriented correctly
        flipBoard(false);

        // Highlight the current puzzle button
        highlightCurrentPuzzleButton(7);

        // Ensure the board is interactive
        ensureBoardIsInteractive();

        console.log("Puzzle 7 setup complete");
    } catch (error) {
        console.error("Error setting up puzzle 7:", error);

        // Try a basic recovery
        try {
            console.log("Attempting basic recovery for puzzle 7");
            clearAllPieces();
            const fallbackFen = customPuzzles[6].fen;
            game = new Game(fallbackFen);
            currentStatus = game.exportJson();
            currentFEN = fallbackFen;
            currentPuzzle = JSON.parse(JSON.stringify(customPuzzles[6]));

            loadBoard(currentFEN);
            updateMessage('<p>Puzzle 7: Knight Dance to Checkmate</p><p>White to play: Find the forced mate sequence</p>', '');
            flipBoard(false);
            currentPuzzleIndex = 7;
            highlightCurrentPuzzleButton(7);
            ensureBoardIsInteractive();
            console.log("Basic recovery for puzzle 7 complete");
        } catch (recoveryError) {
            console.error("Recovery failed for puzzle 7:", recoveryError);
            // Move to the next puzzle if there's an error
            console.log("Error in puzzle 7, advancing to puzzle 8");
            loadSpecificPuzzle(8);
        }
    }
}

// Function to set up puzzle 8
function setupPuzzle8() {
    console.log("Setting up puzzle 8 - Castling to Checkmate");
    try {
        // Update indices
        puzzleIndex = 7; // Adjust this to 7 (0-based index for puzzle 8)
        currentPuzzleIndex = 8; // UI shows 8

        // Reset puzzle state
        puzzle_solved = false;
        lastPuzzleMoveIndex = 0;

        // Reset wrong move counter for this puzzle
        if (window.wrongMoveCount) {
            window.wrongMoveCount[currentPuzzleIndex] = 0;
        }

        // First clear all pieces from the board
        clearAllPieces();

        // Get puzzle 8 from customPuzzles array
        const puzzle8 = customPuzzles[7]; // Index 7 is the 8th puzzle

        // Create a new game with the puzzle 8 position from customPuzzles
        console.log("Creating game with FEN:", puzzle8.fen);
        game = new Game(puzzle8.fen);
        currentStatus = game.exportJson();
        currentFEN = puzzle8.fen;

        // Deep copy the puzzle to prevent issues
        currentPuzzle = JSON.parse(JSON.stringify(puzzle8));

        // Load the board
        loadBoard(currentFEN);

        // Update message with puzzle info
        updateMessage('<p>Puzzle 8: Rook Maneuver to Checkmate</p><p>White to play: Find the winning sequence with the rook</p>', '');

        // Make sure board is oriented with white at the bottom
        flipBoard(false);

        // Highlight the current puzzle button
        highlightCurrentPuzzleButton(8);

        // Ensure the board is interactive
        ensureBoardIsInteractive();

        // Update game info and debug
        updateGameInfo();
        updateDebug();
        console.log("Puzzle 8 setup complete");

    } catch (error) {
        console.error("Error setting up puzzle 8:", error);
        // Try basic recovery
        try {
            // Use basic puzzle setup as fallback
            clearAllPieces();
            const fallbackFen = customPuzzles[7].fen;
            game = new Game(fallbackFen);
            currentStatus = game.exportJson();
            currentFEN = fallbackFen;
            currentPuzzle = JSON.parse(JSON.stringify(customPuzzles[7]));
            loadBoard(currentFEN);
            updateMessage('<p>Puzzle 8: Rook Maneuver to Checkmate</p><p>White to play: Find the winning sequence with the rook</p>', '');
            flipBoard(false);
            currentPuzzleIndex = 8;
            highlightCurrentPuzzleButton(8);
            ensureBoardIsInteractive();
            console.log("Basic recovery for puzzle 8 complete");
        } catch (recoveryError) {
            console.error("Recovery failed:", recoveryError);
            // Move to the next puzzle if there's an error
            console.log("Error in puzzle 8, advancing to puzzle 9");
            loadSpecificPuzzle(9);
        }
    }
}

// Function to set up puzzle 9
function setupPuzzle9() {
    console.log("Setting up puzzle 9 - Bishop's Journey to Checkmate");

    try {
        // Set the indices correctly
        puzzleIndex = 8; // Adjust this to 8 (0-based index for puzzle 9)
        currentPuzzleIndex = 9; // UI shows 9

        // Reset puzzle state
        puzzle_solved = false;
        lastPuzzleMoveIndex = 0;

        // Reset wrong move counter for this puzzle
        if (window.wrongMoveCount) {
            window.wrongMoveCount[currentPuzzleIndex] = 0;
        }

        console.log("Clearing the board for puzzle 9");
        // First clear all pieces from the board
        clearAllPieces();

        // Get puzzle 9 from customPuzzles array
        const puzzle9 = customPuzzles[8]; // Index 8 is the 9th puzzle

        // Create a new game with the puzzle 9 position from customPuzzles
        console.log("Creating game with FEN:", puzzle9.fen);
        game = new Game(puzzle9.fen);
        currentStatus = game.exportJson();
        currentFEN = puzzle9.fen;

        // Deep copy the puzzle to prevent issues
        currentPuzzle = JSON.parse(JSON.stringify(puzzle9));

        console.log("Loading board for puzzle 9");
        loadBoard(currentFEN);

        updateMessage('<p>Puzzle 9: Bishop\'s Journey to Checkmate</p><p>White to play: Find the winning sequence with the bishop</p>', '');

        // Make sure board is oriented correctly
        flipBoard(false);

        // Highlight the current puzzle button
        highlightCurrentPuzzleButton(9);

        // Ensure the board is interactive
        ensureBoardIsInteractive();

        console.log("Puzzle 9 setup complete");
    } catch (error) {
        console.error("Error setting up puzzle 9:", error);

        // Try a basic recovery
        try {
            console.log("Attempting basic recovery for puzzle 9");
            clearAllPieces();
            const fallbackFen = customPuzzles[8].fen;
            game = new Game(fallbackFen);
            currentStatus = game.exportJson();
            currentFEN = fallbackFen;
            currentPuzzle = JSON.parse(JSON.stringify(customPuzzles[8]));

            loadBoard(currentFEN);
            updateMessage('<p>Puzzle 9: Bishop\'s Journey to Checkmate</p><p>White to play: Find the winning sequence with the bishop</p>', '');
            flipBoard(false);
            currentPuzzleIndex = 9;
            highlightCurrentPuzzleButton(9);
            ensureBoardIsInteractive();
            console.log("Basic recovery for puzzle 9 complete");
        } catch (recoveryError) {
            console.error("Recovery failed for puzzle 9:", recoveryError);
            // Move to the next puzzle if there's an error
            console.log("Error in puzzle 9, advancing to puzzle 10");
            loadSpecificPuzzle(10);
        }
    }
}

// Function to set up puzzle 10
function setupPuzzle10() {
    console.log("Setting up puzzle 10 - Mate in Two with Multiple Variations");
    try {
        // Update indices
        puzzleIndex = 9; // Adjust this to 9 (0-based index for puzzle 10)
        currentPuzzleIndex = 10; // UI shows 10

        // Reset puzzle state
        puzzle_solved = false;
        lastPuzzleMoveIndex = 0;

        // Reset wrong move counter for this puzzle
        if (window.wrongMoveCount) {
            window.wrongMoveCount[currentPuzzleIndex] = 0;
        }

        // First clear all pieces from the board
        clearAllPieces();

        // Get puzzle 10 from customPuzzles array
        const puzzle10 = customPuzzles[9]; // Index 9 is the 10th puzzle

        // Create a new game with the puzzle 10 position from customPuzzles
        console.log("Creating game with FEN:", puzzle10.fen);
        game = new Game(puzzle10.fen);
        currentStatus = game.exportJson();
        currentFEN = puzzle10.fen;

        // Use the puzzle from customPuzzles
        currentPuzzle = JSON.parse(JSON.stringify(puzzle10));

        console.log("Loading board for puzzle 10");
        loadBoard(currentFEN);

        updateMessage('<p>Puzzle 10: Mate in Two with Multiple Variations</p><p>White to play: Find the winning sequence</p>', '');

        // Make sure board is oriented correctly
        flipBoard(false);

        // Highlight the current puzzle button
        highlightCurrentPuzzleButton(10);

        // Ensure the board is interactive
        ensureBoardIsInteractive();

        console.log("Puzzle 10 setup complete");
    } catch (error) {
        console.error("Error setting up puzzle 10:", error);
        // Try basic recovery
        try {
            // Use basic puzzle setup as fallback
            clearAllPieces();
            const fallbackFen = customPuzzles[9].fen;
            game = new Game(fallbackFen);
            currentStatus = game.exportJson();
            currentFEN = fallbackFen;
            currentPuzzle = JSON.parse(JSON.stringify(customPuzzles[9]));
            loadBoard(currentFEN);
            updateMessage('<p>Puzzle 10: Mate in Two with Multiple Variations</p><p>White to play: Find the winning sequence</p>', '');
            flipBoard(false);
            currentPuzzleIndex = 10;
            highlightCurrentPuzzleButton(10);
            ensureBoardIsInteractive();
            console.log("Basic recovery for puzzle 10 complete");
        } catch (recoveryError) {
            console.error("Recovery failed for puzzle 10:", recoveryError);
            // This is the last puzzle, show a message that all puzzles are complete
            updateMessage('<p>All puzzles completed!</p><p>You can try them again or explore other features.</p>', 'good');
        }
    }
}

// Add popup form when page loads/refreshes
document.addEventListener('DOMContentLoaded', function() {
    showStartChallengePopup();
});

function showStartChallengePopup() {
    console.log("Showing start challenge popup");

    // Create popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.classList.add('popup-overlay');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';
    popupOverlay.style.zIndex = '1000';

    // Create popup container
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
    popupContainer.style.backgroundColor = '#fff';
    popupContainer.style.padding = '20px';
    popupContainer.style.borderRadius = '5px';
    popupContainer.style.width = '350px';
    popupContainer.style.maxWidth = '90%';
    popupContainer.style.textAlign = 'center';

    // Create popup title
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = '10-Puzzle Challenge';
    popupTitle.style.marginBottom = '10px';
    popupTitle.style.color = '#333';

    // Create popup description
    const popupDescription = document.createElement('p');
    popupDescription.textContent = '10 minutes per puzzle. Complete all puzzles to win!';
    popupDescription.style.marginBottom = '20px';
    popupDescription.style.color = '#666';

    // Create form
    const form = document.createElement('form');
    form.id = 'challenge-form';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '15px';

    // Create name input
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Your Name:';
    nameLabel.style.textAlign = 'left';
    nameLabel.style.color = '#333';
    nameLabel.style.fontWeight = 'bold';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'player-name';
    nameInput.name = 'player-name';
    nameInput.required = true;
    nameInput.style.padding = '8px';
    nameInput.style.border = '1px solid #ddd';
    nameInput.style.borderRadius = '4px';
    nameInput.style.fontSize = '16px';

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Start Challenge';
    submitButton.style.backgroundColor = '#4CAF50';
    submitButton.style.color = 'white';
    submitButton.style.border = 'none';
    submitButton.style.padding = '10px';
    submitButton.style.borderRadius = '4px';
    submitButton.style.fontSize = '16px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.transition = 'background-color 0.3s';
    submitButton.addEventListener('mouseover', () => {
        submitButton.style.backgroundColor = '#45a049';
    });
    submitButton.addEventListener('mouseout', () => {
        submitButton.style.backgroundColor = '#4CAF50';
    });

    // Assemble the form
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(submitButton);

    // Assemble the popup
    popupContainer.appendChild(popupTitle);
    popupContainer.appendChild(popupDescription);
    popupContainer.appendChild(form);
    popupOverlay.appendChild(popupContainer);

    // Add the popup to the document
    document.body.appendChild(popupOverlay);

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const playerName = nameInput.value.trim();

        if (playerName) {
            // Store player information
            try {
                localStorage.setItem('puzzleChessPlayerName', playerName);
            } catch (error) {
                console.error("Error storing player info:", error);
            }

            // Remove the popup
            document.body.removeChild(popupOverlay);

            // Start the challenge
            startCustomPuzzleChallenge();

            // Start the timer
            console.log("Starting timer after form submission");
            startTimer();
        }
    });
}

// Create a hints panel on the right side
function createHintsPanel() {
    const hintsPanel = document.createElement('div');
    hintsPanel.id = 'hints-panel';
    hintsPanel.style.position = 'fixed';
    hintsPanel.style.right = '20px';
    hintsPanel.style.top = '50%';
    hintsPanel.style.transform = 'translateY(-50%)';
    hintsPanel.style.width = '300px';
    hintsPanel.style.padding = '20px';
    hintsPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    hintsPanel.style.borderRadius = '10px';
    hintsPanel.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    hintsPanel.style.zIndex = '100';

    // Create title for the hints panel
    const hintsTitle = document.createElement('h3');
    hintsTitle.textContent = 'Puzzle Hints';
    hintsTitle.style.marginTop = '0';
    hintsTitle.style.marginBottom = '15px';
    hintsTitle.style.color = '#333';
    hintsTitle.style.borderBottom = '2px solid #4CAF50';
    hintsTitle.style.paddingBottom = '10px';

    // Create content container for the hints
    const hintsContent = document.createElement('div');
    hintsContent.id = 'hints-content';
    hintsContent.style.fontSize = '16px';
    hintsContent.style.lineHeight = '1.5';
    hintsContent.style.color = '#444';

    // Add elements to the panel
    hintsPanel.appendChild(hintsTitle);
    hintsPanel.appendChild(hintsContent);

    // Add the panel to the page
    document.body.appendChild(hintsPanel);
}

// Function to update hints based on current puzzle
function updateHints(index) {
    const hintsContent = document.getElementById('hints-content');
    if (!hintsContent) return;

    const puzzleTitles = [
        "Puzzle 1: Queen Sacrifice Mate",
        "Puzzle 2: Knight Fork to Bishop Mate",
        "Puzzle 3: Queen Sacrifice to Bishop Mate",
        "Puzzle 4: Rook Sacrifice Mate in Two",
        "Puzzle 5: Multi-Variation Mate in Two",
        "Puzzle 6: Mate in Two (Black)",
        "Puzzle 7: Knight Dance to Checkmate",
        "Puzzle 8: Mate in Two with Multiple Lines",
        "Puzzle 9: Brilliant Checkmate Sequence",
        "Puzzle 10: Force Checkmate (Black)"
    ];

    const puzzleDescriptions = [
        "White to play: Find the checkmate in 2 moves",
        "White to play: Find the knight fork followed by a bishop checkmate",
        "White to play: Find the queen sacrifice followed by a bishop checkmate",
        "White to play: Find the forced checkmate in two moves with a rook sacrifice",
        "White to play: Find the brilliant Qb2! leading to forced mate (multiple variations)",
        "White to play: Find the brilliant Rf4! leading to forced mate in 2 moves (multiple variations)",
        "White to play: Start with Qd6+ and find the forced mate in 2 moves with a knight promotion",
        "White to play: Find the brilliant rook sacrifice leading to a knight promotion checkmate",
        "White to play: Find the brilliant sequence of moves leading to checkmate",
        "White to play: Find the forced mate in three moves"
    ];

    hintsContent.innerHTML = `
        <div style="margin-bottom: 15px;">
            <strong style="color:rgb(226, 195, 44); font-size: 18px;">${puzzleTitles[index]}</strong>
        </div>
        <div>
            <p style="margin: 0;">${puzzleDescriptions[index]}</p>
        </div>
    `;
}

function ensureBoardIsInteractive() {
    console.log("Ensuring board is interactive...");

    // Make sure each square has event listeners
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        // First remove any existing event listeners to avoid duplicates
        square.removeEventListener('click', squareClicked);

        // Then add a fresh event listener
        square.addEventListener('click', () => squareClicked(square.id));

        // Add visual cue for interactive squares
        square.classList.add('interactive');
    });

    // Style for interactive squares
    const style = document.createElement('style');
    style.innerHTML = `
        .square.interactive:hover {
            cursor: pointer;
            box-shadow: inset 0 0 5px rgba(0, 255, 0, 0.5);
        }
    `;

    // Remove any existing style with the same ID
    const existingStyle = document.getElementById('interactive-board-style');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Add the style element
    style.id = 'interactive-board-style';
    document.head.appendChild(style);

    console.log("Board interactivity enabled");
}