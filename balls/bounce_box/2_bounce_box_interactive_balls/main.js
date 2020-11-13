window.onload = function(){
  set1()
  // set2()
  inputY.value = parseFloat(cosmos.yGravity).toFixed(1)
  inputX.value = parseFloat(cosmos.xGravity).toFixed(1)
}

/* - - - - - 🌍 Global Vars 🌏- - - - - - - - - - - - - - - - - - - - - - - */
let ballCounter = 0
let pause = false
let nextFrame = false

/* - - - - - 💥 EVENTS 💥 - - - - - - - - - - - - - - - - - - - - - - - - - */

function toggleGravity() {
  gravityBtn.innerHTML = gravityBtn.innerHTML == "⬇️" ? "⏏️" : "⬇️"
  cosmos.yGravity = cosmos.yGravity == 0 ? cosmos.initialYGravity : 0
  cosmos.xGravity = cosmos.xGravity == 0 ? cosmos.initialXGravity : 0
}

function togglePause() {
  pauseBtn.innerHTML = pauseBtn.innerHTML == "⏸" ? "▶️" : "⏸"
  pause = !pause
}

function toggleNextFrame() {
  nextFrame = true
  pauseBtn.innerHTML = "▶️"
}

function updateGravity() {
  console.log(event.target)
  let x = parseFloat(inputX.value)
  let y = parseFloat(inputY.value)
  cosmos.xGravity = x >= -1 && x <= 1 ? x : cosmos.xGravity
  cosmos.yGravity = y >= -1 && y <= 1 ? y : cosmos.yGravity
  inputX.value = cosmos.xGravity
  inputY.value = cosmos.yGravity
  if (x < -1 || x > 1) { alert("Please enter an X value greater than 0.0 and less than 1.0")}
  if (y < -1 || y > 1) { alert("Please enter an Y value greater than 0.0 and less than 1.0")}
}

var mousedown = false
var grabbed = null

function grab() {
  cosmos.findBall({ x: event.layerX, y: event.layerY })
  window.mousedown = true
}

function move() {
  if (mousedown) {
    cosmos.moveBall({ x: event.layerX, y: event.layerY })
  }
}

function drop() {
  window.mousedown = false
  if (event.shiftKey) {
    cosmos.launchBall({ x: event.layerX, y: event.layerY })
  }
}

window.onresize = function(){
  cosmos.h = cosmos.canvas.height = window.innerHeight - 15
  cosmos.w = cosmos.canvas.width = window.innerWidth - 15
}

/* - - - - - ⚖️ Tools 🛠- - - - - - - - - - - - - - - - - - - - - - - - - - */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
