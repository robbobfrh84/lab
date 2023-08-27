window.onload = ()=>{
  const hexGrid = new HexGrid(config)
  hexGrid.buildCanvas()
  hexGrid.buildHexGrid()
  hexGrid.buildEvents()
  hexGrid.drawCanvas(hexGrid.layers)
}




class HexGrid {

  constructor(params){
    Object.assign(this,params)
    this.hexMap = []
  }

  buildCanvas() {
    this.ctx = this.canvas.getContext('2d')
    this.fillWidth = 1000 // this.canvas.offsetWidth
    this.halfColumns =  ((this.columns * 2) + 1) // * Keep to understand math
    this.size = (this.fillWidth / this.halfColumns) * 2

    console.log('columns, size, fillWidth:', this.columns, this.size, this.fillWidth)
    console.log('this.size/2+(size * columns):',this.size/2+(this.size * this.columns))
    this.otherSize = Math.sqrt( (this.size * this.size) + ((this.size/2) * (this.size/2)) ) 
    console.log('this.othersize:',this.otherSize)

    this.canvas.width = this.fillWidth
    this.canvas.height = 1000
  }

  buildHexGrid(map = []) {
    for (let row = 0; row < this.rows; row++) {
      const staggerColumn = row%2 !== 0 ? this.size/2 : 0
      for (let column = 0; column < this.columns; column++) {
        const staggerRow = column%2 !== 0 ? this.size/2 : 0 
          // const x = ( column * this.otherSize ) + (this.size/2) + (this.size/16) // 🚨 roll math
          // const x = ( column * this.otherSize ) + (this.size/2) + staggerColumn // 🚨 roll math
          const x = ( column * this.size ) + (this.size/2) + staggerColumn// NEW

          // const y = ( row * this.size ) + (this.size/2) + staggerRow // 🚨 roll math
          const y = ( row * (this.size*.75) ) + (this.size/2) // 🚨 roll math
          // const y = row* 120 // NEW


          const color = this.colors.hexHighlight
          if (!this.hexMap[row]) this.hexMap[row] = []
          this.hexMap[row][column] = {x,y,color}
        // }
      }
    }
    console.log('this.hexMap:',this.hexMap)
  }

  drawCanvas(draw) {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    draw.forEach(layer=>{
      this.hexMap.forEach(row=>{
        row.forEach(point=>{
          this[layer](point, this.mark)
        })
      })
    })
  }

  buildPoint({x,y}, point) {
    this.ctx.fillStyle = point.color
    this.ctx.beginPath()
    // this.ctx.arc((x+(this.size/16)),y,point.size,0,Math.PI*2,true)  // 🚨 roll math
    // this.ctx.arc((x-(this.size/16)),y,point.size,0,Math.PI*2,true)  // 🚨 roll math
    this.ctx.arc(x,y,point.size,0,Math.PI*2,true)  // NEW

    this.ctx.closePath()
    this.ctx.fill()
  }

  buildHexagon({x,y,color}) {
    this.ctx.fillStyle = color // SVG !!!
    this.ctx.beginPath() // SVG !!!
    for (var s = 0; s <= 6; s++) {

      // const angle = (2 * Math.PI) / 6 * (s) // 🚨 KEEP! To point up / down
      // const x_i = x + (this.size/2) * Math.cos(angle) + (this.size/16) // 🚨 roll math
      // const angle = (2 * Math.PI) / 6 * (s + 0.5) // 🚨 KEEP! To point left / right
      // const x_i = x + (this.size/2) * Math.cos(angle) - (this.size/16) // 🚨 roll math

      // BOB
      const angle = (2 * Math.PI) / 6 * (s + 0.5) 
      const x_i = x + (this.otherSize/2) * Math.cos(angle) // NEW


      // var angle_deg = 60 * s - 30;
      // var angle = Math.PI / 180 * angle_deg;
      // const x_i = x + ((this.size/2) + (this.otherSize/2) * Math.cos(angle))

      // BOB
      // I THINK IT"S
      // THIS MATH THAT NEEDS TO BE REVIEWED!!!


      const y_i = y + (this.size/2) * Math.sin(angle)
      if (s == 0) {
        this.ctx.moveTo(x_i, y_i)
      } else {
        this.ctx.lineTo(x_i, y_i)
      }
    }
    this.ctx.strokeStyle = "rgba(0,0,0,0.5)"  // SVG !!!
    this.ctx.lineWidth = 1 // SVG !!!
    this.ctx.closePath() // SVG !!!
    this.ctx.fill() // SVG !!!
    this.ctx.stroke() // SVG !!!
  }

  // setOriention(option) {
  //   switch (this.orientation + " " +option) {
  //     case "v size": return (this.fillWidth / a60 ) / this.columns;
  //     case "h size": return this.fillWidth / this.columns;

  //     case "testy":
  //       return "was test"
  //     default: 
  //       console.log("No orientation set for this value")
  //   }
  // }

  buildEvents = function() {

    rotateBtn.onclick = ()=>{
      this.orientation = this.orientation === "v" ? "h" : "v"
      this.buildCanvas()
      this.buildHexGrid()
      this.drawCanvas(this.layers)
    }

  }

}




// HANG ONTO THIS UNTIL YOU"VE GOT A COMLPLETE WORKING SVG VERSION 
// - WITH CLICK!!! & HOVER!!!
class HexGrid {

  constructor(params){
    Object.assign(this,params)
    this.hexMap = []
  }

  buildCanvas() {
    this.ctx = this.canvas.getContext('2d')
    this.fillWidth = this.canvas.offsetWidth
    this.size = this.setOriention("size")

    // this.half = (this.size/2) / a60) // 🚨 roll math
    this.half = (this.size/2) // 🚨 roll math
    
    this.otherSize = Math.sqrt( (this.size * this.size) - (this.half * this.half) ) 
    
    this.canvas.width = (this.fillWidth * 2) + (this.otherSize + 3) // 👀 the "+3" is needed to render the line on the edge. otherwisse it wnont show. JUST A WEIRD RENDER QUERK!
    this.canvas.height = ((this.otherSize * this.rows) * 2) - (this.otherSize) // 👀 Odd rows    
    if (this.rows % 2) { this.canvas.height = this.canvas.height - (this.otherSize/4) } // 👀 Even rows

    this.canvas.getContext('2d').scale(2,2)
  }

  buildHexGrid(map = []) {
    for (let row = 0; row < this.rows; row++) {
      // const staggerColumn = row%2 !== 0 ? this.size/2 : 0 // 🚨 roll math
      const staggerColumn = row%2 !== 0 ? (this.size/2 - (this.half/8)) : 0 // 🚨 roll math

      for (let column = 0; column < this.columns; column++) {
        const staggerRow = column%2 !== 0 ? this.size/2 : 0 // 🚨 roll math
        // if (row < this.columns || column%2 === 0) { // 🤔 don't know why i need this? i think it's happening in the "Between loop" line so prob can remove these when its fixed.
        // if (row < this.columns - 1 || columns%2 === 0) {// 🤔 don't know why i need this?
          
          // const x = ( column * this.otherSize ) + this.half + (this.half/8) // 🚨 roll math
          const x = ( column * this.otherSize ) + this.half + staggerColumn // 🚨 roll math

          // const y = ( row * this.size ) + this.half + staggerRow // 🚨 roll math
          const y = ( row * (this.size*.75) ) + this.half // 🚨 roll math


          const color = this.colors.hexHighlight
          if (!this.hexMap[row]) this.hexMap[row] = []
          this.hexMap[row][column] = {x,y,color}
        // }
      }
    }
    console.log('this.hexMap:',this.hexMap)
  }

  drawCanvas(draw) {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    draw.forEach(layer=>{
      this.hexMap.forEach(row=>{
        row.forEach(point=>{
          this[layer](point, this.mark)
        })
      })
    })
  }

  buildPoint({x,y}, point) {
    this.ctx.fillStyle = point.color
    this.ctx.beginPath()
    // this.ctx.arc((x+(this.half/8)),y,point.size,0,Math.PI*2,true)  // 🚨 roll math
    this.ctx.arc((x-(this.half/8)),y,point.size,0,Math.PI*2,true)  // 🚨 roll math
    this.ctx.closePath()
    this.ctx.fill()
  }

  buildHexagon({x,y,color}) {
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    for (var s = 0; s <= 6; s++) {

      // const angle = (2 * Math.PI) / 6 * (s) // 🚨 KEEP! To point up / down
      const angle = (2 * Math.PI) / 6 * (s + 0.5) // 🚨 KEEP! To point left / right
      
      // const x_i = x + this.half * Math.cos(angle) + (this.half/8) // 🚨 roll math
      const x_i = x + this.half * Math.cos(angle) - (this.half/8) // 🚨 roll math

      const y_i = y + this.half * Math.sin(angle)

      if (s == 0) {
        this.ctx.moveTo(x_i, y_i)
      } else {
        this.ctx.lineTo(x_i, y_i)
      }
    }
    this.ctx.strokeStyle = "rgba(0,0,0,0.5)" 
    this.ctx.lineWidth = 1
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
  }

  setOriention(option) {
    switch (this.orientation + " " +option) {
      case "v size": return (this.fillWidth / a60 ) / this.columns;
      case "h size": return this.fillWidth / this.columns;

      case "testy":
        return "was test"
      default: 
        console.log("No orientation set for this value")
    }
  }

  buildEvents = function() {

    rotateBtn.onclick = ()=>{
      this.orientation = this.orientation === "v" ? "h" : "v"
      this.buildCanvas()
      this.buildHexGrid()
      this.drawCanvas(this.layers)
    }

  }

  getMap(ex,ey) { // 🔥 Remove when switched to SVG?
    let closest = { x: '-', y: '-', dist: this.half }
    this.hexMap.forEach((row, i) => {
      row.forEach((col, j)=>{
        const a = Math.abs(ex-col.x)
        const b = Math.abs(ey-col.y)
        const dist = Math.sqrt( (a*a) + (b*b) )
        if (closest.dist > dist) {
          closest.dist = dist
          closest.y = j
          closest.x = i
        }
      })
    })
    if (closest.x != '-' || closest.y != "-") {
      closest.match = true
    }
    return closest
  }

}
