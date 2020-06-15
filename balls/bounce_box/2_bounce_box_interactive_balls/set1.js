const set1 = function(){

  window.cosmos = new Cosmos({
    canvas: document.getElementById("canvas"),
    h: this.canvas.height = window.innerHeight - 35,  // height: match browser height - margin
    w: this.canvas.width = window.innerWidth - 15,    // width: match browser width
    yGravity: 0.1, // 0.1 // pix
    xGravity: 0.0, // pix
    drag: 0.99, // %
    bounce: 0.9, // %
  })

  cosmos.addBall(
    { x: 155, y: 100, vx: 3, vy: 1, r: 8, color: "cornflowerblue" }
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

  cosmos.addBall(
    { x: 151, y: 271, vx: -10, vy: -6, r: 12, color: "green" }
  )

  cosmos.addBall(
    { x: 151, y: 192, vx: -10, vy: -3, r: 12, color: "green" }
  )

  const colors = [
    "cornflowerblue",
    "firebrick",
    "purple",
    "green",
    "darkgoldenrod"
  ]

  for (var i = 0; i < 500; i++) {
    cosmos.addBall({
      id: i,
      x: x = random(50, cosmos.w-50),
      y: y = random(50, cosmos.h-50),
      vx: random(-5,5),
      vy: random(-5,5),
      // r: random(5,15),
      r: random(3,10),
      color: colors[random(0,colors.length-1)]
    })
  }

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
  // togglePause()


}
