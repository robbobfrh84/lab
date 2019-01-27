window.onload = function(){

  const dish = new PetriDish({
    canvasId: "mainCanvas",
    width: window.innerWidth,
    height: window.innerHeight,
    offsetHeight: document.getElementById("navBar").clientHeight,
  })

  dish.createOrganism({
    name: "Evam",
    x: 20, y: 50,
    dx: 2, dy: 1, // Should just have an ex and dx. math will determine step. or dx,yx is created dynamically.
    r: 10,
    s: 5,
    spd: 1,
    col: "rgba(0,0,0,0.5)",
    sCol: "rgba(0,0,0,0.5)",
  })

  dish.start()

}
