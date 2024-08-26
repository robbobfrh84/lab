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

window.onload = () => {
  svgContainer.style.width = UIConfig.svgWidth || "100%"
  const hexMapUI = new HexMapUI(UIConfig)
  const hexMap = new HexMap(newHexMaptemplate).create()
  hexMapUI.build(hexMap)
}



