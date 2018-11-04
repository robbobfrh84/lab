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
    this.checkWall()
    if (!kill) requestAnimationFrame(this.move.bind(this)) // OR controll speed with: setTimeout(this.move.bind(this), 200)
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

}
