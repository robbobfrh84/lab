buildAccount = ()=>{
  document.getElementById('page-account').innerHTML = `
    <br>
    <span id='account-userName'></span> <button class='b1 b2' onClick="logInOut('login')">logout</button>
    <br><br>
    <button onClick="pageSwap('showcase')" class='b1'>Showcase</button>
    <button onClick="pageSwap('create')" class='b1'> &#x002B; Create</button><br>
    <br>
    <hr>
    Saved
    <div id='account-saved'></div>
    <br>
    <hr>
    Posts
    <div id='account-posts'></div>
  `

  if (account) {
    ddbGet(account,(data)=>{
      const saved = document.getElementById('account-saved')
      const posts = document.getElementById('account-posts')
      if (!data.Item) {
        posts.innerHTML += `<br><hr>
          ...No Pixel Blocks yet Created... Click *-> ^ [Create] ^ to start!
        `
      } else {
        for (var i = data.Item.blocks.length-1; i >= 0 ; i--) {
          const where = data.Item.blocks[i].gallery.includes('posts') ? posts : saved
          const id = 'galCanvas'+i
          if (!data.Item.blocks[i].gallery.includes('posts')) {
            const block = JSON.stringify(data.Item.blocks[i])
            where.innerHTML += `
              <div class='account-canvas-edit-box'>
                <canvas id="${id}" class="showcase-canvas"></canvas>
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
          } else {
            const block = JSON.stringify(data.Item.blocks[i])
            where.innerHTML += `
              <div class='account-canvas-edit-box'>
                <canvas id="${id}" class="showcase-canvas"></canvas>
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
        data.Item.blocks.map((box,i)=>{
          const width = 56
          const pix = width/8
          galCanvases[i] = new canvas
          galCanvases[i].new('galCanvas'+i, width,width)
          for (const x in box.blk) {
            for (const y in box.blk[x]) {
              galCanvases[i].rec((y*pix)-pix,(x*pix)-pix,pix,pix,box.blk[x][y].color)
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
    console.log('view post')
  }

  clone = (blk, index)=>{
    pageSwap('create')
    buildPageCreate(blk, 'clone', index)
  }

}
buildAccount()
