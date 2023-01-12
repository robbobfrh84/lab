let imgX, imgY
let recenter
const resetFaceDelay = 500 // in ms
const fps = 60

window.onload = ()=>{
  setVars()
}
window.onresize = setVars
window.onclick = () => {
  clickToEnter.style.display = 'none'
  // playBuzzes()
  setTimeout(()=>{
    divBody.style.opacity = 1
  },300) 
}


/* * * * *    🖥️ 🐭 CURSOR USER EVENTS 🐭 🖥️      * * * * */
tracker.onmouseout = (e)=>{
  try {
    if (!e.relatedTarget.classList.contains("holdFace")) {
      resetFace()
    }
  } catch (error) { // This try/catch is for when your mouse leaves quickly, or by toggle another tab/app on your OS.
    resetFace()
  }
}
tracker.onmousemove = (e)=>{
  handleCursorEyes(e.offsetX, e.offsetY)
  handleCursorBrows(e)
}

/* * * * *    📱👇 TOUCH USER EVENTS 👇📱     * * * * */
tracker.ontouchend = resetFace
tracker.ontouchstart = handleTouchEyes
tracker.ontouchmove = handleTouchEyes
document.addEventListener('touchmove', (e)=>{e.preventDefault()}, { passive: false })