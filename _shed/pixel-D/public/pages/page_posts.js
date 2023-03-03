buildPageposts = ()=>{

  ddbGet('public',(data)=>{
    document.getElementById('page-posts').innerHTML = ""
    document.getElementById('page-posts').innerHTML = `
      All Shared Posts
      <br><br>
      <div id='posts-posts-container' class='posts-container'></div>
    `
    for (var i = data.Item.blocks.length-1; i >= 0 ; i--) {
      data.Item.blocks[i].tree = data.Item.blocks[i].appends
      _buildPost(data.Item.blocks[i], i, 'posts-posts-container', '-post')
    }
  })

}
