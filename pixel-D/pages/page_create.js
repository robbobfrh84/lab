buildPageCreate = (editBlock, type, index)=>{
  const width = 264
  const mg = Math.floor(width*0.005)
  const twidth = 64
  const tmg = 0
  const size = 8

  document.getElementById('page-create').innerHTML = `
    <div id='action-button' class='right'>
      <button class='b1' onClick='post(boxData)'>Post</button><br><hr>
      <button class='b1' onClick='save(boxData)'>Save</button>
    </div>
    <div id='create-thumb'></div>
    <div id='create-box'></div>
    <div id='create-hoverColor'>
      <div id='create-colors'></div>
    </div>
  `

  let box = document.getElementById('create-box')
  let thumb = document.getElementById('create-thumb')

  box.style.width = width+'px'
  thumb.style.width = twidth+'px'

  for (var i = 1; i <= size; i++) {
    boxData[i] = {}
    for (var j = 1; j <= size; j++) {
      box.innerHTML += `<div id="blk-${i}-${j}" class="blk" ></div>`
      thumb.innerHTML += `<div id="tblk-${i}-${j}" class="tblk" ></div>`
      boxData[i][j] = {
        color: '#aaa'
      }
    }
    box.innerHTML += `<br>`
    thumb.innerHTML += `<br>`
  }

  let swatch = document.getElementById('create-colors')
  colors.map((c,i)=>{
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
    } else {
      hoverColor.style.backgroundColor = 'rgba(0,0,0,0)'
    }
  })

  changeColor = (id)=>{
    const blk = document.getElementById(id)
    const tblk = document.getElementById('t'+id)
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

  post = (boxData)=>{
    pageSwap('showcase')
    ddb('put', 'post', account, boxData, ()=>{
      pageSwap('showcase')
      buildAccount()
    })
  }

  save = (boxData)=>{
    pageSwap('account')
    ddb('put', 'save', account, boxData, ()=>{
      pageSwap('account')
      buildAccount()
    })
  }

  update = (boxData, index)=>{
    pageSwap('account')
    const block = { old: editBlock, new: boxData, index: index }
    ddb('update', 'saved', account, block, ()=>{
      pageSwap('account')
      buildAccount()
    })
  }

  del = (boxData, index)=>{
    console.log('update: ok... same as update, but make a bool set to removed = true')
  }

  if (editBlock) {
    const b = editBlock.blk
    for (const x in b) {
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

      for (var i = 1; i <= size; i++) {
        for (var j = 1; j <= size; j++) {
          ogThumb.innerHTML += `
            <div class="tblk"
              style="background-color: ${b[i][j].color}">
            </div>
          `
        }
        ogThumb.innerHTML += `<br>`
      }
    }
  }

  const sheet = document.createElement('style')
  sheet.innerHTML = `
    #page-create {
      font-size: 0px;
      color: #666;
    }
    #action-button {
      font-size: 16px;
    }
    #create-box, #create-thumb, #create-og-thumb {
      font-size: 0px;
      background-color: #ccc;
      padding: ${mg}px;
      margin: auto;
    }
    #create-thumb, #create-og-thumb {
      float: left;
      padding: ${tmg}px;
    }
    #create-og-thumb {
      float: none;
    }
    #create-box {
      margin-bottom: 15px;
    }
    #create-hoverColor {
      padding: 5px;
      background-color: rgba(0,0,0,0);
      width: 510px;
      margin: auto;
    }
    #create-colors {
      padding: 5px;
      background-color: brown;
      width: 470px;
      margin: auto;
    }
    .create-swatch-div {
      width: 15px;
      height: 20px;
      display: inline-block;
      color: rgba(0,0,0,0);
      font-size: 0px;
      cursor: pointer;
    }
    .blk, .tblk {
      background-color: #aaa;
      color: rgba(0,0,0,0.5);
      display: inline-block;
      width: ${(width/size)-(mg*2)}px;
      height: ${(width/size)-(mg*2)}px;
      margin: ${mg}px;
      cursor: pointer;
      padding: none;
      margin: none;
    }
    .tblk {
      width: ${(twidth/size)-(tmg*2)}px;
      height: ${(twidth/size)-(tmg*2)}px;
      margin: ${tmg}px;
      cursor: initial;
    }
    #account {
      color: #666
    }
  `
  document.body.appendChild(sheet);
}
