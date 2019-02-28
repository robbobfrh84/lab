const navBar = document.getElementById("navBar")
const canvas = document.getElementById('mainCanvas')
const infoBar = document.getElementById('infoBar')

function _mouseEvents(dish) {
  let status = 'initial'
  let focus = false
  let [ px, py ] = [ 0, 0 ]
  let infoView = false

  canvas.onmousemove = function(e){
    status = 'initial'
    if (e) [ px, py ] = [ e.clientX, e.clientY-navBar.clientHeight ]
    for (const o of dish.organisms) {
      if (Math.abs(o.x - px) < o.r && Math.abs(o.y - py) < o.r) {
        rightNavBar.innerHTML = "ORG#0"+o.id
        focus = o
        status = 'pointer'
      }
    }
    if (status === 'initial') {
      rightNavBar.innerHTML = ""
      focus = false
    }
    canvas.style.cursor = status
  }

  canvas.onclick = function(){
    if (focus) {
      infoView = focus
      infoBar.innerHTML = `
        <button id="offbtn">x</button>
        <pre id='obj'>${JSON.stringify(focus, null, 2)}</pre>
      `
      document.getElementById('offbtn').onclick = function(){
        infoBar.innerHTML = null
        infoView = false
      }
    }
  }

  setInterval((function(info = document.getElementById('obj')){
    canvas.onmousemove()
    if (info && infoView) info.innerHTML = JSON.stringify(infoView, null, 2)
  }), 1000)

}
