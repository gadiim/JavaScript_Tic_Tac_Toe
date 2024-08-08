let turnCounter = 0;

const clickSound = new Audio('./sounds/click.mp3');
const winSound = new Audio('./sounds/win.mp3');
const drawSound = new Audio('./sounds/draw.mp3');

const statusDisplay = document.getElementById('statusDisplay');

const winColor = 'tomato';

const buttons = {};
for (let i = 0; i < 9; i++) {
  buttons[i] = document.getElementById(`btn${i + 1}`);
}

let boards = {};
for (let i = 0; i < 9; i++) {
  boards[i] = '';
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
    setTimeout(() => { winSound.play() }, 500);
  }

  if (turnCounter === 9 && !win) {
    statusDisplay.innerText = "draw!";
    setTimeout(() => { drawSound.play() }, 500);
  }
}

function toClick(btn, board) {
  btn.addEventListener('click', () => {
    clickSound.play();
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

for (let i = 0; i < 9; i++) {
  toClick(buttons[i], i);
}