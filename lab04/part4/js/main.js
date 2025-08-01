// set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// track number of balls eaten
const ballCount = document.querySelector('#ballCount');
let ballEaten = 0;

// generates a random number b/w min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generates random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // exceeds right bounds
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    // exceeds left bounds
    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    // exceeds lower bounds
    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    // exceeds upper bounds
    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    // update coordinates
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        // checks if area overlaps b/w 2 balls
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // collision detected
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    // exceeds right bounds
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }

    // exceeds left bounds
    if (this.x - this.size <= 0) {
      this.x += this.size;
    }

    // exceeds lower lower bounds
    if (this.y + this.size >= height) {
      this.y -= this.size;
    }

    // exceeds upper bounds
    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        // checks if area overlaps b/w ball and evilBall
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // if collision detected, "eat" ball
        if (distance < this.size + ball.size) {
          ball.exists = false;
          ballEaten += 1;
          ballCount.textContent = ("Ball count: " + ballEaten);
        }
      }
    }
  }
}

// user controlled object
const evilBall = new EvilCircle(0, 0);

// generate 25 balls with randomized size, colors, and initial coordinates
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ensure ball is within canvas bounds
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// generates animation
function loop() {
  // sets canvas fill to semi-transparent black
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  // draw and update each ball
  for (const ball of balls) {
    if (ball.exists) {  
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }

    // draw and update evilBall
    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();
  }

  // request next animation frame
  requestAnimationFrame(loop);
}

loop();

// enables movement of evilBall using WASD keys
window.addEventListener("keydown", e => {
  switch (e.key) {
    case "a":   // move left
      evilBall.x -= evilBall.velX;
      break;
    case "d":   // move right
      evilBall.x += evilBall.velX;
      break;
    case "w":   // move up
      evilBall.y -= evilBall.velY;
      break;
    case "s":   // move down
      evilBall.y += evilBall.velY;
      break;
  }
});