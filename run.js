var canvas = document.getElementById('snakeCanvas');
var ctx = canvas.getContext('2d');
var fps = 5;
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

var seg = new Segment(canvas.width/2, canvas.height/2, ctx);

function run(direction) {
  seg.move(direction);
}
runLoop = setInterval(function() {
  run(direction);
  if (seg.x == canvas.width - seg.width || seg.x == 0 || seg.y == canvas.height - seg.height || seg.y == 0) {
    console.log("Game Over");
    clearInterval(runLoop);
  }
}, 1000/fps);


