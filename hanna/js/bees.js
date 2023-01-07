function setBeeVars() {
  ["leftTopBee","rightTopBee"].forEach( bee => {
    window[bee].style.left = (hanna[bee].start.x * 100) + "%"
    window[bee].style.top = (hanna[bee].start.y * 100) + "%"
    window[bee].style.width = (hanna[bee].start.w * 100) + "%"
  })

  // leftTopBee.style.height = (hanna.leftTopBee.start.h * 100) + "%"
  // leftTopBee.children[0].style.width = (hanna.leftTopBee.start.w * 100) + "%"

}

// testy.onclick = ()=> {
//   // 🔥 Bob, lets try to create a mouseou event for all bees to fix QUICK move bug. 
//   // ORRRRRRR not a big deal
//   console.log('p')
// }

document.querySelectorAll(".beeImg").forEach( bee => {
  bee.onclick = ()=> {
    console.log('bee: ', bee)
  }
})
