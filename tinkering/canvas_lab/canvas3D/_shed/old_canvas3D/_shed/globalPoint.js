class GlobalPoint {

  constructor(params) {

    Object.assign(this, params)

    const h = Math.sqrt( (this.y*this.y) + (this.x*this.x) )
    this.rGlobe = Math.sqrt( (h*h) + (this.z*this.z) )

    this.lat = Math.asin(this.z/this.rGlobe) * 180 / Math.PI
    this.lng = Math.atan2(this.y,this.x) * 180 / Math.PI

    // this.phi = Math.asin(this.z/this.rGlobe)
    // this.theta = Math.atan2(this.y,this.x)

    console.log("this.x, this.y, this.z :", this.x, this.y, this.z)
    console.log('Cordinate(lat, lng, rGlobe): ', this.lat, this.lng, this.rGlobe)
    console.log('Radient(phi,theta,radius): ', this.phi, this.theta )
    console.log('\n')
  }

  project(sin, cos) {
    const rotX = cos * this.x + sin * (this.rGlobe)
    const rotZ = -sin * this.x + cos * (this.rGlobe)
    this.sizeProjection = PERSPECTIVE / (PERSPECTIVE - rotZ)
    this.xProject = (rotX * this.sizeProjection) + PROJECTION_CENTER_X
    this.yProject = (this.y * this.sizeProjection) + PROJECTION_CENTER_Y
  }

  draw(sin, cos) {
    this.project(sin, cos)
    ctx.beginPath()
    ctx.arc(
      this.xProject,
      this.yProject,
      this.r * this.sizeProjection,
      0,
      Math.PI * 2
    )
    // ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
  }

}
