function handleCursorBrows(e) {
  ["left","right"].forEach( side => {
    // const oX = e.offsetX
    // const rXmin = (hanna[side+"Eye"].rangeX.min * imgX)
    // const rXmax = (hanna[side+"Eye"].rangeX.max * imgX)
    // const rangeTotX = Math.abs(rXmin) + Math.abs(rXmax)
    // let x = ((rangeTotX*oX) / imgX) + rXmin
    // window[side+"Eye"].style.left = x+"px"
  
    const oY = e.offsetY
    const rYmin = (hanna[side+"Brow"].rangeY.min * imgY)
    const rYmax = (hanna[side+"Brow"].rangeY.max * imgY)
    const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
    let y = ((rangeTotY*oY) / imgY) + rYmin
    window[side+"Brow"].style.top = y+"px"
  })
}