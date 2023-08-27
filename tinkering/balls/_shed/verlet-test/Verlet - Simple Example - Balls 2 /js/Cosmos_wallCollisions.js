Cosmos.prototype.wallCollisions = function(b) {

  // if (b.y > this.h - 1) b.vx *= this.staticFriction
  // b.x += b.vx
  // b.y += b.vy
  // b.y += this.yGravity

  if (b.x > this.w - b.r) { // 👉 check right wall
    b.x = this.w - b.r
    b.vx *= (this.bounce*-1)
  }
  if (b.x < b.r) { // 👈 check left wall
    b.x = b.r
    b.vx *= (this.bounce*-1)
  }
  if (b.y > this.h - b.r) { // 👇 check bottom wall
    b.y = this.h - b.r 
    b.vy *= (this.bounce*-1)
  }
  if (b.y < b.r) { // 👆 check top wall
    b.y = b.r
    b.vy *= (this.bounce*-1)
  }

}
