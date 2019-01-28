const PetriDish = function(params){

  this.createCanvas = function(params){
    this.canvas = new this.Canvas(params)
  }

  this.createOrganism = function(params){
    if (!this.organisms) this.organisms = []
    const org = new this.Organism(params)
    org.id = _getId()
    org.createdAt = Date.now()
    org.canvas = this.canvas
    org.newWonderDirection(org.wonderSpeed, org.wonderSpeed*-1)
    while (org.checkOrganisms(org.getNext(0), this.organisms)) { // find random location that isn't overlapping anohter org.
      org.x = _random(org.r+1,this.canvas.width-org.r-1)
      org.y = _random(org.r+1,this.canvas.height-org.r-1)
    }
    this.organisms.push( org )
  }

  this.animate = function(){
    this.canvas.clear()
    this.organisms.map( o => o.action(this.organisms, this.canvas) )
    requestAnimationFrame( this.animate.bind(this) )
  }

}
