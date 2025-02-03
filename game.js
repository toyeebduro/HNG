const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
        let targetColor = "";
        let score = 0;
        let lives = 3;
        let timer;
        let timeLeft = 5; // Set initial time to 5 seconds

        // Function to start a new game
        function startNewGame() {
            document.getElementById("gameOver").classList.add("hidden");
            document.getElementById("gameButtons").classList.remove("hidden");
            score = 0;
            lives = 3;
            timeLeft = 5;
            document.getElementById("score").textContent = score;
            document.getElementById("lives").textContent = lives;
            document.getElementById("timer").textContent = timeLeft;
            document.getElementById("gameInstructions").textContent = "Guess the correct color!";
            targetColor = colors[Math.floor(Math.random() * colors.length)]; // Pick a random color at start
            document.getElementById("colorBox").style.backgroundColor = targetColor; // Set the color box
            shuffleButtons(); // Shuffle the buttons
            resetTimer(); // Start the timer
        }

        // Function to handle color guesses
        function handleGuess(button) {
            if (button.style.backgroundColor === targetColor) {
                score++;  // Correct guess increases the score
                document.getElementById("correctSound").play();  // Play sound for correct answer
                document.getElementById("gameInstructions").textContent = "🎉 Correct! Well done!";
                targetColor = colors[Math.floor(Math.random() * colors.length)]; // Pick a new color
                document.getElementById("colorBox").style.backgroundColor = targetColor; // Change the color box
                document.getElementById("score").textContent = score;
                shuffleButtons(); // Shuffle buttons after correct guess
                resetTimer(); // Reset the timer after correct guess
            } else {
                lives--;  // Wrong guess decreases lives
                document.getElementById("incorrectSound").play();  // Play sound for wrong answer
                document.getElementById("lives").textContent = lives;
                if (lives === 0) {
                    document.getElementById("gameInstructions").textContent = "❌ Game Over!";
                    document.getElementById("gameOver").classList.remove("hidden");
                    document.getElementById("gameButtons").classList.add("hidden");
                    clearInterval(timer); // Stop the timer
                } else {
                    document.getElementById("gameInstructions").textContent = "❌ Wrong! Try again!";
                }
            }
        }

        // Function to reset the timer
        function resetTimer() {
            clearInterval(timer); // Clear previous interval
            timeLeft = 5; // Reset time to 5 seconds
            document.getElementById("timer").textContent = timeLeft;
            timer = setInterval(() => {
                timeLeft--; // Decrease time left
                document.getElementById("timer").textContent = timeLeft;
                if (timeLeft === 0) {
                    clearInterval(timer);
                    document.getElementById("timeUpSound").play();  // Play time-up sound
                    document.getElementById("gameInstructions").textContent = "⏳ Time's up! Game Over!";
                    document.getElementById("gameOver").classList.remove("hidden");
                    document.getElementById("gameButtons").classList.add("hidden");
                }
            }, 1000); // Update every second
        }

        // Function to shuffle buttons
        function shuffleButtons() {
            const buttonsContainer = document.querySelector(".button-container");
            const buttons = Array.from(buttonsContainer.children);
            buttons.forEach(button => buttonsContainer.removeChild(button));  // Remove buttons
            buttons.sort(() => Math.random() - 0.5);  // Shuffle the buttons
            buttons.forEach(button => buttonsContainer.appendChild(button));  // Add shuffled buttons back
        }

        startNewGame(); // Start the game when the page loads