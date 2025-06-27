const build_decahedron = function(illo, radius, colors) {

  const TAU = Zdog.TAU
  const PHI = (1 + Math.sqrt(5)) / 2
  
  const size = radius * 0.1
  const theta = TAU / 5
  const shift = TAU / 10
  const line = size * PHI
  
  // Pre-calculate common y-coordinates
  const topY = size * PHI
  const bottomY = -size * PHI
  const upperY = ((size / PHI) / PHI) / PHI
  const lowerY = -((size / PHI) / PHI) / PHI

  const decahedron = new Zdog.Anchor({
    addTo: illo,
    translate: { x: 0, y: 0, z: 0 },
    scale: radius,
  })

  // * Top 5 faces
  for (let i = 0; i < 5; i++) {
    const nextI = (i + 1) % 5
    
    // Pre-calculate angles
    const angle1 = theta * (i + 2)
    const angle2 = theta * (nextI + 2)
    const shiftedAngle1 = angle1 + shift
    
    new Zdog.Shape({
      addTo: decahedron,
      path: [
        { x: 0, y: topY, z: 0 }, // top point
        { x: line * Math.cos(angle1), y: upperY, z: line * Math.sin(angle1) }, // side point 1
        { x: line * Math.cos(shiftedAngle1), y: lowerY, z: line * Math.sin(shiftedAngle1) }, // middle point
        { x: line * Math.cos(angle2), y: upperY, z: line * Math.sin(angle2) }, // side point 2
      ],
      closed: true,
      stroke: false,
      fill: true,
      color: colors[i % colors.length],
    })
  }
  
  // * Bottom 5 faces
  for (let i = 0; i < 5; i++) {
    const nextI = (i + 1) % 5
    
    // Pre-calculate angles
    const shiftedAngle1 = theta * (i + 2) + shift
    const angle2 = theta * (nextI + 2)
    const shiftedAngle2 = angle2 + shift
    
    new Zdog.Shape({
      addTo: decahedron,
      path: [
        { x: 0, y: bottomY, z: 0 }, // bottom point
        { x: line * Math.cos(shiftedAngle1), y: lowerY, z: line * Math.sin(shiftedAngle1) }, // middle point 1
        { x: line * Math.cos(angle2), y: upperY, z: line * Math.sin(angle2) }, // side point 1
        { x: line * Math.cos(shiftedAngle2), y: lowerY, z: line * Math.sin(shiftedAngle2) }, // middle point 2
      ],
      closed: true,
      stroke: false,
      fill: true,
      color: colors[(i + 5) % colors.length],
    })
  }

  return decahedron
}