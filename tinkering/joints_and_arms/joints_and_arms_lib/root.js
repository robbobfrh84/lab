class Joints_And_Arms {

  constructor( script ) {
    Object.assign(this, script)
    this.defaults = {
      speed: 1,
      loops: "infinite",
      hingeBackgroundColor: "black"
    }
    this.keyFrameCounter = 0
    this.addCss('../joints_and_arms_lib/base.css')
  }

  action( modifiers ) {
    this.speed = modifiers.speed || this.default.speed
    this.loop = modifiers.loops || this.default.loops
    this.elm = document.getElementById(this.elementId)
    this.styleSheet = this.createStyleSheet()
    this.groups.forEach( hinge => this.addHinge(this.elm, hinge) )
    console.log("this :", this)
  }

  addHinge(parent, hinge) {
    const child = document.createElement("div")
    const animation = this.createAnimation(hinge)
    child.className += "hinge"
    child.style.width = hinge.s+"px"
    child.style.height = hinge.s+"px"
    child.style.top = hinge.l[0] ? hinge.l[0]+"px" : ""
    child.style.right = hinge.l[1] ? hinge.l[1]+"px" : ""
    child.style.bottom = hinge.l[2] ? hinge.l[2]+"px" : ""
    child.style.left = hinge.l[3] ? hinge.l[3]+"px" : ""
    child.style.backgroundColor = hinge.bc
    child.style.borderRadius = hinge.s/2+"px"
    child.style.animation = animation
    if (hinge.id) child.id = hinge.id
    if (hinge.arms) {
      hinge.arms.forEach( arm => this.addArm(child, hinge, arm) )
    }
    parent.appendChild(child)
  }

  addArm( parent, hinge, arm ) {
    const child = document.createElement("div")
    const deg = arm.d ? arm.d[0] + 180 : 180
    const center = arm.s[0]/2
    const adj = (hinge.s/2)-(arm.s[0]/2)
    child.className += "arm foo"
    child.style.width = arm.s[0]+"px"
    child.style.height = arm.s[1]+"px"
    child.style.borderRadius = (arm.s[0]/2)+"px"
    child.style.top = adj+"px"
    child.style.left = adj+"px"
    child.style.transformOrigin = center+"px "+center+"px";
    child.style.transform = "rotate("+deg+"deg)"
    child.style.backgroundColor = arm.bc
    parent.appendChild(child)
    if (arm.id) child.id = arm.id
    if (arm.hinges) {
      console.log(arm.hinges)
      arm.hinges.forEach( h => this.addHinge(child, h) )
    }
  }

  createAnimation(hinge) {
    const start = typeof hinge.d[0] === "number" ? hinge.d[0] : 0
    if (typeof hinge.d[0] === "number") hinge.d.shift()
    this.keyFrameCounter++
    let keyFrame = `
      @keyframes animation${this.keyFrameCounter} {
        0% {
          transform: rotateZ(${start}deg);
        }
    `
    hinge.d.forEach( p => {
      keyFrame += `
        ${p[1]*100}% {
          transform: rotateZ(${p[0]}deg);
        }`
    })
    keyFrame +=`}`
    this.styleSheet.sheet.insertRule(keyFrame,0)
    const className = `
      animation${this.keyFrameCounter} ${this.duration}s infinite linear
    `
    return className
  }

  createStyleSheet() {
    var style = document.createElement("style")
    style.appendChild(document.createTextNode(""))   // WebKit hack
    document.head.appendChild(style)
    return style
  }

  addCss(fileName) {
    const head = document.getElementsByTagName('HEAD')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = fileName;
    head.appendChild(link);
  }

}
