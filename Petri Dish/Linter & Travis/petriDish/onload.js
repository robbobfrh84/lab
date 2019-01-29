window.onload = function(){

  const dish = new PetriDish()

  dish.createCanvas({
    canvasId: "mainCanvas",
    width: window.innerWidth,
    height: window.innerHeight - navBar.clientHeight
  })

  for (var i = 0; i < 30; i++) {
    const radius = _random(10,20)
    dish.createOrganism({
      id: _getId(),
      state: "wondering",
      r: radius,
      s: _random(1,4),
      x: _random(radius+1,dish.canvas.width-radius-1),
      y: _random(radius+1,dish.canvas.height-radius-1),
      wonderSpeed: 0.5, // pixels per move
      col: 'rgb('+_random(50,80)+', '+_random(100,120)+', '+_random(50,80)+')',
      sCol: "rgba(0,30,0,0.5)",
    })
  }

  dish.organisms[0].state = "mitosisReady"

  dish.animate()

  _mouseEvents(dish)

}
