// Game constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const DIFFICULTY_EASY = 'Easy';
const DIFFICULTY_MEDIUM = 'Medium';
const DIFFICULTY_HARD = 'Hard';

// Game state
let currentPlayer;
let gameBoard;
let difficulty;

// Initialize the game
function initializeGame() {
  const difficultyButtons = document.querySelectorAll('.difficulty-button');
  difficultyButtons.forEach(button => {
    button.addEventListener('click', selectDifficulty);
  });

  const restartButton = document.querySelector('.restart-button');
  restartButton.addEventListener('click', startNewGame);

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  startNewGame();
}

// Start a new game
function startNewGame() {
  currentPlayer = '';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  difficulty = difficulty || DIFFICULTY_EASY;

  // Highlight the selected difficulty button
  const difficultyButtons = document.querySelectorAll('.difficulty-button');
  difficultyButtons.forEach(button => {
    button.classList.remove('selected');
    if (button.dataset.difficulty === difficulty) {
      button.classList.add('selected');
    }
  });

  randomlySelectFirstPlayer();
  updateBoard();
}

// Prompt the user to select the difficulty settings
function selectDifficulty() {
  difficulty = this.dataset.difficulty;

  // Highlight the selected difficulty button
  const difficultyButtons = document.querySelectorAll('.difficulty-button');
  difficultyButtons.forEach(button => {
    button.classList.remove('selected');
  });
  this.classList.add('selected');

  playGame();
}

// Handle cell click event
function handleCellClick(event) {
  const cellIndex = Array.from(event.target.parentNode.children).indexOf(event.target);

  if (gameBoard[cellIndex] !== '' || currentPlayer !== PLAYER_X) {
    return;
  }

  gameBoard[cellIndex] = PLAYER_X;
  currentPlayer = PLAYER_O;
  playGame();
}

// Play the game
function playGame() {
  updateBoard();

  if (checkWin()) {
    displayResult(`${currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X} wins!`);
    return;
  }

  if (checkTie()) {
    displayResult('It\'s a tie!');
    return;
  }

  if (currentPlayer === PLAYER_O) {
    makeComputerMove();
  }
}

// Make a move for the computer based on the selected difficulty
function makeComputerMove() {
  const move = getNextMove(gameBoard, difficulty);
  gameBoard[move] = PLAYER_O;
  currentPlayer = PLAYER_X;
  playGame();
}

// Function to determine the next move for the computer player
function getNextMove(board, difficulty) {
  switch (difficulty) {
    case DIFFICULTY_EASY:
      return getRandomEmptyCell(board);
    case DIFFICULTY_MEDIUM:
      return getMediumMove(board);
    case DIFFICULTY_HARD:
      return getHardMove(board);
    default:
      return getRandomEmptyCell(board);
  }
}

// Get a random empty cell on the game board
function getRandomEmptyCell(board) {
  const emptyCells = getEmptyCells(board);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Get an array of empty cells on the game board
function getEmptyCells(board) {
  return board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
}

// Get a medium difficulty move (simple AI logic)
function getMediumMove(board) {
  // Check if the computer can win in the next move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = PLAYER_O;
      if (checkWin()) {
        board[i] = ''; // Reset the move
        return i;
      }
      board[i] = ''; // Reset the move
    }
  }

  // Check if the player can win in the next move and block them
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = PLAYER_X;
      if (checkWin()) {
        board[i] = ''; // Reset the move
        return i;
      }
      board[i] = ''; // Reset the move
    }
  }

  // Otherwise, make a random move
  return getRandomEmptyCell(board);
}

// Get a hard difficulty move (Minimax algorithm)
function getHardMove(board) {
  let bestMove;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = PLAYER_O;
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  if (checkWin()) {
    return isMaximizing ? -1 : 1;
  }

  if (checkTie()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = PLAYER_O;
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = PLAYER_X;
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Update the game board with the current moves
function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
    cell.classList.remove('X', 'O');
    if (gameBoard[index] === PLAYER_X) {
      cell.classList.add('X');
    } else if (gameBoard[index] === PLAYER_O) {
      cell.classList.add('O');
    }
  });
}

// Check if there is a win condition on the game board
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

// Check if the game ends in a tie
function checkTie() {
  return gameBoard.every(cell => cell !== '');
}

// Display the result of the game to the user
function displayResult(result) {
  setTimeout(() => {
    alert(result);
    setTimeout(() => {
      startNewGame();
    }, 300);
  }, 300);
  
}

// Randomly select the first player
function randomlySelectFirstPlayer() {
  currentPlayer = Math.random() < 0.5 ? PLAYER_X : PLAYER_O;
  if (currentPlayer === PLAYER_O) {
    makeComputerMove();
  }
}

// Ensure the DOM is fully loaded before initializing the game
document.addEventListener('DOMContentLoaded', initializeGame);