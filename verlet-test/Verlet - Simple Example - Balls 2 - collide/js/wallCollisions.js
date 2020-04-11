Cosmos.prototype.wallCollisions = function(b, vx, vy) {
  if (!this.isDragging) { // Ground friction
    if (b.y > this.h - 1) vx *= this.groundFriction
    b.x += vx
    b.y += vy
    b.y += this.gravity
  }
  if (b.x > this.w - b.r) { // 👉 check right wall
    b.x = this.w - b.r
    b.oldx = b.x + vx * this.bounce
  }
  if (b.x < b.r) { // 👈 check left wall
    b.x = b.r
    b.oldx = b.x + vx * this.bounce
  }
  if (b.y > this.h - b.r) { // 👇 check bottom wall
    b.y = this.h - b.r
    b.oldy = b.y + vy * this.bounce
  }
  if (b.y < b.r) { // 👆 check top wall
    b.y = b.r
    b.oldy = b.y + vy * this.bounce
  }
}
