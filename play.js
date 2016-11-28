var canvas = document.getElementById('snakeCanvas');
var fps = 10;

var game = new Game(canvas, fps);
highScore();
game.play();

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

var bufferSize = 70;

canvas.addEventListener("touchstart", function(e) {
  e.preventDefault();
  var x = parseInt(getTouchXPos(canvas, e)/10, 10)*10
  var y = parseInt(getTouchYPos(canvas, e)/10, 10)*10;
  var head = game.serpent.head;

  if (x.between(head.x - bufferSize, head.x + bufferSize) && y <= head.y) { 
    if (game.direction != "down") game.direction = "up" 
  } else if (x.between(head.x - bufferSize, head.x + bufferSize) && y >= head.y) { 
    if (game.direction != "up") game.direction = "down" 
  } else if (y.between(head.y - bufferSize, head.y + bufferSize) && x <= head.x) { 
    if (game.direction != "right") game.direction = "left" 
  }
  else if (y.between(head.y - bufferSize, head.y + bufferSize) && x >= head.x) { 
    if (game.direction != "left") game.direction = "right" 
  }
  else { 
    console.log("Touched in unknown direction") 
  };
});

canvas.addEventListener("click", function(e) {
  e.preventDefault();
  var rect = canvas.getBoundingClientRect();
  var x = parseInt((e.clientX - rect.left)/10)*10;
  var y = parseInt((e.clientY - rect.top)/10)*10;
  var head = game.serpent.head;

  if (x.between(head.x - bufferSize, head.x + bufferSize) && y <= head.y) { 
    if (game.direction != "down") game.direction = "up" 
  } else if (x.between(head.x - bufferSize, head.x + bufferSize) && y >= head.y) { 
    if (game.direction != "up") game.direction = "down" 
  } else if (y.between(head.y - bufferSize, head.y + bufferSize) && x <= head.x) { 
    if (game.direction != "right") game.direction = "left" 
  } else if (y.between(head.y - bufferSize, head.y + bufferSize) && x >= head.x) { 
    if (game.direction != "left") game.direction = "right" 
  } else { 
    console.log("Clicked in unknown direction");
  };
})

function getTouchXPos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return e.touches["0"].clientX - rect.left;
}

function getTouchYPos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return e.touches["0"].clientY - rect.top;
}

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