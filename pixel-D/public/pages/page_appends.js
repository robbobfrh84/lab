buildAppendsPage = (parent, pubIndex, page)=>{

  const appendsPage = document.getElementById('page-appends')
  ddbGetVal('appends', 'blocks.'+parent.post.id, (data)=>{
    appendsPage.innerHTML = ''
    appendsPage.innerHTML = `
      Appends for <br>
      <em style="font-size: 13px;">${parent.post.id}</em> <br>
      <div id='post-parent-showcase-container'>
        <div id='appends-parent-container' class='posts-container'></div>
      </div>
      <div id='appends-posts-container' class='posts-container'></div>
    `
    _buildPost(parent.post, pubIndex, 'appends-parent-container','-appends')
    if (!data) appendsPage.innerHTML += "...no appends to this Pixel Art."
    else {
      const box = data.Item.blocks[parent.post.id]
      for (var i = 0; i < Object.keys(box).length; i++) {
        _buildPost( box[Object.keys(box)[i]], pubIndex,
                    'appends-posts-container', '-post' )
      }
    }
  })

}
