const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
let targetColor = "";
let score = 0;
let timer;
let timeLeft = 5;

const colorBox = document.getElementById("colorBox");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const buttons = document.querySelectorAll(".color-option");
const timerDisplay = document.getElementById("timer").querySelector("span");

// Load sound files with fallback for .wav format
const correctSound = new Audio();
const incorrectSound = new Audio();
const timeUpSound = new Audio();

// Function to load both `.mp3` and `.wav`
function loadSound(audioElement, name) {
    const mp3Source = document.createElement("source");
    mp3Source.src = `${name}.mp3`;
    mp3Source.type = "audio/mpeg";

    const wavSource = document.createElement("source");
    wavSource.src = `${name}.wav`;
    wavSource.type = "audio/wav";

    audioElement.appendChild(mp3Source);
    audioElement.appendChild(wavSource);
}

// Load sound files
loadSound(correctSound, "correct");
loadSound(incorrectSound, "incorrect");
loadSound(timeUpSound, "timeup");

// Function to start a new game
function startNewGame() {
    clearInterval(timer);
    timeLeft = 5;
    timerDisplay.textContent = `${timeLeft}s`;

    targetColor = colors[Math.floor(Math.random() * colors.length)];
    setTimeout(() => {
        colorBox.style.backgroundColor = targetColor;
    }, 100);

    gameStatus.textContent = "Guess the correct color!";
    gameStatus.style.color = "white";

    buttons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.style.opacity = "1";
        button.onclick = () => handleGuess(colors[index]);
    });

    timer = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        gameStatus.textContent = "⏳ Time's up! You lost!";
        gameStatus.style.color = "red";
        timeUpSound.play();
        disableButtons();
    }
}

// Function to handle user guess
function handleGuess(selectedColor) {
    if (selectedColor === targetColor) {
        clearInterval(timer);
        gameStatus.textContent = "✅ Correct!";
        gameStatus.style.color = "lightgreen";
        correctSound.play();
        score++;
        scoreDisplay.textContent = score;
        setTimeout(startNewGame, 1000);
    } else {
        gameStatus.textContent = "❌ Wrong! Try again.";
        gameStatus.style.color = "red";
        incorrectSound.play();
        fadeEffect(selectedColor);
    }
}

// Fade effect on wrong answer
function fadeEffect(wrongColor) {
    buttons.forEach(button => {
        if (button.style.backgroundColor === wrongColor) {
            button.classList.add("fade");
            setTimeout(() => button.classList.remove("fade"), 500);
        }
    });
}

// Disable buttons when time runs out
function disableButtons() {
    buttons.forEach(button => (button.onclick = null));
}

newGameButton.addEventListener("click", startNewGame);
document.addEventListener("DOMContentLoaded", startNewGame);
