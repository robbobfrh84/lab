else {
  const sheet = document.createElement('style')
  if (grid == 4) {
    const w = 70
    metaBlk.width = w
    sheet.innerHTML = `
      .showcase-canvas-empty${metaBlk.post.id+metaBlk.type} {
        width: ${w}px;
        height: ${w}px;
      }
      .showcase-canvas-mask${metaBlk.post.id+metaBlk.type} {
        min-width: ${w}px;
        height: ${w}px;
        margin-left: -${w+1}px;
      }
    `
  }
  if (grid == 9) {
    const w = 46
    metaBlk.width = w
    sheet.innerHTML = `
      .showcase-canvas-empty${metaBlk.post.id+metaBlk.type} {
        width: ${w}px;
        height: ${w}px;
      }
      .showcase-canvas-mask${metaBlk.post.id+metaBlk.type} {
        min-width: ${w}px;
        height: ${w}px;
        margin-left: -${w+1}px;
      }
    `
  }
  else {
    const w = 34
    metaBlk.width = w
    sheet.innerHTML = `
      .showcase-canvas-empty${metaBlk.post.id+metaBlk.type} {
        width: ${w}px;
        height: ${w}px;
      }
      .showcase-canvas-mask${metaBlk.post.id+metaBlk.type} {
        min-width: ${w}px;
        height: ${w}px;
        margin-left: -${w+1}px;
      }
    `
  }
  document.body.append(sheet)
  metaBlk.gridSize = grid
  post.parentElement.setAttribute('stringBox', JSON.stringify(metaBlk))
  _buildPostGrid(metaBlk, post.childNodes[1], 'grid-', metaBlk.type)
}
