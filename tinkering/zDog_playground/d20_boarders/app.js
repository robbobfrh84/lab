const initial_selected_number = "1"
const rotateToNumber = false
const relativeScale = 240
const numberStroke = 20 // 🔥 Fix this buy using ratio to radius

const boarderColor = 'rgba(78,20,20,1)'
const numberColor = 'rgba(255,255,255,0.8)'
// const colors = [ 'rgb(128,0,0)', 'rgba(148,40,0)', 'rgb(108,0,20)', 'rgba(148,40,0)', 'rgb(128,0,0)' ];
const colors = [ 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(128,0,128)' ];


const start = function(selected_number) {
  createZdog("#canvas_240", selected_number)
  createZdog("#canvas_400", selected_number)
}

const createZdog = function(elmSelector, number) {

  const canvas = document.querySelector(elmSelector)
  const w = canvas.width

  const radius = 60
  const midradius = (( PHI * PHI ) / 2) * radius

  const rotate = rotateToNumber ? d20[number].rotate : {}
  const illo = new Zdog.Illustration({
    element: elmSelector,
    zoom: (1 / relativeScale) * w, // * Default=1, so do relative px w scale
    rotate: rotate,
    dragRotate: true,
  })

  // ??? is Die redundant? could se just connect all to illo reather than
  const Die = new Zdog.Anchor({ // * SAVE `stroke: 167, color: "black"` * This is what i did to get my Ah-HA moment. realized could use spheres, ended up doing the tunneling, but i thought I was out of steam in fixing zFighting until this moment. Could also be used as a zFighting tool in other projects. So, wanted to preserve. 
    addTo: illo, // * translate: { x: 0, y: 0 }, // * { x: 0, y: 0 } is the Default location.
    // stroke: 150, // * Full is 165 without breaking outside.
    // color: "black"
  })

  const numberShape = new Zdog.Shape({
    scale: 0.3,
    translate: { z: 0 },
    stroke: 7,
    path: Number_paths[number],                               
    color: numberColor,
    closed: false,
  })


  // * Create the first Pentagon (#1)
  const topPentagon = new Zdog.Anchor({
    addTo: Die,
    translate: { y: (-midradius) },
    rotate: { x: (TAU/4) },
  })
  build_pentagon(topPentagon, boarderColor)
  // const points = getPoints(60, 5, 0, 0) 
  // const topLine = new Zdog.Shape({
  //   addTo: topPentagon,
  //   path: [points[0],points[1]], // [ { x: 0, y: -60 }, { x: 57.07, y: -18.63 },],
  //   stroke: 8, //8,
  //   color: boarderColor, // "rgba(255,0,0,0.5)",
  // })
  // for (let i = 1; i < points.length - 1; i++) {
  //   topLine.copy({ path: [points[i],points[i+1]] })
  // }
  // const topCone = new Zdog.Anchor({
  //   // addTo: Die,
  //   addTo: topPentagon,
  //   // translate: { y: (-midradius) },
  //   // rotate: { x: (TAU/4) },
  // })
  build_pocket_cone(topPentagon, colors[0])

  // const topLine1 = new Zdog.Shape({
  //   addTo: topPentagon,
  //   path: [points[0],points[1]], // [ { x: 0, y: -60 }, { x: 57.07, y: -18.63 },],
  //   stroke: 8, //8,
  //   color: "red", // "rgba(255,0,0,0.5)",
  // })
  // for (let i = 1; i < points.length - 1; i++) {
  //   topLine1.copy({ path: [points[i],points[i+1]] })
  // }

  // Coning 🍦 with deep tryangles...
  // const points2 = getPoints(53, 5, 0, 0)
  // const cone = new Zdog.Anchor({
  //   addTo: Die,
  //   translate: { y: (-midradius) },
  //   rotate: { x: (TAU/4) },
  // })
  // const triangle1 = new Zdog.Shape({
  //   addTo: cone,
  //   translate: { z: -8 },
  //   path: [ points2[0], points2[1], { x: 0, y: 0, z: -60 }],
  //   stroke: 12,
  //   color: "green",
  //   closed: true,
  //   fill: true
  // })
  // for (let i = 1; i < points2.length - 1; i++) {
  //   triangle1.copy({ path: [ points2[i], points2[i+1], { x: 0, y: 0, z: -60 } ] })
  // }

  // * Bottom face #12
  const botPentagon = topPentagon.copy({ 
    translate: { y: (midradius) },
    rotate: { x: (-TAU/4) },
  })
  build_pentagon(botPentagon, boarderColor)

  // const botCone = new Zdog.Anchor({
  //   addTo: botPentagon,
  // })
  // const botCone = topCone.copy({ 
  //   translate: { y: (midradius) },
  //   rotate: { x: (-TAU/4) },
  //   color: colors[1],
  // })
  build_pocket_cone(botPentagon, colors[1])



  const dieKey = {
    "0": { number: Number_paths["2"], color: colors[0] },
    "1": { number: Number_paths["3"], color: colors[1]},
    "2": { number: Number_paths["4"], color: colors[2] },
    "3": { number: Number_paths["5"], color: colors[3] },
    "4": { number: Number_paths["6"], color: colors[4] },
    "5": { number: Number_paths["7"], color: colors[0] },
    "6": { number: Number_paths["8"], color: colors[1] },
    "7": { number: Number_paths["9"], color: colors[2] },
    "8": { number: Number_paths["10"], color: colors[3] },
    "9": { number: Number_paths["11"], color: colors[4] },
  }

  for ( let i=0; i < 10; i++ ) {
    const ySide = i >= 5 ? 1 : -1
    const rotor1 = new Zdog.Anchor({
      addTo: Die,
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
    // const newCone = new Zdog.Anchor({
    //   addTo: newPentagon,
    // })
    build_pocket_cone(newPentagon, dieKey[i].color)

    // build_pocket_pentagon_Layers(pentagon, radius, dieKey[i].color)
    newPentagon.addChild(numberShape.copy({ 
      path: dieKey[i].number, 
      color: numberColor  
    }))   

  }

  // ? Makes since to move these back to top / bot code area above?
  topPentagon.addChild(numberShape.copy({ path: Number_paths["1"] }))
  botPentagon.addChild(numberShape.copy({ path: Number_paths["12"] }))

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
  const points2 = getPoints(53, 5, 0, 0)
  const cone = new Zdog.Anchor({
    addTo: pentagon,
  })
  const triangle1 = new Zdog.Shape({
    addTo: cone,
    translate: { z: -8 },
    path: [ points2[0], points2[1], { x: 0, y: 0, z: -60 }],
    stroke: 12,
    color: color,
    closed: true,
    fill: true
  })
  for (let i = 1; i < points2.length - 1; i++) {
    triangle1.copy({ path: [ points2[i], points2[i+1], { x: 0, y: 0, z: -60 } ] })
  }
}

start(initial_selected_number)





  // const pentagonL2 = new Zdog.Polygon({
  //   addTo: pentagon,
  //   translate: { z: -4 },
  //   radius: radius - 8,
  //   sides: 5,
  //   stroke: 10,
  //   color: color,
  //   fill: false
  //   // fill: true
  // })
  // // 🔥 I Think we can clone now... 
  // const pentagonL3 = new Zdog.Polygon({
  //   addTo: pentagon,
  //   translate: { z: -8 }, radius: 42, sides: 5, stroke: 10, color: color, fill: false
  // })
  // const pentagonL4 = new Zdog.Polygon({
  //   addTo: pentagon,
  //   translate: { z: -13 }, radius: 32, sides: 5, stroke: 11, color: color, fill: false
  // })
  // const pentagonL5 = new Zdog.Polygon({
  //   addTo: pentagon,
  //   translate: { z: -19 }, radius: 22, sides: 5, stroke: 11, color: color, fill: false
  // })
  // const pentagonL6 = new Zdog.Polygon({
  //   addTo: pentagon,
  //   translate: { z: -24 }, radius: 12, sides: 5, stroke: 11, color: color, fill: true
  // })



  // const pentagonX = new Zdog.Polygon({
  //   addTo: pentagon,
  //   translate: { z: -4 },
  //   radius: radius - 2,
  //   sides: 5,
  //   stroke: 4,
  //   color: "gray",
  //   fill: false
  //   // fill: true
  // })


  // new Zdog.Shape({
  //   addTo: pentagon,
  //   // translate: { x: 0, y: 0, z: -10 },
  //   path: [
  // { x: 0, y: -60 },
  // { x: 57.07, y: -18.63 },
  // { x: 35.31, y: 48.99 },
  // { x: -35.31, y: 48.99 },
  // { x: -57.07, y: -18.63 }
  //   ],
  //   stroke: 20,
  //   color: "red",
  // })
// }

