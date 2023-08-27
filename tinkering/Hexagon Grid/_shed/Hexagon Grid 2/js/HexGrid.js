class HexGrid {

  constructor(params){
    Object.assign(this,params)
    this.hexMap = []
    this.buildCanvas()
    this.buildHexGrid()
  }

  buildHexGrid(map = []){
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (row < this.rows - 1 || col%2 === 0) {
          const staggerRow = col%2 !== 0 ? this.spacingPix/2 : 0
          const x = ( row * this.spacingPix ) + this.padding + staggerRow
          const y = ( col * this.rowHeight ) + this.padding + (this.size/8)
          const color = this.colors.blue()
          if (!this.hexMap[col]) this.hexMap[col] = []
          this.hexMap[col][row] = {x,y,color}
        }
      }
    }
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

  buildPoint({x,y}, point){
    this.ctx.fillStyle = point.color
    this.ctx.beginPath()
    this.ctx.arc(x,y,point.size,0,Math.PI*2,true)
    this.ctx.closePath()
    this.ctx.fill()
  }

  buildHexagon({x,y,color}){
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    for (var s = 0; s <= 6; s++) {
      const angle = (2 * Math.PI) / 6 * (s + 0.5)
      const x_i = x + this.size * Math.cos(angle)
      const y_i = y + this.size * Math.sin(angle)
      if (s == 0) {
        this.ctx.moveTo(x_i, y_i)
      } else {
        this.ctx.lineTo(x_i, y_i)
      }
    }
    this.ctx.strokeStyle = "rgba(0,0,0,0)" // "#fff"
    this.ctx.lineWidth = 1
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
  }

  getMap(ex,ey) {
    let closest = { x: '-', y: '-', dist: this.size }
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

  buildCanvas(){
    this.canvas = this.elm
    this.ctx = this.canvas.getContext('2d')
    this.spacingPix = this.elm.clientWidth / this.rows
    this.padding = this.spacingPix/2
    this.rowHeight = Math.sqrt((this.spacingPix*this.spacingPix)
      - ((this.spacingPix/2)*(this.spacingPix/2))
    )
    this.size = (this.spacingPix/2) / Math.sin(60*(Math.PI/180))
    const paddingHeight = (this.rowHeight/2) + this.offsetHeight + this.size
    this.columns = Math.round(
      (window.innerHeight-(paddingHeight)) / this.rowHeight
    )
    this.canvas.width = this.elm.clientWidth * 2
    this.canvas.height = ((this.rowHeight * this.columns)
      + (this.size/2)) * 2
    this.canvas.style.width = this.canvas.width/2+"px"
    this.canvas.style.height = this.canvas.height/2+"px"
    this.canvas.getContext('2d').scale(2,2)
  }

}

HexGrid.prototype.testy = ()=>{ console.log('testy') }
