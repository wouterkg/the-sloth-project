let canvassize = 500;
let gridsize = 500/8;
let center = gridsize/2;
let army_size = 3;

function setup(){
  createCanvas(canvassize, canvassize);
  frameRate(30);
  stroke(255);
  fill(132);
  strokeWeight(1); 
}

function draw(){
  drawGrid();
  let txt = 'units left: ' + army_size;
  text(txt, 20, 20);
}


function drawGrid(){
  for(let i = 0; i < gridsize; i++){ //x
    for(let j = 0; j < gridsize; j++){  //y
      fill(123);
      square(i*gridsize, j*gridsize, gridsize);
    }
  }
}

function mouseClicked() {
  let c = getSelectedTile(mouseX, mouseY);
    
  //if tile is empty && < army_size
  fill(0);
  circle(c[0]*gridsize+center, c[1]*gridsize+center, gridsize);
  
  //if not empty, remove one.
  army_size--;
}

function getSelectedTile(x, y){
  print(x, y);
  return [ceil(x/gridsize)-1, ceil(y/gridsize)-1];
}
