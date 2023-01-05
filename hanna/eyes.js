function handleCursorEyes(e) {
  ["left","right"].forEach( side => {
    const eye = hanna[side+"Eye"]
    const oX = e.offsetX
    // const rXmin = (hanna[side+"Eye"].rangeX.min * imgX)
    // const rXmax = (hanna[side+"Eye"].rangeX.max * imgX)
    const rangeTotX = Math.abs(eye.rXmin) + Math.abs(eye.rXmax)
    const rangePointX = (rangeTotX * oX) / imgX
    window[side+"Eye"].style.left = (rangePointX + eye.rXmin) + "px"
  
    const oY = e.offsetY
    // const rYmin = (hanna[side+"Eye"].rangeY.min * imgY)
    // const rYmax = (hanna[side+"Eye"].rangeY.max * imgY)
    const rangeTotY = Math.abs(eye.rYmin) + Math.abs(eye.rYmax)
    const rangePointY = (rangeTotY*oY) / imgY
    window[side+"Eye"].style.top = (rangePointY + eye.rYmin) + "px"

    if (hanna[side+"Eye"].angleY) {
      console.log('angleY', rangeTotX, rangePointX)
      // 🔥 BOB!!!! Ok look those two numbers can represent a (0.0 to 1.0) scale
      // - which can be applied to a given max/min % just like the normal case. 
    }
  })
}