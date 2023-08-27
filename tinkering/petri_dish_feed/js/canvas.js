PetriDish.prototype.Canvas = function(params){
  Object.assign(this, params)

  this.ctx = document.getElementById(this.canvasId).getContext("2d")
  this.ctx.canvas.width = this.width
  this.ctx.canvas.height = this.height

  this.clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height )
  }

  this.circle = function(obj){
    this.ctx.beginPath()
    this.ctx.fillStyle = obj.col+","+obj.colOpacity+")"
    this.ctx.lineWidth = obj.s
    this.ctx.strokeStyle = obj.sCol
    this.ctx.arc(obj.x, obj.y, obj.r, 0*Math.PI, 2*Math.PI, true)
    if (typeof obj.s !== 'undefined') {
      this.ctx.save()
      this.ctx.clip()
      this.ctx.lineWidth *= 2
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.restore()
    } else {
      this.ctx.fill()
    }
  }

}
