const Units = []

window.onload = ()=>{
  Evolve_units.getInitialUnits(staticUnits)
  const container = buildGrid(grid)
  Units.map(x=>placeUnit(container, grid, x))
}

let generation = 0
const animationSpeed = 100

const grid = {
  x: 16,
  y: 16,
  blockWidth: 20,
  blockBorder: "0 0 0 0.25px rgba(0,0,0,0.1) inset",
}

const staticUnits = [
  {
    x: 3,
    y: 3,
  },
  {
    x: 10,
    y: 3,
  },
  {
    x: 10,
    y: 10,
  },
  {
    x: 3,
    y: 10,
  }
]

function buildGrid(grid){
  const container = document.createElement('div')
  container.style.position = "relative"
  container.innerHTML = generation+"<br>"
  for (var y = 0; y < grid.y; y++) {
    for (var x = 0; x < grid.x; x++) {
      const div = document.createElement('div')
      div.classList.add('box')
      div.style.boxShadow = grid.blockBorder
      div.style.width = grid.blockWidth + "px"
      div.style.height = grid.blockWidth + "px"
      container.appendChild(div)
    }
    container.innerHTML += `<br>`
  }
  main.insertBefore(container, main.firstChild)
  return container
}

function placeUnit(container, grid, unit){
  const div = document.createElement('div')
  div.style.position = "absolute"
  div.style.top = (unit.static.y * grid.blockWidth) + "px"
  div.style.left = (unit.static.x * grid.blockWidth) + "px"
  div.style.width = unit.sizeX * grid.blockWidth + "px"
  div.style.height = unit.sizeY * grid.blockWidth + "px"
  div.style.backgroundColor = 'rgba('+unit.color+')'
  div.style.boxShadow = '0 0 0 '+
    unit.border+'px '+
    'rgba('+unit.borderColor+') inset'
  div.style.borderRadius = unit.borderRadius + "px"
  container.appendChild(div)
}

function evolve(){
  const totalUnits = Units.length
  generation++
  Units.map((x,i)=>Evolve_units.createDecendant(x))
  Units.splice(0, totalUnits )
  const container = buildGrid(grid)
  Units.map(x=>placeUnit(container, grid, x))
}

let animate
function pauseAnimate(){
  const status = pauseAnimateBtn.innerHTML
  if (status === "Animate") {
    animate = setInterval(function(){
      evolve()
    }, animationSpeed)
    pauseAnimateBtn.innerHTML = "Pause"
  } else {
    clearInterval(animate)
    pauseAnimateBtn.innerHTML = "Animate"
  }
}
