class Ball {
  /* ********** CONSTRUCTOR ********** */
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  
  /* ********** MUTATORS ********** */
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.createConicGradient(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
  }
}

// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// generates random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generates random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// create instance of Ball and call it's members
const testBall = new Ball(50, 100, 4, 4, "blue", 10);
testBall.x;
testBall.size;
testBall.color;
testBall.draw();