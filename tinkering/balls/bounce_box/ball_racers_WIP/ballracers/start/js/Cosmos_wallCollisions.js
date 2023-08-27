Cosmos.prototype.wallCollisions = function(b) {

  if (b.x > this.w - b.r) { // 👉 check right wall
    b.x = this.w - b.r
    b.vx *= (this.bounce*-1)
  }
  if (b.x < b.r) { // 👈 check left wall
    b.x = b.r
    b.vx *= (this.bounce*-1)
  }
  if (b.y > this.h - b.r) { // 👇 check bottom wall
    if (!this.winner) {
      alert(b.color+" "+b.id+" Wins 😀 !")
      this.winner = true
    }
    b.y = this.h - b.r
    b.vy *= (this.bounce*-1)
  }
  if (b.y < b.r) { // 👆 check top wall
    b.y = b.r
    b.vy *= (this.bounce*-1)
  }

}
