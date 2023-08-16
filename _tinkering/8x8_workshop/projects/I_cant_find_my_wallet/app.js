window.onload = ()=>{
  // right
  buildFrame({elmId: "bob_right", frame: bob_right, pixWidth: 100, grid: {x:8,y:8}})
  buildFrame({elmId: "bob_right_walk1", frame: bob_right_walk1, pixWidth: 100, grid: {x:8,y:8}})
  buildFrame({elmId: "bob_right_walk2", frame: bob_right_walk2, pixWidth: 100, grid: {x:8,y:8}})
  buildFrame({elmId: "bob_right_blink", frame: bob_right_blink, pixWidth: 100, grid: {x:8,y:8}})
  // left
  buildFrame({elmId: "bob_left", frame: bob_left, pixWidth: 100, grid: {x:8,y:8}})
  buildFrame({elmId: "bob_left_walk1", frame: bob_left_walk1, pixWidth: 100, grid: {x:8,y:8}})
  buildFrame({elmId: "bob_left_walk2", frame: bob_left_walk2, pixWidth: 100, grid: {x:8,y:8}})
  buildFrame({elmId: "bob_left_blink", frame: bob_left_blink, pixWidth: 100, grid: {x:8,y:8}})
  buildFrame({elmId: "bob_left_angry", frame: bob_left_angry, pixWidth: 100, grid: {x:8,y:8}})

  animate()
}

function animate() {
  animateFrame("bobAnimate", 70, [
    { // run right
      move: ()=>{ bobAnimate.style.marginLeft = "300px" },
      frames: [ bob_right, bob_right_walk1, bob_right_walk2 ],
      delay: 100,
      limitFrames: 15,
    },
    { // stop blink , blink
      frames: [ bob_right_blink, bob_right, bob_right_blink, bob_right, bob_left ],
      delay: 150,
      limitFrames: 5,
    },
    { // turn left, blink
      frames: [ bob_left_blink, bob_left ],
      delay: 500,
      limitFrames: 2,
    },
    { // run left
      move: ()=>{ bobAnimate.style.marginLeft = "80px" },
      frames: [ bob_left_walk1, bob_left_walk2, bob_left ],
      delay: 100,
      limitFrames: 15
    },
    { // stop blink
      frames: [ bob_left, bob_left_blink, bob_left ],
      delay: 500,
      limitFrames: 3,
    },
    { // turn & blink, blink
      frames: [ bob_right, bob_right_blink, bob_right, bob_right_blink, bob_right ],
      delay: 100,
      limitFrames: 5,
    },
    { // run right
      move: ()=>{ bobAnimate.style.marginLeft = "200px" },
      frames: [ bob_right, bob_right_walk1, bob_right_walk2 ],
      delay: 100,
      limitFrames: 13,
    },
    { // turn, turn, turn
      frames: [ bob_left, bob_right, bob_left ],
      delay: 250,
      limitFrames: 3,
    },
    { // angry, angry
      frames: [ bob_left_angry, bob_left, bob_left_angry, bob_left ],
      delay: 150,
      limitFrames: 4,
    },
    { // run left
      move: ()=>{ bobAnimate.style.marginLeft = "0px" },
      frames: [ bob_left_walk1, bob_left_walk2, bob_left ],
      delay: 100,
      limitFrames: 15
    },
    { // turn slow, blnk slow
      frames: [ bob_right, bob_right_blink, bob_right ],
      delay: 1000,
      limitFrames: 3,
    },
    { // RESTART
      move: ()=>{ animate() }, frames: [], delay: 0, limitFrames: 0
    },
  ])
}

let testy = 0
function animateFrame(elmId, size, anime){

  const grid = {x:8, y:8}
  buildFrame({
    elmId: "bobAnimate", 
    frame: anime[0].frames[0], 
    pixWidth: size, 
    grid: grid
  })

  anime[0].frames.push(anime[0].frames[0])
  anime[0].frames.shift()
  const blockSize = size / (grid.x + 1)

  const g = document.getElementById("g-"+elmId)

  function animate(anime) {
    const int = setInterval(function(){
      if (anime[0].limitFrames === 0) {
        clearInterval(int)
        anime.shift()
        if (anime.length > 0) {
          if (anime[0].move) anime[0].move()
          animate(anime)
        }
      } else {
        setPixels({ elmId, frame: anime[0].frames[0], blockSize })
        anime[0].frames.push(anime[0].frames[0])
        anime[0].frames.shift()
        anime[0].limitFrames--
      }
    }, anime[0].delay)
  }

  if (anime[0].move) anime[0].move()
  animate(anime)

}
