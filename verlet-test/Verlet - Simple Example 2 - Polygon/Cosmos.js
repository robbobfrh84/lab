class Cosmos extends Laws {

  constructor(params) {
    super()
    Object.assign(this, params)
    this.ctx = this.canvas.getContext("2d")
    this.buildSticks()
  }

  update() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.updatePoints()
    this.updateSticks()
    this.drawSticks()
  }

  updatePoints() {
    this.points.forEach(p => {
      let vx = (p.x - p.oldx) * this.friction
      let vy = (p.y - p.oldy) * this.friction
      p.oldx = p.x; p.oldy = p.y

      if (!this.isDragging) { // Ground friction
        if (p.y > this.h - 1) vx *= 0.95
        p.x += vx; p.y += vy
        p.y += this.gravity
      }
      if (p.x > this.w) {
        p.x = this.w
        p.oldx = p.x + vx * this.bounce
      }
      if (p.x < 0) {
        p.x = 0
        p.oldx = vx * this.bounce
      }
      if (p.y > this.h) {
        p.y = this.h
        p.oldy = p.y + vy * this.bounce
      }
      if (p.y < 0) {
        p.y = 0
        p.oldy = vy * this.bounce
      }
    })
  }

  updateSticks() {
    this.sticks.map(s => {
      const dx = s.p1.x - s.p0.x
      const dy = s.p1.y - s.p0.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const diff = s.length - dist
      const percent = diff / dist / 2
      const offsetX = dx * percent
      const offsetY = dy * percent
      s.p0.x -= offsetX
      s.p0.y -= offsetY
      s.p1.x += offsetX
      s.p1.y += offsetY
    })
  }

  drawSticks() {
    this.ctx.strokeStyle = this.color
    this.ctx.lineCap = "round"
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath()
    this.sticks.forEach(s => {
      this.ctx.moveTo(s.p0.x, s.p0.y)
      this.ctx.lineTo(s.p1.x, s.p1.y)
    })
    this.ctx.stroke()
  }

}

Cosmos.prototype.buildSticks = function() {
  this.sticks = []
  this.points.map( (point, i) => {
    const next_i = (i + 1) >= this.points.length ? 0 : i + 1
    this.sticks.push({
      p0: this.points[i],
      p1: this.points[next_i],
      length: this.distance( this.points[i], this.points[next_i] )
    })
  })
}
