window.onload = function(){

  const dish = new PetriDish()

  dish.createCanvas({
    canvasId: "mainCanvas",
    width: window.innerWidth,
    height: window.innerHeight - document.getElementById("navBar").clientHeight
  })

  for (var i = 0; i < 20; i++) {
    const radius = _random(10,20)
    dish.createOrganism({
      r: radius,
      s: _random(1,4),
      x: _random(radius+1,dish.canvas.width-radius-1),
      y: _random(radius+1,dish.canvas.height-radius-1),
      wonderSpeed: 0.5, // pixels per move
      col: "rgba(0,0,0,0.5)",
      sCol: "rgba(0,0,0,0.5)",
    })
  }

  // dish.createOrganism({
  //   name: "Evam",
  //   x: 80,
  //   y: 100,
  //   dx: 0.01, dy: 0.2, // Should just have an ex and dx. math will determine step. or dx,yx is created dynamically.
  //   r: 20,
  //   s: 5,
  //   wonderSpeed: 0.5, // pixels per move
  //   col: "rgba(0,0,0,0.5)",
  //   sCol: "rgba(0,0,0,0.5)",
  // })
  //
  // dish.createOrganism({
  //   name: "Evam2",
  //   x: 110,
  //   y: 210,
  //   dx: 0.05, dy: -0.5, // Should just have an ex and dx. math will determine step. or dx,yx is created dynamically.
  //   r: 18,
  //   s: 5,
  //   wonderSpeed: 0.5, // pixels per move
  //   col: "rgba(0,0,0,0.5)",
  //   sCol: "rgba(0,0,0,0.5)",
  // })

  dish.animate()

}
