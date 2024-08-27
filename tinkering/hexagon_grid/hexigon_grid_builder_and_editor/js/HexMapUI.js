class HexMapUI {
  constructor(params) { Object.assign(this,params) }

  build(hexMap) {
    this.hexMap = hexMap
    this.buildSVG()
    this.buildPolygons()
    this.createUIEvents()
  }

  buildSVG() {
    this.fillWidth = this.svg.clientWidth
    this.orient.radiusSide()
    this.fillHeight = this.hexMap.rows * this.radius * 1.5 + (this.radius/2)
    this.svg.setAttribute("width", this.fillWidth) 
    this.svg.setAttribute("height", this.fillHeight)
  }

  buildPolygons() {
    console.log('this.hexMap.polygons:',this.hexMap.polygons)
    this.hexMap.polygons.map((row)=>{
      row.forEach(polygon => {
        const staggerColumn = this.side * polygon.staggerColumn
        const staggerRow = this.side * polygon.staggerRow
        this.buildPolygon(polygon, staggerColumn, staggerRow)
      });
    })
  }

  buildPolygon({ row, column, elevation }, staggerColumn, staggerRow) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    this.svg.appendChild(polygon)
    const points = [0, 1, 2, 3, 4, 5, 6].map((n, i) => {
      const d = this.orient.diameter(i) 
      const r = Math.PI / 180 * d
      if (this.hexMap.alignPointUp) {// 🔥 MOVE TO this.orient.
        console.log('v')
        return [
          (this.radius * Math.cos(r)) + this.side + (column*(this.side*2)) + staggerColumn,
          (this.radius * Math.sin(r)) + this.radius + (row * (this.radius*1.5))
        ]
      } else {
        console.log('h')
        return [
          // .. 🔥 this dosn't work correctly. It is layed out correctly. but the rows and columns are off....
          (this.radius * Math.cos(r)) + this.radius + (column*(this.radius*1.5)),
          (this.radius * Math.sin(r)) + this.radius + (row * (this.side*2) + staggerRow)
        ]
      }
    }).map((p) => p.join(',')).join(' ')
    polygon.setAttribute("points", points)
    polygon.setAttribute("elevation", elevation)
    polygon.setAttribute("row", row)
    polygon.setAttribute("column", column)
    const elvColor = elavations.find(e => e.elevation == elevation)?.color

    polygon.style = "fill: "+elvColor+"; stroke: rgba(200,0,0,0.1); stroke-width: 10;"
    this.createPolygonEvents(polygon, this.hexMap)
  }

  createPolygonEvents(polygon, hexMap) {
    polygon.onclick = function(event) {
      let elvDir = 1
      if (event.shiftKey) {
        elvDir = -1
      }
      let column = parseInt(polygon.getAttribute("column"))
      let row = parseInt(polygon.getAttribute("row"))
      let elv = parseInt(polygon.getAttribute("elevation")) + elvDir
      let elvColor = elavations.find(e => e.elevation == elv)?.color
      if (!elvColor) {
        elv = elvDir == 1 ? elavations[elavations.length-1].elevation : elavations[0].elevation 
        elvColor = elavations.find(e => e.elevation == elv)?.color
      } 
      polygon.setAttribute("elevation", elv)
      polygon.style.fill = elvColor
      hexMap.polygons[row][column].elevation = elv
    }
    polygon.onmouseover = function() {
      polygon.style.opacity = 0.9;
    }
    polygon.onmouseout = function() {
      polygon.style.opacity = 1;
    }
  }

  createUIEvents() {  
    rotateBtn.onclick = () => { 
      this.hexMap.viewDegree = this.hexMap.viewDegree + 30 >= 360 ? 0 : this.hexMap.viewDegree + 30
      this.deg.innerText = this.hexMap.viewDegree
      this.hexMap.alignPointUp = !this.hexMap.alignPointUp
      emptyElement(this.svg)
      this.rotatePolygons()
      this.buildPolygons()
    }
  }

  rotatePolygons() { 
    console.log('this.hexMap.viewDegree:',this.hexMap.viewDegree)

  }   
 

  orient = {  // 🔥 Shouldn't this be moved to toolkit and return .side & .radius / value
    radiusSide: ()=>{
      if (this.hexMap.alignPointUp) {
        this.side = this.fillWidth / ((this.hexMap.columns * 2) + 1)
        this.radius = this.side / Math.sin(60*(Math.PI/180))  
      } else {
        this.radius = this.fillWidth / ((this.hexMap.columns * 2) + 1)
        this.side =  Math.sqrt((this.radius*this.radius) - ((this.radius/2)*(this.radius/2))) 
      }
    },
    diameter: (i) => {
      return ( 60 * i + (this.hexMap.alignPointUp === true ? -30 : -60 ) )
    }
  }

}
