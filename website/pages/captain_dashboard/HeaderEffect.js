
// * * * * * 💂☝️ HeaderEffect 💂☝️ * * * * * //

class HeaderEffect {

  constructor(params) {
    Object.assign(this, params)
    this.lines = []
    this.c = new Canvas
  }

  startHeader() {
    const wW = window.innerWidth < this.maxW ? this.maxW :  window.innerWidth
    this.c.new('headerCanvas',wW)
    this.addLine({
      hor: true, speed: 2, maxSpeed: 30, ramp: 1.05,
      x1: 10, y1: 10, x2: 15, y2: 10, ex: -10, ey: 10
    })
    this.addLine({
      hor: true, speed: 1.5, maxSpeed: 25, ramp: 1.05,
      x1: 8, y1: this.sqW+10, x2: 10, y2: this.sqW+10, ex: -8, ey: this.sqW+10
    })
    for (var i = this.sqW; i <= wW-15; i+=this.sqW) {
      this.addLine({
        hor: false, speed: 0.5, maxSpeed: 1, ramp: 1,
        x1: i, y1: 3, x2: i, y2: 3, ex: i, ey: (this.sqW+20)+_rand(1,5)
      })
    }
    this.draw()
  }

  draw(stop = true) {
    const wW = window.innerWidth < this.maxW ? this.maxW :  window.innerWidth
    this.c.clear()
    this.c.resize(window.innerWidth, window.innerHeight)
    for (const i in this.lines) {
      const ln = this.lines[i]
      if (ln.hor) {
        ln.x2 += ln.speed
        if (ln.speed < ln.maxSpeed) ln.speed *= ln.ramp
        if (ln.x2 < wW + ln.ex) {
          this.line(ln.x1,ln.y1,ln.x2,ln.y2, this.lineColor, this.lineOpacity)
          stop = false
        } else {
          this.line(ln.x1,ln.y1,wW+ln.ex,ln.ey, this.lineColor, this.lineOpacity)
        }
      }
      else {
        ln.y2 += ln.speed
        if (ln.speed < ln.maxSpeed) ln.speed *= ln.ramp
        if (ln.y2 < ln.ey) {
          this.line(ln.x1,ln.y1,ln.x2,ln.y2, this.lineColor, this.lineOpacity)
          stop = false
        } else {
          this.line(ln.x1,ln.y1,ln.ex,ln.ey, this.lineColor, this.lineOpacity)
        }
      }

    }
    if (!stop) window.requestAnimationFrame(this.draw.bind(this));
  }

  line(sx,sy,ex,ey,sS,lW) {
    this.c.line(sx,sy,ex,ey,sS,lW, "round")
  }

  lettersAnnimation(name) {
    const title = document.getElementById('captainName')
    title.style.display = 'block'
    title.style.paddingLeft = (this.sqW-7)+'px'

    name = name.split(' ').join('•')
    name = "Captain•"+name
    for (var i = 0; i < name.length; i++) { //🔤 Add Letters to div.
      title.innerHTML += `<div class="letters">${name[i]}</div>`
    }

    const ltr = title.children
    for (const l of ltr) {
      l.style.fontSize = (this.sqW-5)+'px'
      l.style.width = (this.sqW)+'px'
      l.style.height = (this.sqW)+'px'
      l.style.lineHeight = (this.sqW)+'px'
      l.style.top = this.sqW > 25 ? '0px' : '1px'
      const delay = _rand(1500,3500)
      let r = _rand(0,200)
      let b = _rand(175,255)
      setTimeout(()=>{ l.style.color = this.textColor }, delay)
      setTimeout(()=>{ l.style.backgroundColor = 'rgba('+r+',170,237,0.2)' },delay+1000)
      setTimeout(()=>{ l.style.backgroundColor = 'rgba(0,0,0,0)' },delay+1500)
      r = _rand(0,200)
      b = _rand(175,255)
      setTimeout(()=>{ l.style.backgroundColor = 'rgba('+r+',170,237,0.1)' },delay+2500)
      setTimeout(()=>{ l.style.backgroundColor = 'rgba(0,0,0,0)' },delay+3500)
    }
  }

  addLine(line) {
    this.lines.push({ hor: line.hor,
      x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2, ex: line.ex, ey: line.ey,
      speed: line.speed, maxSpeed: line.maxSpeed, ramp: line.ramp
    })
  }

}
