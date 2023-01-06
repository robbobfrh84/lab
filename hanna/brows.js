function handleCursorBrows(e) {
  ["left","right"].forEach( side => {
    let oX = e.offsetX
    let oY = e.offsetY
    if (side === "left" && (imgX/2) < oX) {
      oY = imgY - e.offsetY
    }
    if (side === "right" && (imgX/2) > oX) {
      oY = imgY - e.offsetY
    }
    const rYmin = (hanna[side+"Brow"].rangeY.min * imgY)
    const rYmax = (hanna[side+"Brow"].rangeY.max * imgY)
    const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
    const y = ((rangeTotY*oY) / imgY) + rYmin
    const centerAdjust = Math.abs((imgX/2) - oX) / (imgX/2)
    window[side+"Brow"].style.top = (y*centerAdjust)+"px"
  })
}