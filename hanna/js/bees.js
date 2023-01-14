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

    bee.onmousemove = (e)=>{
      offSetBeeHover(bee, e)
    }
    bee.onmouseover = (e)=>{
      offSetBeeHover(bee, e)
      // playGrabbed()
    }
    bee.onmouseout = ()=>{
      // stopGrabbed()
    }

    bee.ontouchstart = ()=>{
      // playGrabbed()
      console.log('touchstart')
    }
    bee.ontouchmove = ()=>{
      console.log('touchmove')
    }
    bee.ontouchend = ()=>{
      console.log('touchend')
    }

  })
}

function offSetBeeHover(bee, e) {
  const oX = parseInt(window.getComputedStyle(bee, null).getPropertyValue("left")) + e.offsetX
  const oY = parseInt(window.getComputedStyle(bee, null).getPropertyValue("top")) + e.offsetY
  handleCursorEyes(oX, oY)
  handleCursorBrows(oX, oY)
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

