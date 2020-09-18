const set1 = function(){

  window.cosmos = new Cosmos({
    canvas: document.getElementById("canvas"),
    h: this.canvas.height = window.innerHeight - 35,  // height: match browser height - margin
    w: this.canvas.width = window.innerWidth - 15,    // width: match browser width
    yGravity: 0.1, // 0.1 // pix
    xGravity: 0.0, // pix
    drag: 0.99, // %
    bounce: 0.9, // %
    winner: false
  })

  const colors = [
    "cornflowerblue",
    "firebrick",
    "purple",
    "green",
    "darkgoldenrod"
  ]

  const red = 25
  const blue = 75
  const size = 4
  const gap = 1

  const startX = (cosmos.w / 2) - (((size * 2) + gap)*12.5) - (size*2 - gap)
  const startY = 10

  let balls = []
  for (var i = 0; i < red; i++) { balls.push("red") }
  for (var i = 0; i < blue; i++) { balls.push("blue") }

  for (let i = 0; i < 4; i++) {
    const y = startY + (10*i)
    for (let j = 0; j < 25; j++) {
      const x = startX + (10*j)
      const draw = random(0,balls.length-1)
      const color = balls[draw]
      balls.splice(draw,1)
      cosmos.addBall(
        // { x: x, y: y, vx: random(-2,2), vy: random(-2,2), r: 4, color: color }
        { x: x, y: y, vx: random(-2,2), vy: random(-2,2), r: 4, color: colors[random(0,4)] }
      )
    }
  }

  cosmos.drawBalls()

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
