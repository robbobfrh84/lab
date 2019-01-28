const PetriDish = function(params){

  this.createCanvas = function(params){
    this.canvas = new this.Canvas(params)
  }

  this.createOrganism = function(params){
    if (!this.organisms) this.organisms = []
    this.organisms.push( new this.Organism(params) )
  }

  this.animate = function(){
    this.canvas.clear()
    this.organisms.map( o => o.action(this.organisms, this.canvas) )
    requestAnimationFrame( this.animate.bind(this) )
  }

}
