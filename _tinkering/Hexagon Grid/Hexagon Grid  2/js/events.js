/* 🎪 events 🎪 */
hexGridCanvas.onmousemove = ()=>{
  hexGrid.drawCanvas(hexGrid.canvases)
  const { x, y, match } = hexGrid.getMap(event.layerX, event.layerY)
  if (match) {
    hexGrid.buildPoint(hexGrid.hexMap[x][y], hexGrid.mouse)
  }
}

hexGridCanvas.onmouseout = ()=>{
  hexGrid.drawCanvas(hexGrid.canvases)
}

hexGridCanvas.onclick = ()=>{
  const { x, y, match } = hexGrid.getMap(event.layerX, event.layerY)
  if (match) {
    hexGrid.hexMap[x][y].color = hexGrid.colors.green()
    hexGrid.drawCanvas(hexGrid.canvases)
  }
}

menuIcon.onclick = () => {
  menuModal.style.display = menuModal.style.display === "block" ? "none" : "block"
}
