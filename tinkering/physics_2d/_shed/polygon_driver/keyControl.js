const move = {
  ArrowUp:({ym})    => _config.polyA.force.y = ym > _config.polyA.maxMove ? 0: -0.005,
  ArrowDown:({ym})  => _config.polyA.force.y = ym > _config.polyA.maxMove ? 0: 0.005,
  ArrowLeft:({xm})  => _config.polyA.force.x = xm > _config.polyA.maxMove ? 0: -0.005,
  ArrowRight:({xm}) => _config.polyA.force.x = xm > _config.polyA.maxMove ? 0: 0.005,
}

document.body.onkeydown = (( e )=>{
  if (e.code == "Comma") {
    Matter.Body.rotate(_config.polyA, -Math.PI/(90/_config.rotateDegs))
  } else if (e.code == "Period") {
    Matter.Body.rotate(_config.polyA, Math.PI/(90/_config.rotateDegs))
  }

  if (_config.dKeyPressed[e.code]) {
    _config.dKeyPressed[e.code] = "down"
    for (const key in _config.dKeyPressed) {
      if (_config.dKeyPressed[key] == "down") {
        console.log('_config.polyA:',_config.polyA)
        move[key]({
          xm: Math.abs(_config.polyA.position.x-_config.polyA.positionPrev.x),
          ym: Math.abs(_config.polyA.position.y-_config.polyA.positionPrev.y)
        })
      }
    }
  }
})

document.body.onkeyup = ((e)=>{
  if (_config.dKeyPressed[e.code]) {
    _config.dKeyPressed[e.code] = "up"
  }
})
