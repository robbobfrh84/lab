const hanna = {
  leftEye: {
    // rangeX: { min: -30, max: 17 }, 
    rangeX: { min: -0.05, max: 0.02 },
    // rangeY: { min: -10, max: 10 }
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


/* * * * *    🖥️ 🐭 USER EVENTS 🐭 🖥️      * * * * */

tracker.onmousemove = (e)=>{

  const oX = e.offsetX
  // const rX = hanna.leftEye.rangeX 
  // const rangeTotX = Math.abs(rX.min) + Math.abs(rX.max)
  const rXmin = (hanna.leftEye.rangeX.min * imgX)
  const rXmax = (hanna.leftEye.rangeX.max * imgX)
  console.log('rXmin, rXmax:',rXmin, rXmax);
  const rangeTotX = Math.abs(rXmin) + Math.abs(rXmax)
  let x = ((rangeTotX*oX) / imgX) + rXmin
  leftEye.style.left = x+"px"

  const oY = e.offsetY
  // const rY = hanna.leftEye.rangeY
  const rYmin = (hanna.leftEye.rangeY.min * imgY)
  const rYmax = (hanna.leftEye.rangeY.max * imgY)
  // const rangeTotY = Math.abs(rY.min) + Math.abs(rY.max)
    const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)

  let y = ((rangeTotY*oY) / imgY) + rYmin
  leftEye.style.top = y+"px"
}

tracker.onmouseout = ()=>{
  console.log(' - OUT');
  leftEye.style.left = "0px"
  leftEye.style.top = "0px"
}
// const recenter = setInterval(()=>{
//   console.log('interval')
// },500) // clearInterval(recenter)



/* * * * *    📱👇 TOUCH USER EVENTS 👇📱     * * * * */

tracker.touchmove = (e)=>{
  // From: https://stackoverflow.com/questions/33548926/how-to-detect-touchmove-length-offsets
  // - See LAST non-JQ answer. 
  var touch = e.touches[0] || e.changedTouches[0];
  var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  e.offsetX = touch.clientX-realTarget.getBoundingClientRect().x;
  e.offsetY = touch.clientY-realTarget.getBoundingClientRect().y

  console.log('touchmove', e  )
  const oX = e.touches[0].clientX
  const rX = hanna.leftEye.rangeX
  const rangeTotX = Math.abs(rX.min) + Math.abs(rX.max)
  let x = ((rangeTotX*oX) / imgX) + rX.min
  leftEye.style.left = x+"px"
}
document.addEventListener('touchmove', (e)=>{e.preventDefault()}, { passive: false })

