const completeLevels = [2,4,8,16,32] // [2,4,8,16,32,64]
let width = window.innerWidth
let height = window.innerHeight
let levelsCnt = 0

document.body.onmousedown = function(){
  loopPoop()
  start.style.display = "none"
}

function loopPoop(){
  stall.innerHTML = ""
  levelsCnt = 0
  for (var i = 0; i < completeLevels.length; i++) {
    const saveI = i
    setTimeout(function(){
      poopinski_GO(completeLevels[saveI], saveI)
      levelsCnt+=2
    }, 3000*saveI)
  }
}

function poopinski_GO(levels, levelsCount){

  let lastPoop = [] // Top "level"

  stall.innerHTML += /*html*/`
    <div class="poopLayer" id="layer${levels}"></div>
  `

  for (var level = 0; level < levels; level++) {
    const poopAbove = lastPoop
    const newPoop = ["💩"]

    for (var i = 0; i < poopAbove.length; i++) {

      const poopToTheLeft = poopAbove[i] === "💩"
      const poopToTheRight = poopAbove[i+1] === "💩"

      if (poopToTheLeft && poopToTheRight) {
        newPoop.push("")
      } else if (poopToTheLeft || poopToTheRight){
        newPoop.push("💩")
      } else {
        newPoop.push("")
      }

    }
    lastPoop = newPoop

    let paddingTop = 120
    if (window.innerWidth < window.innerHeight) {
      height = width
      paddingTop = 170
    }

    let fontSize = (height)/levels
    const layer = document.getElementById("layer"+levels)
    const poopMap = pushPoop(newPoop, fontSize, levels, level, layer, paddingTop)

    splatter(newPoop, levels, level, poopMap)
    flushPoop(levels, layer)

    const fart = document.getElementById("fart"+levelsCount)
    fart.play()
    if (levelsCount >= completeLevels.length - 1) {
      setTimeout(function(){
        const fart = document.getElementById("fart3")
        fart.play()
      },700)
    }

  }
}

function pushPoop(newPoop, fontSize, levels, level, layer, paddingTop){

  const fh = fontSize*0.7
  const fw = fontSize*0.8
  const shift = (((levels-level)*(fw/2)) - (fw/2)) + (width/2) - (levels*fw/2)
  const poopMap = []
  let elms = newPoop.map( (poop, i) => {
    poopMap.push({
      fontSize,
      fh,
      top: (fh*level) + paddingTop - levelsCnt,
      left: (fw*i)+shift - 20 + levelsCnt
    })
    return /*html*/`
      <div class="poopBox" id="${levels}-${level}-${i}" style="
        font-size: 300px;
        line-height: ${fh}px;
        top: ${random(-500,height+200)}px;
        left: ${random(-500,width+200)}px;
      ">${poop}</div>
    `
    }).join("")
  layer.innerHTML += elms

  return poopMap
}

function splatter(newPoop, levels, level, poopMap){
  for (let p = 0; p < newPoop.length; p++) {
    const sP = p
    setTimeout(function(){
      const poop = document.getElementById(levels+"-"+level+"-"+sP)
      poop.style.opacity = 1
      poop.style.fontSize = poopMap[sP].fontSize+"px"
      poop.style.top = poopMap[sP].top+"px"
      poop.style.left = poopMap[sP].left+"px"
    },random(0,1000))
  }
}

function flushPoop(levels, layer){
  setTimeout(function(){
    const lastLayer = document.getElementById("layer"+(levels/2))
    if (lastLayer) lastLayer.style.opacity = 0.1
    layer.style.opacity = 1
  },100)
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
