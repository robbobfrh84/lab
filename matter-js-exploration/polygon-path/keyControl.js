let polyA

const move = {
  // ArrowUp:({ym})    => polyA.force.y = ym > control.maxMove ? 0: -0.005,
  // ArrowDown:({ym})  => polyA.force.y = ym > control.maxMove ? 0: 0.005,
  // ArrowLeft:({xm})  => polyA.force.x = xm > control.maxMove ? 0: -0.005,
  // ArrowRight:({xm}) => polyA.force.x = xm > control.maxMove ? 0: 0.005,

  ArrowUp:({ym})    => polyA.force.y = -0.01,
  ArrowDown:({ym})  => polyA.force.y = 0.01,
  ArrowLeft:({xm})  => polyA.force.x = -0.01,
  ArrowRight:({xm}) => polyA.force.x = 0.01,
}

document.body.onkeydown = (( e )=>{
  console.log("e.code :", e.code)
  if (e.code == "Comma") {
    Matter.Body.rotate(polyA, -Math.PI/4)
  } else if (e.code == "Period") {
    Matter.Body.rotate(polyA, Math.PI/4)
  }

  if (control.dKeyPressed[e.code]) {
    control.dKeyPressed[e.code] = "down"
    // console.log("control.dKeyPressed :", control.dKeyPressed)
    for (const key in control.dKeyPressed) {
      if (control.dKeyPressed[key] == "down") {
        move[key]({
          xm: Math.abs(polyA.position.x-polyA.positionPrev.x),
          ym: Math.abs(polyA.position.y-polyA.positionPrev.y)
        })
      }
    }
  }
})

document.body.onkeyup = ((e)=>{
  if (control.dKeyPressed[e.code]) {
    control.dKeyPressed[e.code] = "up"
  }
})
