Cosmos.prototype.ballCollisions = function(b1) {

  // Check every ball! 🏀⚾️🥎
  this.balls.forEach( b2 => {

    // Make sure we're not checking the same ball!? 🤯( ⚾️ !== ⚾️)
    // && we haven't already checked this collition
    if (
      b1 !== b2
      && !b1.collisionLog.includes(b2.id)
      && !b1.static
    ) {

      // Get distance between CENTER of balls 🎯<-- ? --> 🎯
      const dist = b1.distance(b2)
      const nextDist = b1.nextDistance(b2, this.drag, this.xGravity, this.yGravity)

      // If that distance is less than 0, they OVERLAP 💥aka: A collition!💥
      if (dist <= 0 && nextDist <= dist) {

        // 🏹Get the specific angle of velocity for each ball
        const angs = [ b1.angle(), b2.angle() ]

        // ⚔️Get the angle of collition 💥
        const a = Math.atan2(b2.y - b1.y, b2.x - b1.x)

        // 🐖Get the masses of both balls represented as the radius.
        const m = [ b1.r, b2.r ]

        // 🏎Get the speed (velocity) of each ball
        const v = [ b1.velocity(), b2.velocity() ]

        // 🏋️‍♀️A TON of math to calculate the new velocity.
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

        if (!b2.static) {
          b2.vx = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.cos(a) + v[1]*Math.sin(angs[1]-a) * Math.cos(a+Math.PI/2)
          b2.vy = (v[1] * Math.cos(angs[1] - a) * (m[1]-m[0]) + 2*m[0]*v[0]*Math.cos(angs[0] - a)) / (m[0]+m[1]) * Math.sin(a) + v[1]*Math.sin(angs[1]-a) * Math.sin(a+Math.PI/2)
        }

        this.checkOverlap(b1, b2)

        b1.collisionLog.push(b2.id)
        b2.collisionLog.push(b1.id)

      }
    }
  })

  this.wallCollisions(b1)

}

Cosmos.prototype.checkOverlap = function(b1,b2) {

  const newNextDist = b1.nextDistance(b2, this.drag, this.xGravity, this.yGravity)

  // 🍵See if the next move will still overlap.
  if (newNextDist < 0) {

    // 🚨Lets give less "budge" to larger ball
    const xDist = (b1.x - b2.x)
    const yDist = (b1.y - b2.y)
    const centerDist = Math.sqrt(xDist * xDist + yDist * yDist )
    const gap = b2.static ? newNextDist : (newNextDist/2)
    const overlapRatio = Math.abs( gap / centerDist )

    b1.x += (xDist * overlapRatio)
    b1.y += (yDist * overlapRatio)
    b1.vx *= this.bounce
    b1.vy *= this.bounce

    if (!b2.static) {
      b2.x += (xDist * overlapRatio) * -1
      b2.y += (yDist * overlapRatio) * -1
      b2.vx *= this.bounce
      b2.vy *= this.bounce
    }

  }

}
