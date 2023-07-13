const width = 400
const height = 400
const point_size = 4
const starting_elevation = 255
const erosion_force = 4
const eMap = {}
let previous_points = []

const ctx = new canvas
ctx.new('canvas', width, height)
const border_locations = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]

function buildMap(newMap){
  for (var col = 0; col < width; col += point_size) {
    if (newMap) eMap[col] = {}
    for (var row = 0; row < height; row += point_size) {
      const elv = newMap ? starting_elevation : eMap[col][row]
      ctx.rec( col, row, point_size, point_size, "rgb("+elv+","+elv+","+elv+")" )
      if (newMap) eMap[col][row] = elv
    }
  }
}

function buildHill(){
  for (var col = 0; col < width; col += point_size) {
    for (var row = 0; row < height; row += point_size) {
      const elv = 255 - row
      ctx.rec( col, row, point_size, point_size, "rgb("+elv+","+elv+","+elv+")" )
      eMap[col][row] = elv
    }
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drop(col,row) {
  col = Math.floor(col / point_size) * point_size
  row = Math.floor(row / point_size) * point_size
  const elv = eMap[col][row] - erosion_force
  ctx.rec( col, row, point_size, point_size, "rgb("+elv+","+elv+","+elv+")" )
  eMap[col][row] = elv
  previous_points.push(col+"-"+row)
  const border = getBorder(col,row)
  return runDrop(border, 'red')
}

function getBorder(colX,rowX) {
  const border = []
  border_locations.forEach(point => {
    const col = colX+(point_size * point[0])
    const row = rowX+(point_size * point[1])
    if (
      col >= 0 && row >= 0 && col < width && row < height
      && !previous_points.includes(col+"-"+row)
    ) {
      border.push({ col, row, elv: eMap[col][row] })
    }
  })
  return border
}

function runDrop(border){
  let lowest = 256
  let lowest_points = []
  border.forEach( p => {
    if (p.elv < lowest) {
      lowest = p.elv
      lowest_points = [p]
    } else if (p.elv === lowest){
      lowest_points.push(p)
    }
  })
  let lowest_point = lowest_points[0]
  if (lowest_points.length > 1) {
    lowest_point = lowest_points[random(0,lowest_points.length-1)]
  }
  return lowest_point
}

function erode() {
  for (var j = 0; j < 1000; j++) {
    let col = random(0,width-1)
    let row = random(0,height-1)
    previous_points = []
    for (var i = 0; i < 100; i++) {
      const lowestPoint = drop(col,row)
      if (!lowestPoint) { break }
      col = lowestPoint.col
      row = lowestPoint.row
    }
  }
}

buildMap(true) // the "Erode" Button will fire without "true" to continue on same map.
buildHill()
erode()
