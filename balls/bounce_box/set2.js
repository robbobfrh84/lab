const set2 = function(){

  window.cosmos = new Cosmos({
    canvas: document.getElementById("canvas"),
    h: this.canvas.height = window.innerHeight - 35,  // height: match browser height - margin
    w: this.canvas.width = window.innerWidth - 15,    // width: match browser width
    yGravity: 0, // 0.1 // pix
    xGravity: 0, // pix
    drag: 0.99, // %
    bounce: 0.9, // %
  })

  cosmos.addBall(
    { x: 155, y: 100, vx: 3, vy: 1, r: 8, color: "cornflowerblue" }
  )

  cosmos.addBall(
    { x: 351, y: 221, vx: -3, vy: -2, r: 25, color: "firebrick" }
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

}
