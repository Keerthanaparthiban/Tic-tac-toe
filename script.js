let playerText = document.getElementById('playerText');
let boxes = Array.from(document.getElementsByClassName('box'));

let replayBtn = document.querySelector('.replayBtn');
let replaytext = document.querySelector('.replay-text');

replayBtn.addEventListener('mouseover', () => {
  replaytext.style.display = 'block';
});

replayBtn.addEventListener('mouseout', () => {
  replaytext.style.display = 'none';
});


let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let gameOver = false;

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id] && !gameOver) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      replaytext.style.display = 'block';
      replaytext.style.cursor = 'pointer';
      replaytext.addEventListener('click', () => {
        restart;
        replaytext.style.display = 'none';
      });

      let winning_blocks = playerHasWon();

      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);

      gameOver = true;

      return;
    }

    if (isDrawMatch(spaces) === true) {
      playerText.innerHTML = `Draw`;
      replaytext.style.display = 'block';
      replaytext.style.cursor = 'pointer';
      replaytext.addEventListener('click', () => {
        restart;
        replaytext.style.display = 'none';
      });

      gameOver = true;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function isBoardFull(spaces) {
  return spaces.every(space => space !== null);
};

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition

    if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a, b, c]
    }
  }
  return false
};

function isDrawMatch(spaces) {
  return !playerHasWon(spaces) && isBoardFull(spaces);
};

replaytext.addEventListener('click', restart)

function restart() {
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor = '';
  });

  playerText.innerHTML = 'Tic Tac Toe';

  currentPlayer = X_TEXT;
  replaytext.style.display = 'none'; // Hide the replay text after restarting the game
  gameOver = false; // Reset gameOver to false to allow moves again
};

startGame();