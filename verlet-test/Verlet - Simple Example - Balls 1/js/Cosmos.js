class Cosmos {

  constructor(params) {
    Object.assign(this, params)
    this.ctx = this.canvas.getContext("2d")
  }

  update() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.updatePoints()
    this.drawBalls()
  }

  updatePoints() {
    this.balls.forEach(b => {
      let vx = (b.x - b.oldx) * this.friction
      let vy = (b.y - b.oldy) * this.friction
      b.oldx = b.x; b.oldy = b.y

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
    })
  }

  drawBalls() {
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.balls.forEach(b => {
      this.ctx.beginPath()
      this.ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
      this.ctx.fillStyle = b.color
      this.ctx.fill()
    })
  }

}
