var canvas = document.getElementById('snakeCanvas');
var fps = 10;

var game = new Game(canvas, fps);
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

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function(e) {
  game.reset();
});