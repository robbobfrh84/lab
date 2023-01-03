const hanna = {
  leftEye: {
    rangeX: { min: -0.05, max: 0.02 },
    rangeY: { min: -0.02, max: 0.017 }
  }
}
let imgX, imgY

window.onload = setVars
window.onresize = setVars

function setVars() {
  tracker.style.width = (imgX = imgContainer.children[0].offsetWidth) + "px"
  tracker.style.height = (imgY = imgContainer.children[0].offsetHeight) + "px"
  console.log('imgX,imgY:',imgX,imgY);
}

function resetFace() {
  console.log(' - resetFace()');
  leftEye.style.left = "0px"
  leftEye.style.top = "0px"
}
// const recenter = setInterval(()=>{
//   console.log('interval')
// },500) // clearInterval(recenter)


/* * * * *    🖥️ 🐭 USER EVENTS 🐭 🖥️      * * * * */

tracker.onmouseout = resetFace
tracker.onmousemove = (e)=>{
  const oX = e.offsetX
  const rXmin = (hanna.leftEye.rangeX.min * imgX)
  const rXmax = (hanna.leftEye.rangeX.max * imgX)
  const rangeTotX = Math.abs(rXmin) + Math.abs(rXmax)
  let x = ((rangeTotX*oX) / imgX) + rXmin
  leftEye.style.left = x+"px"

  const oY = e.offsetY
  const rYmin = (hanna.leftEye.rangeY.min * imgY)
  const rYmax = (hanna.leftEye.rangeY.max * imgY)
  const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
  let y = ((rangeTotY*oY) / imgY) + rYmin
  leftEye.style.top = y+"px"
}


/* * * * *    📱👇 TOUCH USER EVENTS 👇📱     * * * * */

tracker.ontouchend = resetFace
tracker.ontouchmove = (e)=>{ 
  // From: https://stackoverflow.com/questions/33548926/how-to-detect-touchmove-length-offsets - See LAST non-JQ answer. 
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