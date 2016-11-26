var canvas = document.getElementById('snakeCanvas');
var ctx = canvas.getContext('2d');
var fps = 10;
var direction = "right";
var over = false;

document.addEventListener("keypress", function(e) {
  switch (e.charCode) {
    case 105: 
      direction = "up";
      break;
    case 107:
      direction = "down";
      break;
    case 106: 
      direction = "left";
      break;
    case 108:
      direction = "right";
      break;
  }
})

var serpent = new Serpent(canvas.width/2, canvas.width/2, ctx);

runLoop = setInterval(function() {
  serpent.move(direction);
  if (serpent.head.x == canvas.width - serpent.head.width || serpent.head.x == 0 || serpent.head.y == canvas.height - serpent.head.height || serpent.head.y == 0) {
    console.log("Game Over");
    clearInterval(runLoop);
  }
}, 1000/fps);


