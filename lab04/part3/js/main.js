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
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // keeps ball within canvas bounds
    if (this.x + this.size >= width) {    // exceeds right bounds
      this.velX = -this.velX;
    }
    if (this.x - this.size <= 0) {        // exceeds left bounds
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {   // exceeds lower bounds
      this.velY = -this.velY;
    }
    if (this.y - this.size <= 0) {        // exceeds upper bounds
      this.velY = -this.velY;
    }

    // update coordinates
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        // checks if area overlaps b/w 2 balls
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx*dx + dy*dy)
        
        // collision detected
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
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

// generate 25 balls without randomize size and color
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball (
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball)
}

// generates animation
function loop() {
  // sets canvas fill to semi-transparent black
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // draw and update each ball
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  // request next animation frame
  requestAnimationFrame(loop);
}

loop();