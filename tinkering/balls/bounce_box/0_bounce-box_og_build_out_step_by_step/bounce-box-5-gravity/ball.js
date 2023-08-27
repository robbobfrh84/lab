class BounceBox {

  constructor(params) {
    this.id = document.getElementById(params.id)
    this.boxWidth = params.boxWidth   || window.innerWidth - 10
    this.boxHeight = params.boxHeight || window.innerHeight - 50
    this.pause = params.pause         || false
    this.gravityOn = params.gravityOn || false
    this.dragOn = params.dragOn       || true
    this.gravity = params.gravity || 0.025
    this.collisionLoss = params.collisionLoss || 0.9
    this.balls = []
    this.start()
    this.go()
  }

  start() {
    this.id.style.width = this.boxWidth + 'px'
    this.id.style.height = this.boxHeight + 'px'
  }

  go() {
    if (!this.pause) {
      if (this.gravityOn) {
        this.applyGravity()
      }
      this.update()
    }
    requestAnimationFrame(this.go.bind(this))
  }

  update(){
    for (var i = 0; i < this.balls.length; i++) {
      this.solveCollisions()
      this.checkOverlap()
      this.balls.map( b => this.solveWallCollision(b) )
    }
    this.moveObjects()
    this.balls.map( b => {
      b.lastVX.shift(); b.lastVX.push(Math.abs(b.vy))
      b.lastVY.shift(); b.lastVY.push(Math.abs(b.vy))
      if (b.lastVX.reduce((x,y)=>x+=y) > 2/b.r
      ||  b.lastVY.reduce((x,y)=>x+=y) > 2/b.r){
        b.draw()
      }
    })
  }

  addBall(params) {
    if (!params) params = {}
    const radius = params.radius ? params.radius : this.random(4,30)
    this.balls.push(new BounceBox.Ball({
      r: radius,
      vx: params.vx || this.random(-15,15)/5,
      vy: params.vy || this.random(-15,15)/5,
      x: params.x || this.random(radius,(this.boxWidth-(radius))),
      y: params.y || this.random(radius,(this.boxHeight-(radius))),
      mass: Math.pow(radius, 3),
      color: params.color || this.rgbR(),
      parent: this
    }))
    this.update()
  }

  createBallDiv(elm, params){
    elm.style.backgroundColor = params.color
    elm.style.width = params.r*2+'px'
    elm.style.height = params.r*2+'px'
    elm.style.left = params.x+'px'
    elm.style.top = params.y+'px'
    elm.classList.add('balls')
    box.appendChild(elm)
  }

  solveCollisions() {
    for (const b1 of this.balls) {
      for (const b2 of this.balls) {
        if (b1 !== b2 && this.nextMove(b1, b2) <= 0) {
          const angs = [ b1.angle(), b2.angle() ]
          const a = Math.atan2(b2.y - b1.y, b2.x - b1.x)
          const m = [ b1.mass, b2.mass ]
          const v = [ b1.speed(), b2.speed()]
          b1.vx = (v[0] * Math.cos(angs[0] - a) * (m[0]-m[1]) + 2*m[1]*v[1]*Math.cos(angs[1] - a)) / (m[0]+m[1]) * Math.cos(a) + v[0]*Math.sin(angs[0]-a) * Math.cos(a+Math.PI/2)
          b1.vy = (v[0] * Math.cos(angs[0] - a) * (m[0]-m[1]) + 2*m[1]*v[1]*Math.cos(angs[1] - a)) / (m[0]+m[1]) * Math.sin(a) + v[0]*Math.sin(angs[0]-a) * Math.sin(a+Math.PI/2)
          b2.vx = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.cos(a) + v[1]*Math.sin(angs[1]-a) * Math.cos(a+Math.PI/2)
          b2.vy = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.sin(a) + v[1]*Math.sin(angs[1]-a) * Math.sin(a+Math.PI/2)
          if (this.gravityOn) {
            this.setCollisionLoss(b1)
            this.setCollisionLoss(b2)
          }
        }
      }
      this.solveWallCollision(b1)
    }
  }

  checkOverlap(){
    for (const b1 of this.balls) {
      for (const b2 of this.balls) {
        if (b1 !== b2 && this.distance(b1, b2) < b1.r + b2.r) {
          this.fixOverlap(b1, b2)
        }
      }
    }
  }

  fixOverlap(b1, b2) {
    const theta = Math.atan2( (b1.y - b2.y), (b1.x - b2.x) )
    const overlap = b1.r + b2.r - this.distance (b1, b2)
    let smaller = b1.r < b2.r ? b1 : b2
    smaller.x -= overlap * Math.cos(theta)
    smaller.y -= overlap * Math.sin(theta)
  }

  solveWallCollision(b) {

    if (b.x - b.r + b.vx < 0 || b.x + b.r + b.vx > this.boxWidth) {
      b.vx *= -1
      if (this.gravityOn) b.vx *= 0.7; b.vy *= 0.9;
      if (this.gravityOn && b.vx < 1 && b.vx > -1) b.vx *= 0.5
    }
    if (b.y - b.r + b.vy < 0) b.vy *= -1
    if (b.y + b.r + b.vy >= this.boxHeight) {
      b.vy *= -1
      if (this.gravityOn) b.vy *= 0.7; b.vx *= 0.9
      if (b.onGround() == true && this.gravityOn) b.vy += this.gravity/b.r
      if (this.gravityOn && b.vy < 1 && b.vy > -1) b.vy *= 0.5
    }
    // 👇 aligns with edges
    if (b.y + b.r > this.boxHeight) { b.y = this.boxHeight - b.r }
    if (b.y - b.r < 0) b.y = b.r
    if (b.x + b.r > this.boxWidth) b.x = this.boxWidth - b.r
    if (b.x - b.r < 0) b.x = b.r
  }

  setCollisionLoss(b){
    b.vx *= this.collisionLoss; b.vy *= this.collisionLoss
    if (this.gravityOn && b.vy < 1 && b.vy > -1) b.vy *= 0.5
    if (this.gravityOn && b.xy < 1 && b.xy > -1) b.xy *= 0.5
  }

  nextMove(a, b) {
    return Math.sqrt((a.x+a.vx-b.x-b.vx)**2 + (a.y+a.vy-b.y-b.vy)**2) - a.r - b.r
  }

  distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2)
  }

  applyGravity(){
    this.balls.map( b => { if (b.onGround()==false ) { b.vy += this.gravity*b.r }})
  }

  moveObjects() {
    this.balls.map( b => { b.x += b.vx;  b.y += b.vy })
  }

  random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  rgbR(){
    return 'rgb('+this.random(0,255)+','+this.random(0,255)+','+this.random(0,255)+')'
  }

}

BounceBox.Ball = class {

  constructor(params) {
    Object.assign(this, params)
    this.elm = document.createElement('div')
    this.lastVX = [1,1,1]
    this.lastVY = [1,1,1]
    this.parent.createBallDiv(this.elm, params)
  }

  draw() {
    this.elm.style.left = (this.x - this.r) + 'px'
    this.elm.style.top = (this.y - this.r) + 'px'
  }

  speed() { return Math.sqrt(this.vx * this.vx + this.vy * this.vy) }
  angle() { return Math.atan2(this.vy, this.vx) }
  onGround() { return (this.y + this.r >= this.parent.boxHeight )}

}
