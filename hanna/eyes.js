function setEyeVars() {
  ["left","right"].forEach( side => {
    const eye = hanna[side+"Eye"]
    hanna[side+"Eye"].rXmin = (eye.rangeX.min * imgX)
    hanna[side+"Eye"].rXmax = (eye.rangeX.max * imgX)
    hanna[side+"Eye"].rangeTotX = Math.abs(eye.rXmin) + Math.abs(eye.rXmax)
    hanna[side+"Eye"].rYmin = (eye.rangeY.min * imgY)
    hanna[side+"Eye"].rYmax = (eye.rangeY.max * imgY)
    hanna[side+"Eye"].rangeTotY = Math.abs(eye.rYmin) + Math.abs(eye.rYmax)
    if (eye.angleY) {
      hanna[side+"Eye"].angleYmin = (eye.angleY.min * imgY)
      hanna[side+"Eye"].angleYmax = (eye.angleY.max * imgY)
    }
  })
}

function handleCursorEyes( oX, oY ) {
  ["left","right"].forEach( side => {
    const eye = hanna[side+"Eye"]
    // const oX = e.offsetX
    // const oY = e.offsetY

    const rangePointX = (eye.rangeTotX * oX) / imgX
    window[side+"Eye"].style.left = (rangePointX + eye.rXmin) + "px"
  
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