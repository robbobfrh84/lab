_setDivCanvas = (box, appends, selected)=>{
  const size = 8 // for both pixels across and down. like 8 = 8x8
  let blkAppend = 'tblk'
  if (box.grid == 16) blkAppend = 'tblk16'
  if (box.grid == 4) blkAppend = 'tblk4'
  const pixW = Math.sqrt(box.grid)*size
  appends.innerHTML += `
    <div id='${box.id}'><div>
  `
  boxDataAdj = null
  if (selected) {
    boxDataAdj = _adjustXY(selected)
  }
  _placeBlksInGrid(box, 'div', blkAppend)

  !!!

  const aj = box.blks.map((ajust)=>{
    return _adjustXY(ajust.pos)
  })
  let gridBlk = []
  for (var i = 0; i <= pixW; i++) {
    gridBlk[i] = []
    for (var j = 0; j <= pixW; j++) {
      let fill = false
      for (const p in box.blks) {
        if (box.blks[p].blk[i-aj[p].y] && box.blks[p].blk[i-aj[p].y][j-aj[p].x]) {
          gridBlk[i][j] = { color: box.blks[p].blk[i-aj[p].y][j-aj[p].x].color }
          fill = true
        }
      }
      if (!fill) {
        if (boxDataAdj && i-boxDataAdj.y > 0 && j-boxDataAdj.x > 0
          && i-boxDataAdj.y-8 <= 0 && j-boxDataAdj.x-8 <= 0 ) {
          gridBlk[i][j] = { color: 'rgba(0,0,0,0)' }
        } else {
          gridBlk[i][j] = { color: 'rgba(0,0,0,0.1)' }
        }
      }

    }
    _buildDivCanvas(gridBlk, pixW, document.getElementById(box.id), 'tblk', blkAppend)
  }
}
