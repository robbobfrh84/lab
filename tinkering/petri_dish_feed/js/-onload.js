window.onload = function(){

  let Dish = new PetriDish()
  Dish.pause = false
  const startingPopulation = 50
  let startingFood = 500
  const minRadius = 12
  const maxRadius = 20
  const foodOpacity = 0.6

  Dish.createCanvas({
    canvasId: "mainCanvas",
    width: window.innerWidth,
    height: window.innerHeight
  })

  for (let i = 0; i < startingPopulation; i++) {
    const radius = _random(minRadius,maxRadius)
    const opacty = 0.6

    Dish.createOrganism({
      id: _getId(),
      state: "wondering",
      focus: ()=>{ return _random(0,100)}, // if random 0 is returned, org will change wondering direction.
      r: radius,
      s: _random(3,6),
      x: _random(radius+1,Dish.canvas.width-radius-1),
      y: _random(radius+1,Dish.canvas.height-radius-1),
      wonderSpeed: 0.5, // pixels per move
      col: 'rgba('+_random(30,50)+', '+_random(80,100)+', '+_random(30,50),
      sCol: "rgba(255,255,255,0.3)",
      colOpacity: opacty
    })

  }

  function createFood(foods){
    while (foods > 0) {
      const borderPadding = 10
      const bunchCount = _random(2,5)
      const bunchLocationX = _random(borderPadding,Dish.canvas.width-borderPadding)
      const bunchLocationY = _random(borderPadding,Dish.canvas.height-borderPadding)
      for (let j = 0; j <= bunchCount; j++) {
        if (foods > 0) {
          const radius = _random(5,30)/10
          Dish.createFood({
            id: _getId(),
            state: "fresh",
            x: bunchLocationX + _random(-4,4),
            y: bunchLocationY + _random(-4,4),
            col: 'rgba('+_random(125,175)+', '+_random(50,100)+', '+_random(50,100),
            colOpacity: foodOpacity,
            r: radius,
          })
        }
        foods--
      }
    }
  }

  createFood(startingFood)

  setInterval(function(){
    createFood(_random(0,10))
  }, 2000)

  Dish.animate()

  _mouseEvents(Dish, foodOpacity)

}
