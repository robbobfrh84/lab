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
    { x: 50, y: 50, vx: 3, vy: 1, r: 12, color: "cornflowerblue" }
  )

  cosmos.addBall(
    { x: 351, y: 221, vx: -3, vy: -2, r: 25, color: "firebrick" }
  )

  cosmos.addBall(
    { x: 451, y: 321, vx: 10, vy: -6, r: 15, color: "darkgoldenrod" }
  )

  cosmos.addBall(
    { x: 151, y: 321, vx: 10, vy: -6, r: 20, color: "purple" }
  )

  cosmos.addBall(
    { x: 151, y: 221, vx: -10, vy: -6, r: 12, color: "green" }
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

  // pause = true

}
