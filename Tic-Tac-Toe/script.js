let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll(".cell");
const resultText = document.getElementById("result");

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;
    if (board[index] === "" && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWin()) {
        resultText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (board.every(cell => cell !== "")) {
        resultText.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        resultText.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  });
});

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  resultText.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = ""));
}
