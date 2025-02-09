const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
let targetColor = "";
let score = 0;

const colorBox = document.getElementById("colorBox");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const buttons = document.querySelectorAll(".color-option");

// Function to start a new game
function startNewGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    gameStatus.textContent = "";
    buttons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.onclick = () => handleGuess(colors[index]);
    });
}

// Function to handle user guess
function handleGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        document.getElementById("correctSound").play();
        score++;
        scoreDisplay.textContent = score;
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
        document.getElementById("incorrectSound").play();
    }
}

// Initialize game
newGameButton.addEventListener("click", startNewGame);
startNewGame();
