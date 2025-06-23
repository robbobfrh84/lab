const Config = {
  isMobile: /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  colors: [ '#636', '#C25', '#E62', '#EA0', '#ED0' ] // * Original Colors Obj: const colors = { eggplant: '#636', garnet: '#C25', orange: '#E62', gold: '#EA0', yellow: '#ED0'}
}

const start = function() {
  events()
  placeMenuDice()
  placeHistory()
  const selectedDice = placeDice(rollCanvas, 25, "Icosahedron", true, true)
}

const newDiceRoll = function() {
  // Goint to need to set class instance to null, i.e.. `c = null` removes reference.
}

const placeMenuDice = function() {
  const m = Config.isMobile
  placeDice(selectCanvas0, (m ? 7 : 8), "Tetrahedron", false, true)
  placeDice(selectCanvas1, (m ? 7 : 8), "Cube", false, true)
  placeDice(selectCanvas2, (m ? 7 : 8), "Octahedron", false, true)
  // placeDice(selectCanvas3, (m ? 7 : 8), "Decahedron", false, true)
  placeDice(selectCanvas4, (m ? 7 : 8), "Dodecahedron", false, true)
  placeDice(selectCanvas5, (m ? 7 : 8), "Icosahedron", false, true)
}


const placeDice = function(elm, radius, shape, selected, rotate) {
  elm.width = elm.parentElement.clientWidth
  elm.height = elm.parentElement.clientHeight

  let illo = new Zdog.Illustration({
    element: "#"+elm.id,
  })

  const { colors } = Config
  let selectedDice
  switch(shape) {
    case "Tetrahedron": selectedDice = build_tetrahedron(illo, radius, colors); break;
    case "Cube": selectedDice = build_cube(illo, radius, colors); break;
    case "Octahedron": selectedDice = build_octahedron(illo, radius, colors); break;
    // case "Decahedron": selectedDice = build_decahedron(illo, radius, colors); break;
    case "Dodecahedron": selectedDice = build_dodecahedron(illo, radius, colors); break;
    case "Icosahedron": selectedDice = build_icosahedron(illo, radius, colors); break;
    default: break;
  }
  
  animate(illo, elm, selectedDice, elm.width, elm.height, selected, rotate)

  return selectedDice
  
}


