const PetriDish = function(params){

  Object.assign(this, params)

  this.start = function(){
    const canvas = document.getElementById(this.canvasId)
    this.ctx = canvas.getContext("2d")
    this.ctx.canvas.width = this.width
    this.ctx.canvas.height = this.height - this.offsetHeight
    this.animate()
  }

  this.createOrganism = function(params){
    if (!this.organisms) this.organisms = []
    this.organisms.push( new this.Organism(params) )
  }

  this.animate = function(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height )
    this.organisms.map( o => o.move(this.ctx) )
    requestAnimationFrame( this.animate.bind(this) )
  }

}
