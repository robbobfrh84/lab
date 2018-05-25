buildPageposts = ()=>{

  ddbGet('public',(data)=>{
    document.getElementById('page-posts').innerHTML = `
      posts!
      <hr><div> Posts </div>
      <div id='posts-posts-container'></div>
    `
    let cnt = 0

    for (var i = data.Item.blocks.length-1; i >= 0 ; i--) {
      const box = data.Item.blocks[i]
      const stringBox = JSON.stringify(box)
      const id = 'postCanvas'+i
      document.getElementById('posts-posts-container').innerHTML += `
        <div class="posts-post">
          <div class="posts-canvas-append-box">
            <div class="posts-canvas-empty"></div>
            <div class="posts-canvas-empty"></div>
            <div class="posts-canvas-empty"></div>
            <div class="posts-canvas-empty"></div>
            <canvas id="${id}" class="posts-canvas"></canvas>
            <div class="posts-canvas-empty"></div>
            <div class="posts-canvas-empty"></div>
            <div class="posts-canvas-empty"></div>
            <div class="posts-canvas-empty"></div>
          </div>
          <canvas id="large-${id}" class="posts-canvas-large"></canvas>
          <div class='posts-userbox'> ${box.account} </div>
          <hr>
          <button class='posts-follow' onClick='follow()'> follow > ${box.account} </button>
          <hr>
          <button class='posts-clone' onClick='clone(${stringBox})'> clone </button>
          <hr>
          <div class='posts-append-note'> *Click empty box to append</div>
          <hr>
          <button class='posts-star' onClick='star()'> &star; </button>
        </div>
      `
    }

    data.Item.blocks.map((box,i)=>{
      posts_buildThumb(box.blk, i)
    })
  })

  clone = (blk)=>{
    pageSwap('create')
    buildPageCreate(blk, 'clone')
  }

  follow = ()=>{
    alert("In demo-mode, you follow everyone by default")
  }

  star = ()=>{
    alert("You liked this Pixel Art! ...At this point in demo-mode, that's all we do here... Nobody will really know you like it... unless you tell them in person.")
  }

}

posts_buildThumb = (obj, i)=>{
  const width = 56
  const pix = width/8
  postCanvases[i] = new canvas
  postCanvases[i].new('postCanvas'+i, width,width)
  for (const x in obj) {
    for (const y in obj[x]) {
      postCanvases[i].rec((y*pix)-pix,(x*pix)-pix,pix,pix,obj[x][y].color)
    }
  }
  const largeWidth = 176
  const lpix = largeWidth/8
  postCanvases[i] = new canvas
  postCanvases[i].new('large-postCanvas'+i,largeWidth,largeWidth)
  for (const x in obj) {
    for (const y in obj[x]) {
      postCanvases[i].rec((y*lpix)-lpix,(x*lpix)-lpix,lpix,lpix,obj[x][y].color)
    }
  }


}
