buildAppendsPage = (parent, pubIndex, page)=>{
  const appendsPage = document.getElementById('page-appends')

  ddbGetVal('appends', 'blocks.'+parent.post.id, (data)=>{
    appendsPage.innerHTML = ''
    appendsPage.innerHTML = `
      Appends for <br>
      <em style="font-size: 13px;">${parent.post.id}</em> <br>
      <div id='appends-posts-container'></div>
    `
    if (!data) appendsPage.innerHTML += "...no appends to this Pixel Art."
    else {
      const box = data.Item.blocks[parent.post.id]
      const appends = document.getElementById('appends-posts-container')
      for (const b in box) {
        appends.innerHTML += `
          <hr> ${box[b].id}
          <div class='div-no-gap-canvas' id='${box[b].id}'><div>
        `
        _setDivCanvas(box[b], document.getElementById(box[b].id))
      }
    }
  })



}
