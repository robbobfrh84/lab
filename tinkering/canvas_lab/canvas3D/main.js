window.onload = function(){

  const model1 = new Canvas3D({
    width: 640,
    height: 350,
    id: "model1",
    zoom: 1,
    viewX: 20, // between 90 & -90
    viewY: 0 // between 0 & 360
  })

  const group = document.location.hash.split("#")[1] || "depthMarks"

  model1.group({ group: window[group] })
  model1.render()

  SET_UI({ model: model1, chunk: 15 })

}

window.onhashchange = ()=>{ location.reload() }
