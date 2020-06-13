class Ball {

  constructor(params) {
    Object.assign(this, params)
    // this.mass()
    console.log("this :", this)
  }

  // mass() { this.m = Math.sqrt( this.vx * this.vx + this.vy * this.vy) }

  angle() { return Math.atan2(this.vy, this.vx) }

  velocity() { return Math.sqrt(this.vx * this.vx + this.vy * this.vy) }

  distance(otherBall) {
    const x = otherBall.x - this.x
    const y = otherBall.y - this.y
    return Math.sqrt(x * x + y * y) - this.r - otherBall.r
  }

  nextDistance(otherBall) {
    const x = (otherBall.x + otherBall.vx) - (this.x + this.vx)
    const y = (otherBall.y + otherBall.vy) - (this.y + this.vy)
    return Math.sqrt(x * x + y * y) - this.r - otherBall.r
  }

  updateLocation(drag, xGravity, yGravity){
    this.x += this.vx + xGravity
    this.y += this.vy + yGravity
    this.vx = (this.vx * drag) + xGravity
    this.vy = (this.vy * drag) + yGravity
  }

}
