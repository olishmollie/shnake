var canvas = document.getElementById('snakeCanvas');
var fps = 10;

var game = new Game(canvas, fps);
game.play();

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function(e) {
  game.reset();
});