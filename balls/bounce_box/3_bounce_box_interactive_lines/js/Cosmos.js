class Cosmos {

  constructor(params) {
    Object.assign(this, params)
    this.ctx = this.canvas.getContext("2d")
    this.initialXGravity = this.xGravity
    this.initialYGravity = this.yGravity
    this.balls = []
    this.staticObjects = []
  }

  update() {
    this.updateBallPoints()
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.drawBalls()
    this.drawStaticObjects()
  }

  // 🏀 Balls Managment 🎾
  updateBallPoints() {
    this.balls.forEach((b1) => {
      this.ballCollisions(b1)
      b1.updateLocation(
        this.drag,
        this.xGravity,
        this.yGravity
      )
    })
  }

  addBall(ball) {
    this.balls.push(new Ball(ball))
  }

  addStaticObject(object) {
    this.staticObjects.push(object)
  }

  drawStaticObjects() {
    this.staticObjects.forEach( o => {
      if (o.shape === "line") {
        this.ctx.beginPath()
        this.ctx.moveTo(o.sx, o.sy)
        this.ctx.lineTo(o.ex, o.ey)
        this.ctx.fillStyle = o.color
        this.ctx.stroke()
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
