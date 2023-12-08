const confettiSettings = {
    target: 'confetti-canvas',
    max: 150,
    size: 2,
    animate: true,
    props: ['circle', 'square', 'triangle', 'line'],
    colors: [[255, 165, 0], [255, 69, 0], [255, 99, 71], [255, 127, 80]],
    rotate: false,
    start: null,
    spread: 45,
    duration: 3000,
    ticks: 200,
    shapes: null,
    origin: { x: 0.5, y: 0.5 },
    scalar: 1,
};

function displayWinner(message) {
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.textContent = message;

    if (message.includes('wins')) {
        // Trigger confetti effect
        const confettiCanvas = document.getElementById('confetti-canvas');
        confetti(confettiSettings);
    }
}

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateCell(index);
        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        } else if (isBoardFull()) {
            alert("It's a tie!");
            resetGame();
        } else {
            togglePlayer();
        }
    }
}

function updateCell(index) {
    const cell = document.getElementsByClassName('cell')[index];
    cell.textContent = currentPlayer;
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.textContent = '';
    }
}
