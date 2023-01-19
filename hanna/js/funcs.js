/* * * * *    ✨ ⚙️ TRIGGERED EVENTS ⚙️ ✨     * * * * */
function handleOnload() {
  clickToEnter.innerHTML = (isTouch ? "Tap" : "Click") + " to Enter"
  setVars()
}

function handleWindowClick(e) {
  checkForTouchedBees(e)
  if (firstClick) { 
    clickToEnter.style.display = 'none'
    setTimeout(()=>{
      divBody.style.opacity = 1
      // playBuzzes()
    },300) 
    firstClick = false
  } 
}

function setVars() {
  imgY = imgContainer.children[0].offsetWidth
  imgX = imgY = imgContainer.children[0].offsetHeight
  imgContainer.style.height = imgY + "px"
  tracker.style.width = imgX + "px"
  tracker.style.height = imgY + "px"
  setBeeVars()
  setEyeVars()
  window.scrollTo(0,0) // mobile does this weird thing where it scrolls down a bit. And, because we lock scrolling for touchmove we need to force it back to fix this. 
}

function delayResetFace(delay) {
  setTimeout(()=>{ 
    resetFace() 
  },500)
}

function resetFace() {
  if (recenter) { clearInterval(recenter) }

  let cnt = ((resetFaceDelay / 1000) * fps)
  const lChunkX = parseFloat(window.leftEye.style.left) / cnt
  const lChunkY = parseFloat(window.leftEye.style.top) / cnt
  const rChunkX = parseFloat(window.rightEye.style.left) / cnt
  const rChunkY = parseFloat(window.rightEye.style.top) / cnt

  const lBChunk = parseFloat(window.leftBrow.style.top) / cnt
  const rBChunk = parseFloat(window.rightBrow.style.top) / cnt

  recenter = setInterval(()=>{ 
    if (cnt > 0) {
      window.leftEye.style.left = (parseFloat(window.leftEye.style.left) - lChunkX) + "px"
      window.leftEye.style.top = (parseFloat(window.leftEye.style.top) - lChunkY) + "px"
      window.rightEye.style.left = (parseFloat(window.rightEye.style.left) - rChunkX) + "px"
      window.rightEye.style.top = (parseFloat(window.rightEye.style.top) - rChunkY) + "px"

      window.leftBrow.style.top = (parseFloat(window.leftBrow.style.top) - lBChunk) + "px"
      window.rightBrow.style.top = (parseFloat(window.rightBrow.style.top) - rBChunk) + "px"
    } else {
      window.leftEye.style.left = "0px"
      window.leftEye.style.top = "0px"
      window.rightEye.style.left = "0px"
      window.rightEye.style.top = "0px"
      window.leftBrow.style.top = "0px"
      window.rightBrow.style.top = "0px"
      clearInterval(recenter)
    }
    cnt--
  }, 1000 / fps) 
}


/* * * * *    🛠️ Toolkit 🛠️     * * * * */
const random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isTouchDevice() {
  return (
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  )
}