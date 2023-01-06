const hanna = {
  leftEye: {
    rangeX: { min: -0.04, max: 0.02 }, // min is toward LEFT
    rangeY: { min: -0.02, max: 0.02 } // min is toward TOP
  },
  rightEye: {
    rangeX: { min: -0.02, max: 0.06 }, // min is toward LEFT
    rangeY: { min: -0.02, max: 0.03 }, // min is toward TOP
    angleY: { min: -0.00, max: -0.02 } // min is really just left side, negiive toward top, max is right side.
  },
  leftBrow: {
    rangeY: { min: -0.03, max: 0.03 } // min is toward TOP
  },
  rightBrow: {
    rangeY: { min: -0.03, max: 0.03 } // min is toward TOP
  }
}

let imgX, imgY
let recenter
const resetFaceDelay = 500 // in ms
const fps = 60

window.onload = setVars
window.onresize = setVars

/* * * * *    🖥️ 🐭 CURSOR USER EVENTS 🐭 🖥️      * * * * */
tracker.onmouseout = resetFace
tracker.onmousemove = (e)=>{
  handleCursorEyes(e.offsetX, e.offsetY)
  handleCursorBrows(e)
}

/* * * * *    📱👇 TOUCH USER EVENTS 👇📱     * * * * */
tracker.ontouchend = resetFace
tracker.ontouchstart = handleTouchEyes
tracker.ontouchmove = handleTouchEyes
document.addEventListener('touchmove', (e)=>{e.preventDefault()}, { passive: false })


/* * * * *    ✨ ⚙️ TRIGGERED EVENTS ⚙️ ✨     * * * * */
function setVars() {
  tracker.style.width = (imgX = imgContainer.children[0].offsetWidth) + "px"
  tracker.style.height = (imgY = imgContainer.children[0].offsetHeight) + "px"
  imgContainer.style.height = imgY + "px"
  setEyeVars()
  window.scrollTo(0,0) // mobile does this weird thing where it scrolls down a bit. And, because we lock scrolling for touchmove we need to force it back to fix this. 
  console.log('imgX,imgY:',imgX,imgY)
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