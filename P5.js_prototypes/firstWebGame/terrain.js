let cellSize;
let terrainMode = false;
let noisy = false;
let gridSize = 8;
let noiseOffset = { x: 0, y: 0 };

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  stroke(255);
  strokeWeight(10);
  noiseSeed('Gargamel');
  cellSize = width / 8;
}

function draw() {
  background(0);
  isKeyDown();
  drawGrid();
  if(noisy){
    incrementNoise(0.01);
  }
}

function incrementNoise(value){
  noiseOffset.x+=value;
  noiseOffset.y+=value;
}

function drawGrid(){
  for(let i = 0; i < gridSize; i++) {
    for(let k = 0; k < gridSize; k++) {
      let noiseValue = noise(i*0.2 + noiseOffset.x,k*0.2 + noiseOffset.y);
      if(terrainMode){
        if(noiseValue < 0.33) {
          fill(80,80,150+noiseValue*255);
        } else if(noiseValue >= 0.33 && noiseValue < 0.66) {
          fill(0,noiseValue*255,0);
        } else if(noiseValue >= 0.67) {
          fill(noiseValue*255);
        }
      } else {
        fill(noiseValue*255);
      }
      rect(i*cellSize,k*cellSize,cellSize,cellSize);
    }
  }
}

function isKeyDown(){
  if (keyIsDown(LEFT_ARROW)) {
    noiseOffset.x -= 0.05;
  } else if (keyIsDown(RIGHT_ARROW)) {
    noiseOffset.x += 0.05;
  }
  if (keyIsDown(UP_ARROW)) {
    noiseOffset.y -= 0.05;
  } else if (keyIsDown(DOWN_ARROW)) {
    noiseOffset.y += 0.05;
  }
}

function keyTyped() {
  if (key==='t') {
    terrainMode = !terrainMode;
  } else if (key==="n") {
    noisy = !noisy;
  }
}
