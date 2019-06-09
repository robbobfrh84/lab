const hexGrid = new HexGrid({
  rows: 30,
  markSize: 5,
  margin: 14
})

hexGrid.drawCanvas([
  "buildHexagon",
  // "buildMark"
])

document.body.onmousemove = function(){
  // hexGrid.drawCanvas(["buildHexagon"])
  const {x,y} = hexGrid.getMap(event.clientX, event.clientY)
  hexGrid.buildMark(hexGrid.hexMap[x][y])
}

document.body.onclick = function(){
  const {x,y} = hexGrid.getMap(event.clientX, event.clientY)
  hexGrid.hexMap[x][y].color = "green"
  hexGrid.drawCanvas(["buildHexagon"])
}
