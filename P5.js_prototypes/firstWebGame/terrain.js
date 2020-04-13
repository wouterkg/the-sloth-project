let cellSize;
let gridSize = 8;
let noiseOffset = 0;

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  stroke(255);
  strokeWeight(10);
  cellSize = width / 8;




}

function draw() {
  background(0);
  drawGrid();
  noiseOffset+=0.01;
}

function drawGrid(){
  for(let i = 0; i < gridSize; i++) {
    for(let k = 0; k < gridSize; k++) {
      fill(noise(i + noiseOffset,k + noiseOffset)*255);
      rect(i*cellSize,k*cellSize,cellSize,cellSize);
    }
  }
}
