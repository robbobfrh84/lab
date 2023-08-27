const _global = {
  color: "black",
  frame: robot1, // { bg: '', pixels: []}, object_tbd, tdb, robot_TDB, robot1
  grid: { x: 8, y: 8 },
  mouseDown: false
}

window.onload = ()=>{

  updateCanvasBuild()
  updateBuild()

  buildFrame({
    elmId: "colorPicker",
    frame: basicPicker,
    pixWidth: 150,
    grid: { x:6, y:4 },
    creatorOverlay: true,
    callback: (blk) => { updateColorPicker(blk) }
  })

  _global.color =  basicPicker.bg
  fillButton.style.backgroundColor = _global.color

}

function updateCanvasBuild() {
  buildFrame({
    elmId: "8x8_view_creatorOverlay",
    frame: _global.frame,
    pixWidth: 250,
    grid: _global.grid,
    creatorOverlay: true,
    callback: (blk) => { updatePixel(blk) }
  })
}

function updateBuild() {
  buildFrame({
    elmId: "8x8_view",
    frame: _global.frame,
    pixWidth: 100,
    grid: _global.grid,
    noShadow: false, // * Not required. Defaults to false, but keeping it here for documentation.
  })
}

function updatePixel(blk) {

  if (blk.type === "mousedown") {
    _global.mouseDown = true
  } 

  else if (blk.type === "mouseup") {
    _global.mouseDown = false
  } 

  if (
    blk.type === "mousedown"
    || _global.mouseDown === true
  ) {
    window[blk.id].style.fill = _global.color
    const pixelIndex = getPixelIndex(_global.frame.pixels, blk)
    if ( _global.frame.pixels[pixelIndex]) {
      if (_global.color == "rgba(0,0,0,0)") { // * 🚨 Important. This removes index of transparent.
        _global.frame.pixels.splice(pixelIndex,1)
      } else {
        blk.pixel.color = _global.color
        _global.frame.pixels[pixelIndex] = blk.pixel
      }
    } else {
      if (_global.color != "rgba(0,0,0,0)") { // * 🚨 Important. This removes index of transparent.
        _global.frame.pixels.push({
          x: blk.x,
          y: blk.y,
          color: _global.color,
        })
      } 
    }
    updateBuild(_global.frame)

  } 
  
  else if (blk.type === "mouseover") {
    window[blk.id].style.opacity = '0.75'
  } 
  
  if (blk.type === "mouseout") {
    window[blk.id].style.opacity = '1'
  }
}

function getPixelIndex(array, blk) {
  let pixelIndex = -1 // * This must be -1 to insure empty blks don't confused with a real index #. 
  array.every( ( p, i ) => { // * I used this just as a point of proof for how .every can break out of a loop. 
    if (p.x === blk.x && p.y === blk.y) {
      pixelIndex = i
      return false
    } 
    return true
  })
  return pixelIndex
}

function updateColorPicker(blk) {
  if (blk.type === "mousedown") {
    _global.color = blk.pixel.color

    window["svg-colorPicker"].style.background = ''
    window["svg-colorPicker"].style.backgroundColor = _global.color

    window["fillButton"].style.background = ''
    window["fillButton"].style.backgroundColor = _global.color
  }
}

function eraseButton() {
  window["svg-colorPicker"].style.background = 'url("../../shared/images/transparent.png")'
  fillButton.style.background = 'url("../../shared/images/transparent.png")'

  _global.color = "rgba(0,0,0,0)"
}

function fillColor() {
  _global.frame.pixels = []
  for (let y = 0; y < _global.grid.y; y++) {
    for (let x = 0; x < _global.grid.x; x++) {
      _global.frame.pixels.push({ x, y, color: _global.color })
    }
  }
  updateCanvasBuild()
  updateBuild()
}

function downloadObject(frame) {
  _global.frame.pixels.sort((a, b) => {
    return a.y - b.y || a.x - b.x
  })
  // console.log("const object_tbd = "+sJSON.stringify(_global.frame, null, 2))
  downloadJS('object_tbd.js', "const object_tbd = "+JSON.stringify(_global.frame, null, 2))
}