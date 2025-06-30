const initial_selected_number = "1"
const rotateToNumber = false
const relativeScale = 240
const radius = 60

const boarderColor = 'rgba(78,20,20,0)'
const boarderStroke = 8

// const numberColor = 'rgba(0,0,0,0.8)' 
const numberColor = 'rgba(255,255,255,0.8)'
const numberStroke = 6

// const faceColors = [ 'rgb(128,0,0)', 'rgba(148,40,0)', 'rgb(108,0,20)', 'rgba(148,40,0)', 'rgb(128,0,0)' ];
// const faceColors = [ 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(128,0,128)' ];
const faceColors = [ '#636', '#C25', '#E62', '#EA0', '#ED0' ] 

const start = function(selected_number) {
  createZdog("#canvas_240", selected_number)
  createZdog("#canvas_400", selected_number)
}


const createZdog = function(elmSelector, number) {
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

  // const Die = new Zdog.Anchor({ // * SAVE `stroke: 167, color: "black"` * This is what i did to get my Ah-HA moment. realized could use spheres, ended up doing the tunneling, but i thought I was out of steam in fixing zFighting until this moment. Could also be used as a zFighting tool in other projects. So, wanted to preserve. 
  //   addTo: illo, // * translate: { x: 0, y: 0 }, // * { x: 0, y: 0 } is the Default location.
  // })

  const numberShape = new Zdog.Shape({
    scale: 0.3,
    // translate: { z: 0 },
    translate: { z: -(numberStroke - 1) },
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
  build_pentagon(topPentagon, boarderColor)
  build_pocket_cone(topPentagon, faceColors[0])
  topPentagon.addChild(numberShape.copy({ path: Number_paths["1"] }))

  // * Bottom face #12
  const botPentagon = topPentagon.copy({ 
    translate: { y: (midradius) },
    rotate: { x: (-TAU/4) },
  })
  build_pentagon(botPentagon, boarderColor)
  build_pocket_cone(botPentagon, faceColors[1])
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
    build_pentagon(newPentagon, boarderColor)
    build_pocket_cone(newPentagon, dieKey[i].color)
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
    path: [points[0],points[1]], // [ { x: 0, y: -60 }, { x: 57.07, y: -18.63 },],
    stroke: 8, //8,
    color: color, // "rgba(255,0,0,0.5)",
  })
  for (let i = 1; i < points.length - 1; i++) {
    topLine.copy({ path: [points[i],points[i+1]] })
  }
}


const build_pocket_cone = function(pentagon, color) {
  // const points2 = getPoints(53, 5, 0, 0)
  // const cone = new Zdog.Anchor({
  //   addTo: pentagon,
  // })
  // const triangle1 = new Zdog.Shape({
  //   addTo: cone,
  //   translate: { z: -8 },
  //   path: [ points2[0], points2[1], { x: 0, y: 0, z: -60 }],
  //   stroke: 12,
  //   color: color,
  //   closed: true,
  //   fill: true
  // })
  // for (let i = 1; i < points2.length - 1; i++) {
  //   triangle1.copy({ path: [ points2[i], points2[i+1], { x: 0, y: 0, z: -60 } ] })
  // }




  const cone = new Zdog.Anchor({
    addTo: pentagon,
    translate: { z: 0 },
  })
  const points2 = getPoints(60, 5, 0, 0)
  const triangle1 = new Zdog.Shape({
    addTo: cone,
    path: [ points2[0], points2[1], { x: 0, y: 0, z: -60 } ],
    stroke: 0.5,
    color: color,
    fill: true
  })
  for (let i = 1; i < points2.length - 1; i++) {
    triangle1.copy({ path: [ points2[i], points2[i+1], { x: 0, y: 0, z: -60 } ] })
  }
}


start(initial_selected_number)