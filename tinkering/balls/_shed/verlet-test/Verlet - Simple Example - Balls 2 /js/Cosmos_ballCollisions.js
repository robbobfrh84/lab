Cosmos.prototype.ballCollisions = function(b1, vx, vy) {

  // Check every ball! 🏀⚾️🥎
  this.balls.forEach(b2=>{

    // Make sure we're not checking the same ball!? 🤯( ⚾️ !== ⚾️)
    if (b1 !== b2) {

      // Get distance between CENTER of balls 🎯<-- ? --> 🎯
      // - MINUS the radii of the balls.
      const dist = b1.distance(b2) - b1.r - b2.r

      // If that distance is less than 0, they OVERLAP 💥aka: A collition!💥
      if (dist <= 0) {
        console.log("b1 :", b1.color, b1)
        console.log("dist :", dist)

        //
        const angs = [ b1.a, b2.a ] // 🚨this is more chars????? change vars
        const a = Math.atan2(b2.y - b1.y, b2.x - b1.x)

        // const m = [ b1.r, b2.r ]
        const m = [ b1.m, b2.m ]

        // const v = [ Math.abs(b1.x = b1.oldx), Math.abs(b2.x = b2.oldx)]
        // const b1v = Math.sqrt()
        const v = [ b1.v, b2.v ]
        console.log("v :", v)

        b1.vx = (v[0] * Math.cos(angs[0] - a)
          * (m[0]-m[1])
          + 2*m[1]*v[1]
          * Math.cos(angs[1] - a))
          / (m[0]+m[1])
          * Math.cos(a)
          + v[0]
          * Math.sin(angs[0]-a)
          * Math.cos(a+Math.PI/2)
        b1.vy = (v[0] * Math.cos(angs[0] - a) * (m[0]-m[1]) + 2*m[1]*v[1]*Math.cos(angs[1] - a)) / (m[0]+m[1]) * Math.sin(a) + v[0]*Math.sin(angs[0]-a) * Math.sin(a+Math.PI/2)
        b2.vx = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.cos(a) + v[1]*Math.sin(angs[1]-a) * Math.cos(a+Math.PI/2)
        b2.vy = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.sin(a) + v[1]*Math.sin(angs[1]-a) * Math.sin(a+Math.PI/2)
        //
        // b1.x = (v[0] * Math.cos(angs[0] - a)
        //   * (m[0] - m[1])
        //   + 2 * m[1] * v[1]
        //   * Math.cos(angs[1] - a))
        //   / (m[0] + m[1])
        //   * Math.cos(a)
        //   + v[0]
        //   * Math.sin(angs[0]-a)
        //   * Math.cos(a+Math.PI/2)
        //
        // b1.y = (v[0] * Math.cos(angs[0] - a) * (m[0]-m[1])
        //   + 2*m[1]*v[1]*Math.cos(angs[1] - a)) / (m[0]+m[1])
        //   * Math.sin(a) + v[0]*Math.sin(angs[0]-a) * Math.sin(a+Math.PI/2)
        //
        // b2.x = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0])
        //   + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1])
        //   * Math.cos(a) + v[1]*Math.sin(angs[1]-a) * Math.cos(a+Math.PI/2)
        //
        // b2.y = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0])
        //   + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1])
        //   * Math.sin(a) + v[1]*Math.sin(angs[1]-a) * Math.sin(a+Math.PI/2)
        //
        //

        
        // ⚠️WARNING! THis must also update the   getVelocityAxisRatio() {

      }
    }
  })
}
