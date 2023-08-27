class Point {

  constructor(params) {
    Object.assign(this, params)
    this.r = this.r || 10
    this.color = this.color || "black"
  }

  project2D() { // project our 3D element from our perspective
    this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z) // saved our scale based on distance from 'view'
    this.xProjected = (this.x * this.scaleProjected) + PROJECTION_CENTER_X // location in the 2D world
    this.yProjected = (this.y * this.scaleProjected) + PROJECTION_CENTER_Y
  }

  draw() {
    this.project2D()
    ctx.beginPath()
    ctx.arc(
      this.xProjected,
      this.yProjected,
      this.r * this.scaleProjected,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = this.color
    ctx.fill()
  }

}
