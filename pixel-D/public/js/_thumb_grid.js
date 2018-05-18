_setDivCanvas = (box, appends, selected)=>{
  const size = 8 // for both pixels across and down. like 8 = 8x8
  let blkAppend = 'tblk'
  if (box.grid == 16) blkAppend = 'tblk16'
  if (box.grid == 4) blkAppend = 'tblk4'
  const pixW = Math.sqrt(box.grid)*size
  appends.innerHTML += `
    <div id='${box.id}'><div>
  `
  boxDataAdj = null
  if (selected) {
    boxDataAdj = _adjustXY(selected)
  }
  //
  // !!!
  //
  const aj = box.blks.map((ajust)=>{
    return _adjustXY(ajust.pos)
  })
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

_placeBlksInGrid = (box, canvasType)=>{
  console.log(box)
  const pixW = Math.sqrt(box.grid)*8

  const aj = box.blks.map((ajust)=>{
    return _adjustXY(ajust.pos)
  })
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
    if (canvasType === 'div') {
      _buildDivCanvas(gridBlk, pixW, document.getElementById(box.id), 'tblk', blkAppend)
    }
  }
  if (canvasType === 'canvas') {
    return gridBlk
  }
}

/*
 ----------------------      posts / appends_posts      -----------------------
*/

_buildPost = (blk, i, id, type)=>{
  const metaBlk = { post: blk,      type: type,    index: i,
                    gridSize: 9,    pos: 6,        width: 46 }
  const appends = !metaBlk.post.appends ? "" :
    `<button class='showcase-appends'
      onClick='_appends(${JSON.stringify({ a: metaBlk, i: i })})'>
        View Appends (${Object.keys(metaBlk.post.appends).length})
      </button>
    `
  document.getElementById(id).innerHTML += `
    <div class="showcase-post" stringBox='${JSON.stringify(metaBlk)}'
      id="post-${metaBlk.post.id+type}">
      <div class="showcase-grid-append-box">
        <div class="showcase-canvas-append-box" id="grid-${metaBlk.post.id+type}"></div>
        <div class='showcase-grid-box'>
          <div class='showcase-grid-toggle' gridsize='4'>4</div>
          <div class='showcase-grid-toggle showcase-grid-toggle-active'
            gridsize='9'>9</div>
          <div class='showcase-grid-toggle' gridsize='16'>16</div>
        </div>
      </div>
      <canvas id="large-${metaBlk.post.id+type}" class="showcase-canvas-large"></canvas>
      <div class='showcase-userbox'>
        <button class='showcase-star' onClick='_star()'> &star; </button>
        ${metaBlk.post.account}
      </div>
      <hr>
      <button class='showcase-btn' onClick='_follow()'> follow >
        ${metaBlk.post.account} </button>
      <hr>
      <button class='showcase-btn'
        onClick='_clone(${JSON.stringify(metaBlk.post)})'> clone </button>
      <hr>
      <div class='showcase-append-note'> *Click empty box to append</div>
      <hr>
      ${appends}
    </div>
  `
  setTimeout(()=>{
    const grid = document.getElementById('grid-'+metaBlk.post.id+type)
    if (metaBlk.post.blks) {
      metaBlk.post.blk = metaBlk.post.blks[0].blk
      _buildPostGrid(metaBlk, grid, 'grid-', type)
      const gridBlks = _placeBlksInGrid(metaBlk.post, 'canvas')
      const sizeKey = { '1': 168, '4': 160, '9': 168, '16': 160 }
      const w = sizeKey[metaBlk.post.grid]
      _buildCanvas(w, metaBlk.post.grid, 'large-'+metaBlk.post.id+type, gridBlks)
      // _buildCanvas(176, '9', 'large-'+metaBlk.post.id+type, metaBlk.post.blk)
    } else {
      _buildCanvas(168, '1', 'large-'+metaBlk.post.id+type, metaBlk.post.blk)
    }
    // 👇 ⚠️ OK... so for posts. we don't need this because when we reset to 9/centered, it actually does the work... so for posts this part really shouldn't be done...
    if (type !== '-post') _buildPostGrid(metaBlk, grid, 'grid-', type)
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
  for (var i = 1; i <= metaBlk.gridSize; i++) {
    let adjIndex = i
    if (metaBlk.gridSize == 4) adjIndex = g4[i-1]
    else if (metaBlk.gridSize == 9) adjIndex = g9[i-1]
    if (adjIndex === metaBlk.pos) {
      const box = document.createElement('canvas')
      box.id = canvasId+"-"+metaBlk.post.id+type
      box.classList.add("showcase-canvas")
      box.setAttribute('stringbox', JSON.stringify(metaBlk))
      box.addEventListener('click', function(event){
        _clickArt(event, canvasId, type)
      })
      parent.appendChild(box)
      _buildCanvas(metaBlk.width, '1', box.id, metaBlk.post.blk)
    } else {
      const empty = document.createElement('div')
      const pos = i
      empty.classList.add("showcase-canvas-empty")
      empty.classList.add("showcase-canvas-empty"+metaBlk.post.id+type)
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

_clickArt = function(event, canvasId, type){
  const parent = event.target.parentElement
  const metaBlk = JSON.parse(event.target.getAttribute('stringbox'))
  while (parent.hasChildNodes()){
    parent.removeChild(parent.lastChild);
  }
  for (var i = 1; i <= metaBlk.gridSize; i++) {
    const index = i
    const mask = document.createElement('div')
    mask.classList.add("showcase-canvas-mask")
    mask.classList.add("showcase-canvas-mask"+metaBlk.post.id+type)
    mask.pos = i
    mask.stringBox = metaBlk
    mask.addEventListener('click', function(event){
      metaBlk.pos = index
      if (metaBlk.gridSize == 4) metaBlk.pos = g4[index-1]
      if (metaBlk.gridSize == 9) metaBlk.pos = g9[index-1]
      const container = document.getElementById('post-'+metaBlk.post.id+type)
      container.setAttribute('stringBox', JSON.stringify(metaBlk))
      _buildPostGrid(metaBlk, event.target.parentElement, canvasId, type)
    })
    const box = document.createElement('canvas')
    box.id = canvasId+i+"-"+metaBlk.id+type
    box.classList.add("showcase-canvas")
    parent.appendChild(box)
    parent.appendChild(mask)
    _buildCanvas(metaBlk.width, '1', box.id, metaBlk.post.blk)
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

_gridChange = (post, grid)=>{
  let metaBlk = JSON.parse(post.parentElement.getAttribute('stringBox'))
  if (grid == 4 && !g4.includes(metaBlk.pos)) {
    const children = post.childNodes[1].children
    for (var i = 0; i < children.length; i++) {
      if ((metaBlk.gridSize == 16 && g4.includes(i+1))
      ||  (metaBlk.gridSize == 9 && g49.includes(i+1))) {
        const elm = children[i]
        elm.style.backgroundColor = 'rgba(0,0,0,0.2)'
        setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.1)' },200)
        setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.2)' },400)
        setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.1)' },600)
      }
    }
  } else if (grid == 9 && !g9.includes(metaBlk.pos)) {
    const children = post.childNodes[1].children
    for (var i = 0; i < children.length; i++) {
      if (g9.includes(i+1)) {
        const elm = children[i]
        elm.style.backgroundColor = 'rgba(0,0,0,0.2)'
        setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.1)' },200)
        setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.2)' },400)
        setTimeout(()=>{ elm.style.backgroundColor = 'rgba(0,0,0,0.1)' },600)
      }
    }
  } else {
    const sheet = document.createElement('style')
    if (grid == 4) {
      const w = 70
      metaBlk.width = w
      sheet.innerHTML = `
        .showcase-canvas-empty${metaBlk.post.id+metaBlk.type} {
          width: ${w}px;
          height: ${w}px;
        }
        .showcase-canvas-mask${metaBlk.post.id+metaBlk.type} {
          min-width: ${w}px;
          height: ${w}px;
          margin-left: -${w+1}px;
        }
      `
    } else if (grid == 9) {
      const w = 46
      metaBlk.width = w
      sheet.innerHTML = `
        .showcase-canvas-empty${metaBlk.post.id+metaBlk.type} {
          width: ${w}px;
          height: ${w}px;
        }
        .showcase-canvas-mask${metaBlk.post.id+metaBlk.type} {
          min-width: ${w}px;
          height: ${w}px;
          margin-left: -${w+1}px;
        }
      `
    } else {
      const w = 34
      metaBlk.width = w
      sheet.innerHTML = `
        .showcase-canvas-empty${metaBlk.post.id+metaBlk.type} {
          width: ${w}px;
          height: ${w}px;
        }
        .showcase-canvas-mask${metaBlk.post.id+metaBlk.type} {
          min-width: ${w}px;
          height: ${w}px;
          margin-left: -${w+1}px;
        }
      `
    }
    document.body.append(sheet)
    metaBlk.gridSize = grid
    post.parentElement.setAttribute('stringBox', JSON.stringify(metaBlk))
    _buildPostGrid(metaBlk, post.childNodes[1], 'grid-', metaBlk.type)
  }
  document.body.addEventListener('mouseover', function(event){
    if (event.target.classList.contains('showcase-canvas-append-box')) {
      const allbox = event.target.getElementsByClassName('showcase-canvas-empty')
      for (const box of allbox) {
        box.style.backgroundColor = 'rgba(0,0,0,0.2)'
      }
    }
    else {
      const allbox = document.getElementsByClassName('showcase-canvas-empty')
      for (const box of allbox) {
        box.style.backgroundColor = 'rgba(0,0,0,0.1)'
      }
    }
    if (event.target.classList.contains('showcase-canvas-empty')) {
      event.target.style.backgroundColor = 'rgba(0,0,0,0.2)'
    }
  })
  document.body.addEventListener('click', function(event){
    if (event.target.classList.contains('showcase-grid-toggle')) {
      for (const div of event.target.parentElement.children) {
        div.classList.remove('showcase-grid-toggle-active')
      }
      event.target.classList.add('showcase-grid-toggle-active')
      const post = event.target.parentElement.parentElement
      _gridChange(post, event.target.innerHTML)
    }
  })
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
