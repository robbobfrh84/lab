const set1 = function(){

  window.cosmos = new Cosmos({
    canvas: document.getElementById("canvas"),
    h: this.canvas.height = window.innerHeight - 35,  // height: match browser height - margin
    w: this.canvas.width = window.innerWidth - 15,    // width: match browser width
    yGravity: 0.0, // 0.1 // pix
    xGravity: 0.0, // pix
    drag: 1, // 0.99%
    bounce: 1, // 0.9%
  })

  cosmos.addStaticObject( new Static(
    {
      shape: 'line',
      sx: 100,
      sy: 100,
      ex: 340,
      ey: 280,
      // bounce: 0.9,
      // stoke: 5,
      color: "#222"
    }
  ))

  // cosmos.addBall({ x: 150, y: 70, vx: 3, vy: 4, r: 10, color: "cornflowerblue" })

  // cosmos.addBall({ x: 200, y: 200, vx: 4, vy: -1, r: 10, color: "green" })
  // cosmos.addBall({ x: 220, y: 220, vx: 8, vy: 4, r: 10, color: "green" })

  cosmos.addBall({ x: 300, y: 300, vx: -2, vy: -2, r: 10, color: "brown" })

  // cosmos.addBall({ x: 300, y: 200, vx: -5, vy: 2, r: 10, color: "darkgoldenrod" })


  cosmos.marker = new Ghost(
    { shape: "circle", x: 100, y: 100, r: 2, color: "red" }
  )

  cosmos.addGhostObject(cosmos.marker)
  cosmos.addGhostObject({shape: 'line', sx: 220, sy: 0, ex: 220, ey: cosmos.h, color: "#fbb" })
  cosmos.addGhostObject({shape: 'line', sx: 0, sy: 190, ex: cosmos.w, ey: 190, color: "#bbf" })


  function animate() {
    if (nextFrame) {
      cosmos.update()
      pause = true
      nextFrame = false
    }
    if (!pause) cosmos.update()
    requestAnimationFrame(animate)
  }

  console.log(cosmos)

  cosmos.update()
  animate()

}
