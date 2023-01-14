function handleCursorBrows(x,y) {
  ;["left","right"].forEach( side => {
    let oX = x
    let oY = y
    if (side === "left" && (imgX/2) < oX) {
      oY = imgY - y
    }
    if (side === "right" && (imgX/2) > oX) {
      oY = imgY - y
    }
    const rYmin = (hanna[side+"Brow"].rangeY.min * imgY)
    const rYmax = (hanna[side+"Brow"].rangeY.max * imgY)
    const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
    const yLoc = ((rangeTotY*oY) / imgY) + rYmin
    const centerAdjust = Math.abs((imgX/2) - oX) / (imgX/2)
    window[side+"Brow"].style.top = (yLoc*centerAdjust)+"px"
  })
}