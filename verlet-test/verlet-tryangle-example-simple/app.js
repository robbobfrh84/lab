/*
  My first step using verlet integration,
  taken from Coding Math by Keith Peters.

  Coding Math: Episode 36 - Verlet Integration Part I
  Coding Math: Episode 37 - Verlet Integration Part II
*/

class World {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.h = this.canvas.height = window.innerHeight;
    this.w = this.canvas.width = window.innerWidth;
    this.ctx.lineWidth = 2;

    this.bounce = 0.9;
    this.gravity = 0.1;
    this.friction = 0.99;

    this.points = [];
    this.points.push({
      x: 100,
      y: 100,
      oldx: 95,
      oldy: 95 });

    this.points.push({
      x: 100,
      y: 200,
      oldx: 105,
      oldy: 201 });

    this.points.push({
      x: 200,
      y: 100,
      oldx: 201,
      oldy: 101 });

    this.sticks = [];
    this.sticks.push({
      p0: this.points[0],
      p1: this.points[1],
      length: this.distance(
      this.points[0],
      this.points[1]) });

    this.sticks.push({
      p0: this.points[1],
      p1: this.points[2],
      length: this.distance(
      this.points[1],
      this.points[2]) });

    this.sticks.push({
      p0: this.points[2],
      p1: this.points[0],
      length: this.distance(
      this.points[2],
      this.points[0]) });


    this.isDragging = false;
    this.canvas.addEventListener(
    "mousedown",
    event => this.onMouseDown(event));
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    document.getElementById("jump").addEventListener(
    "click",
    () => this.onJumpClick());
    document.getElementById("intoWall").addEventListener(
    "click",
    () => this.onIntoWallClick());
  }

  onJumpClick() {
    var p = this.points[0];
    p.oldx = p.x + 5;
    p.oldy = p.y + 50;
  }

  onIntoWallClick() {
    var p0 = this.points[0];
    p0.oldx = p0.x + 50;
    var p1 = this.points[1];
    p1.oldx = p1.x + 50;
  }


  onMouseDown(event) {
    var x = event.clientX;
    var y = event.clientY;
    // Only start dragging if clicked near triangle
    var center = this.average(this.points);
    var circle = { x: center.x, y: center.y, r: 50 };
    if (this.circlePointCollision(x, y, circle)) {
      var p = this.points[0];
      p.x = x;
      p.y = y;
      p.oldx = x;
      p.oldy = y;
      this.isDragging = true;
      this.canvas.addEventListener("mousemove", this.onMouseMove);
      this.canvas.addEventListener("mouseup", this.onMouseUp);
    }
  }

  onMouseMove(event) {
    var p = this.points[0];
    p.oldx = p.x;
    p.oldy = p.y;
    p.x = event.clientX;
    p.y = event.clientY;
  }

  onMouseUp(event) {
    this.isDragging = false;
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
  }

  average(points) {
    var x = points.map(p => p.x).reduce((prev, curr) => prev + curr) / points.length;
    var y = points.map(p => p.y).reduce((prev, curr) => prev + curr) / points.length;
    return { x: x, y: y };
  }

  distance(p0, p1) {
    var x = p1.x - p0.x;
    var y = p1.y - p0.y;
    return Math.sqrt(x * x + y * y);
  }

  distanceXY(x0, y0, x1, y1) {
    var x = x1 - x0;
    var y = y1 - y0;
    return Math.sqrt(x * x + y * y);
  }

  // Coding Math: Episode 14 - Collision Detection
  circlePointCollision(x, y, circle) {
    return this.distanceXY(x, y, circle.x, circle.y) < circle.r;
  }

  update() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.updatePoints();
    this.updateSticks();
    //this.constrainPoints();
    this.drawSticks();
  }

  drawSticks() {
    this.ctx.beginPath();
    this.sticks.forEach(s => {
      this.ctx.moveTo(s.p0.x, s.p0.y);
      this.ctx.lineTo(s.p1.x, s.p1.y);
    });
    this.ctx.stroke();
  }

  updatePoints() {
    this.points.forEach(p => {
      var vx = (p.x - p.oldx) * this.friction;
      var vy = (p.y - p.oldy) * this.friction;
      p.oldx = p.x;
      p.oldy = p.y;
      if (!this.isDragging) {
        // Ground friction
        if (p.y > this.h - 1) {
          vx *= 0.95;
        }
        p.x += vx;
        p.y += vy;
        p.y += this.gravity;
      }
      if (p.x > this.w) {
        p.x = this.w;
        p.oldx = p.x + vx * this.bounce;
      }
      if (p.x < 0) {
        p.x = 0;
        p.oldx = vx * this.bounce;
      }

      if (p.y > this.h) {
        p.y = this.h;
        p.oldy = p.y + vy * this.bounce;
      }

      if (p.y < 0) {
        p.y = 0;
        p.oldy = vy * this.bounce;
      }
    });
  }

  updateSticks() {
    this.sticks.forEach(s => {
      var dx = s.p1.x - s.p0.x;
      var dy = s.p1.y - s.p0.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var diff = s.length - dist;
      var percent = diff / dist / 2;
      var offsetX = dx * percent;
      var offsetY = dy * percent;
      s.p0.x -= offsetX;
      s.p0.y -= offsetY;
      s.p1.x += offsetX;
      s.p1.y += offsetY;
    });
  }}



var world = new World();

function animate() {
  world.update();
  requestAnimationFrame(animate);
}

animate();
