// Get references to the HTML elements
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const gameStatus = document.getElementById('gameStatus');

let score = 0;
let gameInterval;
let balloonInterval;
let gameRunning = false;

// Function to start the game
function startGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameStatus.textContent = '';
  startButton.disabled = true;
  gameRunning = true;

  // Start balloon spawn and game timer
  balloonInterval = setInterval(createBalloon, 1000); // spawn balloon every second
  gameInterval = setTimeout(endGame, 30000); // end the game after 30 seconds
}

// Function to create and position a balloon
function createBalloon() {
  if (!gameRunning) return;

  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = `${Math.random() * (gameArea.offsetWidth - 60)}px`;
  balloon.style.top = `${Math.random() * (gameArea.offsetHeight - 90)}px`;
  
  gameArea.appendChild(balloon);

  // Add event listener to pop the balloon when clicked
  balloon.addEventListener('click', function () {
    popBalloon(balloon);
  });

  // Remove balloon after 5 seconds if not popped
  setTimeout(() => {
    if (balloon.parentNode) {
      gameArea.removeChild(balloon);
    }
  }, 5000);
}

// Function to pop the balloon and update the score
function popBalloon(balloon) {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  gameArea.removeChild(balloon);
}

// Function to end the game
function endGame() {
  gameRunning = false;
  clearInterval(balloonInterval);
  gameStatus.textContent = `Game Over! Final Score: ${score}`;
  startButton.disabled = false;
}

// Start the game when the "Start Game" button is clicked
startButton.addEventListener('click', startGame);
