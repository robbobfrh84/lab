let imgX, imgY
let recenter
const resetFaceDelay = 500 // in ms
const fps = 60
const isTouch = isTouchDevice()

window.onload = ()=>{
  clickToEnter.innerHTML = (isTouch ? "Tap" : "Click") + " to Enter"
  setVars()
}
window.onresize = setVars
window.onclick = () => {
  clickToEnter.style.display = 'none'
  setTimeout(()=>{
    divBody.style.opacity = 1
    // playBuzzes()
  },300) 
}


/* * * * *    🖥️ 🐭 CURSOR USER EVENTS 🐭 🖥️      * * * * */
tracker.onmouseout = (e)=>{
  try { if (!e.relatedTarget.classList.contains("holdFace")) { resetFace() }
  } catch (error) { resetFace() } // This try/catch is for when your mouse leaves quickly, or by toggle another tab/app on your OS.
}
tracker.onmousemove = (e)=>{
  eyeTrack(e.offsetX, e.offsetY)
}

/* * * * *    📱👇 TOUCH USER EVENTS 👇📱     * * * * */
document.body.addEventListener('contextmenu', (e) => { e.preventDefault() })
// tracker.ontouchend = resetFace
// tracker.ontouchstart = handleTouch
// tracker.ontouchmove = handleTouch
// document.addEventListener('touchmove', (e)=>{ e.preventDefault() }, { passive: false })

document.ontouchstart = handleTouch
document.ontouchend = resetFace
document.addEventListener('touchmove', (e)=>{
  e.preventDefault()
  handleTouch(e)
}, { passive: false })

function handleTouch(e) {
  var touch = e.touches[0] || e.changedTouches[0];
  var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  const oX = Math.round(touch.clientX-realTarget?.getBoundingClientRect().x)
  const oY = Math.round(touch.clientY-realTarget.getBoundingClientRect().y)
  const elm = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
  
  if (elm.id === 'tracker'){
    //
    console.log('tracker')
    //
    eyeTrack(oX, oY)
  } else if ( elm.classList.contains('beeBox') ) {
    //
    console.log('bee')
    //
    offSetBeeHover(elm, oX, oY)
  } else { 
    console.log(' - - - - else')
    resetFace()
  }




  // var touch = e.touches[0] || e.changedTouches[0];
  // var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  // const oX = Math.round(touch.clientX-realTarget?.getBoundingClientRect().x)
  // const oY = Math.round(touch.clientY-realTarget.getBoundingClientRect().y)
  // const elm = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
  // //
  // // Bob just added .beeBox handing here between 'tracker' and else.... 
  // //
  // if (elm.id === 'tracker'){
  //   eyeTrack(oX, oY)
  // } else if ( elm.classList.contains('beeBox') ) {
  //   console.log('is bee',oX,oY)
  //   // eyeTrack(oX, oY)
  //   offSetBeeHover(elm, oX, oY)
  // } else { // 🔥 Should be 
  //   resetFace()
  // }
}