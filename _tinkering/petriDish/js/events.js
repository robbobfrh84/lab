const navBar = document.getElementById("navBar")
const canvas = document.getElementById('mainCanvas')
const infoBar = document.getElementById('infoBar')

function _mouseEvents(dish, foodOpacity) {
  let status = 'initial'
  let focus = false
  let [ px, py ] = [ 0, 0 ]
  let infoView = false

  canvas.onmousemove = function(e){
    status = 'initial'
    if (e) [ px, py ] = [ e.clientX, e.clientY ]
    for (const o of dish.organisms) {
      if (Math.abs(o.x - px) < o.r && Math.abs(o.y - py) < o.r) {
        rightNavBar.innerHTML = "ORG#0"+o.id
        focus = o
        status = 'pointer'
      }
    }
    if (status === 'initial') {
      const food = dish.foods.filter(f=>f.state === "fresh")
      const poop = dish.foods.filter(f=>f.state === "poop")
      rightNavBar.innerHTML =
        "Pop: "+dish.organisms.length+
        ", Food: "+food.length+
        ", Poop: "+poop.length
      focus = false
    }
    canvas.style.cursor = status
  }

  canvas.onclick = function(e){
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
    } else {
      const radius = _random(5,30)/10
      const [ px, py ] = [ e.clientX, e.clientY ]
      dish.createFood({
        id: _getId(),
        state: "fresh",
        x: e.clientX - 3,
        y: e.clientY - 3,
        col: 'rgba('+_random(125,175)+', '+_random(50,100)+', '+_random(50,100),
        colOpacity: foodOpacity,
        r: radius,
      })
    }
  }

  pause.onclick = function(){
    dish.pause = !dish.pause
    dish.animate()
  }

  setInterval((function(info = document.getElementById('obj')){
    canvas.onmousemove()
    if (info && infoView) info.innerHTML = JSON.stringify(infoView, null, 2)
  }), 1000)

}
