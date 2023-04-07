class HexGrid {

  constructor(params){
    Object.assign(this,params)
    this.hexMap = []
  }

  buildCanvas() {
    // this.canvas = this.elm
    this.ctx = this.canvas.getContext('2d')
    // this.size = this.fillWidth / this.columns 
    this.fillWidth = this.canvas.offsetWidth
    this.size = this.setOriention("size")

    // REALLY THO. this var is needed ??? save like 2 char... I"D SAY GUT IT!
    // this.half = (this.size/2) / Math.sin(60*(Math.PI/180)) // 🚨 roll math
    this.half = (this.size/2) // 🚨 roll math
    
    this.otherSize = Math.sqrt( (this.size * this.size) - (this.half * this.half) ) 

    // 🔥 👇 That's why it's 27 // Or was, this is for dynamic grid and can remove once get's fixed
    // const paddingHeight = (this.otherSize/2) + this.offsetHeight + this.half
    // this.columns = Math.round(
    //   (window.innerHeight-(paddingHeight)) / this.otherSize
    // )
    
    this.canvas.width = this.fillWidth * 2
    this.canvas.height = ((this.otherSize * this.rows) + (this.half/2)) * 2 // 🔥 this is inacurate
    this.canvas.style.width = this.canvas.width/2+"px"
    this.canvas.style.height = this.canvas.height/2+"px"
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
    const o = this.orientation
    switch (option) {
      case "size":
        return o === "v" ? (
          //
          //
          // ( ( (this.fillWidth) / Math.sin(60*(Math.PI/180) )) / this.columns ) 
          ( ( (this.fillWidth - 1) / Math.sin(60*(Math.PI/180) )) / this.columns ) // 👀 the "-1" is needed to render the line on the edge. otherwisse it wnont show. JUST A WEIRD RENDER QUERK!

          // this.fillWidth / this.columns
        ) : (
          this.fillWidth / this.columns
        )
      case "testy":
        return "was test"
      default: 
        console.log("No orientation set for this value")
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