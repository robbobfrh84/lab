class HexMap {
  constructor(params) { Object.assign(this,params) }

  create() {
    this.polygons = this.polygons || []
    if (!this.viewDegree) { this.viewDegree = 0 }
    this.createPolygonObject() 
    return this
  }

  createPolygonObject() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let staggerColumn, staggerRow;
        if (this.stagger === "left") {
          staggerColumn = row%2 !== 0 ? 1 : 0 
          staggerRow = column%2 !== 0 ? 1 : 0 
        } else if (this.stagger === "right") { 
          staggerColumn = row%2 !== 0 ? 0 : 1 
          staggerRow = column%2 !== 0 ? 0 : 1 
        } 
        if (!this.polygons[row]) this.polygons[row] = []
        this.polygons[row][column] = { 
          row, 
          column,
          staggerColumn, 
          staggerRow, 
          elevation: this.polygons[row][column]?.elevation || -2,
          color: this.polygons[row][column]?.color || elavations[0].color
        }

      }
    }
  }

}