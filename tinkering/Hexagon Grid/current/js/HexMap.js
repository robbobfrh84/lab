class HexMap {
  constructor(params) { Object.assign(this,params) }

  build() {
    this.buildSVG()
    this.hexMapObj = {
      orientation: this.orientation,
      hexMapArray: []
    }
    this.buildPolygons()
    this.buildGlobalEvents()
  }

  buildSVG() {
    this.fillWidth = this.svg.clientWidth
    this.orient.radiusSide()
    this.fillHeight = this.rows * this.radius * 1.5 + (this.radius/2)
    this.svg.setAttribute("width", this.fillWidth) 
    this.svg.setAttribute("height", this.fillHeight)
  }

  buildPolygons() {
    for (let row = 0; row < this.rows; row++) {
      const staggerColumn = row%2 !== 0 ? this.side : 0
      for (let column = 0; column < this.columns; column++) {
        const staggerRow = column%2 == 0 ? this.side : 0 
        this.buildPolygon(row, column, staggerColumn, staggerRow)
        if (!this.hexMapObj.hexMapArray[row]) this.hexMapObj.hexMapArray[row] = []
        this.hexMapObj.hexMapArray[row][column] = { color: false }
      }
    }
    console.log('this.hexMapObj:',this.hexMapObj)
  }

  buildPolygon(row, column, staggerColumn, staggerRow) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    this.svg.appendChild(polygon)
    const points = [0, 1, 2, 3, 4, 5, 6].map((n, i) => {
      const d = this.orient.diameter(i) 
      const r = Math.PI / 180 * d
      if (this.orientation === "v") {// 🔥 MOVE TO this.orient.
        return [
          (this.radius * Math.cos(r)) + this.side + (column*(this.side*2)) + staggerColumn,
          (this.radius * Math.sin(r)) + this.radius + (row * (this.radius*1.5))
        ]
      } else {
        return [
          // .. 🔥 was working on aligning "h" orientation polygons...
          // just copy/pasted "v" oriintation 
          // - Compare with above
          // - OK, it's "kinda" aligned, still need to fix svg size and left/down align...
          // - BUT, yesss it looks odd with the way the opacity stroke make it look different sizes. 
          // - HOWEVER, change the "stroke" below to be 1 opacity and see it's the correct size.
          (this.radius * Math.cos(r)) + this.radius + (column*(this.radius*1.5)),
          (this.radius * Math.sin(r)) + this.radius + (row * (this.side*2) + staggerRow)
        ]
      }
    }).map((p) => p.join(',')).join(' ')
    polygon.setAttribute("points", points)
    polygon.style = "fill: cornflowerblue; stroke: rgba(200,0,0,0.1); stroke-width: 10;"
    this.buildPolygonEvents(polygon)
  }

  orient = {
    radiusSide: ()=>{
      if (this.orientation === "v") {
        this.side = this.fillWidth / ((this.columns * 2) + 1)
        this.radius = this.side / Math.sin(60*(Math.PI/180))  
      } else {
        this.radius = this.fillWidth / ((this.columns * 2) + 1)
        this.side =  Math.sqrt((this.radius*this.radius) - ((this.radius/2)*(this.radius/2))) 
      }
    },
    diameter: (i) => {
      return ( 60 * i + (this.orientation === "v" ? -30 : -60 ) )
    }
  }

  buildPolygonEvents(polygon) {
    polygon.onclick = function() {
      polygon.style.fill = polygon.style.fill == "cornflowerblue" ? "green" : "cornflowerblue"
    }
    polygon.onmouseover = function() {
      polygon.style.opacity = 0.5;
    }
    polygon.onmouseout = function() {
      polygon.style.opacity = 1;
    }
  }

  buildGlobalEvents() {

    rotateBtn.onclick = ()=>{ // * => Must be arrow functoin. Will error otherwise. 
      this.orientation = this.orientation == "v" ? "h" : "v"
      emptyElement(svgHexMap)
      this.build()
    }

  }


}