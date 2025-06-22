const build_cube = function(illo, radius, colors) {

  const cube = new Zdog.Box({
    addTo: illo,
    width: radius * 4,
    height: radius * 4,
    depth: radius * 4,
    translate: { x: 0, y: 0 },
    topFace: colors[4],
    frontFace: colors[3],
    leftFace: colors[2],
    rightFace: colors[2],
    rearFace: colors[1],
    bottomFace: colors[0],
    stroke: false,
  })

  return cube
  
}