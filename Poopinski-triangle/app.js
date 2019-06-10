const completeLevels = [2,4,8,16,32,64] // [2,4,8,16,32,64]
const width = window.innerWidth
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
    }, 2000*saveI)
  }
}

function poopinski_GO(levels, levelsCount){
  const fart = document.getElementById("fart"+levelsCount)
  console.log(fart)
  fart.play()

  let lastPoop = [] // Top "level"
  let fontSize = (window.innerHeight)/levels


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

    const layer = document.getElementById("layer"+levels)

    pushPoop(newPoop, fontSize, levels, level, layer)
    splatter(newPoop, levels, level)
    flushPoop(levels, layer)

  }
}

function pushPoop(newPoop, fontSize, levels, level, layer){

  const fh = fontSize*0.7
  const fw = fontSize*0.8
  // const fh = fontSize
  // const fw = fontSize

  const shift = (((levels-level)*(fw/2)) - (fw/2)) + (width/2) - (levels*fw/2)

  let elms = ""
  newPoop.map( (poop, i) => {
    elms += /*html*/`
      <div class="poopBox" id="${levels}-${level}-${i}" style="
        font-size: ${fontSize}px;
        line-height: ${fh}px;
        top: ${(fh*level) + 120 - levelsCnt}px;
        left: ${(fw*i)+shift - 20 + levelsCnt}px;
      ">${poop}</div>
    `
  })
  layer.innerHTML += elms
}

function splatter(newPoop, levels, level){
  for (let p = 0; p < newPoop.length; p++) {
    const sP = p
    setTimeout(function(){
      const poop = document.getElementById(levels+"-"+level+"-"+sP)
      poop.style.opacity = 1
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
