const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const gameContainer = document.getElementById('gameContainer');

// Stats Elements
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const drawsDisplay = document.getElementById('draws');
const totalGamesDisplay = document.getElementById('totalGames');

// Game State
let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameOver = false;

// Stats State
let xWins = 0;
let oWins = 0;
let draws = 0;
let totalGames = 0;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.addEventListener('click', handleMove);
    div.textContent = cell;
    board.appendChild(div);
  });
}

function handleMove(e) {
  const index = e.target.dataset.index;

  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameOver = true;
    if (currentPlayer === 'X') xWins++;
    else oWins++;
    totalGames++;
    updateStats();
    showResult(`🎉 Player ${currentPlayer} wins!`);
    return;
  }

  if (cells.every(cell => cell)) {
    gameOver = true;
    draws++;
    totalGames++;
    updateStats();
    showResult("😐 It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  gameContainer.style.display = 'none';
  resultScreen.style.display = 'flex';
}

function resetGame() {
  cells = Array(9).fill(null);
  gameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

function newGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  statusText.textContent = `Player X's turn`;
  createBoard();
  resultScreen.style.display = 'none';
  gameContainer.style.display = 'flex';
}

function updateStats() {
  xWinsDisplay.textContent = xWins;
  oWinsDisplay.textContent = oWins;
  drawsDisplay.textContent = draws;
  totalGamesDisplay.textContent = totalGames;
}

// Initialize game
createBoard();
