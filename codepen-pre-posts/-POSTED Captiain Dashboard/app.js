/* TO DO

- Fix Phone version...

*/

let Bg;
let Head;

// 🙈 WINDOW LOADED!
window.onload = function(){
  start()
}

function start() {

  Bg = new BackgroundEffect({
    effect: "lightSpeed",
    setting: "night",
    grid: 1, // (50 or 1) in pixed fixed position
    speed: 0.01, // Max = 1.0
    lineS: 3, // og: 0.4
    linesCnt: 150,
    lineW: 300,
    pause: false,
  })

  Head = new HeaderEffect({
    maxW: 700,
    sqW: 25,
    lineColor: "rgba(100,149,237,1)",
    lineOpacity: 0.75,
    textColor: 'rgba(192,178,160,0.75)'
  })

  Bg.startBackground()

  setEvents()

  setTimeout(function(){
    captainDashboard.style.opacity = 1
    drawBox()
    setTimeout(function(){
      blinkingCursor.style.display = "block"
      inputName.focus()
    },2000)
  },2000)

}

function setEvents(){

  window.onresize = function(){
    Bg.cx = window.innerWidth/2
    Bg.cy = window.innerHeight/2
    Bg.longer = Bg.cx > Bg.cy ? Bg.cx : Bg.cy
    Bg.shorter = Bg.cx > Bg.cy ? Bg.cy : Bg.cx
  }

  // ✍️ * Sign In Events * ✍️

  document.body.onclick = function(){
    blinkingCursor.style.display = "none"
    inputName.style.opacity = 1
  }

  inputName.oninput = function(){
    blinkingCursor.style.display = "none"
    inputName.style.opacity = 1
  }

  goArrow.onclick = function(){
    signIn.style.opacity = 0
    goArrow.style.background = "rgba(200,0,0,0.6)"
    Bg.speedUp(Bg.speed, 0.5, 1.04)
    setTimeout(function(){
      Head.startHeader()
      Head.lettersAnnimation(inputName.value)
      signIn.style.display = 'none'
    }, 2000) // 🚨 Match CSS #signIn transition
    speed = 0
  }

  // 🎖 * Dashbaord Events * 🎖

  warpSpeed.onclick = function(){
    Bg.changeEffect('lightSpeed')
  }

  racers.onclick = function(){
    Bg.changeEffect('racers')
  }

  breakWarp.onclick = function(){
    Bg.speedUp(Bg.speed, 0.01, 0.96, true)
  }

  fullSpeed.onclick = function(){
    Bg.speedUp(Bg.speed, 1, 1.04)
  }

  dayNight.onclick = function(){
    Bg.changeDayNight()
  }

  slider.oninput = function(){
    Bg.speed = this.value/1000
    sliderIcon.style.left = ((Bg.speed * 310) - 5) + "px"
  }

}


// * * * * * 🛠 Toolkit 🛠 * * * * * //

function _rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawBox(){
  const canvases = document.getElementsByClassName('draw-box')
  let c2 = []
  for (var i = 0; i < canvases.length; i++) {
    const w = canvases[i].parentElement.clientWidth+8
    const h = canvases[i].parentElement.clientHeight+9
    canvases[i].id = 'landing-canvas'+i
    c2[i] = new Canvas
    c2[i].new(canvases[i].id, w, h)
    c2[i].lineGrow(0,5,w,5,'rgba(100,149,237,0.6)',2,2,1.03)
    c2[i].lineGrow(w,h-4,0,h-4,'rgba(100,149,237,0.6)',2,2,1.03)
    c2[i].lineGrow(4,0,4,h,'rgba(100,149,237,0.6)',2,0.25,1.03)
    c2[i].lineGrow(w-4,h,w-4,0,'rgba(100,149,237,0.6)',2,0.25,1.03)
    const index = i
    setTimeout(()=>{
      c2[index].animate()
    },(250*i)+1000)
  }
}
