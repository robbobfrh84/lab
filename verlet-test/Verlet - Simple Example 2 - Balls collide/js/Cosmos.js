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
      this.ballCollisions(b, vx, vy)
      this.wallCollisions(b, vx, vy)
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

  distance(p0, p1) {
    const x = p1.x - p0.x
    const y = p1.y - p0.y
    return Math.sqrt(x * x + y * y)
  }

  angle(b) {
    return Math.atan2(b.oldy, b.oldx)
  }

}
