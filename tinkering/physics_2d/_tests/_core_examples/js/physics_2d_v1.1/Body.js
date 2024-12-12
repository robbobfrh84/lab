let svgCounter = 0

class Body {

  constructor(params, scale) { 
    Object.assign(this, params) 
    // this.show_SVGs_matter_bg = true // * This is just for development. Like wireframe, but solid colors if you want?
    this.scale = scale
    if (!this.options) { this.options = {} }
    // if (scale) { this.scale_ratio(this) }
    this.scale_ratio(this)
    if (this.options.resize) { this.scale_ratio(this.options.resize) }
  }

  scale_ratio(obj) {
    obj.prescale = {...obj}
    ;['x','y','w','h','r'].forEach( name => {
      if (obj[name]) { obj[name] = obj[name] * this.scale }
    })
  }

  async build_sprite_image(hash, defaultImage) { /* 👀 ORDER SENTITIVE 👀 */
    if (this.image === "<<avatar>>") { this.image = hash }
    if (this.options.rounded) { 
      try { this.image = await toolkit_round_image(this.r*2, this.r*2, this.image)
      } catch(err) { this.image = defaultImage }
    } 
    if (this.options.opacity) { this.image = await toolkit_image_opacity(this.options.opacity, this.image)}
    const { w, h } = await toolkit_get_image_size(this.image) 
    if (!this.options.resize) { this.options.resize = { }}
    const rw = this.options.resize.w || (this.r ? this.r * 2 : this.w)
    const rh = this.options.resize.h || (this.r ? this.r * 2 : this.h)
    const scale = { x: (rw) / w, y: (rh) / h }
    return { 
      texture: this.image, 
      xScale: scale.x, 
      yScale: scale.y 
    }
  }

  build_matterObj(type) {
    const render = { // * strokeStyle: '#ffffff', lineWidth: 4, fillStyle: "red", (saving for reference)
      sprite: typeof this.options.sprite !== 'undefined' ? this.options.sprite : false,
      fillStyle: typeof this.options.fillStyle !== 'undefined' ? this.options.fillStyle : null, 
    }
    if (type == 'svg' && !this.show_SVGs_matter_bg) { render.fillStyle = "rgba(0,0,0,0)" }
    return {
      density: typeof this.options.density !== 'undefined' ? this.options.density : 0.0007, 
      friction: typeof this.options.friction !== 'undefined' ? this.options.friction : 0.01,
      frictionAir: typeof this.options.frictionAir !== 'undefined' ? this.options.frictionAir : 0.02,
      restitution: typeof this.options.restitution !== 'undefined' ? this.options.restitution : 0.3,
      isStatic: typeof this.options.isStatic !== 'undefined' ? this.options.isStatic : false,
      render: render
    }
  }

  async build_body(type, layerId, hash, defaultImage) {
    this.options.sprite = this.image ? await this.build_sprite_image(hash, defaultImage) : {}
    this.matterObj = this.build_matterObj(type)

// 🔥 MAKE THIS IT"S OWN METHOD!!!
    if (type == 'svg') { /* 👀 Yes need to sandwich both svg conditions around shapes! 👀 */
      svgCounter++
      if (this.svg.split('href="')[1]?.split('"')[0] == "<<avatar>>") {
        this.svg = this.svg.split('<<avatar>>').join(hash)
      }
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(this.svg, 'image/svg+xml')
      this.svg = svgDoc.documentElement
      this.svgId = layerId+"_"+svgCounter // * This is how the Matter Body object finds the svg. 
      this.svg.setAttribute('id', this.svgId)
    } 

    let matterBody;
    if (this.shape === "cir") { matterBody = this.build_circle(type) 
    } else if (this.shape === "rect") { matterBody = this.build_rectangle(type) 
    } else if (this.shape === "cir_image") { matterBody = this.build_circle_image(layerId) }

    if (type == "svg") { /* 👀 Yes need to sandwich both svg conditions around shapes! 👀 */
      window[layerId].innerHTML += new XMLSerializer().serializeToString(this.svg)
      this.svg = document.getElementById(this.svgId)
      matterBody.Body = this 
    }
    return matterBody
  }

  build_rectangle(type) {

    if (type == 'svg') {
      // this.svg.setAttribute('x', this.x - (this.w)) 
      // this.svg.setAttribute('y', this.y- (this.w)) 
      // this.svg.setAttribute('width', this.w * 2) 
      // this.svg.setAttribute('height', this.h * 2) 



      // THIS works, but we want to rather scale at root level
      // this.width = !this.svg.getAttribute('width') ? this.w : this.svg.getAttribute('width') * this.scale
      // this.height = !this.svg.getAttribute('height') ? this.h : this.svg.getAttribute('height') * this.scale
      // this.svg.setAttribute('x', this.x - this.width) 
      // this.svg.setAttribute('y', this.y - this.height) 
      // this.svg.setAttribute('width', this.width * 2)
      // this.svg.setAttribute('height', this.height * 2)


      this.svgPos = {}  // 🔥 This should probably be in a more global locatoin
      this.svgPos.x = !this.svg.getAttribute('x') ? this.prescale.x : this.svg.getAttribute('x')
      this.svgPos.y = !this.svg.getAttribute('y') ? this.prescale.y : this.svg.getAttribute('y')
      this.svgPos.w = !this.svg.getAttribute('width') ? this.prescale.w : this.svg.getAttribute('width')
      this.svgPos.h = !this.svg.getAttribute('height') ? this.prescale.h : this.svg.getAttribute('height')
      this.svgPos.oX = (this.svgPos.w/2) - (this.svgPos.x - this.prescale.x)
      this.svgPos.oY = (this.svgPos.h/2) - (this.svgPos.y - this.prescale.y)
      // 🔥 This should probably be in a more global locatoin

      this.svg.setAttribute('x', this.svgPos.x - (this.svgPos.w/2) ) 
      this.svg.setAttribute('y', this.svgPos.y - (this.svgPos.h/2) ) 
      this.svg.setAttribute('width', this.svgPos.w)
      this.svg.setAttribute('height',this.svgPos.h)


    }
    return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, this.matterObj)
  }

  build_circle(type) { 
    
    if (type == 'svg') {
      this.svgPos = {}  // 🔥 This should probably be in a more global locatoin
      this.svgPos.x = !this.svg.getAttribute('x') ? this.prescale.x : this.svg.getAttribute('x')
      this.svgPos.y = !this.svg.getAttribute('y') ? this.prescale.y : this.svg.getAttribute('y')
      this.svgPos.r = !this.svg.getAttribute('r') ? this.prescale.r : this.svg.getAttribute('r')
      this.svgPos.oX = (this.svgPos.x - this.prescale.x)
      this.svgPos.oY = (this.svgPos.y - this.prescale.y)
      // 🔥 This should probably be in a more global locatoin
      // console.log('this:',this)
      this.svg.setAttribute('cx', this.svgPos.x) 
      this.svg.setAttribute('cy', this.svgPos.y) 
      this.svg.setAttribute('r', this.svgPos.r) 


      // on if image though. but, i guess for setup i don't need it. 
      this.svg.setAttribute('x', this.svgPos.x - (this.svgPos.r) ) 
      this.svg.setAttribute('y', this.svgPos.y - (this.svgPos.r) ) 
      this.svg.setAttribute('width', this.svgPos.r * 2)
      this.svg.setAttribute('height', this.svgPos.r * 2)
    }
    return Matter.Bodies.circle(this.x, this.y, this.r, this.matterObj)
  }

  build_circle_image(layerId) {
    this.svgPos = {}  // 🔥 This should probably be in a more global locatoin
    this.svgPos.x = !this.svg.getAttribute('x') ? this.prescale.x : this.svg.getAttribute('x')
    this.svgPos.y = !this.svg.getAttribute('y') ? this.prescale.y : this.svg.getAttribute('y')
    this.svgPos.r = !this.svg.getAttribute('r') ? this.prescale.r : this.svg.getAttribute('r')
    this.svgPos.oX = (this.svgPos.x - this.prescale.x)
    this.svgPos.oY = (this.svgPos.y - this.prescale.y)
    // 🔥 This should probably be in a more global locatoin

    this.clipId = this.svgId+"_clip"
    window[layerId].children[0].innerHTML += /*html*/`
      <clipPath id=${this.clipId}>
        <circle cx="${this.svgPos.x}" cy="${this.svgPos.y}" r="${this.svgPos.r}" />
      </clipPath>
    `
    this.svg.setAttribute('clip-path', "url(#"+this.clipId+")")
    this.svg.setAttribute('x', this.svgPos.x - (this.svgPos.r) ) 
    this.svg.setAttribute('y', this.svgPos.y - (this.svgPos.r) ) 
    this.svg.setAttribute('width', this.svgPos.r * 2)
    this.svg.setAttribute('height', this.svgPos.r * 2)

    // this.svg.setAttribute('clip-path', "url(#"+this.clipId+")")
    // this.svg.setAttribute('x', this.x - (this.r)) 
    // this.svg.setAttribute('y', this.y - (this.r)) 
    // this.svg.setAttribute('width', this.r*2) 
    // this.svg.setAttribute('height', this.r*2) 
    return Matter.Bodies.circle(this.x, this.y, this.r, this.matterObj)
  }

  update_svg(b) { // 🔥 Should `build_circle` and `build_rectangle` be like this??? or should this funciton be seperated like them????
    
    const x = b.position.x / this.scale 
    const y = b.position.y / this.scale  

    if (this.shape == 'rect') {
      // this.svg.setAttribute('x', b.position.x - (this.width))
      // this.svg.setAttribute('y', b.position.y - (this.height))
      this.svg.setAttribute('x', x - this.svgPos.oX)
      this.svg.setAttribute('y', y - this.svgPos.oY)
    } else if (this.shape == 'cir') {
      this.svg.setAttribute('cx', x + this.svgPos.oX)
      this.svg.setAttribute('cy', y + this.svgPos.oY)
      this.svg.setAttribute('x', x - this.svgPos.oX - this.svgPos.r)
      this.svg.setAttribute('y', y - this.svgPos.oY - this.svgPos.r)
    } else if (this.shape == 'cir_image') {
      // this.svg.setAttribute('x', b.position.x - this.r)
      // this.svg.setAttribute('y', b.position.y - this.r)
      this.svg.setAttribute('x', x - this.svgPos.oX - this.svgPos.r)
      this.svg.setAttribute('y', y - this.svgPos.oY - this.svgPos.r)
      const c = document.getElementById(this.clipId).children[0]
      // c.setAttribute('cx', b.position.x )
      // c.setAttribute('cy', b.position.y )
      c.setAttribute('cx',  x + this.svgPos.oX )
      c.setAttribute('cy', y + this.svgPos.oY )
    }
    this.svg.setAttribute('transform', `rotate(${b.angle * (180 / Math.PI)}, ${x}, ${y})`)
  }

}