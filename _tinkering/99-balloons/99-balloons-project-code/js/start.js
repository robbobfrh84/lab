function start(){
  hide_start_screen()
  build_all_balloons()
  const song = document.getElementById("song")
  song.play()
}

function hide_start_screen() {
  const startButton = document.getElementById("start-screen")
  startButton.style.opacity = 0
  setTimeout(function(){
    startButton.style.display = "none"
  }, 500)
}

function build_all_balloons(){
  const speed_interval = Math.floor(release_speed / balloon_total)
  let prev_delay = intial_delay
  for (var i = 0; i < balloon_total; i++) {
    const balloon = create_new_balloon(balloon_color_wheel[0], (i+1))
    const delay = prev_delay
    set_release_time(balloon,i,delay)
    prev_delay = prev_delay + release_speed
    release_speed -= speed_interval
  }
}

function set_release_time(balloon, i, delay){
  setTimeout(()=>{
    balloon.style.bottom = window.innerHeight+"px"
    released.innerHTML = "/"+(i+1)
  }, delay)
}

function create_new_balloon(color, id) {
  const maxRight = (window.innerWidth - 80)
  const balloon = document.createElement("img")
  balloon.src = "./assets/"+color+"_balloon.svg"
  balloon.className = "balloon absolute"
  balloon.style.left = random(-10, maxRight)+"px"
  pop_event(balloon, id)
  goes_by_event(balloon, id)
  shift_colors()
  document.body.appendChild(balloon)
  return balloon
}

function pop_event(balloon, id){
  balloon.onclick = function(){
    const pop = document.getElementById("pop"+random(1,2))
    pop.play()
    this.style.opacity = 0
    balloons_popped.push(id)
    score.innerHTML = balloons_popped.length
    create_blast(event.x, event.y)
  }
}

function goes_by_event(balloon, id){
  balloon.addEventListener('transitionend', function(){
    if (!balloons_popped.includes(id)) {
      balloons_gone_by.push(id)
    }
    // create own function game_over()
    if ( (balloons_popped.length + balloons_gone_by.length) >= balloon_total) {
      const gameOver = document.getElementById("game-over-screen")
      gameOver.style.display = "block"
      gameOver.innerHTML = `
        💥WOW💥
        <br>
        you just popped
        <div class="popped_ballons">
          ${balloons_popped.length}
        </div>
        balloons!
      `
    }
  })
}

function create_blast(x,y) {
  const blast = document.createElement("div")
  blast.innerHTML = `💥`
  blast.className = "blast absolute"
  blast.style.top = (y-50)+"px"
  blast.style.left = (x-50)+"px"
  setTimeout(function(){
    blast.style.opacity = 0
  },200)
  document.body.appendChild(blast)
}

function shift_colors(wheel){
  const shift_color = balloon_color_wheel.shift()
  balloon_color_wheel.push(shift_color)
}
