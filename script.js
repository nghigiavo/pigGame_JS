'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// initial function
// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true; b/c only available inside the in. Thus:
let scores, currentScore, activePlayer, playing;

const init = function () {
  // const scores = [0, 0];
  // let currentScore = 0;
  // let activePlayer = 0;
  // let playing = true; b/c only available inside the init function. And:
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
};
init(); // call init func
console.log(init);

// switching function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 1. roll the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // random roll dice each time we click rolling button (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the roll dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check if the rolled 1 : if false
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if true, switch the player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

// 2. Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score <= 20
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switchPlayer();
    // else, switch player;
  }
});

btnNew.addEventListener('click', init);
