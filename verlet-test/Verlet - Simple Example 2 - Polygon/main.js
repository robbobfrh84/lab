const cosmos = new Cosmos({
  canvas: document.getElementById("canvas"),
  h: this.canvas.height = window.innerHeight - 15,  // height: match browser height - margin
  w: this.canvas.width = window.innerWidth - 15,         // width: match browser width
  bounce: 0.9,
  gravity: 0.1,
  friction: 0.99,
  lineWidth: 5,
  color: "cornflowerblue",
  points: [
    { x: 100, y: 100, oldx: 95, oldy: 95 },
    // { x: 120, y: 80, oldx: 115, oldy: 75 },
    // { x: 150, y: 80, oldx: 145, oldy: 75 },
    { x: 170, y: 100, oldx: 165, oldy: 95 },
    // { x: 170, y: 130, oldx: 165, oldy: 125 },
    // { x: 150, y: 150, oldx: 145, oldy: 145 },
    { x: 120, y: 150, oldx: 115, oldy: 145 },
    // { x: 100, y: 130, oldx: 95, oldy: 125 },
  ]
})

function animate() {
  cosmos.update()
  requestAnimationFrame(animate)
}

animate()

window.onresize = function(){
  cosmos.h = cosmos.canvas.height = window.innerHeight - 15
  cosmos.w = cosmos.canvas.width = window.innerWidth - 15
  console.log('resie')
  console.log(cosmos.lineWidth)
}
