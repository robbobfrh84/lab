const cosmos = new Cosmos({
  canvas: document.getElementById("canvas"),
  h: this.canvas.height = window.innerHeight - 15,  // height: match browser height - margin
  w: this.canvas.width = window.innerWidth - 15,    // width: match browser width
  bounce: 0.9,
  gravity: 0.1,
  friction: 0.99,
  groundFriction: 0.95,
  colors: ["cornflowerblue","firebrick","purple","green","darkgoldenrod"],
  ballsCount: 15,
  balls: [
    { x: 155, y: 100, oldx: 145, oldy: 95, r: 10, color: "cornflowerblue" },
    { x: 350, y: 220, oldx: 355, oldy: 225, r: 20, color: "firebrick" }
  ]
})

while (cosmos.ballsCount > cosmos.balls.length) {
  cosmos.balls.push({
    x: x = random(50, cosmos.w-50),
    y: y = random(50, cosmos.h-50),
    oldx: x+random(-5,5),
    oldy: y+random(-5,5),
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

/* - - - - - 💥 Tools 💥 - - - - - - - - - - - - - - - - - - - - - - - - - - */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
