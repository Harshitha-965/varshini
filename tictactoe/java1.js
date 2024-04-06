let currentPlayer = "X";
let gameStatus = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameStatus[a] !== "" &&
      gameStatus[a] === gameStatus[b] &&
      gameStatus[a] === gameStatus[c]
    ) {
      highlightWinningCombo(combo); // Highlight winning combination
      return true;
    }
  }
  return false;
}

function highlightWinningCombo(combo) {
  for (const index of combo) {
    const cell = document.getElementsByClassName("cell")[index];
    cell.style.backgroundColor = "lightgreen";
  }
}

function resetGame() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player for next game
  gameStatus = ["", "", "", "", "", "", "", "", ""];
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].style.backgroundColor = "#fff"; // Reset cell background color
  }
  document.getElementById(
    "status"
  ).textContent = `Player ${currentPlayer}'s turn`;
  document.getElementById("canvas").style.display = "none";
//document.getElementById("canvas1").style.display = "none";
}


function cellClick(cellIndex) {
  if (gameStatus[cellIndex] === "" && !checkWinner()) {
    const cell = document.getElementsByClassName("cell")[cellIndex];
    cell.textContent = currentPlayer;
    gameStatus[cellIndex] = currentPlayer;
    if (checkWinner()) {
  document.getElementById("canvas").style.display = "block";
//document.getElementById("canvas1").style.display = "block";

      document.getElementById(
        "status"
      ).textContent = `Player ${currentPlayer} wins!`;       
    } else if (gameStatus.every((cell) => cell !== "")) {
      document.getElementById("status").textContent = "It's a draw!";
      setTimeout(() => {
        resetGame();
      }, 3500); // Delay to show draw message before resetting the game
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById(
        "status"
      ).textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}


