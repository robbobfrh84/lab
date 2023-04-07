const config = {
  layers: [ "buildHexagon",  "buildPoint" ], // This allows you to control which canvases are rendered. so you can save on process by having multiple canvases in the future!
  canvas: window["hexGridCanvas"], // MUST be id of <canvas> elm
  // fillElm: window["canvasContainer"], // hexGridCanvas.innerWidth // 800, // window.innerWidth,
  // margin: 10, // this should just be dynamic, get the values from 
  orientation: "v", // "v" or "h" (Verticle or horozontal pointing points)
  columns: 13, // 30,
  rows: 7,
  offsetHeight: 30, // squeezes the math that calculates how many rows to build.
  mark: { size: 2, color: "rgba(255,255,255,0.4)" },
  mouse: { size: 12, color: "rgba(255,255,255,0.5)" },
  colors: {
    hexHighlight: 'rgba(0,0,0,0.1)',
    green: ()=>'rgb('+rand(40,70)+','+rand(100,180)+','+rand(40,70)+')' // 🚨 KEEP for a variation example
  },
}

window.onload = ()=>{
  const hexGrid = new HexGrid(config)
  hexGrid.buildCanvas()
  hexGrid.buildHexGrid()
  hexGrid.buildEvents()
  hexGrid.drawCanvas(hexGrid.layers)
}

const elavations = [ 
  // 🔥 haven't implimented this yet. just playing with colors....
  // put in like js/vars.js or something
  { level: -2, color: "blue" },
  { level: -1, color: "royalblue" },
  { level: 0, color: "deepskyblue" },
  { level: 1, color: "goldenrod" },
  { level: 2, color: "lightgreen" },
  { level: 3, color: "" },
  { level: 4, color: "" },
  { level: 5, color: "" },
  { level: 6, color: "" },
  { level: 7, color: "" },
  { level: 8, color: "" },
  { level: 9, color: "" },
  { level: 10, color: "" },
]



