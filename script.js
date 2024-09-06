const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32; // Size of each tile (for a grid)
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

// Pac-Man-like character
const player = {
  x: 1,
  y: 1,
  speed: 1,
  img: new Image(),
  size: tileSize
};

player.img.src = 'galaxygas.png'; // Image for the character

// Define the map (1 = wall, 0 = dot)
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Player movement controls
window.addEventListener('keydown', (e) => {
  let newX = player.x;
  let newY = player.y;
  if (e.key === 'ArrowUp') newY--;
  if (e.key === 'ArrowDown') newY++;
  if (e.key === 'ArrowLeft') newX--;
  if (e.key === 'ArrowRight') newX++;

  // Check for wall collisions
  if (map[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
  }
});

// Draw the map
function drawMap() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (map[row][col] === 1) {
        ctx.fillStyle = '#0000FF'; // Wall color
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      } else if (map[row][col] === 0) {
        ctx.fillStyle = '#FFD700'; // Dot color
        ctx.beginPath();
        ctx.arc(
          col * tileSize + tileSize / 2,
          row * tileSize + tileSize / 2,
          tileSize / 8,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }
}

// Draw the player
function drawPlayer() {
  ctx.drawImage(
    player.img,
    player.x * tileSize,
    player.y * tileSize,
    player.size,
    player.size
  );
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

player.img.onload = () => {
  gameLoop();
};
