//Setup variables
let canvasSize = 1000;
let segments = 9;
let tileSize = canvasSize / segments;
let gridFinished = false;
let numberOfGenerations = 0;

//Generation variables
let cells = [];
let pastCells = [];

//Cell variables
const deathColor = 255;
const lifeColor = 0;


function setup() {
  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.position(windowWidth/2 - canvasSize/2, windowHeight/2-canvasSize/2);
  background(255);
  frameRate(20);
       
  //initialize first generation
  for(let i = 0; i < segments; i++){
    
    cells[i] = [];
    
    for(let j = 0; j < segments; j++){
      cells[i][j] = new Cell(i, j);
      cells[i][j].display();
    }
  }
}

function draw(){
  //Calculate the new generation
  for (let i = 0; i < cells.length; i++) {
    for(let j = 0; j < cells.length; j++){
      cells[i][j].update();
    }
  }
  
  //Transition to new generation.
  for (let i = 0; i < cells.length; i++) {
    for(let j = 0; j < cells.length; j++){
      cells[i][j].display();
    }
  }
      
  //canvas border
  stroke(0);
  strokeWeight(1);
  noFill();
  square(0, 0, canvasSize);
  
  numberOfGenerations++;
}

class Cell{
  
  constructor(xpos, ypos){
    this.x = xpos;
    this.y = ypos;
    this.c_current = 255;           //all death
    this.c_new = random([0, 255, 255, 255, 255, 255]);   //big bang
  }
  
  update() {
    let n = 0;
    let n_checked = [];
    print('elem: [' + this.x + ',' + this.y + '], c_current: ' + this.c_current + ', c_new: ' + this.c_new);
    
    //check for n of alive neighbours   
    for (let i = -1; i < 2; i++){
      for (let j = -1; j < 2; j++){
        if((this.x+i) >= 0 && (this.y+j) >= 0 && (this.x+i) < segments && (this.y+j) < segments && (i != 0 || j != 0)){ //TO DO: i en j mogen niet beide 0 zijn. 
          if(cells[this.x+i][this.y+j].c_current == 0){ 
            n++;
          }          
          n_checked.push([i,j]);
        }
      }
    }
    
    print('n_of elements checked: ' + n_checked);
    
    switch (n){
      case 0:
        this.c_new = 255; //death
        break;
      case 1:
        this.c_new = 255; //death
        break;
      case 2:
        break;
      case 3:
        this.c_new = 0; //born
        break;
      case 4:
        this.c_new = 255; //death
        break;
      case 5:
        this.c_new = 255; //death
        break;
      case 6:
        this.c_new = 255; //death
        break;
      case 7:
        this.c_new = 255; //death
        break;
      case 8:
        this.c_new = 255; //death
        break;
      default:
        print('wat de hell');
        break;
    }
    
    print('elem: [' + this.x + ',' + this.y + '] , c_current: ' + this.c_current + ', c_new: ' + this.c_new);
  }
  
  display() {
    this.c_current = this.c_new;
    
    stroke(255);
    fill(this.c_current);
    square(this.x*tileSize, this.y*tileSize, tileSize);
  }
}
