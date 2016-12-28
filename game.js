class Game {
  constructor(canvas, fps) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.serpent = new Serpent(canvas.width/2, canvas.height/2, this.ctx);
    this.fps = fps;
    this.treat = new Treat(this.ctx);
    this.addArrowControls();
    this.addTouchControls();
    this.addResetEvent();
  }

  get score() {
    return this.serpent.length;
  }

  get over() {
    return this.outOfBounds || this.serpent.touchingSelf;
  }

  get outOfBounds() {
    return this.serpent.head.x > canvas.width - this.serpent.head.width || this.serpent.head.x < 0 || this.serpent.head.y > canvas.height - this.serpent.head.height || this.serpent.head.y < 0;
  }

  get direction() {
    return this.serpent.head.direction;
  }

  set direction(newDirection) {
    this.serpent.head.direction = newDirection;
  }

  reset() {
    if (game.over) {
      gameOver.style.display = "none";
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.serpent = new Serpent(this.canvas.width/2, this.canvas.height/2, this.ctx);
      this.play();
    }
  }

  play() {
    var game = this;
    var loop = setInterval(function() {
      game.serpent.move();
      game.checkTreat();
      game.offerTreat();
      game.saveScore();
      if (game.over) {
        clearInterval(loop);
        gameOver.style.display = "initial";
      }
    }, 1000/this.fps);
    this.offerTreat();
  }

  offerTreat() {
    this.treat.draw();
  }

  checkTreat() {
    if (this.serpent.head.x == this.treat.x && this.serpent.head.y == this.treat.y) {
      this.serpent.addSegment();
      this.treat = new Treat(this.ctx);
    }
  }

  saveScore() {
    var snakeLength = document.getElementById('snakeLength');
    snakeLength.innerHTML = "Snake Length: " + this.score;
    this.highScore();
  }

  highScore() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.highScore) {
        if (this.score > localStorage.highScore) 
          localStorage.highScore = game.score;
      } else {
        localStorage.highScore = game.score;
      }
      document.getElementById("highScore").innerHTML = "High Score: " + localStorage.highScore;
    } else {
      document.getElementById("highScore").innerHTML = "Sorry, no web storage.";
    }
  }

  addArrowControls() {
    document.addEventListener("keydown", function(e) {
      switch (e.keyCode) {
        case 38: 
          if (game.direction != "down") {
            game.direction = "up";
          }
          break;
        case 40:
          if (game.direction != "up") {
            game.direction = "down";
          }
          break;
        case 37: 
          if (game.direction != "right") {
            game.direction = "left";
          }
          break;
        case 39:
          if (game.direction != "left") {
            game.direction = "right";
          }
          break;
      }
    });
  }

  addTouchControls() {
    canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    var bufferSize = 70;
    var x = parseInt(getTouchXPos(canvas, e)/10, 10)*10
    var y = parseInt(getTouchYPos(canvas, e)/10, 10)*10;
    var head = game.serpent.head;

    function getTouchXPos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      return e.touches["0"].clientX - rect.left;
    }

    function getTouchYPos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      return e.touches["0"].clientY - rect.top;
    }

    switch (game.direction) {
      case "up":
      case "down":
        game.direction = (x <= head.x) ? "left" : "right"
        break;
      case "left":
      case "right":
        game.direction = (y <= head.y) ? "up" : "down"
        break;
      default:
        if (x.between(head.x - bufferSize, head.x + bufferSize) && y <= head.y) { 
          game.direction = "up" 
        } else if (x.between(head.x - bufferSize, head.x + bufferSize) && y >= head.y) { 
            game.direction = "down" 
        } else if (y.between(head.y - bufferSize, head.y + bufferSize) && x <= head.x) { 
            game.direction = "left" 
        } else if (y.between(head.y - bufferSize, head.y + bufferSize) && x >= head.x) { 
            game.direction = "right" 
        } else { 
          console.log("Clicked in unknown direction");
        };
      }
    });
  }

  addResetEvent() {
    var resetButton = document.getElementById("resetButton");
    var game = this;
    resetButton.addEventListener("click", function(e) {
      game.reset();
    });
  }
}