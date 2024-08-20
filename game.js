let turnX = true;
let playerMode = true;
let symbol = '';
let isGameActive = true;
let turnCounter = 0;
let win = false;
let draw = false;
let mode = true;
let sound = true;//false
let music = false;//true
let duration = 1600; // 1600

let boards = {};
for (let i = 0; i < 9; i++) {
  boards[i] = '';
}

const winColor = 'var(--vin-color)';

const buttons = {};
for (let i = 0; i < 9; i++) {
  buttons[i] = document.getElementById(`btn${i + 1}`);
  buttons[i].style.color = 'var(--main-light-textColor)';
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

const buttonPlayerMode = document.getElementById('btnPlayerMode');
const buttonAiMode = document.getElementById('btnAiMode');
const buttonX = document.getElementById('btnX');
const button0 = document.getElementById('btn0');
const buttonStartGame = document.getElementById('btnStartGame');

const startMenu = document.getElementById('startMenu');
const statusDisplay = document.getElementById('statusDisplay');

const buttonDarkMode = document.getElementById('btnDarkMode');
const buttonSoundMode = document.getElementById('btnSoundMode');
const buttonMusicMode = document.getElementById('btnMusicMode');
const buttonDifficultMode = document.getElementById('btnDifficultMode');
const buttonReset = document.getElementById('btnReset');
const buttonNewGame = document.getElementById('btnNewGame');
const buttonExitGame = document.getElementById('btnExitGame');

const tutorialMenuDisplay = document.getElementById('tutorialMenuDisplay');

function randomNumber() {
  let availableSpots = [];
  for (let i = 0; i < 9; i++) {
    if (boards[i] === '') {
      availableSpots.push(i);
    }
  }
  if (availableSpots.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableSpots.length);
    board = availableSpots[randomIndex];
    btn = buttons[board];
    symbol = turnX ? '0' : 'X';
    let vsSymbol = !turnX ? '0' : 'X';
    btn.innerText = symbol;
    boards[board] = symbol;
    btn.disabled = true;
    turnCounter++;
    statusDisplay.innerText = vsSymbol + ' turn';
    if (!win) {
      checkWin(symbol);
    }
  }
}

function start(buttonStartGame) {
  buttonStartGame.addEventListener('click', () => {
    startMenu.style.display = 'none';
    restart();
    // if (!turnX){  
    //   randomNumber();
    // }
    // else {
    //   for (let i = 0; i < 9; i++) {
    //   buttons[i].innerText = '';
    //   buttons[i].disabled = false;}
    // }
  })
  //TUTORIAL
  buttonStartGame.addEventListener('mouseenter', () => {
    tutorialMenuDisplay.innerText = 'start the game';
  })
  buttonStartGame.addEventListener('mouseleave', () => {
    tutorialMenuDisplay.innerText = '';
  })
}

function selectOpponentType(buttonPlayerMode, buttonAiMode) {
  if (playerMode) {
    buttonPlayerMode.style.opacity = '0.5';
  }
  buttonPlayerMode.addEventListener('click', () => {
    playerMode = true;
    buttonPlayerMode.style.opacity = '0.5';
    buttonAiMode.style.opacity = '';
    //STATUS_DISPLAY
    document.getElementById('player1').innerText = 'player 1';
    document.getElementById('player2').innerText = 'player 2';
  })
  buttonAiMode.addEventListener('click', () => {
    playerMode = false;
    buttonAiMode.style.opacity = '0.5';
    buttonPlayerMode.style.opacity = '';
    //STATUS_DISPLAY
    document.getElementById('player1').innerText = 'player 1';
    document.getElementById('player2').innerText = 'AI';
  })
  //TUTORIAL
  buttonPlayerMode.addEventListener('mouseenter', () => {
    tutorialMenuDisplay.innerText = 'play with a friend on the same computer';
  })
  buttonPlayerMode.addEventListener('mouseleave', () => {
    tutorialMenuDisplay.innerText = '';
  })
  buttonAiMode.addEventListener('mouseenter', () => {
    tutorialMenuDisplay.innerText = 'play against the computer';
  })
  buttonAiMode.addEventListener('mouseleave', () => {
    tutorialMenuDisplay.innerText = '';
  })
}

function selectСurrentPlayer(buttonX, button0) {
  if (turnX) {
    buttonX.style.opacity = '0.5';
  }
  buttonX.addEventListener('click', () => {
    turnX = true;
    buttonX.style.opacity = '0.5';
    button0.style.opacity = '';
    statusDisplay.innerText = 'X turn';

    //STATUS_DISPLAY
    document.getElementById('side1').innerText = 'X';
    document.getElementById('side2').innerText = '0';
  })

  button0.addEventListener('click', () => {
    turnX = false;
    button0.style.opacity = '0.5';
    buttonX.style.opacity = '';
    statusDisplay.innerText = '0 turn';

    //STATUS_DISPLAY
    document.getElementById('side1').innerText = '0';
    document.getElementById('side2').innerText = 'X';
  })
  //TUTORIAL
  buttonX.addEventListener('mouseenter', () => {
    tutorialMenuDisplay.innerText = 'always first';
  })
  buttonX.addEventListener('mouseleave', () => {
    tutorialMenuDisplay.innerText = '';
  })
  button0.addEventListener('mouseenter', () => {
    tutorialMenuDisplay.innerText = 'always catches up';
  })
  button0.addEventListener('mouseleave', () => {
    tutorialMenuDisplay.innerText = '';
  })
}

function blockMause() {
  for (let i = 0; i < 9; i++) {
    buttons[i].style.pointerEvents = 'none';
  }
}

function unBlockMause() {
  for (let i = 0; i < 9; i++) {
    buttons[i].style.pointerEvents = 'auto';
  }
}

function checkWin(side) {
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
    if (sound) { setTimeout(() => { winSound.play() }, duration / 30) };
    isGameActive = false;
    //STATUS_DISPLAY
    document.getElementById('score1').innerText = +1;

  }

  if (turnCounter === 9 && !win) {
    statusDisplay.innerText = "draw!";
    if (sound) { setTimeout(() => { drawSound.play() }, duration / 30) };
    draw = true;
    isGameActive = false;
  };
}

function toClick(btn, board) {

  btn.addEventListener('click', () => {
    if (sound) { clickSound.play() };

    if (playerMode) {
      if (turnCounter % 2 === 0) {
        btn.innerText = 'X';
        boards[board] = 'X';
        statusDisplay.innerText = '0 turn';
        checkWin("X");
      } else {
        btn.innerText = '0';
        boards[board] = '0';
        statusDisplay.innerText = 'X turn';
        checkWin("0");
      }
      turnCounter++;
      btn.disabled = true;
    }

    if (!playerMode) {
      if (!win && turnCounter < 9) {
        player1Move(btn, board);
      }
      if (!win && turnCounter < 9) {
        aiMove();
      }
    }

  })

}

// function toClick(btn, board) {
//   btn.addEventListener('click', () => {
//     if (sound) { clickSound.play() };
//     if (!win && turnCounter < 9) {
//       playerMove(btn, board);
//       // blockMause();
//     }
//     if (!win && turnCounter < 9) {
//       // setTimeout(() => {
//       aiMove();
//       // if (sound) { clickSound.play() };
//       // unBlockMause();
//       // }, duration);
//     }
//   }
//   );
// }


function player1Move(btn, board) {
  isGameActive = true;
  symbol = turnX ? 'X' : '0';
  let vsSymbol = !turnX ? 'X' : '0';
  btn.innerText = symbol;
  boards[board] = symbol;
  statusDisplay.innerText = vsSymbol + ' turn';
  btn.disabled = true;
  turnCounter++;
  if (!win) {
    checkWin(symbol);
  }
}

function player2Move(btn, board) {
  isGameActive = true;
  symbol = turnX ? 'X' : '0';
  let vsSymbol = !turnX ? 'X' : '0';
  btn.innerText = vsSymbol;
  boards[board] = vsSymbol;
  statusDisplay.innerText = symbol + ' turn';
  btn.disabled = true;
  turnCounter++;
  if (!win) {
    checkWin(vsSymbol);
  }
}

function aiMove() {
  if (!isGameActive) {
    return;
  }
  blockMause();
  setTimeout(() => {
    if (sound) { clickSound.play() };
    unBlockMause();
    randomNumber();
  }, duration);
}



//NAV PANEL

function toggleDark(buttonDarkMode, buttons) {

  let bodyDark = document.getElementsByTagName('html')[0];
  let startMenu = document.getElementById('startMenu');

  buttonDarkMode.addEventListener('click', () => {

    if (sound) { clickButton.play() };

    if (mode) {
      buttonDarkMode.innerText = 'light mode';
      bodyDark.style.backgroundColor = 'var(--main-dark-backgroundColor)';
      bodyDark.style.color = 'var(--main-dark-textColor)';
      startMenu.style.backgroundColor = 'var(--main-light-textColor)';
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
      startMenu.style.backgroundColor = '';
      for (let i = 0; i < 9; i++) {
        buttons[i].style.backgroundColor = '';
        buttons[i].style.color = 'var(--main-light-textColor)';
      }
      mode = true;
    }
  })
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

function restart() {

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
  win = false;
  statusDisplay.innerText = 'X turn';
  isGameActive = false;

  
  if (!turnX && !playerMode) {
    randomNumber();
  }
}


function newGame(buttonNewGame) {
  buttonNewGame.addEventListener('click', () => {
    restart();
    startMenu.style.display = 'block';
    unBlockMause();
  });
}

function exit(buttonExitGame) {
  buttonExitGame.addEventListener('click', () => {
    document.body.textContent = 'Thank you for visiting!';
    setTimeout(() => { window.close() }, duration * 2);
  });
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

  unBlockMause();
  toggleDark(buttonDarkMode, buttons);
  toggleSound(buttonSoundMode);
  toggleMusic(buttonMusicMode);
  newGame(buttonNewGame, buttonReset, buttons);
  buttonReset.addEventListener('click', () => { restart(); unBlockMause(); });
  restart(buttonReset, buttons);
  exit(buttonExitGame);
  selectOpponentType(buttonPlayerMode, buttonAiMode)
  selectСurrentPlayer(buttonX, button0);
  start(buttonStartGame);

}
// currentPlayer(buttonX, button0);
// start(buttonStartGame);
StartGame();

