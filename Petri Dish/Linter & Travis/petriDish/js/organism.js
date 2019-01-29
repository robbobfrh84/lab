PetriDish.prototype.Organism = function(params){
  Object.assign(this, params)

  this.newWonderDirection = function(){
    this.dx = this.wonderSpeed * (_random(1,10)/10) * _PN()
    this.dy = this.wonderSpeed * (_random(1,10)/10) * _PN()
  }

  this.getNext = function(pad){
    const x = this.x+this.dx+(this.dx > 0 ? pad : pad*-1)
    const y = this.y+this.dy+(this.dy > 0 ? pad : pad*-1)
    return { x, y }
  }

  this.checkWall = function({ x, y }, w , h) {
    if (x > w || x < 0 || y > h || y < 0) {
      this.newWonderDirection()
      this.checkWall(w, h) // this will continue to recheck until new direction is in bounds.
      // we should also check if it's already moving away....
    }
  }

  this.checkOrganisms = function({ x, y }, orgs){
    let hasOverlap = false
    for (const o of orgs) {
      if (o.id !== this.id) {
        const d = _getDist(o.x,x,o.y,y)
        if (d <= (this.r + o.r)) {
          if (d < _getDist(o.x,this.x,o.y,this.y)) this.newWonderDirection() // check to see if the org is moving AWAY from the obj it's overlapping
          hasOverlap = true
        }
      }
    }
    return hasOverlap
  }

  this.wondering = function(orgs){
    this.checkWall(this.getNext(this.r+5), this.canvas.width, this.canvas.height)
    this.checkOrganisms(this.getNext(0), orgs)
    if (!_random(0,100)) this.newWonderDirection()
    this.x += this.dx + (_random(-3,3)/10)
    this.y += this.dy + (_random(-3,3)/10)
    this.canvas.circle(this);
  }

  this.action = function(orgs){
    switch (this.state) {
      case "wondering": this.wondering(orgs); break;
      case "mitosisReady":
        this.canvas.circle(this)
        break;
    }

  }

}
