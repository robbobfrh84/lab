class Cosmos {

  constructor(params) {
    Object.assign(this, params)
    this.ctx = this.setupCanvas()
    this.initialXGravity = this.xGravity
    this.initialYGravity = this.yGravity
    this.balls = []
    this.staticObjects = []
    this.ghostObjects = []
    this.ballCounter = 0
  }

  update() {
    this.updateBallPoints()
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.drawBalls()
    this.drawStaticObjects()
    this.drawGhostObjects()
  }

  // 🏀 Balls Managment 🎾
  updateBallPoints() {
    this.balls.forEach((b1) => {
      this.ballCollisions(b1)
      this.wallCollisions(b1)
      b1.updateLocation(
        this.drag,
        this.xGravity,
        this.yGravity
      )
      this.staticObjectCollisions(b1)
    })
  }

  addBall(ball) {
    this.balls.push(new Ball(ball,this.ballCounter))
    this.ballCounter++
  }

  addStaticObject(object) {
    this.staticObjects.push(object)
  }

  addGhostObject(object){
    this.ghostObjects.push(object)
  }

}
