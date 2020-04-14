let cellSize;
let gridSize = 8;
let noiseOffset = {
  x: 0,
  y: 0
  }

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  stroke(255);
  strokeWeight(10);
  noiseSeed(0);
  // noStroke();
  cellSize = width / 8;




}

function draw() {
  background(0);
  isKeyDown();
  drawGrid();
  // drawNoise();
  noiseOffset.x+=0.01;
  noiseOffset.y+=0.01;
}

function drawGrid(){
  for(let i = 0; i < gridSize; i++) {
    for(let k = 0; k < gridSize; k++) {
      let noiseValue = noise(i*0.2 + noiseOffset.x,k*0.2 + noiseOffset.y);
      // if(noiseValue < 0.33) {
      //   fill("blue");
      // } else if(noiseValue >= 0.33 && noiseValue < 0.66) {
      //   fill("green");
      // } else if(noiseValue >= 0.67) {
      //   fill("grey");
      // }
      fill(noiseValue*255);
      rect(i*cellSize,k*cellSize,cellSize,cellSize);
    }
  }
}

function drawNoise(){
  for(let i = 0; i < width/10; i++) {
    for(let k = 0; k < height/2; k++) {
      let noiseValue = noise(i + noiseOffset,k + noiseOffset);

      if(noiseValue < 0.33) {
        fill("blue");
      } else if(noiseValue >= 0.33 && noiseValue < 0.66) {
        fill("green");
      } else if(noiseValue >= 0.67) {
        fill("grey");
      }
      fill(noiseValue*255);
      rect(i*10,k*10,10,10);
    }
  }
}

function isKeyDown(){
  if (keyIsDown(LEFT_ARROW)) {
    noiseOffset.x -= 0.05;
  } else if (keyIsDown(RIGHT_ARROW)) {
    noiseOffset.x += 0.05;
  } else if (keyIsDown(UP_ARROW)) {
    noiseOffset.y -= 0.05;
  } else if (keyIsDown(DOWN_ARROW)) {
    noiseOffset.y += 0.05;
  }
}
