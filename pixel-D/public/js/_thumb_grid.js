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

_setDivCanvas = (box, appends, selected)=>{
  const size = 8 // for both pixels across and down. like 8 = 8x8
  let blkAppend = 'tblk'
  if (box.grid == 16) blkAppend = 'tblk16'
  if (box.grid == 4) blkAppend = 'tblk4'
  const pixW = Math.sqrt(box.grid)*size
  appends.innerHTML += `
    <div id='${box.id}'><div>
  `
  const aj = box.blks.map((ajust)=>{
    return _adjustXY(ajust.pos)
  })
  boxDataAdj = null
  if (selected) {
    boxDataAdj = _adjustXY(selected)
  }
  let gridBlk = []
  for (var i = 0; i <= pixW; i++) {
    gridBlk[i] = []
    for (var j = 0; j <= pixW; j++) {
      let fill = false
      for (const p in box.blks) {
        if (box.blks[p].blk[i-aj[p].y] && box.blks[p].blk[i-aj[p].y][j-aj[p].x]) {
          gridBlk[i][j] = { color: box.blks[p].blk[i-aj[p].y][j-aj[p].x].color }
          fill = true
        }
      }
      if (!fill) {
        if (boxDataAdj && i-boxDataAdj.y > 0 && j-boxDataAdj.x > 0
          && i-boxDataAdj.y-8 <= 0 && j-boxDataAdj.x-8 <= 0 ) {
          gridBlk[i][j] = { color: 'rgba(0,0,0,0)' }
        } else {
          gridBlk[i][j] = { color: 'rgba(0,0,0,0.1)' }
        }
      }

    }
    _buildDivCanvas(gridBlk, pixW, document.getElementById(box.id), 'tblk', blkAppend)
  }
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

_adjustXY = (pos, a = {})=>{
  if ([2,6,10,14].includes(pos)) a.x = 8
  else if ([3,7,11,15].includes(pos)) a.x = 16
  else if ([4,8,12,16].includes(pos)) a.x = 24
  else a.x = 0
  if ([5,6,7,8].includes(pos)) a.y = 8
  else if ([9,10,11,12].includes(pos)) a.y = 16
  else if ([13,14,15,16].includes(pos)) a.y = 24
  else a.y = 0
  return a
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
