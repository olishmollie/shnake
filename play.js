var canvas = document.getElementById('snakeCanvas');
var fps = 10;

var game = new Game(canvas, fps);
game.play();

document.addEventListener("keypress", function(e) {
  switch (e.charCode) {
    case 105: 
      game.direction = "up";
      break;
    case 107:
      game.direction = "down";
      break;
    case 106: 
      game.direction = "left";
      break;
    case 108:
      game.direction = "right";
      break;
  }
});












