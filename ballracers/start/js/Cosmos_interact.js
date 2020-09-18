Cosmos.prototype.findBall = function({x,y}) {

  // Check every ball! 🏀⚾️🥎
  this.balls.forEach( b => {
    const xDif = Math.abs(b.x - x)
    const yDif = Math.abs(b.y - y)

    if (
      xDif < b.r
      && yDif < b.r
      && grabbed != b
    ) {
      b.x = x
      b.y = y
      b.vx = 0
      b.vy = 0
      b.static = true
      grabbed = b
    }

  })

}

Cosmos.prototype.moveBall = function({x,y}) {
  grabbed.x = x
  grabbed.y = y
}

Cosmos.prototype.launchBall = function({x,y}) {
  grabbed.vx = x - grabbed.x
  grabbed.vy = y - grabbed.y
  grabbed.static = false
  grabbed = null
}
