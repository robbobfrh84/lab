const build_octahedron = function(illo, radiusScale, colors) {

  const TAU = Zdog.TAU
  const ROOT3 = Math.sqrt(3)
  const radius = ROOT3/2 * 2/3
  const height = radius * 3/2
  const tilt = Math.asin( 0.5 / height )

  const octahedron = new Zdog.Anchor({
    addTo: illo,
    translate: { x: 0, y: 0 },
    scale: radiusScale * 4,
  })

  const colorWheel = [ colors[0], colors[1], colors[2], colors[3], colors[4] ]

  ;[ -1, 1 ].forEach( function( ySide ) {
    for ( let i=0; i < 4; i++ ) {
      const rotor = new Zdog.Anchor({
        addTo: octahedron,
        rotate: { y: TAU/4 * (i + 1.5) * -1 },
      })
      const anchor = new Zdog.Anchor({
        addTo: rotor,
        translate: { z: 0.5 },
        rotate: { x: tilt * ySide },
      })
      new Zdog.Polygon({
        sides: 3,
        radius: radius,
        addTo: anchor,
        translate: { y: -radius/2 * ySide },
        scale: { y: ySide },
        stroke: false,
        fill: true,
        color: colorWheel[ i + 0.5 + 0.5*ySide ],
        backface: false,
      })
    }
  })

  return octahedron
  
}