const initial_selected_number = "1"
const rotateToNumber = false
const relativeScale = 240
const radius = 60
const boarderStroke = 6
const numberStroke = 6

const numberColor1 = 'rgba(0,0,0,0.8)' 
const numberColor2 = 'rgba(255,255,255,0.8)'

const boarderColor2 = 'rgba(170,80,20,1)'
const boarderColor3 = 'rgb(0,0,0)'

const faceColors1 = [ '#636', '#C25', '#E62', '#EA0', '#ED0' ] 
const faceColors2 = [ 'rgb(128,0,0)', 'rgb(148,40,0)', 'rgb(108,0,20)', 'rgb(148,40,0)', 'rgb(128,0,0)' ];
const faceColors3 = [ 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(128,0,128)' ];


const start = function(selected_number) {
  createZdog("#canvas1_240", selected_number, boarderColor2, numberColor2, faceColors2)
  createZdog("#canvas2_240", selected_number, false, numberColor1, faceColors1)
  createZdog("#canvas1_400", selected_number, boarderColor2, numberColor2, faceColors2)
  createZdog("#canvas2_400", selected_number, false, numberColor1, faceColors1)
}


const createZdog = function(elmSelector, number, boarderColor, numberColor, faceColors) {
  const canvas = document.querySelector(elmSelector)
  const w = canvas.width

  const midradius = (( PHI * PHI ) / 2) * radius

  const rotate = rotateToNumber ? d20[number].rotate : {}
  const illo = new Zdog.Illustration({
    element: elmSelector,
    zoom: (1 / relativeScale) * w, // * Default=1, so do relative px w scale
    rotate: rotate,
    dragRotate: true,
  })

  // const numberDepth = boarderColor ? -(numberStroke/2) : -(boarderStroke/2)
  const numberShape = new Zdog.Shape({
    scale: 0.3,
    translate: { z: -(numberStroke/2) },
    stroke: numberStroke,
    path: Number_paths[number],                               
    color: numberColor,
    closed: false,
  })

  // * Create the first Pentagon (#1)
  const topPentagon = new Zdog.Anchor({
    addTo: illo,
    translate: { y: (-midradius) },
    rotate: { x: (TAU/4) },
  })
  if (boarderColor) { build_pentagon(topPentagon, boarderColor) }
  build_pocket_cone(topPentagon, faceColors[0], boarderColor)
  topPentagon.addChild(numberShape.copy({ path: Number_paths["1"] }))

  // * Bottom face #12
  const botPentagon = topPentagon.copy({ 
    translate: { y: (midradius) },
    rotate: { x: (-TAU/4) },
  })
  if (boarderColor) { build_pentagon(botPentagon, boarderColor) }
  build_pocket_cone(botPentagon, faceColors[1], boarderColor)
  botPentagon.addChild(numberShape.copy({ path: Number_paths["12"] }))


  const dieKey = {
    "0": { number: Number_paths["2"], color: faceColors[0] },
    "1": { number: Number_paths["3"], color: faceColors[1]},
    "2": { number: Number_paths["4"], color: faceColors[2] },
    "3": { number: Number_paths["5"], color: faceColors[3] },
    "4": { number: Number_paths["6"], color: faceColors[4] },
    "5": { number: Number_paths["7"], color: faceColors[0] },
    "6": { number: Number_paths["8"], color: faceColors[1] },
    "7": { number: Number_paths["9"], color: faceColors[2] },
    "8": { number: Number_paths["10"], color: faceColors[3] },
    "9": { number: Number_paths["11"], color: faceColors[4] },
  }

  for ( let i=0; i < 10; i++ ) {
    const ySide = i >= 5 ? 1 : -1
    const rotor1 = new Zdog.Anchor({
      addTo: illo,
      rotate: { y: TAU/5 * (i) },
    })
    const rotor2 = new Zdog.Anchor({
      addTo: rotor1,
      rotate: { x: TAU/4*ySide - Math.atan(2) },
    })
    const newPentagon = topPentagon.copy({
      addTo: rotor2,
      translate: { z: (midradius) },
      rotate: { z: TAU/2  },
    })
    if (boarderColor) { build_pentagon(newPentagon, boarderColor) }
    build_pocket_cone(newPentagon, dieKey[i].color, boarderColor)
    newPentagon.addChild(numberShape.copy({ path: dieKey[i].number, color: numberColor }))   
  }

  function animate() {
    illo.updateRenderGraph()
    requestAnimationFrame( animate )
  }

  animate()
}


const build_pentagon = function(pentagon, color) {
  const points = getPoints(60, 5, 0, 0) 
  const topLine = new Zdog.Shape({
    addTo: pentagon,
    path: [points[0],points[1]],
    stroke: boarderStroke, 
    color: color, 
  })
  for (let i = 1; i < points.length - 1; i++) {
    topLine.copy({ path: [points[i],points[i+1]] })
  }
}


const build_pocket_cone = function(pentagon, color, boarderColor) {
  const r = !boarderColor ? radius : radius - (boarderStroke/2)
  const adjZ = !boarderColor ? 0 : (boarderStroke/2 * -1)
  const stroke = !boarderColor ? 0 : (boarderStroke/4)
  
  const cone = new Zdog.Anchor({
    addTo: pentagon,
    translate: { z: adjZ },
  })
  const points2 = getPoints(r, 5, 0, 0)
  const triangle1 = new Zdog.Shape({
    addTo: cone,
    path: [ points2[0], points2[1], { x: 0, y: 0, z: -60 } ],
    stroke: stroke,
    color: color,
    fill: true
  })
  for (let i = 1; i < points2.length - 1; i++) {
    triangle1.copy({ path: [ points2[i], points2[i+1], { x: 0, y: 0, z: -60 } ] })
  }
}


start(initial_selected_number)