buildPageShowcase = ()=>{

  ddbGet('public',(data)=>{
    document.getElementById('page-showcase').innerHTML = ""
    document.getElementById('page-showcase').innerHTML = `
      SHOWCASE!
      <br><br>
      <div id='showcase-posts-container'></div>
    `
    for (var i = data.Item.blocks.length-1; i >= 0 ; i--) {
      const metaBlk = {
        post: data.Item.blocks[i],
        id: 'art'+i,
        index: i,
        gridSize: 9,
        pos: 6,
        width: 46
      }
      const index = i
      buildPost(metaBlk, index)
    }
    // 👇 This will reset any grids back to 3x3
    for (const cont of document.getElementsByClassName('showcase-grid-append-box')) {
      gridChange(cont,9)
    }

  })

  buildPost = (metaBlk, i)=>{
    const appends = !metaBlk.post.appends ? "" :
      `<button class='showcase-appends'
        onClick='appends(${JSON.stringify({ a: metaBlk, i: i })})'>
          View Appends (${Object.keys(metaBlk.post.appends).length})
        </button>
      `
    document.getElementById('showcase-posts-container').innerHTML += `
      <div class="showcase-post" stringBox='${JSON.stringify(metaBlk)}' id="post-${metaBlk.id}">
        <div class="showcase-grid-append-box">
          <div class="showcase-canvas-append-box" id="grid-${metaBlk.id}"></div>
          <div class='showcase-grid-box'>
            <div class='showcase-grid-toggle' gridsize='4'>4</div>
            <div class='showcase-grid-toggle showcase-grid-toggle-active'
              gridsize='9'>9</div>
            <div class='showcase-grid-toggle' gridsize='16'>16</div>
          </div>
        </div>
        <canvas id="large-${metaBlk.id}" class="showcase-canvas-large"></canvas>
        <div class='showcase-userbox'>
          <button class='showcase-star' onClick='star()'> &star; </button>
          ${metaBlk.post.account}
        </div>
        <hr>
        <button class='showcase-btn' onClick='follow()'> follow >
          ${metaBlk.post.account} </button>
        <hr>
        <button class='showcase-btn'
          onClick='clone(${JSON.stringify(metaBlk.post)})'> clone </button>
        <hr>
        <div class='showcase-append-note'> *Click empty box to append</div>
        <hr>
        ${appends}
      </div>
    `
    setTimeout(()=>{
      _buildCanvas(176, 'large-art'+i, metaBlk.post.blk)
      _buildPostGrid(metaBlk, document.getElementById('grid-'+metaBlk.id), 'grid-')
    },10)
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
      gridChange(post, event.target.innerHTML)
    }
  })

  clone = (metaBlk)=>{
    pageSwap('create')
    buildPageCreate(metaBlk, 'clone')
  }

  follow = ()=>{
    alert("In demo-mode, you follow everyone by default")
  }

  star = ()=>{
    alert("You liked this Pixel Art! ...At this point in demo-mode, that's all we do here... Nobody will really know you like it... unless you tell them in person.")
  }

  appends = (data)=>{
    pageSwap('appends')
    buildAppendsPage(data.a, data.i)
  }

  selectNode = (event, metaBlk, pos, newNode, parentNode)=>{
    let adjIndex = pos
    if (metaBlk.gridSize == 4) adjIndex = g4[pos-1]
    else if (metaBlk.gridSize == 9) adjIndex = g9[pos-1]
    metaBlk.selectedPos = adjIndex
    pageSwap('create')
    buildPageCreate(metaBlk, 'append')
  }

  gridChange = (post, grid)=>{
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
          .showcase-canvas-empty${metaBlk.id} {
            width: ${w}px;
            height: ${w}px;
          }
          .showcase-canvas-mask${metaBlk.id} {
            min-width: ${w}px;
            height: ${w}px;
            margin-left: -${w+1}px;
          }
        `
      } else if (grid == 9) {
        const w = 46
        metaBlk.width = w
        sheet.innerHTML = `
          .showcase-canvas-empty${metaBlk.id} {
            width: ${w}px;
            height: ${w}px;
          }
          .showcase-canvas-mask${metaBlk.id} {
            min-width: ${w}px;
            height: ${w}px;
            margin-left: -${w+1}px;
          }
        `
      } else {
        const w = 34
        metaBlk.width = w
        sheet.innerHTML = `
          .showcase-canvas-empty${metaBlk.id} {
            width: ${w}px;
            height: ${w}px;
          }
          .showcase-canvas-mask${metaBlk.id} {
            min-width: ${w}px;
            height: ${w}px;
            margin-left: -${w+1}px;
          }
        `
      }
      document.body.append(sheet)
      metaBlk.gridSize = grid
      post.parentElement.setAttribute('stringBox', JSON.stringify(metaBlk))
      _buildPostGrid(metaBlk, post.childNodes[1], 'grid-')
    }
  }
}
