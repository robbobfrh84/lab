Cosmos.prototype.setupCanvas = function() {
  const dpr = window.devicePixelRatio || 1
  const rect = this.canvas.getBoundingClientRect()
  this.canvas.width = this.w * dpr
  this.canvas.height = this.h * dpr
  const ctx = this.canvas.getContext('2d')
  ctx.scale(dpr, dpr);
  return ctx;
}

Cosmos.prototype.drawBalls = function() {
  // this.ctx.strokeStyle = this.color
  // this.ctx.lineWidth = this.lineWidth
  this.balls.forEach(b => { this.drawCircle(b) })
}

Cosmos.prototype.drawStaticObjects = function() {
  this.staticObjects.forEach( o => { this.drawShapes(o) } )
}

Cosmos.prototype.drawGhostObjects = function() {
  this.ghostObjects.forEach( o => { this.drawShapes(o) } )
}

Cosmos.prototype.drawShapes = function(shape) {
  if (shape.shape === "line") {
    this.ctx.beginPath()
    this.ctx.moveTo(shape.sx, shape.sy)
    this.ctx.lineTo(shape.ex, shape.ey)
    this.ctx.strokeStyle = shape.color
    this.ctx.stroke()
  }
  if (shape.shape === "circle") {
    this.drawCircle(shape)
  }
}

Cosmos.prototype.drawCircle = function(b) {
  this.ctx.beginPath()
  this.ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
  this.ctx.fillStyle = b.color
  this.ctx.fill()
}
