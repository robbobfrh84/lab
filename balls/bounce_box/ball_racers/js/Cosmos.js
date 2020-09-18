class Cosmos {

  constructor(params) {
    Object.assign(this, params)
    this.ctx = this.setupCanvas()
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

}
