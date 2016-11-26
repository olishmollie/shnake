class Game {
  constructor(canvas, fps) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.serpent = new Serpent(canvas.width/2, canvas.height/2, this.ctx);
    this.fps = fps;
    this.treatPos = {
      x: null,
      y: null
    };
  }

  get over() {
    return this.outOfBounds || this.serpent.touchingSelf;
  }

  get outOfBounds() {
    return this.serpent.head.x > canvas.width - this.serpent.head.width || this.serpent.head.x < 0 || this.serpent.head.y > canvas.height - this.serpent.head.height || this.serpent.head.y < 0;
  }

  set direction(direction) {
    this.serpent.head.direction = direction;
  }

  play() {
    var game = this;
    var loop = setInterval(function() {
      game.serpent.move();
      game.resetTreat();
      game.writeCount();
      if (game.over) {
        console.log("Game Over");
        clearInterval(loop);
      }
    }, 1000/this.fps);
    this.offerTreat();
  }

  offerTreat() {
    function randTen(max) {
      var num = Math.floor((Math.random() * max));
      return parseInt(num/10, 10)*10;
    }
    this.treatPos.x = randTen(this.canvas.width);
    this.treatPos.y = randTen(this.canvas.height);
    this.ctx.fillStyle = "rgb(255, 0, 0)";
    this.ctx.fillRect(this.treatPos.x, this.treatPos.y, 10, 10);
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    console.log("Treat x: " + this.treatPos.x + " Treat y: " + this.treatPos.y);
  }

  resetTreat() {
    if (this.serpent.head.x == this.treatPos.x && this.serpent.head.y == this.treatPos.y) {
      this.serpent.addSegment();
      this.offerTreat();
    }
  }

  writeCount() {
    var snakeLength = document.getElementById('snakeLength');
    snakeLength.innerHTML = "Snake Length: " + this.serpent.length;
  }
}