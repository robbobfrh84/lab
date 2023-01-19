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
      console.log('click')
      if (!isTouch) { moveBee(bee) }
    }

    bee.onmousemove = e => {
      offSetBeeHover(bee, e.offsetX, e.offsetY)
    }
    bee.onmouseover = e => {
      offSetBeeHover(bee, e.offsetX, e.offsetY)
      // playGrabbed()
    }

    /* 📱👇 TOUCH USER EVENTS 👇📱  */
    bee.ontouchstart = ()=>{
      console.log('\ntouchstart')
       // playGrabbed()
      if (hanna.bees[bee.id].tapped) { moveBee(bee) } 
      handleTouchBee(bee)

    }
    bee.ontouchmove = ()=>{
      console.log('touchmove')
      hanna.bees[bee.id].swipe = true
    }
    bee.ontouchend = ()=>{
      console.log('touchend')
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
  console.log('-', hanna.bees[bee.id].tapped)
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
      flyBackOverFace(bee, location)
      locations = locations.filter(l => l !== location)
    }
  })

  const location = locations[ 0, random(0,locations.length - 1) ]
  locations = locations.filter(l => l !== location)
  bee.classList.add(location)
  hanna.bees[bee.id].timer = setTimeout(() => {
    flyBackOverFace(bee, location)
  }, returnToFaceDelay);
}

function offSetBeeHover(bee, x, y) {
  const oX = parseInt(window.getComputedStyle(bee, null).getPropertyValue("left")) + x
  const oY = parseInt(window.getComputedStyle(bee, null).getPropertyValue("top")) + y
  eyeTrack(oX, oY)
}

function checkAllBeesHidden(bee) {
  ogLocations.forEach( location => {
    if (bee.classList.contains(location) && location.split("hide_").length > 1) {
      hanna.bees[bee.id].hidden = true
      let allHidden = true
      Object.keys(hanna.bees).forEach( bee => {
        if (!hanna.bees[bee].hidden) { allHidden = false }
      })
      if (allHidden) { resetBees() }
    }
  })
}

function flyBackOverFace(bee, location) {
  bee.classList.remove(location)
  locations.push(location)
  hanna.bees[bee.id].hidden = false
}

function resetBees() {
  Object.keys(hanna.bees).forEach( bee => clearTimeout(hanna.bees[bee].timer))
  locations = ogLocations

  console.log('RESET BEES!')

  setTimeout(() => {
    Object.keys(hanna.bees).forEach( bee => {
      ogLocations.forEach( location => {
        if (window[bee].classList.contains(location)) {
          window[bee].classList.remove(location)
        }
      })
      hanna.bees[bee].hidden = false
    })
  }, 2000);

}

