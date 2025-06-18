let playerX, playerY;
let playerSize = 20;
let cellSize = 40;
let fase = 1;
let alertedWin = false;

let maze1 = [
  "111111111",
  "100010001",
  "111010111",
  "100000001",
  "101111101",
  "100000101",
  "101110111",
  "100000001",
  "111111111"
];

let maze2 = [
  "111111111",
  "100000001",
  "101111101",
  "100000001",
  "111011111",
  "100000001",
  "101111101",
  "100000001",
  "111111111"
];

// Novo labirinto para a Fase 3 - Caminhão vai da direita para a esquerda
let maze3 = [
  "111111111",
  "101000001", // Caminho mais aberto à direita
  "101111101",
  "101000001",
  "101011111",
  "101000001",
  "101111101",
  "100000001", // Caminho mais aberto à esquerda
  "111111111",
];


let maze = maze1;

function setup() {
  createCanvas(cellSize * maze[0].length, cellSize * maze.length);
  textAlign(CENTER, CENTER);
  textSize(cellSize * 0.8);
  playerX = 1;
  playerY = 1;
}

function draw() {
  background(51);

  // Desenha o labirinto
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === '1') {
        fill(100, 100, 200);
      } else {
        fill(20);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  if (fase === 1) {
    // Jogador: cesta de frutas
    text("🍓", playerX * cellSize + cellSize / 2, playerY * cellSize + cellSize / 2);
    // Objetivo: fazendeiro
    text("👨‍🌾", 7 * cellSize + cellSize / 2, 7 * cellSize + cellSize / 2);

    // Vitória da fase 1
    if (playerX === 7 && playerY === 7 && !alertedWin) {
      alert("Fase 1 completa! Agora o fazendeiro vai até o caminhão! 🚛");
      // Troca para fase 2
      maze = maze2;
      playerX = 1; // Posição X inicial do fazendeiro na fase 2
      playerY = 7; // Posição Y inicial do fazendeiro na fase 2
      fase = 2;
      alertedWin = false; // Reset para a próxima fase
    }

  } else if (fase === 2) {
    // Jogador: fazendeiro
    text("👨‍🌾", playerX * cellSize + cellSize / 2, playerY * cellSize + cellSize / 2);
    // Objetivo: caminhão
    text("🚛", 7 * cellSize + cellSize / 2, 1 * cellSize + cellSize / 2); // Caminhão é o objetivo

    // Vitória da fase 2
    if (playerX === 7 && playerY === 1 && !alertedWin) { // Coordenadas do caminhão
      alert("Fase 2 completa! Agora o caminhão leva os produtos para a cidade! 🏙️");
      // Troca para fase 3
      maze = maze3;
      playerX = 7; // Posição X inicial do caminhão na fase 3 (direita)
      playerY = 1; // Posição Y inicial do caminhão na fase 3 (topo)
      fase = 3;
      alertedWin = false; // Reset para a próxima fase
    }

  } else if (fase === 3) {
    // Jogador: caminhão
    text("🚛", playerX * cellSize + cellSize / 2, playerY * cellSize + cellSize / 2);
    // Objetivo: cidade (agora na esquerda)
    text("🏙️", 1 * cellSize + cellSize / 2, 1 * cellSize + cellSize / 2); // Cidade é o objetivo (esquerda)

    // Vitória da fase 3
    if (playerX === 1 && playerY === 1 && !alertedWin) { // Coordenadas da cidade (esquerda)
      alert("Parabéns! O caminhão chegou à cidade! 🎉🏙️");
      alertedWin = true; // Mantém a mensagem de vitória uma única vez
    }
  }
}

function keyPressed() {
  let newX = playerX;
  let newY = playerY;

  if (keyCode === UP_ARROW) newY--;
  else if (keyCode === DOWN_ARROW) newY++;
  else if (keyCode === LEFT_ARROW) newX--;
  else if (keyCode === RIGHT_ARROW) newX++;

  if (
    newX >= 0 && newX < maze[0].length &&
    newY >= 0 && newY < maze.length &&
    maze[newY][newX] === '0'
  ) {
    playerX = newX;
    playerY = newY;
  }
}