var playersTurn = 'X';
var countStep = 0;
var gameEnded = false;

// Define winning combinations
const combo = {
  0: [[0, 1, 2], [0, 3, 6], [0, 4, 8]],
  1: [[1, 4, 7]],
  2: [[2, 5, 8], [2, 4, 6]],
  3: [[3, 4, 5]],
  6: [[6, 7, 8]]
};

// Define variables
var emptyBoard = ['', '', '', '', '', '', '', '', ''];
var dataX = [];
var dataO = [];

// DOM elements
const cells = Array.from(document.getElementsByClassName('box'));
const infoBoard = Array.from(document.getElementsByClassName('item'));

// Click function
const clickFunc = (e) => {
  if (!gameEnded) {
    // use replace method to get index from squares id, then convert the string to an integer
    var cellsIndex = Number.parseInt(e.target.id.replace('cell', ''));
    // prevent double click on cell
    if (!e.target.textContent) {
      emptyBoard[cellsIndex] = playersTurn;
      updateDataArray(playersTurn, cellsIndex);

      if (winnerFn(playersTurn === 'X' ? dataX : dataO, cellsIndex)) {
        gameEnded = true;
        updateBoard();
        infoBoard[0].innerText = playersTurn + " is the WINNER";
        showPopupMessage(playersTurn + " is the WINNER");
        return;
      }

      countStep++;
      updateBoard();

      if (countStep === 9) {
        gameEnded = true;
        var tieGame = infoBoard[1];
        tieGame.innerText = 'TIE GAME';
        showPopupMessage('TIE GAME');
      }

      if (!gameEnded) {
        togglePlayersTurn();
      }
    }
  }
}

// Update X or O data array
const updateDataArray = (player, index) => {
  if (player === 'X') {
    dataX.push(index);
  } else {
    dataO.push(index);
  }
};

// Check for winner
const winnerFn = (arr, num) => {
  arr = arr.sort((a, b) => a - b);

  if (arr.length > 2) {
    const searchForWinner = (subArr1) => {
      return subArr1.every(el => arr.includes(el));
    };

    for (let i = 0; i < arr.length; i++) {
      if (combo[arr[i]] && combo[arr[i]].length > 0) {
        for (let k = 0; k < combo[arr[i]].length; k++) {
          let isWinner = searchForWinner(combo[arr[i]][k]);
          if (isWinner) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

// Toggle players turn
const togglePlayersTurn = () => {
  playersTurn = playersTurn === 'X' ? 'O' : 'X';
};

// Update the game board
const updateBoard = () => {
  emptyBoard.forEach((letter, index) => {
    cells[index].innerText = letter;
  });
};

// Show pop-up message
const showPopupMessage = (message) => {
  const popup = document.getElementById('messagePopup');
  popup.innerText = message;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 1000); // Hide after 2 seconds
};


// Reset the game board
const resetButton = () => {
  cells.forEach(cell => {
    cell.innerText = '';
  });
  emptyBoard = ['', '', '', '', '', '', '', '', ''];
  playersTurn = 'X';
  dataX = [];
  dataO = [];
  countStep = 0;
  gameEnded = false;
  var winnerMessage = infoBoard[0];
  var tieGame = infoBoard[1];
  winnerMessage.innerText = 'Win:';
  tieGame.innerText = 'Tie game:';
};

// Event listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('box')) {
    clickFunc(e);
  }
});

document.getElementById('button').addEventListener('click', resetButton);

