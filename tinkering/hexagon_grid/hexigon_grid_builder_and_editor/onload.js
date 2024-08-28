const newHexMaptemplate = {
  alignPointUp: true, 
  stagger: "right", // "left", "right", (individual rows based on starting point from the left)
  columns: 4, 
  rows: 3,
  viewDegree: 0
}

const UIConfig = {
  svgWidth: '75%', // * 'pix' or '%' of parent container (in this case it's the window)
  svg: window["svgHexMap"],
  deg: window["viewDegree"]
}

window.onload = () => { // * 🚨 Order Sensative
  svgContainer.style.width = UIConfig.svgWidth || "100%"
  const hexMapUI = new HexMapUI(UIConfig)
  const hexMap = new HexMap(newHexMaptemplate).create()
  hexMapUI.build(hexMap)

  BuildDevTools(hexMap, hexMapUI)
}

const BuildDevTools = (hexMap, hexMapUI) => {
  columnInput.value = newHexMaptemplate.columns
  rowInput.value = newHexMaptemplate.rows
  rotateBtn.innerText = "Rotate("+newHexMaptemplate.viewDegree+"°)"

  rotateBtn.onclick = () => {
    const degree = hexMapUI.rotatePolygons()
    rotateBtn.innerText = "Rotate("+degree+"°)"
  }

  updateBtn.onclick = () => {
    hexMap.columns = columnInput.value
    hexMap.rows = rowInput.value
    hexMap.create(hexMap)
    hexMapUI.build(hexMap)
  }
}

// 🔥 Can delete later, just wanted to save it for reference
// HexMapUI.prototype.updateSize = function() {
//   updateBtn.onclick = () => {
//     this.hexMap.columns = columnInput.value
//     this.hexMap.rows = rowInput.value
//     this.hexMap.create(this.hexMap)
//     console.log('this:',this)

//     this.build(this.hexMap)
//   }
// }