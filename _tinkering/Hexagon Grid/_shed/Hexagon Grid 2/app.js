const hexGrid = new HexGrid({
  elm: window.hexGridCanvas, // MUST be id of <canvas> elm
  rows: 30,// 30,
  offsetHeight: 30, // squeezes the math that calculates how many rows to build.
  mark: { size: 2, color: "rgba(255,255,255,0.4)" },
  mouse: { size: 12, color: "rgba(255,255,255,0.5)" },
  colors: {
    blue: ()=>'rgb('+rand(40,70)+','+rand(40,70)+','+rand(220,255)+')',
    green: ()=>'rgb('+rand(40,70)+','+rand(100,180)+','+rand(40,70)+')'
  },
  canvases: [ // This allows you to control which canvases are rendered. so you can save on process by having multiple canvases in the future!
    "buildHexagon",
    "buildPoint",
  ],
})

hexGrid.drawCanvas(hexGrid.canvases)
