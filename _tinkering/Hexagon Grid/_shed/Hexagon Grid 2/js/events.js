/* 🎪 events 🎪 */
hexGridCanvas.onmousemove = (e)=>{
  hexGrid.drawCanvas(hexGrid.canvases)
  const { x, y, match } = hexGrid.getMap(e.offsetX, e.offsetY)
  if (match) {
    hexGrid.buildPoint(hexGrid.hexMap[x][y], hexGrid.mouse)
  }
}

hexGridCanvas.onmouseout = (e)=>{
  hexGrid.drawCanvas(hexGrid.canvases)
}

hexGridCanvas.onclick = (e)=>{
  const { x, y, match } = hexGrid.getMap(e.offsetX, e.offsetY)
  if (match) {
    hexGrid.hexMap[x][y].color = hexGrid.colors.green()
    hexGrid.drawCanvas(hexGrid.canvases)
  }
}

menuIcon.onclick = (e) => {
  menuModal.style.display = menuModal.style.display === "block" ? "none" : "block"
}
