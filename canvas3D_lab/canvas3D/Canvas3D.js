class Canvas3D {

  constructor(params) {
    Object.assign(this, params)
    this.canvas = document.getElementById(this.id)
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.cx = this.width / 2
    this.cy = this.height / 2
    this.phi = this.radian(this.viewX)  // φ
    this.theta = this.radian(this.viewY) * -1 // Θ
    this.center = { x: 0, y: 0, z: 0 }
    this.pts = []
    this.shapes = []
  }

  group(g) {
    g.group.points.forEach( pt => {
      this.rotate(pt, this.center, this.theta, this.phi)
      this.pts.push(new this.Point(pt))
    })
    this.shapes = g.group.shapes.map(s => {
      s.pts = s.pts.map(p => this.pts[p])
      return s
    })
  }

  Point = function(pt) { Object.assign(this, pt) }

/* * * * *  🌐 ROTATE VIEW Render 3D, then 2D 🌐  * * * * */

  render3D(viewX, viewY, abs) {
    this.phi = !abs ? this.phi + this.radian(viewX) : this.radian(viewX)  // φ
    this.theta = !abs ? this.theta + this.radian(viewY) : this.radian(viewY) * -1 // Θ
    this.pts.forEach(pt => {
      this.rotate(pt, this.center, this.theta, this.phi)
    })
    this.render()
  }

  rotate(pt,c,t,p) { // shape/elm, this.center, this.thata, this.phi
    const [ ct, st, cp, sp ] = [ Math.cos(t), Math.sin(t), Math.cos(p), Math.sin(p) ]
    const [ x, y, z ] = [ pt.x - c.x, pt.y - c.y, pt.z - c.z ]
    pt.r3x = ct * x - st * cp * y + st * sp * z + c.x
    pt.r3y = st * x + ct * cp * y - ct * sp * z + c.y
    pt.r3z = sp * y + cp * z + c.z
  }

  render2D(pt) {
    const d = (this.width - pt.r3y) / this.width
    const r = ((this.width*0.5) - pt.r3y) / (this.width*0.5)
    pt.r2x = d * pt.r3x
    pt.r2y = d * pt.r3z
    pt.rr = r
  }

  checkEqual(a,b,i){
    if (a.order[i] == b.order[i]) {
      if (a.order.length > i+1 && b.order.length > i+1) {
        return this.checkEqual(a,b,i+1)
      } else {
        return 1
      }
    } else {
      return a.order[i] < b.order[i] ? 1 : -1
    }
  }

  sortDepth(){
    this.shapes.map(s => { // Sort all point within shapes
      s.order = s.pts.map(x=>x.r3y)
      s.order.sort((a,b)=>{
        if (a == b) return 1
        return a > b ? 1 : -1
      })
    })
    this.shapes.sort((a,b)=> this.checkEqual(a,b,0) )
  }

/* * * * *  🌱 RENDER TO CANVAS 2D 🌱  * * * * */

  render_mark(m, p2 = Math.PI * 2) {
    this.ctx.fillStyle = m.fill
    m.pts.forEach(p => this.ctx.arc(p.r2x+this.cx, -p.r2y+this.cy, p.rr*m.r, 0, p2) )
    this.ctx.fill()
  }

  render_path(l) {
    this.ctx.strokeStyle = l.stroke
    this.ctx.moveTo(l.pts[0].r2x + this.cx, -l.pts[0].r2y + this.cy)
    l.pts.forEach(p => {
      this.ctx.lineTo(p.r2x + this.cx, -p.r2y + this.cy)
    })
    if (l.fill) {
      this.ctx.closePath()
      this.ctx.fillStyle = l.fill
    }
    this.ctx.stroke()
    this.ctx.fill()
  }

  render(){
    this.pts.map(pt => this.render2D(pt) )
    this.sortDepth()
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.shapes.forEach( s => {
      this.ctx.beginPath()
      this["render_"+s.type](s)
    })
  }

}

Canvas3D.prototype.radian = function(degree) {
  return degree * Math.PI / 180
}

Canvas3D.prototype.phiDeg = function(radian) {
  return Math.round(radian * 360 / Math.PI / 2)
}

Canvas3D.prototype.thetaDeg = function(radian) {
  return -(Math.round(radian * 360 / Math.PI / 2))
}
