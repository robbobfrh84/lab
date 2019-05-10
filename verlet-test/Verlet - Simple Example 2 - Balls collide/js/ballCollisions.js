Cosmos.prototype.ballCollisions = function(b1, vx, vy) {
  this.balls.forEach(b2=>{
    if (b1 !== b2) {
      const dist = this.distance(b1, b2) - b1.r - b2.r
      if (dist <= 0) {
        console.log(dist)
        //
        //
        const angs = [ this.angle(b1), this.angle(b2) ]
        const a = Math.atan2(b2.y - b1.y, b2.x - b1.x)
        const m = [ b1.r, b2.r ]
        const v = [ Math.abs(b1.x = b1.oldx), Math.abs(b2.x = b2.oldx)]
        b1.x = (v[0] * Math.cos(angs[0] - a) * (m[0]-m[1])
          + 2*m[1]*v[1]*Math.cos(angs[1] - a)) / (m[0]+m[1])
          * Math.cos(a) + v[0]*Math.sin(angs[0]-a) * Math.cos(a+Math.PI/2)
        b1.y = (v[0] * Math.cos(angs[0] - a) * (m[0]-m[1])
          + 2*m[1]*v[1]*Math.cos(angs[1] - a)) / (m[0]+m[1])
          * Math.sin(a) + v[0]*Math.sin(angs[0]-a) * Math.sin(a+Math.PI/2)
        b2.x = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0])
          + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1])
          * Math.cos(a) + v[1]*Math.sin(angs[1]-a) * Math.cos(a+Math.PI/2)
        b2.y = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0])
          + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1])
          * Math.sin(a) + v[1]*Math.sin(angs[1]-a) * Math.sin(a+Math.PI/2)
        //
        //
      }
    }
  })
}
