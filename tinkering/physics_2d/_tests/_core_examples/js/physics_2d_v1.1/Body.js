let svgCounter = 0

class Body {

  constructor(params, scale) { 
    Object.assign(this, params) 
    if (!this.options) { this.options = {} }
    if (scale) { this.scale_ratio(scale, this) }
    if (this.options.resize) { this.scale_ratio(scale, this.options.resize) }
  }

  scale_ratio(scale, obj) {
    ;['x','y','w','h','r'].forEach(name => {
      if (obj[name]) { obj[name] = obj[name] * scale }
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
    const rw = this.options.resize.w || (this.r ? this.r : this.w)
    const rh = this.options.resize.h || (this.r ? this.r : this.h)
    const scale = { x: (rw * 2) / w, y: (rh * 2) / h }
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
    if (type == 'svg') { render.fillStyle = "rgba(0,0,0,0)" }
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

  build_circle(type) { 
    if (type == 'svg') {
      this.svg.setAttribute('cx', this.x) 
      this.svg.setAttribute('cy', this.y) 
      this.svg.setAttribute('r', this.r) 
    }
    return Matter.Bodies.circle(this.x, this.y, this.r, this.matterObj)
  }

  build_rectangle(type) {
    if (type == 'svg') {
      this.svg.setAttribute('x', this.x - (this.w/2)) 
      this.svg.setAttribute('y', this.y- (this.w/2)) 
      this.svg.setAttribute('width', this.w) 
      this.svg.setAttribute('height', this.h) 
    }
    return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, this.matterObj)
  }

  build_circle_image(layerId) {
    this.clipId = this.svgId+"_clip"
    window[layerId].children[0].innerHTML += /*html*/`
      <clipPath id=${this.clipId}>
        <circle cx="${this.x}" cy="${this.y}" r="${this.r}" />
      </clipPath>
    `
    this.svg.setAttribute('clip-path', "url(#"+this.clipId+")")
    this.svg.setAttribute('x', this.x - (this.r)) 
    this.svg.setAttribute('y', this.y - (this.r)) 
    this.svg.setAttribute('width', this.r*2) 
    this.svg.setAttribute('height', this.r*2) 
    return Matter.Bodies.circle(this.x, this.y, this.r, this.matterObj)
  }

  update_svg(b) { // 🔥 Should `build_circle` and `build_rectangle` be like this??? or should this funciton be seperated like them????
    if (this.shape == 'cir') {
      this.svg.setAttribute('cx', b.position.x)
      this.svg.setAttribute('cy', b.position.y)
    } else if (this.shape == 'rect') {
      this.svg.setAttribute('x', b.position.x - (this.w/2))
      this.svg.setAttribute('y', b.position.y - (this.h/2))
    } else if (this.shape == 'cir_image') {
      this.svg.setAttribute('x', b.position.x - this.r)
      this.svg.setAttribute('y', b.position.y - this.r)
      const c = document.getElementById(this.clipId).children[0]
      c.setAttribute('cx', b.position.x )
      c.setAttribute('cy', b.position.y )
    }
    this.svg.setAttribute('transform', `rotate(${b.angle * (180 / Math.PI)}, ${b.position.x}, ${b.position.y})`)
  }

}