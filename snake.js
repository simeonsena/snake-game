// Get the canvas and its drawing context
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Set the size of each grid cell and calculate the number of cells
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Initialize the snake as an array of segments (starting with one segment)
let snake = [{ x: 10, y: 10 }];

// Direction the snake is moving (x, y). Starts stationary.
let direction = { x: 0, y: 0 };

// Food position
let food = { x: 5, y: 5 };

// Obstacles positions
let obstacles = [
  { x: 7, y: 7 },
  { x: 12, y: 12 },
  { x: 5, y: 15 }
];

// Game state variables
let gameOver = false;
let score = 0;

// Draw everything on the canvas
function draw() {
  // Clear the canvas
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Draw the obstacles
  ctx.fillStyle = 'gray';
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x * gridSize, obs.y * gridSize, gridSize, gridSize);
  });

  // Draw the snake
  ctx.fillStyle = '#4B006E'; // Dark purple color
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Draw the score
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText('Score: ' + score, 10, 20);
}

// Move the snake by updating its segments
function moveSnake() {
  // Don't move until a direction key is pressed
  if (direction.x === 0 && direction.y === 0) return;

  // Calculate new head position
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Wrap around if snake goes through the wall
if (head.x < 0) head.x = tileCount - 1;
if (head.x >= tileCount) head.x = 0;
if (head.y < 0) head.y = tileCount - 1;
if (head.y >= tileCount) head.y = 0;
  

  // Check collision with itself
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver = true;
    return;
  }

  // Check collision with obstacles
  if (obstacles.some(obs => obs.x === head.x && obs.y === head.y)) {
    gameOver = true;
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check if food is eaten
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood(); // Place new food
  } else {
    snake.pop(); // Remove tail if no food eaten
  }
}

// Place food at a random position not occupied by the snake or obstacles
function placeFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while (
    snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
    obstacles.some(obs => obs.x === newFood.x && obs.y === newFood.y)
  );
  food = newFood;
}

// Main game loop
function gameLoop() {
  if (gameOver) {
    // Show game over screen
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '32px Arial';
    ctx.fillText('Game Over', 110, 200);
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 160, 240);
    ctx.fillText('Press Space to Restart', 90, 280);
    return;
  }
  moveSnake();
  draw();
  setTimeout(gameLoop, 100); // Repeat every 100ms
}

// Handle keyboard input for direction and restart
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 1) break; // Prevent reverse
      direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === -1) break;
      direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 1) break;
      direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === -1) break;
      direction = { x: 1, y: 0 };
      break;
    case ' ':
      if (gameOver) restartGame(); // Restart on spacebar
      break;
  }
});

// Reset game state to start a new game
function restartGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = { x: 5, y: 5 };
  // Reset obstacles or randomize if you want
  obstacles = [
    { x: 7, y: 7 },
    { x: 12, y: 12 },
    { x: 5, y: 15 }
  ];
  gameOver = false;
  score = 0;
  gameLoop();
}

// Initial draw and start the game loop
draw();
gameLoop();