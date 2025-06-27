const initial_selected_number = "14"
const stroke = 20
const relativeScale = 240

const start = function(selected_number) {
  window["canvas"+selected_number+"_40"].classList.add("selected");

  // * 0 - 9
  createZdog("#canvas0_40", "0")
  createZdog("#canvas1_40", "1")
  createZdog("#canvas2_40", "2")
  createZdog("#canvas3_40", "3")
  createZdog("#canvas4_40", "4")
  createZdog("#canvas5_40", "5")
  createZdog("#canvas6_40", "6")
  createZdog("#canvas7_40", "7")
  createZdog("#canvas8_40", "8")
  createZdog("#canvas9_40", "9")

  // * 10 - 20
  createZdog("#canvas10_40", "10")
  createZdog("#canvas11_40", "11")
  createZdog("#canvas12_40", "12")
  createZdog("#canvas13_40", "13")
  createZdog("#canvas14_40", "14")
  createZdog("#canvas15_40", "15")
  createZdog("#canvas16_40", "16")
  createZdog("#canvas17_40", "17")
  createZdog("#canvas18_40", "18")
  createZdog("#canvas19_40", "19")
  createZdog("#canvas20_40", "20")


  // * Selected Number
  createZdog("#canvas_240", selected_number)
  createZdog("#canvas_400", selected_number)
}

const select = function(selected_number) {
  document.querySelectorAll(".select-canvas").forEach( elm => {
    elm.classList.remove("selected")
  })
  window["canvas"+selected_number+"_40"].classList.add("selected")
  createZdog("#canvas_240", selected_number, true)
  createZdog("#canvas_400", selected_number, true)

}

const createZdog = function(elmSelector, number, isUpdate) {

  const showNumberBox = parseInt(number) < 10 && elmSelector === "#canvas_400"
  number_space_area.style.display = showNumberBox ? "block" : "none"

  const canvas = document.querySelector(elmSelector)
  canvas.width = isUpdate ? canvas.width / 2 : canvas.width
  canvas.height = isUpdate ? canvas.height / 2 : canvas.height
  const w = canvas.width

  const illo = new Zdog.Illustration({
    element: elmSelector,
    zoom: (1 / relativeScale) * w, // * Default=1, so do relative px w scale
    dragRotate: true,
  })

  new Zdog.Shape({
    addTo: illo,
    translate: { x: 0, y: 0 }, // * { x: 0, y: 0 } is the starting location, relative to parent.
    path: Number_paths[number],
    closed: false,
    stroke: stroke, // 20
    color: '#636'
  });

  function animate() {
    illo.updateRenderGraph()
    requestAnimationFrame( animate )
  }

  animate()
}

start(initial_selected_number)
