
class canvasJS {

  new (id, width, height) {
    this.ctx = document.getElementById(id).getContext('2d')
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
  }

  line (startX, startY, endX, endY, strokeColor, lineWidth) {
    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(endX,endY)
    this.paint( null, lineWidth || 0, strokeColor || 'black' )
    this.ctx.fill()
    this.ctx.stroke()
  }

  cir (centerX, centerY, radius, fillColor, lineWidth, strokeColor) {
    this.arc(0, Math.PI*2, centerX, centerY, radius, fillColor, lineWidth, strokeColor)
  }

  arc (p1, p2, centerX, centerY, radius, fillColor, lineWidth, strokeColor) {
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, radius, p1, p2)
    this.paint( fillColor || 'black', lineWidth || 0, strokeColor || 'black' )
    this.ctx.fill()
    if (lineWidth) this.ctx.stroke() // flipp .stroke() & .fill() to put fill on top, making it static rather than 1/2 covered by stroke
  }

  rec (startX, startY, endX, endY, fillColor, lineWidth, strokeColor) {
    this.ctx.beginPath();
    this.ctx.rect(startX, startY, endX, endY);
    this.paint( fillColor || 'black', lineWidth || 0, strokeColor || 'black' )
    this.ctx.fill()
    if (lineWidth) this.ctx.stroke() // flipp .stroke() & .fill() to put fill on top, making it static rather than 1/2 covered by stroke
  }

  paint (fill, width, stroke) {
    this.ctx.fillStyle = fill
    this.ctx.lineWidth = width
    this.ctx.strokeStyle = stroke
  }

  path () {
    // build array here...
  }

  text (content, x, y, font, style) {
    this.ctx.font = font+'px '+style
    this.ctx.fillText(content, x, y)
  }

  end () {

  }

  scale () {

  }

}
