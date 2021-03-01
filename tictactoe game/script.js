("use strict");

// DOM ELEMENTS
const startScreen = document.querySelector(".start-screen");
const mainScreen = document.querySelector(".main-screen");
const btnX = document.querySelector(".btn-player-X");
const btnO = document.querySelector(".btn-player-O");
const btnRestart = document.querySelector(".game--restart");
const btnPrevious = document.querySelector(".game--previous");
const historyBtn = document.querySelector(".game--history");
const btnNext = document.querySelector(".game--next");
const cell = document.querySelectorAll(".cell");
const gameHeading = document.querySelector(".game--title");

// NEWWW
// VARIABLES
const statusDisplay = document.querySelector(".game--status");
let gameActive = true;
var currentPlayer;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = [];

// BUTTONS X AND O IN START SCREEN
btnX.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  currentPlayer = "X";
  statusDisplay.innerHTML = currentPlayerTurn();
});
btnO.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  currentPlayer = "O";
  statusDisplay.innerHTML = currentPlayerTurn();
});

// DROPPING MARKERS
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(`${currentPlayer}`);
  board.push(`${currentPlayer}`);
}

// CHANGING PLAYERS
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

// CHECKING THE WINNER AND DRAW
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    btnRestart.classList.remove("hidden");
    historyBtn.classList.remove("hidden");
    btnNext.classList.add("hidden");
    return;
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    btnRestart.classList.remove("hidden");
    historyBtn.classList.remove("hidden");
    btnNext.classList.add("hidden");
    return;
  }

  handlePlayerChange();
}

// CHECKING IF CELL IS ALREADY CLICKED
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // ------------------------------TESTING
  newArray.push(clickedCellIndex);

  // ------------------------------TESTING

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

// RESTART GAME
function handleRestartGame() {
  gameActive = true;
  currentPlayer = null;
  gameState = ["", "", "", "", "", "", "", "", ""];
  newArray = [];
  moves = 0;
  newArrayLength = 0;
  arrayMinusMoves = 0;
  board = [];
  statusDisplay.innerHTML = currentPlayerTurn();
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.classList.remove("X"));
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.classList.remove("O"));
  mainScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  btnRestart.classList.add("hidden");
  historyBtn.classList.add("hidden");
  btnNext.classList.remove("hidden");
  btnPrevious.classList.remove("hidden");
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
btnRestart.addEventListener("click", handleRestartGame);

// --------------------------TESTING
// const newArray = [];
// let moves = 0;

// // PREVIOUS BUTTON
// btnPrevious.addEventListener("click", function () {
//   let filtered = newArray.filter(function (el) {
//     return el != null;
//   });
//   moves++;

//   let arrayLength = filtered.length;

//   for (let i = 0; i < cell.length; i++) {
//     if (cell[i].classList.contains("X") || cell[i].classList.contains("O")) {
//       if (
//         parseInt(cell[i].getAttribute("data-cell-index")) ===
//         newArray[arrayLength - moves]
//       ) {
//         cell[i].classList.remove("X");
//         cell[i].classList.remove("O");
//       }
//     }
//   }
// });

let newArray = [];
let moves = 0;
let newArrayLength;
let arrayMinusMoves;
// PREVIOUS BUTTON
btnPrevious.addEventListener("click", function () {
  // returns an array of only the populated ones
  let filtered = newArray.filter(function (el) {
    return el != null;
  });
  moves++;
  // gets the filtered length, if there are 5 marked cells, it will return 5
  let arrayLength = filtered.length;
  // passing the variable to be used globally
  newArrayLength = arrayLength;
  // if the array is 5, it will return 4, 5-1 = 4, the index of the array
  arrayMinusMoves = newArrayLength - moves;

  for (let i = 0; i < cell.length; i++) {
    // Getting the position
    if (cell[i].classList.contains("X") || cell[i].classList.contains("O")) {
      if (
        parseInt(cell[i].getAttribute("data-cell-index")) ===
        newArray[arrayMinusMoves]
      ) {
        cell[i].classList.remove(board[arrayMinusMoves]);
        btnNext.classList.remove("hidden");
      } else if (arrayMinusMoves === 1) {
        cell[i].classList.remove(board[arrayMinusMoves]);
        btnPrevious.classList.add("hidden");
      }
    }
  }
});

// NEXT BUTTON
btnNext.addEventListener("click", function () {
  let filtered = newArray.filter(function (el) {
    return el != null;
  });

  let arrayLength = filtered.length;
  newArrayLength = arrayLength;
  arrayMinusMoves = newArrayLength - moves;

  for (let i = 0; i < cell.length; i++) {
    if (
      parseInt(cell[i].getAttribute("data-cell-index")) ===
      newArray[arrayMinusMoves]
    ) {
      cell[i].classList.add(board[arrayMinusMoves]);
      btnPrevious.classList.remove("hidden");
    } else if (moves === 1) {
      btnNext.classList.add("hidden");
    }
  }
  moves--;
});
