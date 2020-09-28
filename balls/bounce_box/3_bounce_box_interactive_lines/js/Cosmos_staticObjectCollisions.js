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

          const sX = s.ex - s.sx
          const sY = s.ey - s.sy

          const bA = Math.atan(b.vy / (b.vx*-1)) * rA
          const sA = Math.atan((sY*-1) / sX) * rA
          const h = Math.sqrt(b.vx * b.vx + b.vy * b.vy)

          const diff = (bA-sA) * -1
          let angs = diff+sA
          // if (b.vy < 0 ) { angs+=180 }
          // if (b.vx < 0 ) { angs+=180 }

          let testyX = h * Math.cos((angs) * aR)
          let testyY = Math.sqrt( h * h - testyX * testyX )

          if (sA < 0 && b.vx) {
            console.log('ok')
          }

          console.log("sA, bA:", sA, bA)
          console.log("diff :", diff)
          console.log("angs :", angs)
          console.log("h :", h)
          console.log("testyX :", testyX)
          console.log("testyY :", testyY)



          if (!b.inLine) {
            b.inLine = new Ghost({
              shape: 'line',
              sx: b.x,
              sy: b.y,
              ex: b.x - (100 * b.vx),
              ey: b.y - (100 * b.vy),
              color: 'purple'
            })

            b.vx = testyX
            b.vy = testyY

            b.outLine = new Ghost({
              shape: 'line',
              sx: b.x,
              sy: b.y,
              ex: b.x + (100 * b.vx),
              ey: b.y + (100 * b.vy),
              color: 'green'
            })
            cosmos.addGhostObject(b.inLine)
            cosmos.addGhostObject(b.outLine)
          } else {
            b.inLine.sx = b.x
            b.inLine.sy = b.y
            b.inLine.ex = b.x - (100 * b.vx)
            b.inLine.ey = b.y - (100 * b.vy)

            b.vx = testyX
            b.vy = testyY

            b.outLine.sx = b.x
            b.outLine.sy = b.y
            b.outLine.ex = b.x + (100 * b.vx)
            b.outLine.ey = b.y + (100 * b.vy)
          }

        }

        // 🚨Don't forget to add bounce! should it be different than wall daping???
        // b.vx *= (this.bounce*-1)
        // b.vy *= (this.bounce*-1)

      } else {
        s.color = "#222"
      }

    })
  }

}
