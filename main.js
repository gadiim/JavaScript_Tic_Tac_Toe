  let turnCounter = 0;

  const statusDisplay = document.getElementById('statusDisplay');

  const buttons = {};
  for (let i = 0; i < 9; i++) {
    buttons[i] = document.getElementById(`btn${i + 1}`);
  }
  
  let boards = {};
  for (let i = 0; i < 9; i++) {
    boards[i] = '';
  }

  function checkWin(side) {
    let win = false;
    if (boards[0] === side && boards[1] === side && boards[2] === side) {
      buttons[0].style.color = 'red';
      buttons[1].style.color = 'red';
      buttons[2].style.color = 'red';
      win = true;
    }
    else if (boards[3] === side && boards[4] === side && boards[5] === side) {
      buttons[3].style.color = 'red';
      buttons[4].style.color = 'red';
      buttons[5].style.color = 'red';
      win = true;
    }
    else if (boards[6] === side && boards[7] === side && boards[8] === side) {
      buttons[6].style.color = 'red';
      buttons[7].style.color = 'red';
      buttons[8].style.color = 'red';
      win = true;
    }
    else if (boards[0] === side && boards[3] === side && boards[6] === side) {
      buttons[0].style.color = 'red';
      buttons[3].style.color = 'red';
      buttons[6].style.color = 'red';
      win = true;
    }
    else if (boards[1] === side && boards[4] === side && boards[7] === side) {
      buttons[1].style.color = 'red';
      buttons[4].style.color = 'red';
      buttons[7].style.color = 'red';
      win = true;
    }
    else if (boards[2] === side && boards[5] === side && boards[8] === side) {
      buttons[2].style.color = 'red';
      buttons[5].style.color = 'red';
      buttons[8].style.color = 'red';
      win = true;
    }
    else if (boards[0] === side && boards[4] === side && boards[8] === side) {
      buttons[0].style.color = 'red';
      buttons[4].style.color = 'red';
      buttons[8].style.color = 'red';
      win = true;
    }
    else if (boards[2] === side && boards[4] === side && boards[6] === side) {
      buttons[2].style.color = 'red';
      buttons[4].style.color = 'red';
      buttons[6].style.color = 'red';
      win = true;
    }
    if (win) {
      for (let i = 0; i < 9; i++) {
        buttons[i].disabled = true;
      }
      statusDisplay.innerText = side + " won!";
    }
  }

  function toClick(btn, board) {
    btn.addEventListener('click', () => {
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