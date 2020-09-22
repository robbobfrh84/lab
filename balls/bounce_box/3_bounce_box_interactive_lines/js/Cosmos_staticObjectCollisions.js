Cosmos.prototype.staticObjectCollisions = function(b) {

  if (!b.static) {
    this.staticObjects.forEach( s => {

      if (
        b.y > s.sy &&
        b.y < s.ey &&
        b.x > s.sx &&
        b.x < s.ex
      ) {
        s.color = "#888"

        this.marker.x = b.x
        let ny = b.x - s.sx
        ny = (ny * (s.sy - s.ey))/(s.sx - s.ex)
        this.marker.y = ny + s.sy

        const x = this.marker.x - b.x
        const y = this.marker.y - b.y
        const dist = Math.sqrt(x * x + y * y) - b.r

        if (dist <= 0) {
          console.log("HIT")
          const bA = Math.atan(b.vx / b.vy) * (180 / Math.PI)
          const sA = Math.atan(4 / 3) * (180 / Math.PI)
          const h = Math.sqrt(b.vx * b.vx + b.vy * b.vy)

          let angs = sA-bA // if (b.vx  > 0 && b.vy > 0)
          // if (b.vx > 0 && b.vy < 0) { angs =  90 - Math.abs(bA+sA) }
          // else if (b.vx < 0 && b.vy < 0) { angs = 180 }

          const testyX = h * Math.cos((angs) * Math.PI/180)
          const testyY = Math.sqrt( h * h - testyX * testyX )

          console.log("sA, bA:", sA, bA)
          console.log("angs :", angs)
          console.log("h :", h)
          console.log("testyX :", testyX)
          console.log("testyY :", testyY)

          cosmos.addGhostObject({
            shape: 'line',
            sx: b.x,
            sy: b.y,
            ex: b.x - (100 * b.vx),
            ey: b.y - (100 * b.vy),
            color: 'purple'
          })

          b.vx = testyX
          b.vy = testyY

          cosmos.addGhostObject({
            shape: 'line',
            sx: b.x,
            sy: b.y,
            ex: b.x + (100 * b.vx),
            ey: b.y + (100 * b.vy),
            color: 'green'
          })

        }

        // b.vx *= (this.bounce*-1)
        // b.vy *= (this.bounce*-1)

      } else {
        s.color = "#222"
      }

    })
  }

}
