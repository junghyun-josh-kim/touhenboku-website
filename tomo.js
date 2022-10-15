const TOMO_SIZE = 150;
const TOMO_COUNT = 7;
const GAME_DURATION = 10;

const field = document.querySelector('.tomo__game-field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.tomo__game-header__button');
const gameTimer = document.querySelector('.tomo__game-header__timer');
const gameScore = document.querySelector('.tomo__game-header__score');

const popUp = document.querySelector('.tomo__pop-up');
const popUpText = document.querySelector('.tomo__pop-up__message');
const popUpRefresh = document.querySelector('.tomo__pop-up__refresh');

const tomoSound = new Audio('./sound/tomo-click.mp3');
const winSound = new Audio('./sound/game-win.mp3');
const bgSound = new Audio('./sound/tomo-bgm.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}
function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY?');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(alertSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? 'Enjoy 10% off!' : 'replay for 10% off?');
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}
function showStopButton() {
  const icon = gameBtn.querySelector('.clone');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTime = GAME_DURATION;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      finishGame(TOMO_COUNT === score);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('tomo__pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('tomo__pop-up--hide');
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = TOMO_COUNT;
  addItem('tomo-tomo', TOMO_COUNT, 'img/tomo-tomo.png');
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.tomo-tomo')) {
    playSound(tomoSound);
    target.remove();
    score++;
    updateScoreBoard();
    if (score === TOMO_COUNT) {
      finishGame(true);
    }
  }
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = TOMO_COUNT - score;
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
