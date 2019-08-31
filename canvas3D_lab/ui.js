function SET_UI({model, chunk}){

  function update() {
    model.viewX = model.phiDeg(model.phi)
    model.viewY = model.thetaDeg(model.theta)
    viewXVal.value = model.viewX
    viewYVal.value = model.viewY
    // zoomVal.value = parseFloat(model.zoom)
  }

  function chunkRotate(x,y,c,d){
    let viewX = model.phiDeg(model.phi)
    model.render3D(x,y)
    update()
  }

  goToLoc.onclick = ()=>{
    const viewX = document.getElementById("viewXVal").value
    const viewY = document.getElementById("viewYVal").value
    model.render3D(viewX,viewY,true)
  }

  rotateUp.onclick =    ()=>{ chunkRotate(chunk,0,"x","up") }
  rotateDown.onclick =  ()=>{ chunkRotate(-chunk,0,"x","down") }
  rotateRight.onclick = ()=>{ chunkRotate(0,chunk,"y", "right") }
  rotateLeft.onclick =  ()=>{ chunkRotate(0,-chunk,"y", "left") }

  update()

}
