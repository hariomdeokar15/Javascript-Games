const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const gameStatus = document.getElementById('gameStatus');

const snakeSize = 20; // Size of the snake segments
let snake = [{x: 50, y: 50}]; // Initial snake position
let food = {x: 100, y: 100}; // Initial food position
let direction = 'RIGHT'; // Snake initial movement direction
let newDirection = 'RIGHT'; // The direction the player wants to move
let score = 0;
let gameRunning = false;
let gameInterval;

// Initialize the canvas size
canvas.width = 400;
canvas.height = 400;

// Start the game when the button is clicked
startButton.addEventListener('click', startGame);

// Game loop
function gameLoop() {
  if (!gameRunning) return;
  
  // Update the snake's position
  moveSnake();
  
  // Check for collisions
  if (checkCollisions()) {
    endGame();
    return;
  }

  // Clear the canvas and redraw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  updateScore();
}

// Function to start the game
function startGame() {
  score = 0;
  snake = [{x: 50, y: 50}];
  direction = 'RIGHT';
  newDirection = 'RIGHT';
  gameStatus.textContent = '';
  startButton.disabled = true;
  gameRunning = true;
  
  gameInterval = setInterval(gameLoop, 100); // Update game every 100ms
  
  // Generate new food
  generateFood();
}

// Function to move the snake
function moveSnake() {
  const head = { ...snake[0] };

  switch (newDirection) {
    case 'UP':
      head.y -= snakeSize;
      break;
    case 'DOWN':
      head.y += snakeSize;
      break;
    case 'LEFT':
      head.x -= snakeSize;
      break;
    case 'RIGHT':
      head.x += snakeSize;
      break;
  }

  // Add the new head to the front of the snake
  snake.unshift(head);

  // If the snake eats food, don't remove the last segment (grow)
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop(); // Remove the last segment if no food eaten
  }

  // Update the direction
  direction = newDirection;
}

// Function to check for collisions
function checkCollisions() {
  const head = snake[0];

  // Check if snake collides with walls
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }

  // Check if snake collides with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}

// Function to draw the snake
function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

// Function to draw food
function drawFood() {
  ctx.fillStyle = '#FF6347';
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Function to generate new food at random position
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

// Function to update the score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function to end the game
function endGame() {
  gameRunning = false;
  clearInterval(gameInterval);
  gameStatus.textContent = `Game Over! Final Score: ${score}`;
  startButton.disabled = false;
}

// Keyboard control
document.addEventListener('keydown', function (event) {
  if (!gameRunning) return;

  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'DOWN') newDirection = 'UP';
      break;
    case 'ArrowDown':
      if (direction !== 'UP') newDirection = 'DOWN';
      break;
    case 'ArrowLeft':
      if (direction !== 'RIGHT') newDirection = 'LEFT';
      break;
    case 'ArrowRight':
      if (direction !== 'LEFT') newDirection = 'RIGHT';
      break;
  }
});
