buildPageShowcase = ()=>{

  ddbGet('public',(data)=>{
    document.getElementById('page-showcase').innerHTML = ""
    document.getElementById('page-showcase').innerHTML = `
      SHOWCASE!
      <br><br>
      <div id='showcase-posts-container' class='posts-container'></div>
    `
    for (var i = data.Item.blocks.length-1; i >= 0 ; i--) {
      _buildPost(data.Item.blocks[i], i, 'showcase-posts-container', '-post')
    }
    // 👇 This will reset any grids back to 3x3
    // for (const cont of document.getElementsByClassName('showcase-grid-append-box')) {
    //   _gridCheck(cont, 9)
    // }
  })

}
