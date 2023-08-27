PetriDish.prototype.Food = function(params){
  Object.assign(this, params)

  this.action = function(orgs){
    this.canvas.circle(this)
  }

}
