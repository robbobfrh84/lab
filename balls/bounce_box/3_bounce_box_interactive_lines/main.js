window.onload = function(){
  set1()
  // set2()
  inputY.value = parseFloat(cosmos.yGravity).toFixed(1)
  inputX.value = parseFloat(cosmos.xGravity).toFixed(1)
}

/* - - - - - 🌍 Global Vars 🌏- - - - - - - - - - - - - - - - - - - - - - - */
let ballCounter = 0
let pause = true
let nextFrame = false
let rA = 180 / Math.PI
let aR = Math.PI / 180

pauseBtn.innerHTML = pause ? "▶️" : "⏸"
nextFrameBtn.innerHTML = pause ? "⏯" : ""

/* - - - - - 💥 EVENTS 💥 - - - - - - - - - - - - - - - - - - - - - - - - - */

function toggleGravity() {
  gravityBtn.innerHTML = gravityBtn.innerHTML == "⬇️" ? "⏏️" : "⬇️"
  cosmos.yGravity = cosmos.yGravity == 0 ? cosmos.initialYGravity : 0
  cosmos.xGravity = cosmos.xGravity == 0 ? cosmos.initialXGravity : 0
}

function togglePause() {
  pauseBtn.innerHTML = pause ? "⏸" : "▶️"
  pause = !pause
  nextFrameBtn.innerHTML = pause ? "⏯" : ""
}

function toggleNextFrame() {
  nextFrame = true
  pauseBtn.innerHTML = "▶️"
}

function updateGravity() {
  cosmos.xGravity = parseFloat(inputX.value)
  cosmos.yGravity = parseFloat(inputY.value)
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
