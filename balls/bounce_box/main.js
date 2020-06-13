window.onload = function(){
  set2()
}

/* - - - - - 🌍 Global Vars 🌏- - - - - - - - - - - - - - - - - - - - - - - */
let pause = false
let nextFrame = false
let yGravity = 0.1

/* - - - - - 💥 EVENTS 💥 - - - - - - - - - - - - - - - - - - - - - - - - - */

function toggleGravity() {
  gravityBtn.innerHTML = gravityBtn.innerHTML == "⬇️" ? "⏏️" : "⬇️"
  cosmos.yGravity = cosmos.yGravity == 0 ? yGravity : 0
}

function togglePause() {
  pauseBtn.innerHTML = pauseBtn.innerHTML == "⏸" ? "▶️" : "⏸"
  pause = !pause
}

function toggleNextFrame() {
  nextFrame = true
  pauseBtn.innerHTML = "▶️"
}

window.onresize = function(){
  cosmos.h = cosmos.canvas.height = window.innerHeight - 15
  cosmos.w = cosmos.canvas.width = window.innerWidth - 15
}

/* - - - - - ⚖️ Tools 🛠- - - - - - - - - - - - - - - - - - - - - - - - - - */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
