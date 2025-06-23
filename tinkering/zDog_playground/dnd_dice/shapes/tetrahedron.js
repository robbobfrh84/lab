const build_tetrahedron = function(illo, radius, colors) {

  const TAU = Zdog.TAU

  const tetrahedron = new Zdog.Anchor({
    addTo: illo,
    translate: { x: 0, y: 0 },
    scale: 2.5,
  });

  const inradius = Math.cos( TAU/6 ) * radius;
  const height = radius + inradius;

  const triangle = new Zdog.Polygon({
    sides: 3,
    radius: radius,
    addTo: tetrahedron,
    translate: { y: height/2 },
    fill: true,
    stroke: false,
    color: colors[0],
  })

  for ( let i=0; i < 3; i++ ) {
    const rotor1 = new Zdog.Anchor({
      addTo: tetrahedron,
      rotate: { y: TAU/3 * -i },
    });
    const rotor2 = new Zdog.Anchor({
      addTo: rotor1,
      translate: { z: inradius, y: height/2 },
      rotate: { x: Math.acos(1/3) * -1 + TAU/4  },
    });
    triangle.copy({
      addTo: rotor2,
      translate: { y: -inradius },
      color: [ colors[3], colors[1], colors[2] ][i],
    })
  }

  triangle.rotate.set({ x: -TAU/4, z: -TAU/2 });

  return tetrahedron 

}