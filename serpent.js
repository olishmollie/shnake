class Segment {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.height = 10;
    this.width = 10;
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.height, this.width);
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.height, this.width);
  }

  moveUp() {
    this.clear();
    this.y -= this.height;
    this.draw();
  }

  moveDown() {
    this.clear();
    this.y += this.height;
    this.draw();
  }

  moveRight() {
    this.clear();
    this.x += this.width;
    this.draw();
  }

  moveLeft() {
    this.clear();
    this.x -= this.width;
    this.draw();
  }
}

class Serpent {
  constructor() {
    this.segments = [new Segment()];
    this.head = this.segments[this.segments.length - 1]
  }

  addSegment() {
    this.segments.shift(new Segment());
  }
}