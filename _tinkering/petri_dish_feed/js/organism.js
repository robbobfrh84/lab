PetriDish.prototype.Organism = function(params){
  Object.assign(this, params)

  this.swallowingFoods = []
  this.injested = 0

  this.action = function(orgs, foods){
    switch (this.state) {
      case "wondering":
        this.checkOrganisms(this.getNext(0), orgs)
        this.checkFood(this.getNext(0), foods)
        this.digest()
        if (!this.focus()) this.newWonderDirection()
        const noWall = this.checkWall(this.getNext(this.r+5))
        if (noWall) this.move(_random(-2,2)/10, _random(-2,2)/10 )
        break;
      case "swallowing":
        this.swallowing();
        break;
    }
    this.canvas.circle(this);
  }

  this.digest = function(){
    const foodTotal = 0
    this.swallowingFoods.map((f, i)=>{
      if (f.eaten && Date.now()-f.eaten > 3000) {
        if (!f.digested) {
          if (f.colOpacity <= 0.03) {
            this.swallowingFoods[i].digested = Date.now()
          } else {
            this.swallowingFoods[i].colOpacity *= 0.99
          }
        } else {
          if (Date.now() - this.swallowingFoods[i].digested > 3000) {
            this.swallowingFoods[i].colOpacity = 0.1
            this.swallowingFoods[i].col = 'rgba('+_random(20,30)+', '+_random(20,30)+', '+_random(20,30)
            if (!this.swallowingFoods[i].hasPassed) {
              this.injested += this.swallowingFoods[i].r
            }
            this.swallowingFoods[i].hasPassed = true
            f.changeState("poop", f.id)
            this.swallowingFoods.splice(i,1)
            if (this.injested >= 10) {
              // this.state = "mitosisReady" //🚨
            }
          }
        }
      }
    })
  }

  this.swallowing = function() {
    this.state = "wondering"
    this.swallowingFoods.map((f, i)=>{
      if (!this.swallowingFoods[i].eaten) {
        if (f.x-this.x >= 3) { this.swallowingFoods[i].x-=0.2 }
        else if (f.x-this.x <= -3) { this.swallowingFoods[i].x+=0.2 }
        if (f.y-this.y >= 3) { this.swallowingFoods[i].y-=0.2 }
        else if (f.y-this.y <= -3) { this.swallowingFoods[i].y+=0.2 }
      }
      const {x,y} = this.swallowingFoods[i]
      if (Math.abs(x-this.x) <= 3 && Math.abs(y-this.y) <= 3 ) {
        if (!this.swallowingFoods[i].eaten) this.swallowingFoods[i].eaten = Date.now()
      } else if (!this.swallowingFoods[i].eaten){
        this.state = "swallowing"
      }
    })
  }

  this.checkFood = function({ x, y }, foods){
    foods.map((f,i)=>{
      if (f.state === "fresh" || (f.state === "poop" && i > foods.length - 1000 )) {
        const d = _getDist(f.x,x,f.y,y)
        if (d <= (this.r + f.r) && !f.feces) {
          if (this.swallowingFoods.filter(s=>s===f).length === 0) {
            this.state = "swallowing"
            this.swallowingFoods.push(f)
            f.changeState("eaten", f.id) // 😄 IF you DON"T do this. the organisms will still "sort of" interact with the poop. but rather just stick to them for a bit... makes for a realistic and funny stepping on poop effect.
          }
        }
      }
    })
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

  this.newWonderDirection = function(){
    this.dx = this.wonderSpeed * (_random(1,10)/10) * _PN()
    this.dy = this.wonderSpeed * (_random(1,10)/10) * _PN()
  }

  this.getNext = function(pad){
    const x = this.x+this.dx+(this.dx > 0 ? pad : pad*-1)
    const y = this.y+this.dy+(this.dy > 0 ? pad : pad*-1)
    return { x, y }
  }

  this.checkWall = function({ x, y }) {
    const [ w, h ] = [ this.canvas.width, this.canvas.height ]
    if (x > w || x < 0 || y > h || y < 0) {
      this.newWonderDirection()
      return false
    }
    return true
  }

  this.move = function(wX,wY) {
    this.x += this.dx + (wX ? wX : 0)
    this.y += this.dy + (wY ? wY : 0)
    this.swallowingFoods.map(s=>{
      if (s.eaten) {
        s.x+=this.dx + (wX ? wX : 0)
        s.y+=this.dy + (wY ? wY : 0)
      }
    })
  }

}
