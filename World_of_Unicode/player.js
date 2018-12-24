class Player {

  constructor(params){ // MAKE AUTO!!!
    this.content = params.content,
    this.x = params.x,
    this.y = params.y
  }

  moveTo(axis, dir) {
    const pos = document.getElementById('blk_'+this.x+'_'+this.y)
    this[axis] += dir
    const nextPos = document.getElementById('blk_'+this.x+'_'+this.y)
    if (nextPos && nextPos.textContent === '') {
      nextPos.textContent = this.content
      pos.textContent = ''
    } else {
      this[axis] -= dir
    }
  }

}
