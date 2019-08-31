const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const W = 600
const H = 420
const PERSPECTIVE =         W * 1// 0.8 // The field of view of our 3D scene
const PROJECTION_CENTER_X = W / 2
const PROJECTION_CENTER_Y = H / 2

window.onload = function(){
  canvas.width = W
  canvas.height = H
  // render(set1)
  // render(set2)
  window.requestAnimationFrame(render2);
}

function render(elements) {
  ctx.clearRect(0, 0, W, H)
  elements.forEach( elm => {
    const type = Object.keys(elm)
    elm[type].draw(1,-0.5)
  })
}

function render2(a) {
  ctx.clearRect(0, 0, W, H);
  rotation = a * 0.0002;
  const sineRotation = Math.sin(rotation); // Sine of the rotation
  const cosineRotation = Math.cos(rotation); // Cosine of the rotation

  set2.forEach( elm => {
    const type = Object.keys(elm)
    elm[type].draw(sineRotation, cosineRotation)
  })

  window.requestAnimationFrame(render2);
}
