let turnCounter = 0;
let mode = true;
let sound = true;
let music = true;

let boards = {};
for (let i = 0; i < 9; i++) {
  boards[i] = '';
}

const winColor = 'var(--vin-color)';

const buttons = {};
for (let i = 0; i < 9; i++) {
  buttons[i] = document.getElementById(`btn${i + 1}`);
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const clickSound = new Audio('./sounds/click.mp3');
const clickButton = new Audio('./sounds/click-button.mp3');
const winSound = new Audio('./sounds/win.mp3');
const drawSound = new Audio('./sounds/draw.mp3');
const mainTheme = new Audio('./sounds/main-theme.mp3');

const statusDisplay = document.getElementById('statusDisplay');

const buttonDarkMode = document.getElementById('btnDarkMode');
const buttonSoundMode = document.getElementById('btnSoundMode');
const buttonMusicMode = document.getElementById('btnMusicMode');
const buttonReset = document.getElementById('btnReset');
const buttonExitGame = document.getElementById('btnExitGame');

function checkWin(side) {
  let win = false;
  winConditions.forEach(condition => {
    if (boards[condition[0]] === side &&
      boards[condition[1]] === side &&
      boards[condition[2]] === side) {
      buttons[condition[0]].style.color = winColor;
      buttons[condition[0]].classList.add('shake');

      buttons[condition[1]].style.color = winColor;
      buttons[condition[1]].classList.add('shake');

      buttons[condition[2]].style.color = winColor;
      buttons[condition[2]].classList.add('shake');

      win = true;
    }
  });

  if (win) {
    for (let i = 0; i < 9; i++) {
      buttons[i].disabled = true;
    }
    statusDisplay.innerText = side + " won!";
    if (sound) { setTimeout(() => { winSound.play() }, 10) };

  }

  if (turnCounter === 9 && !win) {
    statusDisplay.innerText = "draw!";
    if (sound) { setTimeout(() => { drawSound.play() }, 10) };
  }
}

function toClick(btn, board) {
  btn.addEventListener('click', () => {
    if (sound) { clickSound.play() };

    if (turnCounter % 2 === 0) {
      btn.innerText = 'X';
      boards[board] = 'X';
      statusDisplay.innerText = '0 turn';
    } else {
      btn.innerText = '0';
      boards[board] = '0';
      statusDisplay.innerText = 'X turn';
    }
    turnCounter++;
    btn.disabled = true;
    checkWin("X");
    checkWin("0");
  });
}

//NAV PANEL

function toggleDark(buttonDarkMode, buttons) {

  let bodyDark = document.getElementsByTagName('html')[0];
  buttonDarkMode.addEventListener('click', () => {

    if (sound) { clickButton.play() };

    if (mode) {
      buttonDarkMode.innerText = 'light mode';
      bodyDark.style.backgroundColor = 'var(--main-dark-backgroundColor)';
      bodyDark.style.color = 'var(--main-dark-textColor)';
      for (let i = 0; i < 9; i++) {
        buttons[i].style.backgroundColor = 'var(--button-dark-backgroundColor';
        buttons[i].style.color = 'var(--main-dark-textColor)';
      }
      mode = false;
    }
    else {
      buttonDarkMode.innerText = 'dark mode';
      bodyDark.style.backgroundColor = '';
      bodyDark.style.color = '';
      for (let i = 0; i < 9; i++) {
        buttons[i].style.backgroundColor = '';
        buttons[i].style.color = 'var(--main-light-textColor)';
      }
      mode = true;
    }
  }
  )
}

function toggleSound(buttonSoundMode) {
  buttonSoundMode.addEventListener('click', () => {

    clickButton.play();

    sound = !sound;
    buttonSoundMode.innerText = sound ? 'sound on' : 'sound off';
  });
}

function toggleMusic(buttonMusicMode) {
  buttonMusicMode.addEventListener('click', () => {

    if (sound) { clickButton.play() };

    music = !music;
    buttonMusicMode.innerText = music ? 'music on' : 'music off';
    music ? mainTheme.play() : mainTheme.pause();
  });
}

function reset(buttonReset, buttons) {
  buttonReset.addEventListener('click', () => {

    if (sound) { clickButton.play() };

    for (let i = 0; i < 9; i++) {
      boards[i] = '';
    }

    for (let i = 0; i < 9; i++) {
      buttons[i].innerText = '';
      // buttons[i].style.color = '';
      buttons[i].disabled = false;
      buttons[i].classList.remove('shake');
      if (mode) {
        buttons[i].style.color = 'var(--main-light-textColor)';
      }
      else {
        buttons[i].style.color = 'var(--main-dark-textColor)';
      }
    }
    turnCounter = 0;
    statusDisplay.innerText = 'X turn';
  });
}

function exit(buttonExitGame) {
  buttonExitGame.addEventListener('click', () => {
    document.body.innerHTML = '<h1>Thank you for visiting!</h1>';
    { setTimeout(() => { window.close() }, 3000) };
  }
 )
}


//////////

function StartGame() {

  if (music) {
    mainTheme.play();
    mainTheme.loop = false; // Ensure the music does not loop automatically
    mainTheme.addEventListener('ended', () => {
      mainTheme.currentTime = 0; // Reset to the start
      mainTheme.play(); // Play again
    });
  }

  for (let i = 0; i < 9; i++) {
    toClick(buttons[i], i);
  }

  toggleDark(buttonDarkMode, buttons);
  toggleSound(buttonSoundMode);
  toggleMusic(buttonMusicMode);
  reset(buttonReset, buttons);
  exit(buttonExitGame);
}

StartGame();

