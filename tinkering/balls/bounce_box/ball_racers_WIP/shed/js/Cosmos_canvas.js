Cosmos.prototype.setupCanvas = function() {
  const dpr = window.devicePixelRatio || 1
  const rect = this.canvas.getBoundingClientRect()
  this.canvas.width = this.w * dpr
  this.canvas.height = this.h * dpr
  const ctx = this.canvas.getContext('2d')
  ctx.scale(dpr, dpr);
  return ctx;
}

Cosmos.prototype.drawStaticObjects = function() {
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

Cosmos.prototype.drawBalls = function() {
  this.ctx.strokeStyle = this.color
  this.ctx.lineWidth = this.lineWidth
  this.balls.forEach(b => {
    this.ctx.beginPath()
    this.ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = b.color
    this.ctx.fill()
  })
}
