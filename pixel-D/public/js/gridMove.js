_clickArt = function(event, canvasId, type){
  const parent = event.target.parentElement
  const metaBlk = JSON.parse(event.target.getAttribute('stringbox'))
  while (parent.hasChildNodes()){
    parent.removeChild(parent.lastChild);
  }
  let exists = {}
  let selected = {}
  const pos = event.target.getAttribute('pos')
  if (metaBlk.post.blks) {
    metaBlk.post.blks.map(x=>{
      if (x.pos == pos) selected = { blk: x.blk, pos: x.pos }
      else exists[x.pos] = { blk: x.blk, pos: x.pos }
    })
  } else {
    selected = { blk: metaBlk.post.blk, pos: pos }
  }
  for (var i = 1; i <= metaBlk.gridSize; i++) {
    const index = i
    const adjInd = _adjGridPosition(metaBlk.gridSize, i)
    const mask = document.createElement('div')
    mask.classList.add("posts-canvas-mask")
    mask.classList.add("posts-canvas-mask"+metaBlk.post.id+type)
    mask.classList.add("posts-grid"+metaBlk.gridSize)
    mask.classList.add("posts-grid-adj"+metaBlk.gridSize)
    mask.pos = i
    mask.stringBox = metaBlk
    mask.addEventListener('click', function(event){
      if (metaBlk.post.blks) {
        if (!metaBlk.post.blks.filter(x => x.pos == adjInd)[0]) {
          metaBlk.post.blks.map((x,i)=>{
            if (x.pos == selected.pos) metaBlk.post.blks[i].pos = adjInd
          })
        }
      }
      metaBlk.pos = adjInd
      const container = document.getElementById('post-'+metaBlk.post.id+type)
      container.setAttribute('stringBox', JSON.stringify(metaBlk))
      _buildPostGrid(metaBlk, event.target.parentElement, canvasId, type)
    })
    if (exists[adjInd]) {
      mask.classList.add("posts-canvas-mask-exists")
      _setInGrid(metaBlk, parent, mask, canvasId, i, type, exists[adjInd].blk)
    } else {
      _setInGrid(metaBlk, parent, mask, canvasId, i, type, selected.blk)
    }
  }
}

_setInGrid = (metaBlk, parent, mask, canvasId, i, type, blk)=>{
  const box = document.createElement('canvas')
  box.id = canvasId+i+"-"+metaBlk.post.id+type
  box.classList.add("posts-canvas")
  box.classList.add("posts-grid"+metaBlk.gridSize)
  parent.appendChild(box)
  parent.appendChild(mask)
  _buildCanvas(metaBlk.width, '1', box.id, blk) // this is always '1' because it's referenceing the entire canvas area 1:16, 1:24, 1:32
}

_gridCheck = (post, grid)=>{
  let metaBlk = JSON.parse(post.parentElement.getAttribute('stringBox'))
  let changed = true
  const blks = metaBlk.post.blk ? [{blk: metaBlk.post.blk, pos: metaBlk.pos}]
    : metaBlk.post.blks
  for (const b of blks) {
    if (grid == 4 && !g4.includes(b.pos)) {
      const children = post.childNodes[1].children
      for (var i = 0; i < children.length; i++) {
        if ((children.length == 16 && g4.includes(i+1))
        ||  (children.length == 9 && g49.includes(i+1))) {
          _flash(children[i])
        }
      }
      changed = false
      break;
    } else if (grid == 9 && !g9.includes(b.pos)) {
      const children = post.childNodes[1].children
      for (var i = 0; i < children.length; i++) {
        if (g9.includes(i+1)) _flash(children[i])
      }
      changed = false
      break;
    }
  }

  metaBlk.gridSize = grid
  if (changed) _buildPostGrid(metaBlk, post.childNodes[1], 'grid-', metaBlk.type)
  return changed
}

_flash = (child)=>{
  const elm = child
  elm.style.backgroundColor = 'rgba(0,0,0,0.2)'
  setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.1)' },200)
  setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.2)' },400)
  setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.1)' },600)
}

_adjGridPosition = (size, index, adjusted)=>{
  adjusted = index
  if (size == 4) adjusted = g4[index-1]
  if (size == 9) adjusted = g9[index-1]
  return adjusted
}
