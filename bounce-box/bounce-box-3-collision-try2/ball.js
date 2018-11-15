class Ball {

  constructor(params) {
    Object.assign(this, params);
    this.collidedWith = {}
    this.createDiv()
    this.move()
  }

  createDiv(params){
    const box = document.getElementById('box')
    this.elm = document.createElement('div')
    this.elm.style.backgroundColor = this.color
    this.elm.style.width = this.r*2+'px'
    this.elm.style.height = this.r*2+'px'
    this.elm.style.left = this.currX+'px'
    this.elm.style.top = this.currY+'px'
    this.elm.classList.add('balls')
    box.appendChild(this.elm)
  }

  move(){
    this.currX = parseInt(this.elm.style.left.split('px')[0]) + this.velX
    this.currY = parseInt(this.elm.style.top.split('px')[0]) + this.velY
    this.elm.style.left = this.currX + 'px'
    this.elm.style.top = this.currY + 'px'
    this.checkBalls()
    this.checkWall()
    // if (!kill) requestAnimationFrame(this.move.bind(this))
    // if (!kill) setTimeout(this.move.bind(this), 20)
  }

  checkWall(){
    const left = parseInt(this.elm.style.left.split('px')[0])
    const top = parseInt(this.elm.style.top.split('px')[0])
    if (left >= (boxX - this.r*2) || left <= 0) {
      this.velX *= -1
    }
    if (top >= (boxY - this.r*2) || top <= 0) {
      this.velY *= -1
    }
  }

  checkBalls() {
    for (const b of balls) {
      if (b!==this & this.checkOverlap(b)) {
        const thisAng = this.getAngle()
        const bAng = b.getAngle()
        const a = Math.atan2(b.currY-this.currY, b.currX-this.currX)
        // const a = Math.atan2(this.currY-b.currY, this.currX-b.currX)

        const thisMass = this.getMass()
        const bMass = b.getMass()
        const thisSpeed = this.getSpeed()
        const bSpeed = b.getSpeed()

        const thisXForce = (thisSpeed * Math.cos(thisAng - a) * (thisMass-bMass) + 2*bMass*bSpeed*Math.cos(bAng - a)) / (thisMass+bMass) * Math.cos(a) + thisSpeed*Math.sin(thisAng-a) * Math.cos(a+Math.PI/2);
        const thisYForce = (thisSpeed * Math.cos(thisAng - a) * (thisMass-bMass) + 2*bMass*bSpeed*Math.cos(bAng - a)) / (thisMass+bMass) * Math.sin(a) + thisSpeed*Math.sin(thisAng-a) * Math.sin(a+Math.PI/2);
        const bXForce = (bSpeed * Math.cos(bAng - a) * (bMass-thisMass) + 2*thisMass*thisSpeed*Math.cos(thisAng - a)) / (thisMass+bMass) * Math.cos(a) + bSpeed*Math.sin(bAng-a) * Math.cos(a+Math.PI/2);
        const bYForce = (bSpeed * Math.cos(bAng - a) * (bMass-thisMass) + 2*thisMass*thisSpeed*Math.cos(thisAng - a)) / (thisMass+bMass) * Math.sin(a) + bSpeed*Math.sin(bAng-a) * Math.sin(a+Math.PI/2);

        this.velX = thisXForce;
        this.velY = thisYForce;
        b.velX = bXForce;
        b.velY = bYForce;

        // this.currX = parseInt(this.elm.style.left.split('px')[0]) + this.velX
        // this.currY = parseInt(this.elm.style.top.split('px')[0]) + this.velY
        // this.elm.style.left = this.currX + 'px'
        // this.elm.style.top = this.currY + 'px'

        // b.currX = parseInt(b.elm.style.left.split('px')[0]) + b.velX
        // b.currY = parseInt(b.elm.style.top.split('px')[0]) + b.velY
        // b.elm.style.left = b.currX + 'px'
        // b.elm.style.top = b.currY + 'px'


        console.log('\n this: ',this.color)
        console.log('thisAng', thisAng)
        console.log('thisMass', thisMass)
        console.log('thisSpeed', thisSpeed)

        console.log('bAng', bAng)
        console.log('bMass', bMass)
        console.log('bSpeed', bSpeed)

        console.log('--- a', a)

      }
    }
  }

  checkOverlap(b){
    const xr = Math.abs((b.currX+b.r) - (this.currX+this.r))
    const yr = Math.abs((b.currY+b.r) - (this.currY+this.r))
    return Math.sqrt((xr*xr)+(yr*yr)) <= (b.r+this.r)
  }

  getAngle(){
    return Math.atan2(this.velY, this.velX);
  }

  getMass(){
    return Math.pow(this.r,3)
  }

  getSpeed(){
    return Math.sqrt(this.velX*this.velX + this.velY*this.velY)
  }
}
