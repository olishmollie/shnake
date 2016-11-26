class Segment {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.height = 10;
    this.width = 10;
    this.currAxis;
  }

  chase() {
    this.moveTo(this.targetX, this.targetY);
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
  constructor(x, y, ctx) {
    super(x, y, ctx);
    this.direction;
    this.draw(x, y);
  }

  move() {
    console.log(this.direction);
    switch (this.direction) {
      case "up":
        this.moveTo(this.x, this.y - this.height);
        this.currAxis = "-y";
        break;
      case "down":
        this.moveTo(this.x, this.y + this.height);
        this.currAxis = "+y";
        break;
      case "left":
        this.moveTo(this.x - this.width, this.y);
        this.currAxis = "-x";
        break;
      case "right":
        this.moveTo(this.x + this.width, this.y);
        this.currAxis = "+x";
        break;
    }
  }
}

class Serpent {
  constructor(x, y, ctx, direction = "right") {
    this.head = new Head(x, y, ctx, direction);
    this.segments = [this.head];
    this.ctx = ctx;
  }

  move() {
    for (var i = 1; i < this.segments.length; i++) {
      this.segments[i].targetX = this.segments[i - 1].x;
      this.segments[i].targetY = this.segments[i - 1].y;
      if (this.segments[i].x == this.segments[i].targetX && this.segments[i].targetY > this.segments[i].y) this.segments[i].currAxis = "+y";
      if (this.segments[i].y == this.segments[i].targetY && this.segments[i].targetX > this.segments[i].x) this.segments[i].currAxis = "+x";
      if (this.segments[i].x == this.segments[i].targetX && this.segments[i].targetY < this.segments[i].y) this.segments[i].currAxis = "-y";
      if (this.segments[i].y == this.segments[i].targetY && this.segments[i].targetX < this.segments[i].x) this.segments[i].currAxis = "-x";
    }
    
    this.head.move();
    
    for (i = 1; i < this.segments.length; i++) {
      this.segments[i].chase();
    }

  }

  get length() {
    return this.segments.length;
  }

  get tail() {
    return this.segments[this.segments.length - 1];
  }

  get touchingSelf() {
    for (var i = 1; i < this.segments.length; i++) {
      var seg = this.segments[i];
      if (this.head.x == seg.x && this.head.y == seg.y) return true;
    }
    return false;
  }

  addSegment() {
    var seg = new Segment(null, null, this.ctx);
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
    this.segments.push(seg);
    seg.draw(seg.x, seg.y);
  }
}