_buildCanvas = (width, id, obj, pix = width/8)=>{
  const ctx = new canvas
  ctx.new(id,width,width)
  for (const x in obj) {
    for (const y in obj[x]) {
      ctx.rec((y*pix)-pix,(x*pix)-pix,pix,pix,obj[x][y].color)
    }
  }
}

_buildDivCanvas = (blk, size, elm, id, blkClass)=>{
  if (!blkClass) blkClass = 'tblk'
  let pixels = ''
  for (var i = 1; i <= size; i++) {
    for (var j = 1; j <= size; j++) {
      if (blk[i] && blk[i][j]) {
        pixels += `
          <div class="${blkClass}" id="${id}-${i}-${j}"
           style="background-color: ${blk[i][j].color}"></div>
        `
      }
    }
    pixels += `<br>`
  }
  elm.innerHTML = pixels
}

_buildPostGrid = (metaBlk, parent, canvasId)=>{
  while (parent.hasChildNodes()){
    parent.removeChild(parent.lastChild);
  }
  for (var i = 1; i <= metaBlk.gridSize; i++) {
    let adjIndex = i
    if (metaBlk.gridSize == 4) adjIndex = g4[i-1]
    else if (metaBlk.gridSize == 9) adjIndex = g9[i-1]
    if (adjIndex === metaBlk.pos) {
      const box = document.createElement('canvas')
      box.id = canvasId+i+"-"+metaBlk.id
      box.classList.add("showcase-canvas")
      box.setAttribute('stringbox', JSON.stringify(metaBlk))
      box.addEventListener('click', function(event){
        _clickArt(event, canvasId)
      })
      parent.appendChild(box)
      _buildCanvas(metaBlk.width, box.id, metaBlk.post.blk)
    } else {
      const empty = document.createElement('div')
      const pos = i
      empty.classList.add("showcase-canvas-empty")
      empty.classList.add("showcase-canvas-empty"+metaBlk.id)
      empty.addEventListener('click', function(event){
        selectNode(event, metaBlk, pos)
      })
      parent.appendChild(empty)
    }
  }
}

_clickArt = function(event, canvasId){
  const parent = event.target.parentElement
  const metaBlk = JSON.parse(event.target.getAttribute('stringbox'))
  while (parent.hasChildNodes()){
    parent.removeChild(parent.lastChild);
  }
  for (var i = 1; i <= metaBlk.gridSize; i++) {
    const index = i
    const mask = document.createElement('div')
    mask.classList.add("showcase-canvas-mask")
    mask.classList.add("showcase-canvas-mask"+metaBlk.id)
    mask.pos = i
    mask.stringBox = metaBlk
    mask.addEventListener('click', function(event){
      metaBlk.pos = index
      if (metaBlk.gridSize == 4) metaBlk.pos = g4[index-1]
      if (metaBlk.gridSize == 9) metaBlk.pos = g9[index-1]
      const container = document.getElementById('post-'+metaBlk.id)
      container.setAttribute('stringBox', JSON.stringify(metaBlk))
      _buildPostGrid(metaBlk, event.target.parentElement, canvasId)
    })
    const box = document.createElement('canvas')
    box.id = canvasId+i+"-"+metaBlk.id
    box.classList.add("showcase-canvas")
    parent.appendChild(box)
    parent.appendChild(mask)
    _buildCanvas(metaBlk.width, box.id, metaBlk.post.blk)
  }
}
