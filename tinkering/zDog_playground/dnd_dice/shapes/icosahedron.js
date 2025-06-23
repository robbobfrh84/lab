const build_icosahedron = function(illo, radius, colors) {

  const TAU = Zdog.TAU
  const ROOT3 = Math.sqrt(3)
  const faceRadius = ROOT3/2 * 2/3
  const faceHeight = faceRadius * 3/2
  const capApothem = 0.5 / Math.tan( TAU/10 )
  const capRadius = 0.5 / Math.sin( TAU/10 )
  const capTilt = Math.asin( capApothem / faceHeight )
  const capSagitta = capRadius - capApothem
  const sideTilt = Math.asin( capSagitta / faceHeight )
  const sideHeight = Math.sqrt( faceHeight*faceHeight - capSagitta*capSagitta )

  const icosahedron = new Zdog.Anchor({
    addTo: illo,
    translate: { x: 0, y: 0 },
    scale: radius * 3.5,
  })

  ;[ -1, 1 ].forEach( function( ySide ) {
    const capColors = {
      '-1': [ colors[1], colors[3], colors[4], colors[3], colors[2] ],
      1: [ colors[3], colors[1], colors[0], colors[1], colors[2] ],
    }[ ySide ];

    const sideColors = {
      '-1': [ colors[1], colors[3], colors[4], colors[2], colors[1] ],
      1: [ colors[3], colors[1], colors[0], colors[2], colors[2] ],
    }[ ySide ];

    for ( let i=0; i < 5; i++ ) {
      const rotor = new Zdog.Anchor({
        addTo: icosahedron,
        rotate: { y: TAU/5 * -i },
        translate: { y: sideHeight/2 * ySide },
      })

      let capRotateX = -capTilt;
      const isYPos = ySide > 0;
      capRotateX += isYPos ? TAU/2 : 0;

      const capAnchor = new Zdog.Anchor({
        addTo: rotor,
        translate: { z: capApothem * ySide },
        rotate: { x: capRotateX },
      })
      
      const face = new Zdog.Polygon({ // * cap face
        sides: 3,
        radius: faceRadius,
        addTo: capAnchor,
        translate: { y: -faceRadius/2 },
        stroke: false,
        fill: true,
        color: capColors[i],
      })

      let sideRotateX = -sideTilt;
      sideRotateX += isYPos ? 0 : TAU/2;
      const sideAnchor = capAnchor.copy({
        rotate: { x: sideRotateX },
      })

      face.copy({
        addTo: sideAnchor,
        translate: { y: -faceRadius/2 },
        rotate: { y: TAU/2 },
        color: sideColors[i]
      })

    }
  })
  
  return icosahedron
}