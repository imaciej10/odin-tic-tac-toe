const TicTacToeGame = (function () {
  const playerMarker = "X";
  const computerMarker = "O";
  const initialBoard = [11, 12, 13, 21, 22, 23, 31, 32, 33];
  let isPlayerMove = true;
  let board = [...initialBoard];
  let playerPoints = 0;
  let computerPoints = 0;
  let computerChoice;
  let computerIndex;

  const resetPoints = function () {
    playerPoints = 0;
    computerPoints = 0;
    return playerPoints, computerPoints;
  };
  const resetBoard = function () {
    return (board = [...initialBoard]);
  };

  const markSelected = function (player, index) {
    if (player === "player") {
      board.splice(index - 1, 1, playerMarker);
      isPlayerMove = false;
    } else if (player === "computer") {
      computerIndex = board.indexOf(computerChoice);
      board.splice(computerIndex, 1, computerMarker);
      isPlayerMove = true;
    }
    console.log(board);
    return board, isPlayerMove, computerIndex + 1;
  };

  const computerTurn = function () {
    let emptySlots = board.filter(
      (value) => !(value === playerMarker || value === computerMarker)
    );
    computerChoice = emptySlots[Math.floor(Math.random() * emptySlots.length)];
    return computerChoice;
  };

  const isValidMove = function (field) {
    return !(
      board[field - 1] === playerMarker || board[field - 1] === computerMarker
    );
  };

  const addPlayerPoints = function () {
    playerPoints += 1;
    return playerPoints;
  };

  const addComputerPoints = function () {
    computerPoints += 1;
    return computerPoints;
  };

  const getPlayerPoints = function () {
    return playerPoints;
  };
  const getComputerPoints = function () {
    return computerPoints;
  };

  const checkWinner = function () {
    const winningCombinations = [
      [1, 5, 9],
      [3, 5, 7],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];

    for (const combination of winningCombinations) {
      const markers = combination.map((index) => board[index - 1]);
      if (markers.every((marker) => marker === playerMarker)) {
        console.log("Player won!");
        playerPoints += 1;
        return [true, playerPoints];
      } else if (markers.every((marker) => marker === computerMarker)) {
        console.log("Computer won!");
        computerPoints += 1;
        return [true, computerPoints];
      }
    }
    if (
      board.every((field) => field === playerMarker || field === computerMarker)
    ) {
      return true;
    }
  };

  return {
    markSelected,
    addPlayerPoints,
    addComputerPoints,
    getPlayerPoints,
    getComputerPoints,
    computerTurn,
    checkWinner,
    playerPoints,
    computerPoints,
    playerMarker,
    computerMarker,
    resetBoard,
    isValidMove,
    isPlayerMove,
    resetPoints,
  };
})();

document.addEventListener("DOMContentLoaded", function (event) {
  const gameBoard = document.querySelector(".game-board");
  const fields = document.querySelectorAll(".field");
  const newGameButton = document.querySelector(".reset");
  const resetScoreBtn = document.querySelector(".resetScore");
  const playerScore = document.querySelector(".playerScore");
  const computerScore = document.querySelector(".computerScore");
  const form = document.querySelector(".newSymbol");

  let computerField;

  function clearBoard() {
    fields.forEach((field) => (field.textContent = ""));
  }

  function handleRoundEnd() {
    playerScore.textContent = TicTacToeGame.getPlayerPoints();
    computerScore.textContent = TicTacToeGame.getComputerPoints();
    return (TicTacToeGame.isPlayerMove = false);
  }

  function updateBoard(previousPlayer, previousComputer, player, computer) {
    fields.forEach((field) => {
      if (field.textContent === previousPlayer) {
        field.textContent = player;
      } else if (field.textContent === previousComputer) {
        field.textContent = computer;
      }
    });
  }

  function isDataValid(playerMarker, computerMarker) {
    return (
      playerMarker.value.trim() !== "" && computerMarker.value.trim() !== ""
    );
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("field")) {
      let fieldId = event.target.id;

      if (
        TicTacToeGame.isPlayerMove === true &&
        TicTacToeGame.isValidMove(fieldId)
      ) {
        let field = document.getElementById(fieldId);
        TicTacToeGame.markSelected("player", fieldId);
        field.textContent = TicTacToeGame.playerMarker;
        if (TicTacToeGame.checkWinner()) {
          return handleRoundEnd();
        }
        TicTacToeGame.computerTurn();
        computerField = TicTacToeGame.markSelected("computer");
        document.getElementById(computerField).textContent =
          TicTacToeGame.computerMarker;
        if (TicTacToeGame.checkWinner()) {
          return handleRoundEnd();
        }
      }
    }
  });

  newGameButton.addEventListener("click", function () {
    clearBoard();
    TicTacToeGame.board = TicTacToeGame.resetBoard();
    TicTacToeGame.isPlayerMove = true;
  });

  resetScoreBtn.addEventListener("click", () => {
    TicTacToeGame.resetPoints();
    playerScore.textContent = "";
    computerScore.textContent = "";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let previousPlayerMarker = TicTacToeGame.playerMarker;
    let previousComputerMarker = TicTacToeGame.computerMarker;

    const playerMarkerInput = document.getElementById("player");
    const computerMarkerInput = document.getElementById("computer");

    if (!isDataValid(playerMarkerInput, computerMarkerInput)) {
      return false;
    }
    let newPlayerMarker = playerMarkerInput.value;
    let newComputerMarker = computerMarkerInput.value;
    TicTacToeGame.playerMarker = newPlayerMarker;
    TicTacToeGame.computerMarker = newComputerMarker;
    updateBoard(
      previousPlayerMarker,
      previousComputerMarker,
      newPlayerMarker,
      newComputerMarker
    );
  });
});
