function handleCursorEyes(e) {
  ["left","right"].forEach( side => {
    const eye = hanna[side+"Eye"]

    const oX = e.offsetX
    const rangePointX = (eye.rangeTotX * oX) / imgX
    window[side+"Eye"].style.left = (rangePointX + eye.rXmin) + "px"
  
    const oY = e.offsetY
    const rangePointY = (eye.rangeTotY*oY) / imgY
    window[side+"Eye"].style.top = (rangePointY + eye.rYmin) + "px"

    if (eye.angleY) {
      const rangeAngleY = Math.abs(eye.angleYmin) + Math.abs(eye.angleYmax) // 🔥 Should be in setVars
      const rangePointAngleY = (rangeAngleY * oX) / imgX
      const currentX = parseInt(window[side+"Eye"].style.top)
      window[side+"Eye"].style.top = currentX - (rangePointAngleY + eye.angleYmin) + "px"
    }
  })
}