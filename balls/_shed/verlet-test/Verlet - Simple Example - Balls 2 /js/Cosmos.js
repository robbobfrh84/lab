class Cosmos {

  constructor(params) {
    Object.assign(this, params)
    this.ctx = this.canvas.getContext("2d")
    this.balls = []
  }

  update() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.updateBallPoints()
    this.drawBalls()
  }

  // 🏀 Balls Managment 🎾
  updateBallPoints() {
    this.balls.forEach(b => {
      // this.ballCollisions(b, b.vx, b.vy)
      this.wallCollisions(b)
      b.updateLocation(
        this.drag,
        this.xGravity,
        this.yGravity
      )
    })
  }

  addBall(ball) {
    this.balls.push(new Ball(ball))
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
