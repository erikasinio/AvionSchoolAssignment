/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// ------------DOM-----------
let diceImg = document.querySelector(".dice");
let rollDice = document.querySelector(".btn-roll");
let holdScore = document.querySelector(".btn-hold");
let newGame = document.querySelector(".btn-new");
let restart = document.querySelector(".btn-restart");

let score0 = document.getElementById("score-0");
let current0 = document.getElementById("current-0");
let score1 = document.getElementById("score-1");
let current1 = document.getElementById("current-1");
let playerPanel0 = document.querySelector(`.player-0-panel`);
let playerPanel1 = document.querySelector(`.player-1-panel`);
let theme = document.querySelector(`.theme`);
let winnerTag0 = document.querySelector(`.winner-tag-0`);
let winnerTag1 = document.querySelector(`.winner-tag-1`);

let player0Name = document.getElementById("player1");
let player1Name = document.getElementById("player2");
let threshold = document.getElementById("threshold");
let start = document.querySelector("#start");

// ------------VAR-----------
let currentPlayer, currentScore, game, scores, thresholdNum;

// ------------INITIALIZATION-----------
function init() {
  diceImg.classList.add("hidden");
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  currentPlayer = 0;
  currentScore = 0;
  game = true;
  scores = [0, 0];
  winnerTag1.classList.add("hidden");
  winnerTag0.classList.add("hidden");
  playerPanel0.classList.add("active");
  playerPanel0.classList.remove("winner");
  playerPanel1.classList.remove("active", "winner");
}

init();

// ------------SWITCH PLAYER-----------
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current-${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  playerPanel1.classList.toggle("active");
  playerPanel0.classList.toggle("active");
}

// ------------ROLL DICE-----------
rollDice.addEventListener("click", function () {
  if (game) {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(
        `current-${currentPlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// ------------HOLD BUTTON-----------
holdScore.addEventListener("click", function () {
  if (game) {
    scores[`${currentPlayer}`] += currentScore;
    document.getElementById(`score-${currentPlayer}`).textContent =
      scores[`${currentPlayer}`];
    if (scores[`${currentPlayer}`] >= thresholdNum) {
      document
        .querySelector(`.player-${currentPlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.winner-tag-${currentPlayer}`)
        .classList.remove("hidden");
      game = false;
    } else {
      switchPlayer();
    }
  }
});

// ------------NEW GAME-----------
newGame.addEventListener("click", init);

// ------------START GAME-----------
start.addEventListener("click", function () {
  if (player0Name.value && player1Name.value && threshold.value) {
    document.querySelector(".start-screen").classList.add("display-none");
    document.querySelector(".main-screen").classList.remove("display-none");
    document.getElementById("name-0").textContent = player0Name.value;
    document.getElementById("name-1").textContent = player1Name.value;
    thresholdNum = threshold.value;
    document.querySelector(".threshold-num").textContent = thresholdNum;
  }
});

// ------------RESTART GAME-----------
restart.addEventListener("click", function () {
  location.reload();
  init();
});

// ------------TOGGLE SWITCH - THEME-----------
theme.addEventListener("change", function () {
  var r = document.querySelector(":root");
  var rs = getComputedStyle(r);
  var currentColor = rs.getPropertyValue("--current");
  var activeColor = rs.getPropertyValue("--active");
  var textColor = rs.getPropertyValue("--text");
  var labelColor = rs.getPropertyValue("--label");

  console.log(currentColor === "#fff", currentColor);
  r.style.setProperty(
    "--current",
    currentColor === " #fff" ? " #222" : " #fff"
  );

  r.style.setProperty(
    "--active",
    activeColor === " #f7f7f7" ? " #333" : " #f7f7f7"
  );
  r.style.setProperty("--text", textColor === " #555" ? " #fff" : " #555");
  r.style.setProperty("--label", labelColor === " #222" ? " #fff" : " #222");
  document.querySelector("body").classList.toggle("dark-overlay");
});
