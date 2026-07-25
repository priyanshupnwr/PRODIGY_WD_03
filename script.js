const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const newGameBtn = document.getElementById("newGameBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const drawScoreText = document.getElementById("drawScore");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

newGameBtn.addEventListener("click", resetBoard);

resetScoreBtn.addEventListener("click", () => {

    xScore = 0;
    oScore = 0;
    drawScore = 0;

    updateScoreboard();
    resetBoard();

});

function handleCellClick() {

    const index = this.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;

    this.textContent = currentPlayer;
    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();

}

function checkWinner() {

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            gameActive = false;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            statusText.textContent = `Player ${currentPlayer} Wins!`;

            if (currentPlayer === "X") {
                xScore++;
            } else {
                oScore++;
            }

            updateScoreboard();

            return;
        }

    }

    if (!board.includes("")) {

        drawScore++;
        updateScoreboard();

        statusText.textContent = "It's a Draw!";
        gameActive = false;

        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;

}

function resetBoard() {

    board.fill("");

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("win");

    });

}

function updateScoreboard() {

    xScoreText.textContent = xScore;
    oScoreText.textContent = oScore;
    drawScoreText.textContent = drawScore;

}