const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const aiToggle = document.getElementById('aiToggle');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;
let playAgainstAI = false;

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        statusDisplay.textContent = 'It\'s a draw!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        if (playAgainstAI && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500);
        }
    }
}

function makeAIMove() {
    let emptyCells = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
    let aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    document.querySelector(`.cell[data-index="${aiMove}"]`).click();
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = `Player X's turn`;
    createBoard();
}

aiToggle.addEventListener('click', () => {
    playAgainstAI = !playAgainstAI;
    aiToggle.textContent = playAgainstAI ? 'Playing Against Computer' : 'Play Against Computer';
    resetGame();
});

resetButton.addEventListener('click', resetGame);

createBoard();
