
// * * * * * 💫 BackgroundEffect 💫 * * * * * //

class BackgroundEffect {

  constructor(params) {
    Object.assign(this, params)
    this.oldSpeed = this.speed
    this.cx = window.innerWidth/2
    this.cy = window.innerHeight/2
    this.longer = this.cx > this.cy ? this.cx : this.cy
    this.shorter = this.cx > this.cy ? this.cy : this.cx
    this.lines = new Array(this.linesCnt).fill({})
    this.c = new Canvas
  }

  startBackground() {
    this.c.new('backgroundCanvas', window.innerWidth, window.innerHeight)
    this.lines = this.lines.map( l => this.newAll() )
    this.setSpeed(this.speed)
    if (this.setting === "night") this.changeDayNight(true)
    this.move() // setTimeout(()=>{ move() },1000)
  }

  move() {
    this.c.clear()
    this.c.resize(window.innerWidth, window.innerHeight)
    if (this.speed !== this.oldSpped) {
      this.lines.map(l=>{
        l.speed = _rand(3,10) * this.speed
      })
      this.oldSpped = this.speed
    }
    if (this.effect === "lightSpeed") this.moveLightSpeed()
    if (this.effect === "racers") this.moveRacers()
    if (!this.pause) window.requestAnimationFrame(()=>{
      this.move()
    })
  }

  moveRacers() {
    this.lines.forEach( (l,i) => {
      // 🗺 Check for new locaiton
      if (l.x > this.lineW+window.innerWidth || isNaN(l.x)) {
        this.lines[i] = l = this.newRacers()
      }
      l.x += l.speed
      let color = this.c.lGrad({
        gradient: [ l.x, 0, l.x + (this.lineW*this.speed), 0],
        colors: l.colors
      })
      this.c.line(l.x, l.y, l.x + (this.lineW*this.speed), l.y, color, l.lineS, "round")
    })
  }

  moveLightSpeed() {
    this.lines.forEach( (l, i) => {
      // 🗺 Check for new locaiton
      if (l.dist-this.lineW > this.longer/2) {
        this.lines[i] = l = this.newLightSpeed()
      }
      l.dist += l.speed
      l.x = (l.dist * Math.cos(l.angle)) + this.cx
      l.y = (l.dist * Math.sin(l.angle)) + this.cy
      const l2x = ((l.dist+(this.lineW*this.speed)) * Math.cos(l.angle)) + this.cx
      const l2y = ((l.dist+(this.lineW*this.speed)) * Math.sin(l.angle)) + this.cy
      let color = this.c.lGrad({
        gradient: [ l.x, l.y, l2x, l2y],
        colors: l.colors
      })
      this.c.line(l.x, l.y, l2x, l2y, color, l.lineS, "round")
    })
  }

  newRacers() {
    const { dist, degree, angle, lineS, colors } = this.angles()
    return { dist, degree, angle, lineS, colors,
      x: _rand(-1000, this.lineW*-1),
      y: (_rand(0,((window.innerHeight-5)/this.grid))*this.grid-16),
      speed: _rand(3,10) * this.speed,
    }
  }

  newLightSpeed() {
    const { dist, degree, angle, lineS, colors } = this.angles()
    return { dist, degree, angle, lineS, colors,
      speed: _rand(3,10) * this.speed,
      x: (dist * Math.cos(angle)) + this.cx,
      y: (dist * Math.sin(angle)) + this.cy,
    }
  }

  newAll(){
    const { dist, degree, angle, lineS, colors } = this.angles()
    return { dist, degree, angle, lineS, colors,
      speed: _rand(3,10) * this.speed,
      x: window.innerWidth*2,
      y: window.innerHeight*2
    }
  }

  angles() {
    const dist = (this.longer) * (_rand(0,20)/10)
    const degree = _rand(0, 359)
    const angle = (degree * Math.PI / 180)
    const lineS = _rand(1,6)
    let colors;
    if (this.setting === "night") {
      const [r,g,b] = [200+_rand(-20,20), 200+_rand(-20,20), 230+_rand(-20,20)]
      const o = _rand(2,10) / 10
      const col = "rgba("+r+","+g+","+b+","
      colors = [["0.1",col+"0.0)"],[ "1",col+o+")"]]
    } else {
      const [r,g,b] = [100+_rand(-30,30), 149+_rand(-30,30), 237+_rand(-20,20)]
      const o = _rand(2,10) / 10
      const col = "rgba("+r+","+g+","+b+","
      colors = [["0.1",col+"0.0)"],[ "1",col+o+")"]]
    }
    return { dist, degree, angle, lineS, colors }
  }

  speedUp(speed, max, ramp, down){
    window.requestAnimationFrame(()=>{
      if (!down && this.speed <= max) {
        this.setSpeed(this.speed*=ramp)
        this.speedUp(speed, max, ramp)
      } else if (down && this.speed >= max){
        this.setSpeed(this.speed*=ramp)
        this.speedUp(speed, max, ramp, down)
      } else {
        this.setSpeed(max)
      }
    })
  }

  setSpeed(speed){
    this.speed = speed
    slider.value = this.speed*1000
    sliderIcon.style.left = ((this.speed * 310) - 5)+"px"
  }

  changeEffect(effect) {
    this.effect = effect
  }

  changeDayNight(start) { //
    if (start) {
      this.setting = start === "day" ? "night" : "day"
    }
    const letters = document.querySelectorAll(".letters")
    if (this.setting === "day") {
      document.body.style.background = 'url("gfx/bg-d1.png")'
      document.body.style.color = 'rgba(100,149,237,0.75)'
      dashLine.style.backgroundColor = "rgba(120,139,227,0.75)"
      dayNight.style.backgroundColor = "rgba(120,139,227,0.25)"
      for (const l of letters) { l.style.color = "rgba(192,178,160,0.75)" }
      sun.style.left = '27px'
      this.setting = "night"
    } else {
      document.body.style.background = 'url("gfx/bg3.png")'
      document.body.style.color = 'rgba(0,0,0,0.75)'
      dashLine.style.backgroundColor = "rgba(0,0,0,0.5)"
      dayNight.style.backgroundColor = "rgba(0,0,0,0.2)"
      for (const l of letters) { l.style.color = "rgba(64,48,32,0.75)" }
      sun.style.left = '-8px'
      this.setting = "day"
    }
  }

}
