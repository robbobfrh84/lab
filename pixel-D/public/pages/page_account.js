buildAccount = ()=>{
  document.getElementById('page-account').innerHTML = `
    <br>
    <span id='account-userName'></span> <button class='b1 b2' onClick="logInOut('login')">logout</button>
    <br><br>
    <button onClick="pageSwap('posts')" class='b1'>posts</button>
    <button onClick="pageSwap('create')" class='b1'> &#x002B; Create</button><br>
    <div id='account-note' style='background-color: #ccc; margin-top: 20px;'></div>
    <div id='accounts-all-galery'>

      <div id='account-saved' style='display: none;'></div>

      <div id='account-posts' style='display: none;'></div>

      <div id='account-appends' style='display: none;'></div>

    <div>

  `

  if (account) {
    ddbGetVal('userBlks', account, (data)=>{
      if (!data.Item[account]) {
        const note = document.getElementById('account-note')
        note.innerHTML += `
          ...No Pixel Blocks yet Created... Click &#x1F446; [Create] &#x1F446; to start!
        `
      } else {
        data = data.Item[account]
        let gal = {}
        for (var i = data.length-1; i >= 0 ; i--) {
          const id = 'galCanvas'+i
          if ( !data[i].gallery.includes('posts')
            && !data[i].gallery.includes('appends')) {
            const where = document.getElementById('account-saved')
            if (!gal.saved) {
              where.style.display = 'block'
              where.innerHTML = `
                <hr> Saved <br><br>
              `
              gal.saved = true
            }
            const block = JSON.stringify(data[i])
            where.innerHTML += `
              <div class='account-canvas-edit-box'>
                <canvas id="${id}" class="gal-frame"></canvas>
                <div class='account-edit-box'>
                  <button id="edit-${id}" class="b1 b4"
                    onclick='edit(${block},${i})'>
                    edit
                  </button>
                  <button id="clone-${id}" class="b1 b4"
                    onclick='clone(${block},${i})'>
                    clone
                  </button>
                </div>
              </div>
            `
          }
          else if (data[i].gallery.includes('posts')){
            const where = document.getElementById('account-posts')
            if (!gal.posts) {
              where.style.display = 'block'
              where.innerHTML = `
                <hr> Posts <br><br>
              `
              gal.posts =true
            }
            const block = JSON.stringify(data[i])
            where.innerHTML += `
              <div class='account-canvas-edit-box'>
                <canvas id="${id}" class="gal-frame"></canvas>
                <div class='account-edit-box'>
                  <button id="view-${id}" class="b1 b4"
                    onclick='view(${block},${i})'>
                    view
                  </button>
                  <button id="clone-${id}" class="b1 b4"
                    onclick='clone(${block},${i})'>
                    clone
                  </button>
                </div>
              </div>
            `
          }
          else if (data[i].gallery.includes('appends')){
            const where = document.getElementById('account-appends')
            if (!gal.appends) {
              where.style.display = 'block'
              where.innerHTML = `
                <hr> Appends <br><br>
              `
              gal.appends =true
            }
            const block = JSON.stringify(data[i])
            where.innerHTML += `
              <div class='account-canvas-edit-box'>
                <canvas id="${id}" class="gal-frame"></canvas>
                <div class='account-edit-box'>
                  <button id="view-${id}" class="b1 b4"
                    onclick='view(${block},${i})'>
                    view
                  </button>
                  <button id="clone-${id}" class="b1 b4"
                    onclick='clone(${block},${i})'>
                    clone
                  </button>
                </div>
              </div>
            `
          }
        }
        data.map((box,i)=>{
          if (box.gallery.includes('appends')){
            const gridBlks = _placeBlksInGrid(box, 'canvas')
            _buildCanvas(192, box.grid, 'galCanvas'+i, gridBlks)
          } else {
            const width = 56
            const pix = width/8
            galCanvases[i] = new canvas
            galCanvases[i].new('galCanvas'+i, width,width)
            for (const x in box.blk) {
              for (const y in box.blk[x]) {
                galCanvases[i].rec((y*pix)-pix,(x*pix)-pix,pix,pix,box.blk[x][y].color)
              }
            }
          }
        })
      }
    })
  }

  edit = (blk, index)=>{
    pageSwap('create')
    buildPageCreate(blk, 'edit', index)
  }

  view = ()=>{
    alert('[View] art still under development')
  }

  clone = (blk, index)=>{
    if (blk.gallery.includes('appends')) {
      alert('[Clone] appended art still under development')
    }
    else {
      pageSwap('create')
      buildPageCreate(blk, 'clone', index)
    }
  }

}
buildAccount()
