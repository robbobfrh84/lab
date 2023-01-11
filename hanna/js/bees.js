function setBeeVars() {
  document.querySelectorAll(".beeBox").forEach( bee => {
    window[bee.id].style.left = (hanna[bee.id].start.x * 100) + "%"
    window[bee.id].style.top = (hanna[bee.id].start.y * 100) + "%"
    window[bee.id].style.width = (hanna[bee.id].start.w * 100) + "%"

    bee.onclick = () => {
      const locations = [
        "hideleftTopBee",
        "hiderightTopBee",
        "hideleftBottomBee",
        "hiderightBottomBee",
        "hideleftBee"
      ]
      const location = locations[ 0, random(0,(locations.length - 1)) ]
      bee.classList.add(location)
      setTimeout(() => {
        bee.classList.remove(location)
      }, 3000);
    }
    bee.onmouseover = ()=>{
      console.log('over: ', this.id)
      playGrabbed()
    }
    bee.onmouseout = ()=>{
      console.log('out: ', this.id)
      stopGrabbed()
    }


    bee.ontouchstart = ()=>{
      console.log('over: ', this.id)
      playGrabbed()
    }

  })
}

const random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// x = random(20,40)

