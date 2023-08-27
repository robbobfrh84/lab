function setPixels({ elmId, frame, blockSize, grid, creatorOverlay, callback }) {
  const g = document.getElementById("g-"+elmId)
  g.innerHTML = ""

  if (creatorOverlay) {
    for (let y = 0; y < grid.y; y++) {
      for (let x = 0; x < grid.x; x++) {
        let pixel = frame.pixels.filter( p => p.x === x && p.y === y )[0]
        if (!pixel) { pixel = {x, y, color: "rgba(0,0,0,0)"} }
        const id = 'path-'+elmId+'-'+x+'-'+y
        const embedId = 'id="'+id+'"'
        drawPixel({ g, x, y, pixel, blockSize, embedId })
        
        setTimeout(()=>{
          window[id].onmousedown = (e)=>{callback({ type: e.type, x, y, id, pixel })}
          window[id].onmouseup = (e)=>{callback({ type: e.type, x, y, id, pixel })}
          window[id].onmouseover = (e)=>{callback({ type: e.type, x, y, id, pixel })}
          window[id].onmouseout = (e)=>{callback({ type: e.type, x, y, id, pixel })}
        },10)

      }
    }
  } else {
    frame.pixels.map( p => {
      drawPixel({ g, x: p.x, y: p.y, pixel: p, blockSize })
    })
  }
  
}


function drawPixel({ g, x, y, pixel, blockSize, embedId }) {
  const px = x*blockSize + blockSize/2
  const py = y*blockSize + blockSize/2

  let d = `M${px} ${py}`
  d+=     ` L${px + blockSize} ${py}`
  d+=     ` L${px + blockSize} ${py + blockSize}`
  d+=     ` L${px} ${py + blockSize} Z`

  g.innerHTML += /*html*/`
    <path 
    ${embedId}
      fill-rule="evenodd"
      fill="${pixel.color}"
      d="${d}"
    ></path>`
}