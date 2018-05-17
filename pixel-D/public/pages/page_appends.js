buildAppendsPage = (parent, pubIndex, page)=>{
  // Call this file page_showcase_appends.js ??? - THEN, i think the file making makes since, and to leave as appends-blabla, OR: chane to showcase-appends-blabla
  // ALSO: the callback needs to grab all the appends after a new create.
  const appendsPage = document.getElementById('page-appends')
  ddbGetVal('appends', 'blocks.'+parent.post.id, (data)=>{
    appendsPage.innerHTML = ''
    appendsPage.innerHTML = `
      Appends for <br>
      <em style="font-size: 13px;">${parent.post.id}</em> <br>
      <div id='post-parent-showcase-container'>
        <div id='appends-parent-container'></div>
      </div>
      <div id='appends-posts-container'></div>
    `
    _buildPost(parent.post, pubIndex, 'appends-parent-container','-appends')
    if (!data) appendsPage.innerHTML += "...no appends to this Pixel Art."
    else {
      const box = data.Item.blocks[parent.post.id]
      const revBox = []
      for (var i = 0; i < Object.keys(box).length; i++) {
        revBox[Object.keys(box).length-i] = box[Object.keys(box)[i]]
      }
      const appends = document.getElementById('appends-posts-container')
      for (const b in revBox) {
        appends.innerHTML += `
          <hr> ${revBox[b].id}
          <div class='div-no-gap-canvas' id='${revBox[b].id}'><div>
        `
        _setDivCanvas(revBox[b], document.getElementById(revBox[b].id))
      }
    }
  })

}
