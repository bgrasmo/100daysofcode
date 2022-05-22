function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = 
  'You won, <span id="winner">PLAYER NAME</span>!';
  gameOverElement.style.display = 'none';

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex++];
      gameBoardItemElement.textContent = '';
      gameBoardItemElement.classList.remove('disabled');
    }
  }
}

function startNewGame() {
  if (players[0].name === '' || players[1].name === '') {
    alert('Please set custom player names for both players!');
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = 'block';
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== 'LI' || gameIsOver) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1; // This also converts to a number
  const selectedRow = selectedField.dataset.row - 1; // since we perform a math operation

  if (gameData[selectedColumn][selectedRow] > 0) {
    alert('Please select an empty field!');
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');

  gameData[selectedColumn][selectedRow] = activePlayer + 1;
  // console.log(gameData);

  const winnerId = checkForGameOver();
  if (winnerId) {
    endGame(winnerId);
  }
  console.log(winnerId);

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Check the rows for a winner
  for (let i = 0; i < 3; i++) {
    if (gameData[i][0] > 0 &&
        gameData[i][0] === gameData[i][1] &&
        gameData[i][1] === gameData[i][2]
      ) {
      return gameData[i][0];
    }
  }
  // Check the columns for a winner
  for (let i = 0; i < 3; i++) {
    if (gameData[0][i] > 0 &&
        gameData[0][i] === gameData[1][i] &&
        gameData[0][i] === gameData[2][i]
      ) {
      return gameData[0][i];
    }
  }

  // Check top left to bottom right for a winner
  if(gameData[0][0] > 0 &&
     gameData[0][0] === gameData[1][1] &&
     gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Check bottom left to top right for a winner
  if(gameData[2][0] > 0 &&
     gameData[2][0] === gameData[1][1] &&
     gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
 }
 if (currentRound === 9) {
   return -1;
 }
 return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = 'block';

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}