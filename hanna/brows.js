function handleCursorBrows(e) {
  ["left","right"].forEach( side => {
  
    // const oY = e.offsetY
    // const rYmin = (hanna[side+"Brow"].rangeY.min * imgY)
    // const rYmax = (hanna[side+"Brow"].rangeY.max * imgY)
    // const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
    // let y = ((rangeTotY*oY) / imgY) + rYmin
    // window[side+"Brow"].style.top = y+"px"
    // // 🔥 THIS WORKS - SAVE



    let oY = e.offsetY
    if (side === "left") {
      oY = imgY - e.offsetY
    }
    const rYmin = (hanna[side+"Brow"].rangeY.min * imgY)
    const rYmax = (hanna[side+"Brow"].rangeY.max * imgY)
    const rangeTotY = Math.abs(rYmin) + Math.abs(rYmax)
    let y = ((rangeTotY*oY) / imgY) + rYmin
    window[side+"Brow"].style.top = y+"px"



  })
}