const TOMO_SIZE = 150;
const TOMO_COUNT = 3;

const field = document.querySelector('.tomo__game-field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.tomo__game-header__button');
const gameTimer = document.querySelector('.tomo__game-header__timer');
const gameScore = document.querySelector('.tomo__game-header__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}
function stopGame() {}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = TOMO_COUNT;
  addItem('tomo-tomo', TOMO_COUNT, 'img/tomo-tomo.png');
}
function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - TOMO_SIZE;
  const y2 = fieldRect.height - TOMO_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.width = '110px';
    item.style.height = '110px';
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
