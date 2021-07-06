class HexGrid {

  constructor(params){
    Object.assign(this,params)
    this.hexMap = []
    this.startCanvas()
    this.buildHexGrid()
  }

  buildHexGrid(map = []){
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (row < this.rows - 1 || col%2 === 0) {
          const staggerRow = col%2 !== 0 ? this.spacingPix/2 : 0
          const x = ( row * this.spacingPix ) + this.padding + staggerRow
          const y = ( col * this.rowHeight ) + this.padding + (this.size/8)
          const color = 'rgb('
            +this.random(40,70)+', '
            +this.random(40,70)+', '
            +this.random(220,255)+')'
            if (!this.hexMap[col]) this.hexMap[col] = []
          this.hexMap[col][row] = {x,y,color}
        }
      }
    }
  }

  drawCanvas(draw) {
    hexGrid.ctx.clearRect(0,0,hexGrid.canvas.width,hexGrid.canvas.height)
    draw.forEach(layer=>{
      this.hexMap.forEach(row=>{
        row.forEach(point=>{
          this[layer](point)
        })
      })
    })
  }

  buildMark({x,y}){
    this.ctx.fillStyle = this.markColor
    this.ctx.beginPath()
    this.ctx.arc(x,y,this.markSize,0,Math.PI*2,true)
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
    this.ctx.strokeStyle = "rgba(0,0,0,0.1)" // "#fff"
    this.ctx.lineWidth = 1
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
  }

  getMap(ex,ey){
    let closest = {
      x: window.innerWidth,
      y: window.innerHeight,
      p: {}
    }
    let closestRow
    const dist = this.hexMap[0][1].x - this.hexMap[0][0].x
    const ang = Math.abs(((ex-(this.margin*2))%dist)-(dist/2))
    let adj = ((this.size/4) - ((ang/2) / Math.sin(60*(Math.PI/180)))) *2
    this.hexMap.forEach((col,i)=>{
      if (i%2 !== 0) adj *= -1
      if (Math.abs(ey-col[0].y+adj) < closest.y) {
        closest.y = Math.abs(ey-col[0].y)
        closest.p.x = i
        closestRow = col
      }
    })
    closestRow.map((point, i)=>{
      if (Math.abs(ex-point.x) < closest.x) {
        closest.x = Math.abs(ex-point.x)
        closest.p.y = i
      }
    })
    return closest.p
  }

  startCanvas(){
    this.canvas = document.getElementById('hexGridCanvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.spacingPix = (this.canvas.width - (this.margin*4)) / this.rows
    this.padding = (this.spacingPix/2) + (this.margin*2)
    this.rowHeight = Math.sqrt((this.spacingPix*this.spacingPix)
      - ((this.spacingPix/2)*(this.spacingPix/2))
    )
    this.paddingHeight = (this.rowHeight/2) + (this.margin*2)
    this.columns = Math.round((
      window.innerHeight-((this.margin*2)+this.paddingHeight)) / this.rowHeight
    )
    this.size = (this.spacingPix/2) / Math.sin(60*(Math.PI/180))
    this.canvas.height = (this.rowHeight * this.columns)
      + (this.margin*4) + (this.size/2)
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
