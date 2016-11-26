var canvas = document.getElementById('snakeCanvas');
var fps = 10;

var game = new Game(canvas, fps);
highScore();
game.play();

document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 38: 
      game.direction = "up";
      break;
    case 40:
      game.direction = "down";
      break;
    case 37: 
      game.direction = "left";
      break;
    case 39:
      game.direction = "right";
      break;
  }
});

function highScore() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.highScore) {
      if (game.score > localStorage.highScore) localStorage.highScore = game.score;
    } else {
      localStorage.highScore = game.score;
    }
    document.getElementById("highScore").innerHTML = "High Score: " + localStorage.highScore;
  } else {
    document.getElementById("highScore").innerHTML = "Sorry, no web storage.";
  }
}

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function(e) {
  game.reset();
});