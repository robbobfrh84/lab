const sparkles = []
const sparklesCnt = 35
const staggerDelay = 200 // delay between sparkles starting to show up.
const returnDelay = 1500 

function doSparkles() {
  if (sparkles.length < 1) { buildSparkles() }
  
          // setTimeout(()=>{ maxBuzzVolume = 0.05 }, 1000 )
          // setTimeout(()=>{ doSparkles() }, 3000 )
  maxBuzzVolume = 0.05
  setTimeout(()=>{ playAudio('audio/chimes.mp3', 0.25) }, 500)
  setTimeout(()=>{ playAudio('audio/oooOOOooo.mp3', 0.25) }, 4000)
  sparklesAnimate(()=>{
    console.log('callback')
    maxBuzzVolume = 1
    victory = false
    resetBees() 
  })
}

function buildSparkles() {
  for (let i = 0; i < sparklesCnt; i++) {
    const r = random(1,5) // hard-coded for 5 unique sparkles
    const elm = document.createElement("div")
    elm.classList.add('sparkleBox')
    elm.innerHTML = /*html*/`
      <img id="sparkle${i}" src="images/sparkle${r}.png" class="sparkle">
    `
    sparkles.push(elm)
    imgContainer.appendChild(elm)
  }
}

function sparklesAnimate(callback) {

  setTimeout(()=>{ // 🔥 DEV TEST timout just to give buffer to see how it looks

    sparkles.forEach( (sparkle, i) => {
      setTimeout(()=>{
        const width = random(10,20) // in percent
        const pixWidth = Math.round((imgX * width) / 100)
        sparkle.style.left = random(((pixWidth/2)*-1),imgX + (pixWidth/4))+"px"
        sparkle.style.top = random(((pixWidth/2)*-1),imgY + (pixWidth/4))+"px"
  
        const img = sparkle.children[0]
        img.style.width = pixWidth + "px"
        img.style.left = (pixWidth * -1 / 2) + "px"
        img.style.top = (pixWidth * -1 / 2) + "px"
        img.style.opacity = 1
        setTimeout(()=>{
          img.style.width = "0px"
          img.style.left = "0px"
          img.style.top = "0px"
          img.style.opacity = 0
          if ((sparkles.length-1) == i) {
            callback()
          }
        }, returnDelay)
      }, i * staggerDelay )
    })

  },1)

}

