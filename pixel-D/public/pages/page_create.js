buildPageCreate = (editBlk, type, index)=>{
  boxDataAdj = type === 'clone' ? { x: 0, y: 0 } : boxDataAdj
  const width = 264
  const mg = Math.floor(width*0.005)
  const tmg = 0
  const size = 8 // for both pixels across and down. like 8 = 8x8
  let twidth = 64

  SetInitialPage = ()=>{
    document.getElementById('page-create').innerHTML = `
      <div id='create-action-button' class='right'>
        <div class='create-action-container'>
          <button id='create-post-append-Btn' class='b1' onClick='post()'>
            Post
          </button><br><hr>
          <button class='b1' onClick='save()'>Save</button>
        </div>
      </div>
      <div id='create-thumb'></div>
      <div id='create-box'></div>
      <div id='create-hoverColor'>
        <div id='create-colors'></div>
      </div>
      <hr class='f16'>
      <div id='create-grid-canvas'></div>
    `
  }

  buildUserCanvasBox = (pixels)=>{
    let box = document.getElementById('create-box')
    let thumb = document.getElementById('create-thumb')
    box.style.width = width+'px'
    for (var i = 1; i <= pixels; i++) { // 👈 Build EMPTY canvas and thumbnail mirror Selector
      boxData[i] = {}
      for (var j = 1; j <= pixels; j++) {
        box.innerHTML += `<div id="blk-${i}-${j}" class="blk" ></div>`
        thumb.innerHTML += `<div id="tblk-${i}-${j}" class="tblk" ></div>`
        boxData[i][j] = { color: 'rgba(0,0,0,0)' }
      }
      box.innerHTML += `<br>`
      thumb.innerHTML += `<br>`
    }
    let swatch = document.getElementById('create-colors')
    colors.map((c,i)=>{ // 👈 Build Color Selector
      const br = ((i+1)%28 === 0 && i !== 0) ? `<br>` : ""
      swatch.innerHTML += `
        <div class='create-swatch-div'
          style="background-color: ${c.name}"
          id='${"create-swatch-color"+i}'
        ></div>
        ${br}
      `
    })
    swatch.addEventListener('click', function(event){
      currentColor = event.target.style.backgroundColor
      document.getElementById('create-colors').style.backgroundColor = currentColor
    })
    box.addEventListener('mouseover', function(event){
      if (mousedown) {
        changeColor(event.target.id)
      }
    })
    box.addEventListener('mousedown', function(event){
      changeColor(event.target.id)
    })
    document.body.addEventListener('mouseover', function(event){
      const hoverColor = document.getElementById('create-hoverColor')
      if (event.target.classList.contains('create-swatch-div')) {
        hoverColor.style.backgroundColor = event.target.style.backgroundColor
      } else if (!event.target.classList.contains('tblk')) {
        hoverColor.style.backgroundColor = 'rgba(0,0,0,0)'
      }
    })
    thumb.addEventListener('click', function(event){
      currentColor = event.target.style.backgroundColor
      document.getElementById('create-colors').style.backgroundColor = currentColor
    })
    thumb.addEventListener('mouseover', function(event){
      const hover = event.target.style.backgroundColor
      document.getElementById('create-hoverColor').style.backgroundColor = hover
    })
  }

  changeColor = (id)=>{
    let ind = id.split('-')
    gridThumb = 'tblk-'+(parseInt(ind[1])+boxDataAdj.y)+'-'+(parseInt(ind[2])+boxDataAdj.x)
    const blk = document.getElementById(id)
    const tblk = document.getElementById(gridThumb)
    const color = blk.style.backgroundColor
    if (blk.id !== 'create-box') {
      const newColor = blk.style.backgroundColor === currentColor ? 'rgba(0,0,0,0)' : currentColor
      blk.style.backgroundColor = newColor
      tblk.style.backgroundColor = newColor
      const cord = blk.id.split('-')
      boxData[cord[1]][cord[2]] = {
        color: newColor
      }
    }
  }

  post = ()=>{
    pageSwap('showcase')
    ddb('put', 'post', account, boxData, ()=>{
      pageSwap('showcase')
      buildAccount()
    })
  }

  save = ()=>{
    pageSwap('account')
    ddb('put', 'save', account, boxData, ()=>{
      pageSwap('account')
      buildAccount()
    })
  }

  update = (boxData, index)=>{
    pageSwap('account')
    ddb('update', 'saved', account, { blk: boxData, index: index }, ()=>{
      pageSwap('account')
      buildAccount()
    })
  }

  append = ()=>{
    ddb('put', 'append', account, editBlk, ()=>{
      pageSwap('append')
      buildAccount()
    })
  }

  remove = (boxData, index)=>{
    console.log('update: ok... same as update, but make a bool set to removed = true')
  }

  editCheck = ()=>{
    const b = editBlk.blk
    for (const x in b) { // 👈 This fills in BOTH User Canvas and Thumb for BOTH edit & clone.
      for (const y in b[x]) {
        currentColor = b[x][y].color
        changeColor('blk-'+x+'-'+y)
        currentColor = 'brown'
      }
    }
    if (type === 'edit') {
      const actionButton = document.getElementById('create-action-button')
      actionButton.innerHTML = `
        <div class='create-action-container'>
          <button class='b1' onClick='post(boxData)'>Post</button><br><hr>
          <button class='b1' onClick='update(boxData,${index})'>Update</button><br><hr>
          Original: <div id='create-og-thumb'></div><hr>
          <button class='b1' onClick='remove(boxData,${index})'>Delete</button>
        </div>
      `
      const ogThumb = document.getElementById('create-og-thumb')
      ogThumb.style.width = twidth+'px'
      _buildDivCanvas(editBlk.blk, size, document.getElementById('create-og-thumb'), 'ogtblk')
    }
    if (type === 'append') {

      if (!editBlk.post.blks) {
        editBlk.post.blks = [{
          blk: editBlk.post.blk,
          pos: editBlk.pos,
          gen: '?',
        }]
      }

      let nextGen = 0
      editBlk.post.blks.map(x=>{ if (x.gen > nextGen) nextGen = x.gen })
      nextGen++

      console.log("!!!!🚨 _Here's where we get GENERATION!")
      console.log('nextGen',nextGen)
      console.log('editBlks.post.blks: ',editBlk.post.blks)

      editBlk.post.grid = editBlk.gridSize
      let prepBox = {}; prepBox[editBlk.post.id] = editBlk.post
      const gridBox = document.getElementById('create-thumb')
      gridBox.innerHTML = ''
      prepDivCanvas(editBlk.post, gridBox, editBlk.selectedPos)
      const appendBtn = document.getElementById('create-post-append-Btn')
      appendBtn.innerHTML = 'Append'
      appendBtn.setAttribute('onClick', 'append()')
      //
      //
      // 👇 This builds the selector grid. 
      _buildPostGrid(editBlk, document.getElementById('create-grid-canvas'), 'create-')
    }
  }

  prepDivCanvas = (box, appends, selected, blkAppend = 'tblk')=>{
    if (box.grid == 16) blkAppend = 'tblk16'
    if (box.grid == 4) blkAppend = 'tblk4'
    appends.innerHTML += `<div id='${box.id}'><div>`
    boxDataAdj = null
    if (selected) boxDataAdj = _adjustXY(selected)
    _placeBlksInGrid(box, 'div', blkAppend)
  }

  const sheet = document.createElement('style')
  sheet.innerHTML = `
    #create-thumb, #create-og-thumb {
      padding: ${tmg}px;
    }
    .blk {
      width: ${(width/size)-(mg*2)}px;
      height: ${(width/size)-(mg*2)}px;
    }
    .tblk, .ogtblk, .tblk16, .tblk4 {
      width: ${(twidth/size)-(tmg*2)}px;
      height: ${(twidth/size)-(tmg*2)}px;
      margin: ${tmg}px;
    }
    .tblk16 {
      width: ${(((twidth*3)/4)/size)-(tmg*2)}px;
      height: ${(((twidth*3)/4)/size)-(tmg*2)}px;
    }
    .tblk4 {
      width: ${(((twidth*3)/2)/size)-(tmg*2)}px;
      height: ${(((twidth*3)/2)/size)-(tmg*2)}px;
    }
  `

  SetInitialPage()
  buildUserCanvasBox(size)
  if (editBlk) {
    editCheck()
  }
  document.body.appendChild(sheet);
}
