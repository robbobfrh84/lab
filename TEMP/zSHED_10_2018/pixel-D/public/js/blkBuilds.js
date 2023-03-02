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

_placeBlksInGrid = (box, canvasType, cl)=>{
  const pixW = Math.sqrt(box.grid)*8
  const elm = canvasType === 'div' ? document.getElementById(box.id) : null
  const aj = box.blks.map((ajust)=>{ return _adjustXY(ajust.pos)})
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
      if (!fill && canvasType === 'div') {
        if (boxDataAdj && i-boxDataAdj.y > 0 && j-boxDataAdj.x > 0
          && i-boxDataAdj.y-8 <= 0 && j-boxDataAdj.x-8 <= 0 ) {
          gridBlk[i][j] = { color: 'rgba(0,0,0,0)' }
        } else {
          gridBlk[i][j] = { color: 'rgba(0,0,0,0.1)' }
        }
      }
    }
    if (canvasType === 'div') _buildDivCanvas(gridBlk, pixW, elm, 'tblk', cl)
  }
  if (canvasType === 'canvas') return gridBlk
}

_buildPost = (blk, i, id, type)=>{
  const gridSize = blk.grid ? parseInt(blk.grid) : 9
  const gridSizeKey = { '4': 70, '9': 46, '16': 34 }
  const gW = gridSizeKey[gridSize]
  const metaBlk = { post: blk,      type: type,    gridSize:  gridSize,
                    index: i,       pos: 6,        width: 46 }
  const appendsTot = _flattenAppends(blk.tree).length
  const appends = !metaBlk.post.appends ? "" :
    `<button class='posts-appends'
      onClick='_appends(${JSON.stringify({ a: metaBlk, i: i })})'>
        View Appends (${appendsTot})
      </button>
    `
  document.getElementById(id).innerHTML += `
    <div class="posts-post" stringBox='${JSON.stringify(metaBlk)}'
      id="post-${metaBlk.post.id+type}">
      <div class="posts-grid-append-box">
        <div class="posts-canvas-append-box" id="grid-${metaBlk.post.id+type}"></div>
        <div class='posts-grid-box'>
          <div class='posts-grid-toggle' gridsize='4'>4</div>
          <div class='posts-grid-toggle posts-grid-toggle-active'
            gridsize='9'>9</div>
          <div class='posts-grid-toggle' gridsize='16'>16</div>
        </div>
      </div>
      <canvas id="large-${metaBlk.post.id+type}" class="posts-canvas-large"></canvas>
      <div class='posts-userbox'>
        <button class='posts-star' onClick='_star()'> &star; </button>
        ${metaBlk.post.account}
      </div>
      <hr>
      <button class='posts-btn' onClick='_follow()'> follow >
        ${metaBlk.post.account} </button>
      <hr>
      <button class='posts-btn'
        onClick='_clone(${JSON.stringify(metaBlk.post)})'> clone </button>
      <hr>
      <div class='posts-append-note'> *Click empty box to append</div>
      <hr>
      ${appends}
    </div>
  `
  setTimeout(()=>{
    const grid = document.getElementById('grid-'+metaBlk.post.id+type)
    if (metaBlk.post.blks) {
      const gridBlks = _placeBlksInGrid(metaBlk.post, 'canvas')
      const sizeKey = { '1': 168, '4': 160, '9': 168, '16': 160 }
      const w = sizeKey[metaBlk.post.grid]
      _buildCanvas(w, metaBlk.post.grid, 'large-'+metaBlk.post.id+type, gridBlks)
    } else {
      _buildCanvas(168, '1', 'large-'+metaBlk.post.id+type, metaBlk.post.blk)
    }
    _buildPostGrid(metaBlk, grid, 'grid-', type)
  },10)
}

_buildCanvas = (width, gridSize, id, obj)=>{
  gridKey = { '1': 8, '4': 16, '9': 24, '16': 32 }
  const pix = width/gridKey[gridSize]
  const ctx = new canvas
  ctx.new(id,width,width)
  for (const x in obj) {
    for (const y in obj[x]) {
      ctx.rec((y*pix)-pix,(x*pix)-pix,pix,pix,obj[x][y].color)
    }
  }
}

_buildPostGrid = (metaBlk, parent, canvasId, type)=>{
  while (parent.hasChildNodes()){
    parent.removeChild(parent.lastChild);
  }
  let positions = {}
  if (metaBlk.post.blks) metaBlk.post.blks.map( b => { positions[b.pos] = b.blk })
  else positions[metaBlk.pos] = metaBlk.post.blk
  for (var i = 1; i <= metaBlk.gridSize; i++) {
    let adjIndex = i
    if (metaBlk.gridSize == 4) adjIndex = g4[i-1]
    else if (metaBlk.gridSize == 9) adjIndex = g9[i-1]
    if (positions[adjIndex]) {
      const box = document.createElement('canvas')
      box.id = canvasId+"-"+metaBlk.post.id+'_'+i+'_'+type
      box.classList.add("posts-canvas")
      box.classList.add("posts-grid"+metaBlk.gridSize)
      box.setAttribute('pos',adjIndex)
      box.setAttribute('stringbox', JSON.stringify(metaBlk))
      box.addEventListener('click', function(event){
        _clickArt(event, canvasId, type)
      })
      parent.appendChild(box)
      const gridSizeKey = { '4': 70, '9': 46, '16': 34 }
      metaBlk.width = gridSizeKey[metaBlk.gridSize]
      _buildCanvas(metaBlk.width, '1', box.id, positions[adjIndex]) // this is always '1' because it's referenceing the entire canvas area 1:16, 1:24, 1:32
    } else {
      const empty = document.createElement('div')
      const pos = i
      empty.classList.add("posts-canvas-empty")
      empty.classList.add("posts-grid"+metaBlk.gridSize)
      empty.addEventListener('click', function(event){
        _selectNode(event, metaBlk, pos)
      })
      parent.appendChild(empty)
    }
  }
}

_selectNode = (event, metaBlk, pos, newNode, parentNode)=>{
  let adjIndex = pos
  if (metaBlk.gridSize == 4) adjIndex = g4[pos-1]
  else if (metaBlk.gridSize == 9) adjIndex = g9[pos-1]
  metaBlk.selectedPos = adjIndex
  pageSwap('create')
  buildPageCreate(metaBlk, 'append')
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

_clone = (metaBlk)=>{
  pageSwap('create')
  buildPageCreate(metaBlk, 'clone')
}

_follow = ()=>{
  alert("In demo-mode, you follow everyone by default")
}

_star = ()=>{
  alert("You liked this Pixel Art! ...At this point in demo-mode, that's all we do here... Nobody will really know you like it... unless you tell them in person.")
}

_appends = (data)=>{
  pageSwap('appends')
  buildAppendsPage(data.a, data.i)
}

document.body.addEventListener('mouseover', function(event){
  if (event.target.classList.contains('posts-canvas-append-box')) {
    const allbox = event.target.getElementsByClassName('posts-canvas-empty')
    for (const box of allbox) {
      box.style.backgroundColor = 'rgba(0,0,0,0.2)'
    }
  }
  else {
    const allbox = document.getElementsByClassName('posts-canvas-empty')
    for (const box of allbox) {
      box.style.backgroundColor = 'rgba(0,0,0,0.1)'
    }
  }
  if (event.target.classList.contains('posts-canvas-empty')) {
    event.target.style.backgroundColor = 'rgba(0,0,0,0.2)'
  }
})

document.body.addEventListener('click', function(event){
  if (event.target.classList.contains('posts-grid-toggle')) {
    const post = event.target.parentElement.parentElement
    const changed = _gridCheck(post, event.target.innerHTML)
    if (changed) {
      for (const div of event.target.parentElement.children) {
        div.classList.remove('posts-grid-toggle-active')
      }
      event.target.classList.add('posts-grid-toggle-active')
    }
  }
})
