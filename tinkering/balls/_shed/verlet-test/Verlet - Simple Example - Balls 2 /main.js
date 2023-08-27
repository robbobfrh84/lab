const cosmos = new Cosmos({
  canvas: document.getElementById("canvas"),
  h: this.canvas.height = window.innerHeight - 15,  // height: match browser height - margin
  w: this.canvas.width = window.innerWidth - 15,    // width: match browser width
  yGravity: 0, // 0.1 // pix
  xGravity: 0, // % // pix
  drag: 0.99, // %
  bounce: 0.9,
  colors: ["cornflowerblue","firebrick","purple","green","darkgoldenrod"], // This should be a seperate config file
})

cosmos.addBall(
  { x: 155, y: 100, vx: 3, vy: 1, r: 8, color: "cornflowerblue" }
)

cosmos.addBall(
  { x: 351, y: 221, vx: 0, vy: 0, r: 25, color: "firebrick" }
)

for (var i = 0; i < 15; i++) {
  cosmos.addBall({
    id: i,
    x: x = random(50, cosmos.w-50),
    y: y = random(50, cosmos.h-50),
    vx: random(-5,5),
    vy: random(-5,5),
    r: random(3,25),
    color: cosmos.colors[random(0,cosmos.colors.length-1)]
  })
}

function animate() {
  cosmos.update()
  requestAnimationFrame(animate)
}

animate()

/* - - - - - 💥 EVENTS 💥 - - - - - - - - - - - - - - - - - - - - - - - - - - */

window.onresize = function(){
  cosmos.h = cosmos.canvas.height = window.innerHeight - 15
  cosmos.w = cosmos.canvas.width = window.innerWidth - 15
}

/* - - - - - ⚖️ Tools 🛠 - - - - - - - - - - - - - - - - - - - - - - - - - - */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
