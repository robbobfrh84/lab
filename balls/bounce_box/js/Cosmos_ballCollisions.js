Cosmos.prototype.ballCollisions = function(b1) {

  // Check every ball! 🏀⚾️🥎
  this.balls.forEach( b2 =>{

    // Make sure we're not checking the same ball!? 🤯( ⚾️ !== ⚾️)
    if (b1 !== b2) {

      // Get distance between CENTER of balls 🎯<-- ? --> 🎯
      const dist = b1.distance(b2)
      const nextDist = b1.nextDistance(b2)

      //
      //
      // ! Just checking for the next move solved on instance of being "caught"
      // I think maybe the dictionary idea of not doing it in order may be an interesting test.
      //
      //

      // If that distance is less than 0, they OVERLAP 💥aka: A collition!💥
      if (dist <= 0 && nextDist <= 0) {

        // 🏹Get the specific angle of velocity for each ball
        const angs = [ b1.angle(), b2.angle() ]

        // ⚔️Get the angle of collition 💥
        const a = Math.atan2(b2.y - b1.y, b2.x - b1.x)

        // 🐖Get the masses of both balls
        const m = [ b1.m, b2.m ]

        //
        const v = [ b1.velocity(), b2.velocity() ]

        //
        b1.vx = (v[0] * Math.cos(angs[0] - a)
          * (m[0]-m[1])
          + 2*m[1]*v[1]
          * Math.cos(angs[1] - a))
          / (m[0]+m[1])
          * Math.cos(a)
          + v[0]
          * Math.sin(angs[0]-a)
          * Math.cos(a+Math.PI/2)

        // 🔄 Same equation for y axis, and for the other ball with diff vars.
        b1.vy = (v[0] * Math.cos(angs[0] - a) * (m[0]-m[1]) + 2*m[1]*v[1]*Math.cos(angs[1] - a)) / (m[0]+m[1]) * Math.sin(a) + v[0]*Math.sin(angs[0]-a) * Math.sin(a+Math.PI/2)
        b2.vx = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.cos(a) + v[1]*Math.sin(angs[1]-a) * Math.cos(a+Math.PI/2)
        b2.vy = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.sin(a) + v[1]*Math.sin(angs[1]-a) * Math.sin(a+Math.PI/2)

        const nextDist = b1.nextDistance(b2)
        // console.log("dist, nextDist :", dist, nextDist)
        if (nextDist <= 0) {
          // console.log("\n\n- ! Still overlap")
          console.log(dist, nextDist, dist > nextDist)
          // console.log("b1 :", b1)
          // console.log("b2 :", b2)

          // b1.x += b1.vx+1
          // b1.y += b1.vy+1
          // b2.x += b2.vx+1
          // b2.y += b2.vy+1
          // const x = 2
          // b1.x += b1.vx*x
          // b1.y += b1.vy*x
          // b2.x += b2.vx*x
          // b2.y += b2.vy*x
        }

      }
    }
  })
}
