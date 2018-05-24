buildPageShowcase = ()=>{

  ddbGet('public',(data)=>{
    document.getElementById('page-showcase').innerHTML = ""
    document.getElementById('page-showcase').innerHTML = `
      SHOWCASE!
      <br><br>
      <div id='showcase-posts-container' class='posts-container'></div>
    `
    for (var i = data.Item.blocks.length-1; i >= 0 ; i--) {
      data.Item.blocks[i].tree = data.Item.blocks[i].appends
      _buildPost(data.Item.blocks[i], i, 'showcase-posts-container', '-post')
    }
  })

}
