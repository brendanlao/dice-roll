"use strict";

//Selecting html elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
let currentScore = 0;
let totalScores = [0, 0];
let activePlayer = 0;

//initialize values
initialize();

newBtn.addEventListener("click", function () {
  document.querySelector("main").classList.remove("show");
  setTimeout(initialize, 500);
  dice.classList.remove("show");
});
rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", handleHold);

//FUNCTIONS
function initialize() {
  document.querySelector("main").classList.add("show");
  const winner = document.querySelector(".player--winner");
  if (winner) {
    winner.classList.toggle("player--winner");
  }
  rollBtn.disabled = false;
  holdBtn.disabled = false;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  totalScores = [0, 0];
  updatePlayerScore(activePlayer);
  if (activePlayer) {
    changePlayer();
  }
}

function rollDice() {
  //update the dice image
  if (!dice.classList.contains("show")) dice.classList.add("show");
  let roll = Math.trunc(Math.random() * 6) + 1;
  let srcText = `img/dice-${roll}.png`;
  dice.src = srcText;

  //conditon: dice roll is 1
  if (roll === 1) {
    currentScore = 0;
    updatePlayerScore(activePlayer);
    changePlayer();
    transitionBetweenPlayer();
  } else {
    currentScore += roll;
    updatePlayerScore(activePlayer);
  }
}

function handleHold() {
  totalScores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    totalScores[activePlayer];
  if (totalScores[activePlayer] >= 100) {
    document
      .querySelector(".player--active")
      .classList.toggle("player--winner");
    dice.classList.add("show");
    rollBtn.disabled = true;
    holdBtn.disabled = true;
  } else {
    currentScore = 0;
    updatePlayerScore(activePlayer);
    changePlayer();
  }
}

function updatePlayerScore(player) {
  let playerID = `current--${player}`;
  document.getElementById(playerID).textContent = currentScore;
}

function changePlayer() {
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function transitionBetweenPlayer() {
  rollBtn.disabled = true;
  holdBtn.disabled = true;
  newBtn.disabled = true;
  document.querySelector(".modal").classList.toggle("show");
  document.querySelector(".overlay").classList.toggle("show");
  setTimeout(() => {
    rollBtn.disabled = false;
    holdBtn.disabled = false;
    newBtn.disabled = false;
    document.querySelector(".modal").classList.toggle("show");
    document.querySelector(".overlay").classList.toggle("show");
  }, 750);
}
