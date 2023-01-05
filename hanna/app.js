const hanna = {
  leftEye: {
    rangeX: { min: -0.05, max: 0.02 },
    rangeY: { min: -0.02, max: 0.017 }
  },
  rightEye: {
    rangeX: { min: -0.05, max: 0.02 },
    rangeY: { min: -0.02, max: 0.017 },
    angleY: {}
  },
  leftBrow: {
    rangeY: { min: -0.1, max: 0.01 }
  },
  rightBrow: {
    rangeY: { min: -0.1, max: 0.01 }
  }
}
let imgX, imgY
let recenter
const resetFaceDelay = 500 // in ms
const fps = 60


window.onload = setVars
window.onresize = setVars

function setVars() {
  tracker.style.width = (imgX = imgContainer.children[0].offsetWidth) + "px"
  tracker.style.height = (imgY = imgContainer.children[0].offsetHeight) + "px"
  imgContainer.style.height = imgY + "px"
  //
  //
  ;["left","right"].forEach( side => {
    hanna[side+"Eye"].rXmin = (hanna[side+"Eye"].rangeX.min * imgX)
    hanna[side+"Eye"].rXmax = (hanna[side+"Eye"].rangeX.max * imgX)
    hanna[side+"Eye"].rYmin = (hanna[side+"Eye"].rangeY.min * imgY)
    hanna[side+"Eye"].rYmax = (hanna[side+"Eye"].rangeY.max * imgY)
  })
  //
  //
  console.log('imgX,imgY:',imgX,imgY);
  window.scrollTo(0,0) // mobile does this weird thing where it scrolls down a bit. And, because we lock scrolling for touchmove we need to force it back to fix this. 
}

function resetFace() {
  console.log(' - resetFace()');
  if (recenter) { clearInterval(recenter) }

  let cnt = ((resetFaceDelay / 1000) * fps)
  const chunkX = parseFloat(window.leftEye.style.left) / cnt
  const chunkY = parseFloat(window.leftEye.style.top) / cnt

  recenter = setInterval(()=>{ 
    if (cnt > 0) {
      window.leftEye.style.left = (parseFloat(window.leftEye.style.left) - chunkX) + "px"
      window.leftEye.style.top = (parseFloat(window.leftEye.style.top) - chunkY) + "px"
    } else {
      window.leftEye.style.left = "0px"
      window.leftEye.style.top = "0px"
      clearInterval(recenter)
    }
    cnt--
  }, 1000 / fps) 
}


/* * * * *    🖥️ 🐭 CURSOR USER EVENTS 🐭 🖥️      * * * * */
tracker.onmouseout = resetFace
tracker.onmousemove = (e)=>{
  handleCursorEyes(e)
  handleCursorBrows(e)
}


/* * * * *    📱👇 TOUCH USER EVENTS 👇📱     * * * * */

tracker.ontouchend = resetFace
tracker.ontouchmove = (e)=>{ 
  var touch = e.touches[0] || e.changedTouches[0];
  var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  e.offsetX = Math.round(touch.clientX-realTarget.getBoundingClientRect().x)
  e.offsetY = Math.round(touch.clientY-realTarget.getBoundingClientRect().y)

  if (document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).id === 'tracker'){
    const oX = e.touches[0].clientX
    const rXmin = (hanna.leftEye.rangeX.min * imgX)
    const rXmax = (hanna.leftEye.rangeX.max * imgX)
    const rangeTotX = Math.abs(rXmin) + Math.abs(rXmax)
    let x = ((rangeTotX*oX) / imgX) + rXmin
    leftEye.style.left = x+"px"
  
    const oY = e.touches[0].clientY
    const rYmin = (hanna.leftEye.rangeY.min * imgY)
    const rYmax = (hanna.leftEye.rangeY.max * imgY)
    const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
    let y = ((rangeTotY*oY) / imgY) + rYmin
    leftEye.style.top = y+"px"
  } else {
    resetFace()
  }

}
document.addEventListener('touchmove', (e)=>{e.preventDefault()}, { passive: false })

