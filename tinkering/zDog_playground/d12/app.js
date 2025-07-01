let selected_number = "2"
const rotateToNumber = true
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

let clearElm = false
let isUpdate = false
let illoA, illoB, illoC, illoD; // * WARNING: only last illo will work with this un-noted & const removed from createZdog funtion. Only use for Developing when we want only 1 to be global to make hard console changes...

const snapTo = function(number) {
  clear = true
  isUpdate = true
  start(number)
}

const start = function(number) {
  window["btn"+selected_number].style.border = '2px solid rgba(0,0,0,0)'
  window["btn"+number].style.border = '2px solid red'
  selected_number = number
  createZdog("A", "#canvas1_240", number, boarderColor2, numberColor2, faceColors2)
  createZdog("B", "#canvas2_240", number, false, numberColor1, faceColors1)
  createZdog("C", "#canvas1_400", number, boarderColor2, numberColor2, faceColors2)
  createZdog("D", "#canvas2_400", number, false, numberColor1, faceColors1)
}

const roll = function() {
  animateTo([random(1,12),random(1,12),random(1,12),random(1,12)], true)
}

const createZdog = function(L, elmSelector, number, boarderColor, numberColor, faceColors) {
  const canvas = document.querySelector(elmSelector)
  canvas.width = canvas.parentElement.clientWidth
  canvas.height = canvas.parentElement.clientHeight
  // canvas.width = isUpdate ? canvas.width / 2 : canvas.width
  // canvas.height = isUpdate ? canvas.height / 2 : canvas.height
  const w = canvas.width

  const midradius = (( PHI * PHI ) / 2) * radius

  const rotate = rotateToNumber ? d12[number].location : {}
  // const illo = new Zdog.Illustration({
  window["illo"+L] = new Zdog.Illustration({
    element: elmSelector,
    zoom: (1 / relativeScale) * w, // * Default=1, so do relative px w scale
    rotate: rotate[0],
    dragRotate: true,
  })
  const Die = new Zdog.Anchor({
    addTo: window["illo"+L],
    rotate: rotate[1] ? rotate[1] : {},
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
    addTo: Die,
    translate: { y: (-midradius) },
    rotate: { x: (TAU/4) },
  })
  if (boarderColor) { build_pentagon(topPentagon, boarderColor) }
  build_pocket_cone(topPentagon, faceColors[0], boarderColor)
  topPentagon.addChild(numberShape.copy({ 
    path: Number_paths["1"],
    rotate: { z: d12["1"].rotate }
  }))

  // * Bottom face #12
  const botPentagon = topPentagon.copy({ 
    translate: { y: (midradius) },
    rotate: { x: (-TAU/4) },
  })
  if (boarderColor) { build_pentagon(botPentagon, boarderColor) }
  build_pocket_cone(botPentagon, faceColors[1], boarderColor)
  botPentagon.addChild(numberShape.copy({ 
    path: Number_paths["12"],
    rotate: { z: d12["12"].rotate }
  }))


  const dieKey = {
    "0": { number: "7", color: faceColors[0] },
    "1": { number: "8", color: faceColors[1]},
    "2": { number: "10", color: faceColors[2] },
    "3": { number: "11", color: faceColors[3] },
    "4": { number: "9", color: faceColors[4] },
    "5": { number: "6", color: faceColors[0] },
    "6": { number: "5", color: faceColors[1] },
    "7": { number: "3", color: faceColors[2] },
    "8": { number: "2", color: faceColors[3] },
    "9": { number: "4", color: faceColors[4] },
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
    if (boarderColor) { build_pentagon(newPentagon, boarderColor) }
    build_pocket_cone(newPentagon, dieKey[i].color, boarderColor)
    newPentagon.addChild(numberShape.copy({ 
      path: Number_paths[dieKey[i].number], 
      rotate: { z: d12[dieKey[i].number].rotate }
    }))   
  }

  function animate() {
    if (!clearElm) {
      window["illo"+L].updateRenderGraph()
      requestAnimationFrame( animate )
    } else { illo = null }
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




// CHAT GPT made, idk, review and clean, probably put in other files.
const animateTo = function(number, roll) {
  clear = true
  isUpdate = true
  window["btn"+selected_number].style.border = '2px solid rgba(0,0,0,0)'
  animateStart("A", roll ? number[0] : number)
  animateStart("B", roll ? number[1] : number)
  animateStart("C", roll ? number[2] : number)
  animateStart("D", roll ? number[3] : number)
}

const animateStart = function(L, number) {
  selected_number = number
  
  // If illo doesn't exist yet, create it first without animation
  // const illo = illo1
  // if (!window["illo"+L]) {
  //   createZdog(window["illo"+L], "#canvas1_240", number, boarderColor2, numberColor2, faceColors2)
  //   return;
  // }
  
  // Get target positions
  const targetX_0 = d12[number].location[0]?.x || 0;
  const targetY_0 = d12[number].location[0]?.y || 0;
  const targetZ_0 = d12[number].location[0]?.z || 0;
  const targetX_1 = d12[number].location[1]?.x || 0;
  const targetY_1 = d12[number].location[1]?.y || 0;
  const targetZ_1 = d12[number].location[1]?.z || 0;

  const Die = window["illo"+L].children[0];

  // Calculate distances and directions
  let distX_0 = Math.abs(window["illo"+L].rotate.x - targetX_0);
  let distY_0 = Math.abs(window["illo"+L].rotate.y - targetY_0);
  let distZ_0 = Math.abs(window["illo"+L].rotate.z - targetZ_0);
  let distX_1 = Math.abs(Die.rotate.x - targetX_1);
  let distY_1 = Math.abs(Die.rotate.y - targetY_1);
  let distZ_1 = Math.abs(Die.rotate.z - targetZ_1);

  const dirX_0 = targetX_0 > window["illo"+L].rotate.x ? 1 : -1;
  const dirY_0 = targetY_0 > window["illo"+L].rotate.y ? 1 : -1;
  const dirZ_0 = targetZ_0 > window["illo"+L].rotate.z ? 1 : -1;
  const dirX_1 = targetX_1 > Die.rotate.x ? 1 : -1;
  const dirY_1 = targetY_1 > Die.rotate.y ? 1 : -1;
  const dirZ_1 = targetZ_1 > Die.rotate.z ? 1 : -1;

  const animationSpeed = 0.05;

  function animate() {
    let isAnimating = false;

    // Animate window["illo"+L] x, y, z
    if (distX_0 > 0.001) {
      distX_0 -= animationSpeed;
      window["illo"+L].rotate.x += animationSpeed * dirX_0;
      isAnimating = true;
    }
    if (distY_0 > 0.001) {
      distY_0 -= animationSpeed;
      window["illo"+L].rotate.y += animationSpeed * dirY_0;
      isAnimating = true;
    }
    if (distZ_0 > 0.001) {
      distZ_0 -= animationSpeed;
      window["illo"+L].rotate.z += animationSpeed * dirZ_0;
      isAnimating = true;
    }

    // Animate Die x, y, z
    if (distX_1 > 0.001) {
      distX_1 -= animationSpeed;
      Die.rotate.x += animationSpeed * dirX_1;
      isAnimating = true;
    }
    if (distY_1 > 0.001) {
      distY_1 -= animationSpeed;
      Die.rotate.y += animationSpeed * dirY_1;
      isAnimating = true;
    }
    if (distZ_1 > 0.001) {
      distZ_1 -= animationSpeed;
      Die.rotate.z += animationSpeed * dirZ_1;
      isAnimating = true;
    }

    window["illo"+L].updateRenderGraph();
    
    if (isAnimating) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

start(selected_number)