getMap(ex,ey) {
  let closest = {
    x: this.elm.clientWidth,
    y: this.elm.clientHeight,
    p: {}
  }
  let closestRow
  const dist = this.hexMap[0][1].x - this.hexMap[0][0].x // 🔥 don't need this math here move to build hex grid
  const ang = Math.abs((ex%dist)-(dist/2))
  console.log("ex,ey :", ex,ey)
  console.log("ang :", ang)
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
