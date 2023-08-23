window.onload = ()=>{
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
      move: ()=>{ bobAnimate.style.marginLeft = "5px" },
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

function buildFrame(elmId, frameWidth, frame) {
  const pW = frameWidth/8
  const elm = document.getElementById(elmId)
  elm.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="${frameWidth}px"
      height="${frameWidth}px"
      style="background-color: ${frame.bg};"
      viewBox="0 0 522 522">
      <defs>
        <filter id="f1" height="130%" width="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5"></feGaussianBlur>
          <feOffset dx="5" dy="5" result="offsetblur"></feOffset>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"></feFuncA>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#f1)" id="g-${elmId}"></g>
    </svg>
  `
  setPixels(elmId, frame)
}

function setPixels(elmId, frame) {
  const g = document.getElementById("g-"+elmId)
  g.innerHTML = ""
  frame.pixels.map( p => {
    const overlap = 2
    g.innerHTML += /*html*/`
      <path fill-rule="evenodd"
        fill="${p.color}"
        opacity="${p.opacity || 1}"
        d=" M${(p.x*64)} ${p.y*64}
            L${(p.x*64) + 64 + overlap} ${(p.y*64)}
            L${(p.x*64) + 64 + overlap} ${(p.y*64) + 64 + overlap}
            L${(p.x*64)} ${(p.y*64) + 64 + overlap} Z">
      </path>
    `
  })
}

function animateFrame(elmId, size, anime){

  buildFrame("bobAnimate", size, anime[0].frames[0])
  anime[0].frames.push(anime[0].frames[0])
  anime[0].frames.shift()

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
        setPixels(elmId, anime[0].frames[0])
        anime[0].frames.push(anime[0].frames[0])
        anime[0].frames.shift()
        anime[0].limitFrames--
      }
    }, anime[0].delay)

  }

  if (anime[0].move) anime[0].move()
  animate(anime)

}
