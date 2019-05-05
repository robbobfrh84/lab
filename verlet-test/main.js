const cosmos = new Cosmos({
  canvas: document.getElementById("canvas"),
  h: this.canvas.height = window.innerHeight - 15,  // height: match browser height - margin
  w: this.canvas.width = window.innerWidth,         // width: match browser width
  lineWidth: 2,
  bounce: 0.9,
  gravity: 0.1,
  friction: 0.99,
  points: [
    { x: 100, y: 100, oldx: 95, oldy: 95 },
    // { x: 100, y: 200, oldx: 105, oldy: 201 },
    // { x: 250, y: 150, oldx: 245, oldy: 151 },
    { x: 200, y: 100, oldx: 201, oldy: 101 },
  ]
})

function animate() {
  cosmos.update()
  requestAnimationFrame(animate)
}

animate()
