class Ball {

  constructor(params) {
    Object.assign(this, params)
    this.getVelocity()
    this.getAngle()
    this.getMass()
    this.getVelocityAxisRatio()
  }

  getAngle() { this.a = Math.atan2(this.y - this.vy, this.x - this.vx) }

  getMass() { this.m = Math.pow(this.r, 3) }

  getVelocity() {
    // this.vx = Math.abs(this.oldx - this.x)
    // this.vy = Math.abs(this.oldy - this.y)

    const a = Math.abs(this.vx)
    const b = Math.abs(this.vx)

    this.v = Math.sqrt(a**2 + b**2)
  }

  getVelocityAxisRatio(impactFriction) {
    const tot = Math.abs(this.vx) + Math.abs(this.vy)
    this.vxp = (Math.abs(this.vx) / tot) * impactFriction
    this.vyp = (Math.abs(this.vy) / tot) * impactFriction
  }

  distance(otherBall) {
    const x = otherBall.x - this.x
    const y = otherBall.y - this.y
    return Math.sqrt(x * x + y * y)
  }

  updateLocation(drag, xGravity, yGravity){
    this.x += this.vx + xGravity
    this.y += this.vy + yGravity
    this.vx = (this.vx * drag) + xGravity
    this.vy = (this.vy * drag) + yGravity
  }

  bounce(d,loc,v,impactFriction) {
    this.getVelocityAxisRatio(impactFriction)
    this[d] = loc
    this["v"+d] = v
    if (Math.abs(this["v"+d+"p"]) > Math.abs(this["v"+d])) {
      console.log('LESS')
      this["v"+d] = 0
    }

  }


}
