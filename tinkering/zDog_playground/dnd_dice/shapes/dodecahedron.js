const build_dodecahedron = function(illo, radius, colors) {

  const TAU = Zdog.TAU
  const ROOT5 = Math.sqrt(5)
  const PHI = ( 1 + ROOT5 ) / 2
  const midradius = ( PHI * PHI ) / 2;

  const dodecahedron = new Zdog.Anchor({
    addTo: illo,
    translate: { x: 0, y: 0 },
    scale: radius * 2,
  })

  const face = new Zdog.Polygon({ // * top face
    sides: 5,
    radius: 1,
    addTo: dodecahedron,
    translate: { y: -midradius },
    rotate: { x: TAU/4 },
    fill: true,
    stroke: false,
    color: colors[4],
  })

  face.copy({ // * bottom face
    translate: { y: midradius },
    rotate: { x: -TAU/4 },
    color: colors[0],
  })

  ;[ -1, 1 ].forEach( function( ySide ) {
    const colorWheel = {
      '-1': [ colors[0], colors[1], colors[3], colors[2], colors[1] ],
      1: [ colors[4], colors[3], colors[1], colors[2],colors[3] ],
    }[ ySide ];

    for ( let i=0; i < 5; i++ ) {
      const rotor1 = new Zdog.Anchor({
        addTo: dodecahedron,
        rotate: { y: TAU/5 * (i) },
      })
      const rotor2 = new Zdog.Anchor({
        addTo: rotor1,
        rotate: { x: TAU/4*ySide - Math.atan(2) },
      })
      face.copy({
        addTo: rotor2,
        translate: { z: midradius },
        rotate: { z: TAU/2 },
        color: colorWheel[i],
      })
    }
  })
  
  return dodecahedron
}