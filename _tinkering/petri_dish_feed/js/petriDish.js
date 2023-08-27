const PetriDish = function(params){

  this.createCanvas = function(params) {
    this.canvas = new this.Canvas(params)
  }

  this.createOrganism = function(params) {
    if (!this.organisms) this.organisms = []
    const org = new this.Organism(params)
    org.createdAt = Date.now()
    org.canvas = this.canvas
    org.newWonderDirection(org.wonderSpeed, org.wonderSpeed*-1)
    while (org.checkOrganisms(org.getNext(0), this.organisms)) { // find random location that isn't overlapping anohter org.
      org.x = _random(org.r+1,this.canvas.width-org.r-1)
      org.y = _random(org.r+1,this.canvas.height-org.r-1)
    }
    this.organisms.push(org)
  }

  this.createFood = function(params) {
    if (!this.foods) this.foods = []
    const food = new this.Food(params)
    food.createdAt = Date.now()
    food.canvas = this.canvas
    food.changeState = (state,id)=>{this.changeFoodState(state,id)}
    this.foods.push(food)
  }

  this.animate = function() {
    this.canvas.clear()
    this.organisms.map( o => o.action(this.organisms, this.foods) )
    this.foods.map( f => f.action(this.foods) )
    if (!this.pause) requestAnimationFrame( this.animate.bind(this) )
  }

  this.changeFoodState = function(state, id){
    for (var i = 0; i < this.foods.length; i++) {
      if (this.foods[i].id === id) this.foods[i].state = state
    }
  }

}
