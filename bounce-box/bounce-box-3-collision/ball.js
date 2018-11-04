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
    this.elm.style.left = this.startX+'px'
    this.elm.style.top = this.startY+'px'
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
    // if (!kill) setTimeout(this.move.bind(this), 50)
  }

  checkWall(){
    const left = parseInt(this.elm.style.left.split('px')[0])
    const top = parseInt(this.elm.style.top.split('px')[0])
    if (left >= (boxX - this.r*2) || left <= 0) {
      this.velY *= -1
    }
    if (top >= (boxY - this.r*2) || top <= 0) {
      this.velX *= -1
    }
  }

  checkBalls() {
    for (const b of balls) {
      const xr = Math.abs((b.currX+b.r) - (this.currX+this.r))
      const yr = Math.abs((b.currY+b.r) - (this.currY+this.r))
      const distBetween =  Math.sqrt((xr*xr)+(yr*yr))
      if ( b !== this && distBetween < (b.r+this.r) ) {
        console.log(this.color, this.r, this.velX, this.velY)
        console.log(b.color, b.r, b.velX, b.velY)
//
//
console.log('-')

        const thisRatio = b.r/this.r
        const bRatio = this.r/b.r
        const absX = Math.abs(this.velX)+Math.abs(this.velY)
        const thisAdjX = thisRatio*absX
        const thisRemainder = absX - thisAdjX

        console.log("thisRatio :", thisRatio)
        console.log("bRatio :", bRatio)
        console.log("absX :", absX)
        console.log("thisAdjX :", thisAdjX)
        console.log("thisRemainder :", thisRemainder)
        console.log(this.velX-thisAdjX)

        const holdX = b.velX, holdY = b.velY
        b.velX = this.velX + thisRemainder
        b.velY = this.velY
        this.velX = this.velX-thisAdjX
        this.velY = holdY
//
//
        // const holdX = b.velX, holdY = b.velY
        // b.velX = this.velX
        // b.velY = this.velY
        // this.velX = holdX
        // this.velY = holdY

        console.log('-\nAFTER')
        console.log('this.r,vX,vY:', this.color, this.r, this.velX, this.velY)
        console.log('   b.r,vX,vY:', b.color, b.r, b.velX, b.velY+'\n')
      }
    }
  }
}
