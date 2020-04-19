let cellSize;
let terrainMode = false;
let noisy = false;
let noiseMode = false;
let hud = false;
let gridSize = 8;
let zoomFactor = 0.2;
let noiseOffset = { x: 0, y: 0 };

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  stroke(255);
  strokeWeight(10);
  textSize(25);
  noiseSeed('Gargamel');
  cellSize = width / 8;
}

function draw() {
  background(0);
  isKeyDown();
  if(noiseMode) {
    drawNoise();
  } else {
    drawGrid();
  }
  if(noisy){
    incrementNoise(0.01);
  }
  if(hud){
    text(zoomFactor, 10, 30);
    text("x: " + noiseOffset.x + " y: " + noiseOffset.y, 10, 50);
  }
}

function incrementNoise(value){
  noiseOffset.x+=value;
  noiseOffset.y+=value;
}

function drawGrid(){
  for(let i = 0; i < gridSize; i++) {
    for(let k = 0; k < gridSize; k++) {
      let noiseValue = noise(i*zoomFactor + noiseOffset.x,k*zoomFactor + noiseOffset.y);
      if(terrainMode){
        if(noiseValue < 0.33) {
          fill(80,80,150+noiseValue*255);
        } else if(noiseValue >= 0.33 && noiseValue < 0.66) {
          fill(0,noiseValue*255,0);
        } else if(noiseValue >= 0.67) {
          fill(noiseValue*200);
        }
      } else {
        fill(noiseValue*255);
      }
      rect(i*cellSize,k*cellSize,cellSize,cellSize);
    }
  }
}

function drawNoise(){
  for(let i = 0; i < width; i++) {
    for(let k = 0; k < height; k++) {
      let noiseValue = noise(i*zoomFactor + noiseOffset.x,k*zoomFactor + noiseOffset.y);
      let c;
      if(terrainMode){
        if(noiseValue < 0.33) {
          c = color(80,80,150+noiseValue*255);
        } else if(noiseValue >= 0.33 && noiseValue < 0.66) {
          c = color(0,noiseValue*255,0);
        } else if(noiseValue >= 0.67) {
          c = color(noiseValue*200);
        }
      } else {
        c = color(noiseValue*255);
      }
      set(i,k,c);
    }
  }
  updatePixels();
}

function isKeyDown(){
  if (keyIsDown(LEFT_ARROW)) {
    noiseOffset.x -= zoomFactor;
  } else if (keyIsDown(RIGHT_ARROW)) {
    noiseOffset.x += zoomFactor;
  }
  if (keyIsDown(UP_ARROW)) {
    noiseOffset.y -= zoomFactor;
  } else if (keyIsDown(DOWN_ARROW)) {
    noiseOffset.y += zoomFactor;
  }
}

function mouseWheel(event) {
  print(event.delta);
  zoomFactor += event.delta/10000;
  if(zoomFactor < 0) {
    zoomFactor = 0;
  }
  //uncomment to block page scrolling
  // return false;
}

function keyTyped() {
  if (key==='t') {
    terrainMode = !terrainMode;
  } else if (key==="n") {
    noisy = !noisy;
  } else if (key==="m") {
    noiseMode = !noiseMode;
  } else if (key==="h") {
    hud = !hud;
  }
}
