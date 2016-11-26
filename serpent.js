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
  constructor(x, y, ctx, direction) {
    super(x, y, ctx);
    this.direction = direction;
  }

  move() {
    switch (this.direction) {
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

  get currAxis() {

  }
}

class Serpent {
  constructor(x, y, ctx) {
    this.head = new Head(x, y, ctx);
    this.segments = [this.head];
  }

  move(direction) {
    this.head.direction = direction;

    for (var i = 1; i < this.segments.length; i++) {
      this.segments[i].targetX = this.segments[i - 1].x;
      this.segments[i].targetY = this.segments[i - 1].y;
      
      if (this.segments[i].x == targetX && targetY > this.segments[i].y) this.segments[i].currAxis = "+y";
      if (this.segments[i].y == targetY && targetX > this.segments[i].x) this.segments[i].currAxis = "+x";
      if (this.segments[i].x == targetX && targetY < this.segments[i].y) this.segments[i].currAxis = "-y";
      if (this.segments[i].y == targetX && targetX < this.segments[i].x) this.segments[i].currAxis = "-x";
      this.segments[i].moveTo(this.segments[i].targetX, this.segments[i].targetY);
    }

    this.head.move(direction);
  }

  get tail() {
    return this.segments[this.segments.length - 1];
  }

  addSegment() {
    var seg = new Segment();
    seg.ctx = this.ctx;
    if (this.segments.length > 1) {
      switch (this.tail.currAxis) {
        case "+y":
          seg.x = this.tail.x;
          seg.y = this.tail.y - seg.height;
          break;
        case "+x":
          seg.x = this.tail.x - seg.width;
          seg.y = this.tail.y;
          break;
        case "-y":
          seg.x = this.tail.x;
          seg.y = this.tail.y + seg.height;
          break;
        case "-x":
          seg.x = this.tail.x + seg.width;
          seg.y = this.tail.y;
      }
      seg.draw(seg.x, seg.y);
    } else {
      switch (this.head.direction) {
        case "up":
          seg.x = this.head.x;
          seg.y = this.head.y + seg.height;
          break;
        case "down":
          seg.x = this.head.x;
          seg.y = this.head.y - seg.height;
          break;
        case "left":
          seg.x = this.head.x + seg.width;
          seg.y = this.head.y
          break;
        case "right":
          seg.x = this.head.x - seg.width;
          seg.y = this.head.y;
      } 
    }
  }
}