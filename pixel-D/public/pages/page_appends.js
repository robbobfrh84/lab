buildAppendsPage = (parent, pubIndex)=>{
  const appendsPage = document.getElementById('page-appends')

  let flatAppends = _flattenAppends(parent.post.tree)
  ddbGetVal('appends', flatAppends, (data)=>{
    const box = data.Item.blocks
    appendsPage.innerHTML = ''
    appendsPage.innerHTML = `
      Appends for <br>
      <em style="font-size: 13px;">${parent.post.id}</em> <br>
      <div id='post-parent-showcase-container'>
        <div id='appends-parent-container' class='posts-container'></div>
      </div>
      <div id='appends-posts-container' class='posts-container'></div>
    `
    _buildPost(parent.post, pubIndex, 'appends-parent-container'
      ,'-appends')
    if (!data) appendsPage.innerHTML += "...no appends to this Pixel Art."
    else {
      for (const b in box) {
        box[b].tree = _trimTree(box[b], parent.post.tree)
        _buildPost( box[b], pubIndex, 'appends-posts-container', '-post')
      }
    }
  })

}
