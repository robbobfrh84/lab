PetriDish.prototype.Organism = function(params){
  Object.assign(this, params)

  this.build = function(orgs, canvas){
    this.id = _getId()
    this.newWonderDirection(this.wonderSpeed, this.wonderSpeed*-1)
    while (this.checkOrganisms(this.getNext(0), orgs)) {
      this.x = _random(this.r+1,canvas.width-this.r-1)
      this.y = _random(this.r+1,canvas.height-this.r-1)
    }
  }

  this.newWonderDirection = function(){
    this.dx = this.wonderSpeed * (_random(1,10)/10) * (Math.random() < 0.5 ? -1 : 1)
    this.dy = this.wonderSpeed * (_random(1,10)/10) * (Math.random() < 0.5 ? -1 : 1)
  }

  this.getNext = function(pad){
    const x = this.x+this.dx+(this.dx > 0 ? pad : pad*-1)
    const y = this.y+this.dy+(this.dy > 0 ? pad : pad*-1)
    return { x, y }
  }

  this.checkWall = function({ x, y }, w , h) {
    if (x > w || x < 0 || y > h || y < 0) {
      this.newWonderDirection()
      this.checkWall(w, h)
    }
  }

  this.checkOrganisms = function({ x, y }, orgs){
    let hasOverlap = false
    for (const o of orgs) {
      if (o.id !== this.id) {
        const [ a, b ] = [ Math.abs(o.x - x), Math.abs(o.y - y) ]
        const d = Math.sqrt( (b*b) + (a*a) )
        if (d <= (this.r + o.r)) {
          this.newWonderDirection()
          hasOverlap = true
        }
      }
    }
    return hasOverlap
  }

  this.action = function(orgs, canvas){
    if (!this.id) this.build(orgs, canvas)
    this.checkWall(this.getNext(this.r+5), canvas.width, canvas.height)
    this.checkOrganisms(this.getNext(0), orgs)
    if (!_random(0,50)) this.newWonderDirection()
    this.x += this.dx
    this.y += this.dy
    canvas.circle(this)
  }

}
