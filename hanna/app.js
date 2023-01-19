let imgX, imgY
let recenter
const resetFaceDelay = 500 // in ms
const fps = 60
const isTouch = isTouchDevice()
let firstClick = true
let grabbed = false
let grabbedAudio

window.onload = handleOnload 
window.onresize = setVars
window.onclick = handleWindowClick

/* * * * *    🖥️ 🐭 CURSOR USER EVENTS 🐭 🖥️      * * * * */
tracker.onmouseout = e => {
  try { if (!e.relatedTarget.classList.contains("holdFace")) { resetFace() }
  } catch (error) { resetFace() } // This try/catch is for when your mouse leaves quickly, or by toggle another tab/app on your OS.
}
tracker.onmousemove = e => {
  eyeTrack(e.offsetX, e.offsetY)
}

/* * * * *    📱👇 TOUCH USER EVENTS 👇📱     * * * * */
document.body.addEventListener('contextmenu', e => { e.preventDefault() })

document.ontouchstart = handleTouch
document.ontouchend = ()=>{ delayResetFace(500) }
document.addEventListener('touchmove', e =>{
  e.preventDefault()
  handleTouch(e)
}, { passive: false })

function handleTouch(e) {
  var touch = e.touches[0] || e.changedTouches[0];
  var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  try {
    const oX = Math.round(touch.clientX-realTarget?.getBoundingClientRect().x)
    const oY = Math.round(touch.clientY-realTarget.getBoundingClientRect().y)
    const elm = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    if (elm.id === 'tracker'){
      eyeTrack(oX, oY)
    } else if ( elm.classList.contains('beeBox') ) {
      offSetBeeHover(elm, oX, oY)
    } else { 
      delayResetFace(500)
    }
  } catch(error) {}
}