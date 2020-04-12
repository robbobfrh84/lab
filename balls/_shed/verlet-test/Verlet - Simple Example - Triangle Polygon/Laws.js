class Laws {

  average(points) {
    const x = points.map(p => p.x).reduce((prev, curr) => prev + curr) / points.length
    const y = points.map(p => p.y).reduce((prev, curr) => prev + curr) / points.length
    return { x: x, y: y }
  }

  distance(p0, p1) {
    const x = p1.x - p0.x
    const y = p1.y - p0.y
    return Math.sqrt(x * x + y * y)
  }

}
