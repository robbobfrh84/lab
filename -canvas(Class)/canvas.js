class canvas {

  new (id, width, height) {
    this.ctx = document.getElementById(id).getContext('2d')
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
  }

  line (startX, startY, endX, endY, strokeColor, lineWidth) {
    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(endX,endY)
    this.paint( lineWidth || 1, strokeColor || 'black' )
    this.ctx.fill()
    this.ctx.stroke()
  }

  cir (centerX, centerY, radius, fillColor, lineWidth, strokeColor) {
    this.arc(0, Math.PI*2, centerX, centerY, radius, fillColor, lineWidth, strokeColor)
  }

  arc (p1, p2, centerX, centerY, radius, fillColor, lineWidth, strokeColor) {
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, radius, p1, p2)
    this.paint( lineWidth || 0, strokeColor || 'black', fillColor || 'black' )
    this.ctx.fill()
    if (lineWidth) this.ctx.stroke() // flipp .stroke() & .fill() to put fill on top, making it static rather than 1/2 covered by stroke
  }

  rec (startX, startY, endX, endY, fillColor, lineWidth, strokeColor) {
    this.ctx.beginPath()
    this.ctx.rect(startX, startY, endX, endY)
    this.paint( lineWidth || 0, strokeColor || 'black', fillColor || 'black' )
    this.ctx.fill()
    if (lineWidth) this.ctx.stroke() // flipp .stroke() & .fill() to put fill on top, making it static rather than 1/2 covered by stroke
  }

  path (startX, startY, points, lineWidth, strokeColor, fillColor) {
    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    for (const p of points) {
      if (p[0] === 'l') this.ctx.lineTo(p[1],p[2])
      if (p[0] === 'q') this.ctx.quadraticCurveTo(p[1],p[2],p[3],p[4])
      if (p[0] === 'b') this.ctx.bezierCurveTo(p[1],p[2],p[3],p[4],p[5],p[6])

    }

    this.paint( lineWidth || 1, strokeColor || 'black', fillColor || 'black'  )
    if (fillColor) this.ctx.fill()
    this.ctx.stroke()
  }

  text (content, x, y, font, style, fillColor) {
    this.ctx.font = font+'px '+style
    this.ctx.fillStyle = fillColor
    this.ctx.fillText(content, x, y)
  }

  clear () {
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
  }

  scale (s1, s2) {
    this.ctx.scale(s1, s2)
  }

  paint (width, stroke, fill) {
    this.ctx.fillStyle = fill
    this.ctx.lineWidth = width
    this.ctx.strokeStyle = stroke
  }

}
