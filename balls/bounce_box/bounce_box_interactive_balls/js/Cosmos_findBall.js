Cosmos.prototype.findBall = function({x,y}) {

  // Check every ball! 🏀⚾️🥎
  this.balls.forEach( b => {
    // console.log("b :", b)
    const xDif = Math.abs(b.x - x)
    const yDif = Math.abs(b.y - y)
    console.log("b :", b)

    if (xDif < b.r & yDif < b.r) {
      console.log("b :", b)
      b.x = x
      b.y = y
      b.vx = 0
      b.vy = 0
      b.static = true
    }

  })

}
