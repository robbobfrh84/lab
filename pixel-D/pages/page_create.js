buildPageCreate = (editBlk, type, index)=>{
  const width = 264
  const mg = Math.floor(width*0.005)
  const twidth = 64
  const tmg = 0
  const size = 8

  SetInitialPage = ()=>{
    document.getElementById('page-create').innerHTML = `
      <div id='action-button' class='right'>
        <button id='create-post-append-Btn' class='b1' onClick='post()'>
          Post
        </button><br><hr>
        <button class='b1' onClick='save()'>Save</button>
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
        boxData[i][j] = { color: '#aaa' }
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
    const color =   blk.style.backgroundColor
    if (blk.id !== 'create-box') {
      const newColor = blk.style.backgroundColor === currentColor ? '#aaa' : currentColor
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
    const block = { old: editBlk, new: boxData, index: index }
    ddb('update', 'saved', account, block, ()=>{
      pageSwap('account')
      buildAccount()
    })
  }

  append = ()=>{
    // pageSwap('append')
    ddb('put', 'append', account, editBlk, ()=>{
      // pageSwap('account')
      // buildAccount()
    })
  }

  del = (boxData, index)=>{
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
      const actionButton = document.getElementById('action-button')
      actionButton.innerHTML = `
        <button class='b1' onClick='post(boxData)'>Post</button><br><hr>
        <button class='b1' onClick='update(boxData,${index})'>Update</button><br><hr>
        Original: <div id='create-og-thumb'></div><hr>
        <button class='b1' onClick='del(boxData,${index})'>Delete</button>
      `
      const ogThumb = document.getElementById('create-og-thumb')
      ogThumb.style.width = twidth+'px'
      _buildDivCanvas(editBlk.blk, size, document.getElementById('create-og-thumb'))
    }
    if (type === 'append') {
      const appendBtn = document.getElementById('create-post-append-Btn')
      appendBtn.innerHTML = 'Append'
      appendBtn.setAttribute('onClick', 'append()')
      const pixW = Math.sqrt(editBlk.gridSize)*size
      //
      //
      // 🚨
      //
      //
      // console.log('built resized thumb here...', editBlk)
      adjustXY = (pos, a = {})=>{
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

      let aA = adjustXY(editBlk.pos)
      boxDataAdj = adjustXY(editBlk.selectedPos)

      let gridBlk = []
      for (var i = 0; i <= pixW; i++) {
        gridBlk[i] = []
        for (var j = 0; j <= pixW; j++) {
          if (editBlk.post.blk[i-aA.y] && editBlk.post.blk[i-aA.y][j-aA.x]) {
            gridBlk[i][j] = { color: editBlk.post.blk[i-aA.y][j-aA.x].color }
          } else if (i-boxDataAdj.y > 0 && j-boxDataAdj.x > 0
            && i-boxDataAdj.y-8 <= 0 && j-boxDataAdj.x-8 <= 0 ) {
            gridBlk[i][j] = { color: '#aaa' }
          } else {
            gridBlk[i][j] = { color: 'rgba(255,255,255,0.2)' }
          }
        }
      }
      //
      //
      //
      //

      _buildDivCanvas(gridBlk, pixW, document.getElementById('create-thumb'))
      _buildPostGrid(editBlk, document.getElementById('create-grid-canvas'), 'create-')
    }
  }

  const sheet = document.createElement('style')
  sheet.innerHTML = `
    #create-box, #create-thumb, #create-og-thumb {
      padding: ${mg}px;
    }
    #create-thumb, #create-og-thumb {
      padding: ${tmg}px;
    }
    .blk, .tblk {
      width: ${(width/size)-(mg*2)}px;
      height: ${(width/size)-(mg*2)}px;
      margin: ${mg}px;
    }
    .tblk {
      width: ${(twidth/size)-(tmg*2)}px;
      height: ${(twidth/size)-(tmg*2)}px;
      margin: ${tmg}px;
    }
  `

  SetInitialPage()
  buildUserCanvasBox(8)
  if (editBlk) {
    editCheck()
  }
  document.body.appendChild(sheet);

}
