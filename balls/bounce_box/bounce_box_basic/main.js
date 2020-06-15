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
  cosmos.xGravity = parseFloat(inputX.value)
  cosmos.yGravity = parseFloat(inputY.value)
}

window.onresize = function(){
  cosmos.h = cosmos.canvas.height = window.innerHeight - 15
  cosmos.w = cosmos.canvas.width = window.innerWidth - 15
}

/* - - - - - ⚖️ Tools 🛠- - - - - - - - - - - - - - - - - - - - - - - - - - */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
