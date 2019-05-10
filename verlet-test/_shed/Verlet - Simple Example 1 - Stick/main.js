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
    { x: 115, y: 100, oldx: 95, oldy: 95 },
    { x: 210, y: 115, oldx: 201, oldy: 101 }
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
}
