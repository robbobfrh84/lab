window.onload = function(){
  set1()
}

/* - - - - - 🌍 Global Vars 🌏- - - - - - - - - - - - - - - - - - - - - - - */
let ballCounter = 0
let pause = true
let nextFrame = false

pauseBtn.innerHTML = pause ? "▶️" : "⏸"
nextFrameBtn.innerHTML = pause ? "⏯" : ""

/* - - - - - 💥 EVENTS 💥 - - - - - - - - - - - - - - - - - - - - - - - - - */

function togglePause() {
  pauseBtn.innerHTML = pause ? "⏸" : "▶️"
  pause = !pause
  nextFrameBtn.innerHTML = pause ? "⏯" : ""
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
