'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRestart = document.querySelector('.btn--restart');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
const rounds = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const resetGame = function () {
  playing = true;
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document
      .querySelector(`.player--${[i]}`)
      .classList.remove('player--winner');
    document.getElementById(`current--${[i]}`).textContent = 0;
    document.getElementById(`score--${[i]}`).textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    document.querySelector(`.player--${0}`).classList.add('player--active');
  }
  for (let i = 0; i < rounds.length; i++) {
    rounds[i] = 0;
    document
      .querySelector(`.player--${[i]}`)
      .classList.remove('player--winner');
    document.getElementById(
      `rounds--${[i]}`
    ).textContent = `Rounds won: ${rounds[activePlayer]}`;
  }
};

const halfReset = function () {
  playing = true;
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document
      .querySelector(`.player--${[i]}`)
      .classList.remove('player--winner');
    document.getElementById(`current--${[i]}`).textContent = 0;
    document.getElementById(`score--${[i]}`).textContent = 0;
    document.getElementById(`rounds--${activePlayer}`).style.color = '#333';
    currentScore = 0;
    activePlayer = 0;
    document.querySelector(`.player--${0}`).classList.add('player--active');
  }
};

//Roling dice funcionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // 2.Display dice
    diceEl.classList.remove('hidden');
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      rounds[activePlayer] += 1;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(
        `rounds--${activePlayer}`
      ).textContent = `Rounds won: ${rounds[activePlayer]}`;
      document.getElementById(`rounds--${activePlayer}`).style.color = '#ffff';
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  resetGame();
});

btnRestart.addEventListener('click', function () {
  if (!playing) {
    halfReset();
  } else {
    console.log('Button cannot be clicked because game is still in progress');
  }
});
