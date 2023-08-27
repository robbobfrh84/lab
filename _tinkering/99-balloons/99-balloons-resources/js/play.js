function start(){

  hide_start_screen()

  const balloon_releaser = setInterval(function(){
    create_new_balloon(balloon_color_wheel[0])
    shift_colors()
    balloons_release()
    if (balloon_total <= balloon_count) {
      clearInterval(balloon_releaser)
    }
  }, delay)
}

function hide_start_screen() {
  const startButton = document.getElementById("start-screen")

  startButton.style.opacity = 0
  setTimeout(function(){
    startButton.style.display = "none"
  }, 500)
}

function create_new_balloon(color) {
  const maxRight = (window.innerWidth - 80)
  const balloon = document.createElement("div")
  balloon.id = "balloon" + balloon_count
  balloon.className = "balloon-container absolute"
  balloon.style.left = random(-10, maxRight)+"px"

  const image = "./assets/"+color+"_balloon.svg"
  balloon.innerHTML = `
    <img src=${image} class="balloon"/>
  `
  balloon.onclick = function(){
    console.log(this, this.innerHtml)
    this.innerHTML = `
      <div>💥</div>
    `
  }
  document.body.appendChild(balloon)
  balloon_count++
}

function balloons_release(){
  const balloons = document.querySelectorAll('.balloon-container')
  setTimeout(function(){
    balloons.forEach(balloon => {
      balloon.style.bottom = (window.innerHeight+100)+"px"
    })
  },500)
}

function shift_colors(wheel){
  const shift_color = balloon_color_wheel.shift()
  balloon_color_wheel.push(shift_color)
}
