class Game {

  readyGame() { // * 👀 Order Matters!
    this.score = 0
    this.respawnCountdowns = []
    this.snake = S.snake.map(s=>({...s}))
    this.moveLoc = S.starting_direction
    this.gameState = "ready"
    this.getOpenBlocks()
    this.setStartingFood()
    buildGrid()
    placeSnake(this.snake)
    placeFood(this.food)
    updateScore(this.score)
  }

  start() {
    if (this.gameState === "gameOver") { this.readyGame() }
    clearStartRestartBtn()
    this.gameState = "playing"
    this.animation = setInterval(() => { this.move() }, S.starting_speed)
  }

  move() { // * 👀 Order Matters! 
    this.moveSnake() // * Needs to be first, because all logic is based on new locations
    this.getOpenBlocks() // * After moveSnake because we need new snake location to see what blocks are open.
    // this.checkFood_ahead()
    // this.checkDigesting() 
    // this.startDigesting()
    this.checkNewFood()
    this.checkRespawn()
    this.setMoveLocation = this.moveLoc // * we need this so that when you press up,left quickly while going right you change the locatoin twice and the original location isn't tricked, so it allows the doubleback.
    clearGrid()
    placeSnake(this.snake)
    placeFood(this.food)
    updateScore(this.score)
  }

  getOpenBlocks() {
    const blockers = [ this.snake, this.food ]
    this.openBlocks = []
    for (let r = 1; r <= S.gridSize.r; r++) {
      for (let c = 1; c <= S.gridSize.c; c++) {
        const isBlocked = blockers.some(blocks => blocks?.some(obj => obj.r === r && obj.c === c))
        if (!isBlocked) {
          this.openBlocks.push({r,c})
        }
      }
    }
  }

  updateMoveLoc(moveLoc, arrowDir, isDown) { // * Called by events.js 
    this.moveLoc = (moveLoc.axis !==  this.setMoveLocation.axis) ? moveLoc :  this.setMoveLocation
    toggleArrow(arrowDir, isDown)
  }

  gameOver() {
    if (this.gameState !== "gameOver") { // * Prevents double fire (keyup, keydown)
      this.gameState = "gameOver"
      clearInterval(this.animation)
      handleGameOver(this.snake, this.score)
    }
  }

  /* 🐍 Snake Logic 🐍 */
  moveSnake({ axis, dir } = this.moveLoc) {
    const newR = this.get_new_head_location({ axis, dir })
    const currentSnake = this.snake.map(pos => ({ ...pos }))
    for (let i = 1; i < this.snake.length; i++) {
      this.snake[i].r = currentSnake[i-1].r
      this.snake[i].c = currentSnake[i-1].c
    }
    this.snake[0][axis] = newR
    this.checkSelfCollision()
  }

  get_new_head_location({ axis, dir }) {
    let newR = this.snake[0][axis] + dir 
    if (newR < 1) {
      newR = S.gridSize[axis]
    } else if (newR > S.gridSize[axis]) {
      newR = 1
    }
    return newR
  }

  // checkFood_ahead() {
  //   let foodNear = false
  //   this.food.forEach( food => {
  //     let dr = Math.abs(this.snake[0].r - food.r)
  //     let dc = Math.abs(this.snake[0].c - food.c)
  //     dr = Math.min(dr, S.gridSize.r - dr) // * This checks wraparound edges of near food.
  //     dc = Math.min(dc, S.gridSize.c - dc)
  //     if (dr + dc === 1) { foodNear = true } 
  //   })
  //   this.snake[0].s = foodNear ? "mouthOpen" : "head"
  // }

  checkNewFood() {
    const head = this.snake[0]
    const eatenIndex = this.food.findIndex(food => head.r === food.r && head.c === food.c)
    if (eatenIndex !== -1) {
      const tail = this.snake[this.snake.length - 1]
      tail.s = 'body'
      this.snake.push({ r: tail.r, c: tail.c, s: "tail" })
      this.removeFood(eatenIndex)
      this.hasEaten = true
      this.score++
      this.respawnCountdowns.push(S.respawn_food_delay)
    }
  }

  // startDigesting() { 
  //   if (this.hasEaten) {
  //     const neck = this.snake[1]
  //     this.snake[1].s = 'digesting'
  //     this.hasEaten = false
  //   }
  // }

  // checkDigesting() {
  //   const shiftDigest = []
  //   this.snake.forEach( (block, i) => {
  //     if (block.s === 'digesting') {
  //       block.s = 'body'
  //       shiftDigest.push(i+1)
  //     }
  //   })
  //   shiftDigest.forEach( index => {
  //     if (this.snake[index].s !== 'tail') {
  //       this.snake[index].s = 'digesting'
  //     }
  //   })
  // }

  checkSelfCollision() {
    const head = this.snake[0]
    const hitSelfBlock = this.snake.filter(p => p.r === head.r && p.c === head.c)[1]
    if (hitSelfBlock) {
      hitSelfBlock.s = "hitSelf"
      this.gameOver()
    }
  }

  /* 🍎 Food Logic 🍎 */
  setStartingFood() {
    this.food = []
    for (let i = 0; i < S.startingFood; i++) {
      this.setFood(i)
    }
  }

  setFood(foodIndex) {
    const openBlockIndex = random(0,this.openBlocks.length -1 )
    const foodBlock = this.openBlocks[openBlockIndex]
    this.openBlocks.splice(openBlockIndex, 1)
    const foods = Object.keys(S.sprites.food)
    const randomKey = foods[random(0, foods.length - 1)]
    foodBlock.s = randomKey
    this.food[foodIndex] = foodBlock
  }

  removeFood(index) {
    this.food.splice(index, 1)
  }

  checkRespawn() {
    for (let i = 0; i < this.respawnCountdowns.length; i++) {
      this.respawnCountdowns[i]--
      if (this.respawnCountdowns[i] === 0) {
        this.respawnCountdowns.splice(i, 1)
        if (this.openBlocks.length > 0) {
          this.setFood(this.food.length)
        }        
      }
    }
  }

}











