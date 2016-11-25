var canvas = document.getElementById('snakeCanvas');
var ctx = canvas.getContext('2d')

var seg = new Segment(10, 10, ctx);
seg.draw();

document.addEventListener("keypress", function(e) {
  console.log(e.charCode);
  ctx.clear
  switch (e.charCode) {
    case 105: 
      seg.moveUp();
      break;
    case 107:
      seg.moveDown();
      break;
    case 106: 
      seg.moveLeft();
      break;
    case 108:
      seg.moveRight();
      break;
  }
})