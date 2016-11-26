class Segment {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.height = 10;
    this.width = 10;
  }

  moveTo(newX, newY) {
    this.clear();
    this.draw(newX, newY);
    this.x = newX;
    this.y = newY;
  }

  draw(x, y) {
    this.ctx.fillRect(x, y, this.height, this.width);
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.height, this.width);
  }
}

class Head extends Segment {

  move(direction) {
    switch (direction) {
      case "up":
        this.moveTo(this.x, this.y - this.height);
        break;
      case "down":
        this.moveTo(this.x, this.y + this.height);
        break;
      case "left":
        this.moveTo(this.x - this.width, this.y);
        break;
      case "right":
        this.moveTo(this.x + this.width, this.y);
        break;
    }
  }
}


class Serpent {
  constructor(x, y, ctx) {
    this.head = new Head(x, y, ctx);
    this.segments = [this.head];
  }

  move(direction) {
    // for (var i = 1; i < this.segments.length; i++) {
    //   this.segments[i].targetX = this.segments[i - 1].x;
    //   this.segments[i].targetY = this.segments[i - 1].y;
    // }
    this.head.move(direction);
    // for (var i = 1; i < this.segments.length; i++) {
    //   this.segments[i].moveTo(this.segments[i].targetX, this.segments[i].targetY);
    // }
  }

  get tail() {
    return this.segments[this.segments.length - 1];
  }

  addSegment() {
    var newSeg = new Segment(this.tail.x, this.tail.y, this.ctx);
    this.segments.push(newSeg);
  }
}