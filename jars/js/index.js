const url = "http://192.168.1.123";
let inverted = true
let pairDir = inverted ? -1 : 1
let data = {}
let colorAdj = {}
let page = "pageSequences" // "pageCustom" "pageSequences"
let clickedPageIndex = 0
let lock = false
var updatedDelay;
var statusDelay;
const delay1 = 8000;

const cols = {
  // color name-----client color------server color
  black:          { c:"0,0,0" },
  white:          { c:"255,255,255" },
  red:            { c:"255,0,0"},
  blue:           { c:"0,0,255"},
  green:          { c:"0,128,0",      s:"0,70,0" },
  goldenrod:      { c:"214,163,48",   s:"85,75,11" },
  darkgrey:       { c:"68,68,68",     s:"10,15,15" },
  grey:           { c:"128,128,128",  s:"40,40,40" },
  green:          { c:"0,128,0",      s:"0,70,0" },
  firebrick:      { c:"169,53,47",    s:"70,20,15" },
  slateblue:      { c:"106,90,205",   s:"40,20,70" },
  eggshell:       { c:"240,234,214",  s:"70,100,90"},
  orangered:      { c:"255,69,0",     s:"120,40,0" },
  orange:         { c:"235,120,0" },
  seagreen:       { c:"32,178,170",   s:"10,70,70" },
  peru:           { c:"160,82,45",    s:"40,25,15" },
  cornflowerblue: { c:"102,155,235",  s:"20,40,100" },
  yellowgreen:    { c:"154,205,50",   s:"95,120,25" },
  pink:           { c:"245,182,193",  s:"100,70,80" },
}

let selectedRGB = cols.cornflowerblue

window.onload = ()=>{
  invertedInput.checked = inverted;
  buildColorAdj()
  updateSelectedColor()
  buildPalleteContainers()
  query("api",(respData)=>{
    data = respData
    buildLedStrips()
    buildSequences()
    updateAllLeds()
    updateCurrentStatus()
    window[page].style.display = "block"
    window.requestAnimationFrame(()=>{
      window[page].style.opacity = 1
    })
  })
}
