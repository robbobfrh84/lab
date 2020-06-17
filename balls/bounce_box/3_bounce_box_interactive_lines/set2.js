const set2 = function(){

  window.cosmos = new Cosmos({
    canvas: document.getElementById("canvas"),
    h: this.canvas.height = window.innerHeight - 35,  // height: match browser height - margin
    w: this.canvas.width = window.innerWidth - 15,    // width: match browser width
    // w: this.canvas.width = 100,    // width: match browser width
    yGravity: 0.1, // 0.1 // pix
    xGravity: 0.0, // pix
    drag: 0.99, // %
    bounce: 0.9, // %
  })

  cosmos.addBall(
    { x: 150, y: 70, vx: 3, vy: 4, r: 12, color: "cornflowerblue" }
  )

  cosmos.addStaticObject(
    { shape: 'line', sx: 100, sy:100, ex: 600, ey: 350, bounce: 0.9, color: "#222" }
  )

  function animate() {
    if (nextFrame) {
      cosmos.update()
      pause = true
      nextFrame = false
    }
    if (!pause) cosmos.update()
    requestAnimationFrame(animate)
  }

  animate()

  pause = true

}
