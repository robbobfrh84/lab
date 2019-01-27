PetriDish.prototype.Organism = function(params){

  Object.assign(this, params)

  this.move = function(ctx){
    this.x += this.dx
    this.y += this.dy
    this.draw(ctx)
  }

  this.draw = function(ctx){
    ctx.beginPath()
    ctx.fillStyle = this.col
    ctx.lineWidth = this.s
    ctx.strokeStyle = this.sCol
    ctx.arc(this.x, this.y, this.r, 0*Math.PI, 2*Math.PI, true)
    ctx.save();
    ctx.clip();
    ctx.lineWidth *= 2;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

}
