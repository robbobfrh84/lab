class Dot {

  constructor(params) {
    Object.assign(this, params)
    this.r = this.r || 10
    this.color = this.color || "black"
    this.xProjected = 0
    this.yProjected = 0
    this.scaleProjected = 0 // Scale of the element on 2D (further = smaller)
  }

  project() { // project our 3D element from our perspective
    this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z) // saved our scale based on distance from 'view'
    this.xProjected = (this.x * this.scaleProjected) + PROJECTION_CENTER_X // location in the 2D world
    this.yProjected = (this.y * this.scaleProjected) + PROJECTION_CENTER_Y
  }

  draw() {
    this.project()
    ctx.globalAlpha = Math.abs(1 - this.z / W) // opacity based on depth

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

// dots.push( new Dot({
//   x: 200,
//   y: 100,
//   z: 50,
//   color: "cornflowerblue"
// }))
//
// dots.push( new Dot({
//   x: 0,
//   y: 0,
//   z: 300,
// }))
