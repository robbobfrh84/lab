const hanna = {
  leftEye: {
    rangeX: { min: -30, max: 17 },
    rangeY: { min: -10, max: 10 }
  }
}
let imgX, imgY

window.onload = setVars
window.onresize = setVars

function setVars() {
  imgX = imgContainer.children[0].offsetWidth
  imgY = imgContainer.children[0].offsetHeight
  tracker.style.height = imgY+"px"
  console.log('imgX,imgY:',imgX,imgY);
}


/* * * * *    🧍🐁 USER EVENTS 👇🧍     * * * * */

// imgContainer.onmouseover = ()=>{
//   console.log('!over');
// }
// imgContainer.onmousemove = (e)=>{
// tracker.onmousemove = (e)=>{

//   console.log('e:',e.offsetX);

//   const oX = e.offsetX
//   const rX = hanna.leftEye.rangeX
//   const rangeTotX = Math.abs(rX.min) + Math.abs(rX.max)
//   let x = ((rangeTotX*oX) / imgX) + rX.min
//   leftEye.style.left = x+"px"

//   const oY = e.offsetY
//   const rY = hanna.leftEye.rangeY
//   const rangeTotY = Math.abs(rY.min) + Math.abs(rY.max)
//   let y = ((rangeTotY*oY) / imgY) + rY.min
//   leftEye.style.top = y+"px"

// }
// tracker.onmouseout = ()=>{
//   console.log(' - OUT');
//   leftEye.style.left = "0px"
//   leftEye.style.top = "0px"
// }


imgContainer.ontouchmove = (e)=>{
  console.log('touchmove', e  )
  const oX = e.targetTouches[0].clientX
  const rX = hanna.leftEye.rangeX
  const rangeTotX = Math.abs(rX.min) + Math.abs(rX.max)
  let x = ((rangeTotX*oX) / imgX) + rX.min
  leftEye.style.left = x+"px"
}
document.addEventListener('touchmove', (e)=>{e.preventDefault()}, { passive: false })

