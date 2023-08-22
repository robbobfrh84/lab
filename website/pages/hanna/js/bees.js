const returnToFaceDelay = 5000
const ogLocations = [ // locations starting with 'hide_' are used as valid hidden locations.
  "hide_LeftTop",
  "hide_RightTop",
  "hide_Left",
  "middle1",
  "middle2",
  "hide_Right",
  "hide_LeftBottom",
  "hide_RightBottom",
]
let locations = ogLocations

function setBeeVars() {
  document.querySelectorAll(".beeBox").forEach( bee => {
    window[bee.id].style.left = (hanna.bees[bee.id].x * 100) + "%"
    window[bee.id].style.top = (hanna.bees[bee.id].y * 100) + "%"
    window[bee.id].style.width = (hanna.bees[bee.id].w * 100) + "%"

    bee.addEventListener("transitionend", ()=>{checkAllBeesHidden(bee)})
    bee.onclick = () => {
      if (!isTouch) { moveBee(bee) }
      // playWizz()
    }

    bee.onmousemove = e => {
      offSetBeeHover(bee, e.offsetX, e.offsetY)
    }
    bee.onmouseover = e => {
      offSetBeeHover(bee, e.offsetX, e.offsetY)
      playGrabbed()
    }
    bee.onmouseleave = e => {
      stopGrabbed()
    }

    /* 📱👇 TOUCH USER EVENTS 👇📱  */
    bee.ontouchstart = ()=>{
       // playGrabbed()
      if (hanna.bees[bee.id].tapped) { moveBee(bee) } 
      handleTouchBee(bee)
    }
    bee.ontouchmove = ()=>{
      hanna.bees[bee.id].swipe = true
    }
    bee.ontouchend = ()=>{
      if (hanna.bees[bee.id].swipe && hanna.bees[bee.id].tapped) {
         handleTouchBee(bee)
         moveBee(bee) 
       }
    }

  })
}

function checkForTouchedBees(e) {
  if (e && e.target.id !== 'tracker' && !e.target.classList.contains('beeBox')) {
    document.querySelectorAll(".beeBox").forEach( bee => {
      const beeImg = bee.querySelector(".beeImg")
      if (beeImg.classList.contains('beeBoxTouchHover')) {
        handleTouchBee(bee)
      }
    })
  }
}

function handleTouchBee(bee) {
  hanna.bees[bee.id].tapped = !hanna.bees[bee.id].tapped
  const beeImg = bee.querySelector(".beeImg")
  if (beeImg.classList.contains('beeBoxTouchHover')) {
    beeImg.classList.remove('beeBoxTouchHover')
  } else {
    beeImg.classList.add('beeBoxTouchHover')
  }
  hanna.bees[bee.id].swipe = false
} 

function moveBee(bee) {
  // * these steps make sure we're not getting DOUBLE go to locations. Which causes weired things to happen. like nesting of some sort.
  clearTimeout(hanna.bees[bee.id].timer)
  ogLocations.forEach( location => {
    if (bee.classList.contains(location)) {
      flyBackOverFace(bee, location, true)
      locations = locations.filter(l => l !== location)
    }
  })

  const location = locations[ 0, random(0,locations.length - 1) ]
  locations = locations.filter(l => l !== location)
  bee.classList.add(location)


  if (location.split("hide_").length > 1) {
    hanna.bees[bee.id].timer = setTimeout(() => {
      flyBackOverFace(bee, location, false)
    }, returnToFaceDelay)
    playWizz()
  }
}

function offSetBeeHover(bee, x, y) {
  const oX = parseInt(window.getComputedStyle(bee, null).getPropertyValue("left")) + x
  const oY = parseInt(window.getComputedStyle(bee, null).getPropertyValue("top")) + y
  eyeTrack(oX, oY)
}

function checkAllBeesHidden(bee) {
  let reset = false // * Yes this may seem redundant, but the return will fire 4x time rather than 1, making the audio go crazy. BUT, you don't notice anything wrong with just visuals.
  if (!victory) {
    ogLocations.forEach( location => {
      if (bee.classList.contains(location) && location.split("hide_").length > 1) {
        hanna.bees[bee.id].hidden = true
        let allHidden = true
        Object.keys(hanna.bees).forEach( bee => {
          if (!hanna.bees[bee].hidden) { allHidden = false }
        })
        if (allHidden) { reset = true }
      }
    })
  }
  if (reset) { 
    //
    //
    victory = true
    console.log('VICTORY')
    doSparkles()
    //
    //
    // resetBees() 
  }
}

function flyBackOverFace(bee, location, blockSound, blockLook) {
  if (!victory) {
    bee.classList.remove(location)
    locations.push(location)
    hanna.bees[bee.id].hidden = false
    if (!blockSound) { 
      setTimeout(()=>{ playWizz() },200)
      if (!blockLook) {
        const lookLocations = {
          "leftTopBee": { x: 0, y: 0},
          "rightTopBee": { x: imgX, y: 0},
          "leftBottomBee": { x: 0, y: imgY },
          "rightBottomBee": { x: imgX, y: imgY }
        }
        const look = lookLocations[bee.id]
        setTimeout(()=>{ setFace(look.x,look.y,150) },550)
      } 
    }
  }

}

function resetBees() {
  Object.keys(hanna.bees).forEach( bee => clearTimeout(hanna.bees[bee].timer))
  locations = ogLocations
  setTimeout(() => {
    Object.keys(hanna.bees).forEach( (bee, i) => {
      let location;
      ogLocations.forEach( loc => {
        if (window[bee].classList.contains(loc)) {
          location = loc
        }
      })
      setTimeout(()=>{ flyBackOverFace(window[bee], location, false, true) }, i*200 )
    })
  }, 2000)
}

