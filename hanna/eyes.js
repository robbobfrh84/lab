function handleCursorEyes(e) {
  ["left","right"].forEach( eye => {
    const oX = e.offsetX
    const rXmin = (hanna[eye+"Eye"].rangeX.min * imgX)
    const rXmax = (hanna[eye+"Eye"].rangeX.max * imgX)
    const rangeTotX = Math.abs(rXmin) + Math.abs(rXmax)
    let x = ((rangeTotX*oX) / imgX) + rXmin
    window[eye+"Eye"].style.left = x+"px"
  
    const oY = e.offsetY
    const rYmin = (hanna[eye+"Eye"].rangeY.min * imgY)
    const rYmax = (hanna[eye+"Eye"].rangeY.max * imgY)
    const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
    let y = ((rangeTotY*oY) / imgY) + rYmin
    window[eye+"Eye"].style.top = y+"px"
  })
}