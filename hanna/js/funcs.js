/* * * * *    ✨ ⚙️ TRIGGERED EVENTS ⚙️ ✨     * * * * */
function handleOnload() {
  toText.innerHTML = (isTouch ? "Tap" : "Click") + " to"
  if (isTouch) {
    clickToEnter.innerHTML = 'Please visit website on a laptop or desktop computer. <br> <br>This website is not compatible with touchscreen devices'
    clickToEnter.style.fontSize = '30px'
  }
  setTimeout(() => { clickToEnter.style.opacity = 1 }, 300);
  setVars()
}

function handleWindowClick(e) {
  // checkForTouchedBees(e) // 🔥? do i need this, it's only called here? NO? remove function.
  if (firstClick) { doStartingScene() } 
}

function doStartingScene() {
  clickToEnter.style.display = 'none'
  leftTopBee.classList.add('hide_LeftTop')
  setTimeout(()=>{
    window.divBody.style.opacity = 1
    setTimeout(()=>{ leftTopBee.classList.remove('hide_LeftTop')    },1000)
    setTimeout(()=>{ playWizz()                                     },1200)  
    setTimeout(()=>{ setFace(0,0,300)                               },1400) 
    setTimeout(()=>{ resetFace(2000)                                },3000) 
    playBuzzes()
  },300) 
  firstClick = false
  //
  //
  // 🔥 DEV TEST 
  //   - SET IN resetBees() 
  // playBuzzes()
  // setTimeout(()=>{ maxBuzzVolume = 0.05 }, 1000 )
  // setTimeout(()=>{ doSparkles() }, 3000 )
  //
  //
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

function resetFace(delay) {
  if (recenter) { clearInterval(recenter) }

  delay = delay || resetFaceDelay
  let cnt = ((delay / 1000) * fps)
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

function setFace(x,y,delay) { // * example: setFace(0,0,500)
  if (recenter) { clearInterval(recenter) }

  let cnt = ((delay / 1000) * fps)
  let locX = (imgX/2)
  let locY = (imgY/2) 
  const xChunk = Math.round((x-locX) / cnt)
  const yChunk = Math.round((y-locX) / cnt)

  recenter = setInterval(()=>{ 
    if (cnt > 0) {
      locX += xChunk
      locY += yChunk
      eyeTrack(locX,locY,true)
    } else {
      eyeTrack(x,y)
      clearInterval(recenter)
    }
    cnt--
  }, 1000 / fps) 
}


/* * * * *    🛠️ Toolkit 🛠️     * * * * */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function r01() {
  return random(0,100) / 100
}

function isTouchDevice() {
  return (
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  )
}