class Body extends Helper {

  constructor(params) { 
    super()
    Object.assign(this, params) 
    this.scale = this.getHelperVar('scale')
    if (!this.options) { this.options = {} }
    this.scale_ratio(this)
    if (this.options.resize) { this.scale_ratio(this.options.resize) }
  }

  scale_ratio(obj) {
    obj.prescale = {...obj}
    ;['x','y','w','h','r'].forEach( name => {
      if (obj[name]) { obj[name] = obj[name] * this.scale }
    })
    if (obj.v) { obj.v.forEach( v => this.scale_ratio(v) ) }
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

  create_svg_elements(layerId, hash) {
    const svgCount = this.svg_counter()
    if (this.svg.split('href="')[1]?.split('"')[0] == "<<avatar>>") {
      this.svg = this.svg.split('<<avatar>>').join(hash)
    }
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(this.svg, 'image/svg+xml')
    this.svg = svgDoc.documentElement
    this.svgId = layerId+"_"+svgCount // * This is how the Matter Body object finds the svg. 
    this.svg.setAttribute('id', this.svgId)
  }

  async build_body(type, layerId, hash, defaultImage) {
    this.options.sprite = this.image ? await this.build_sprite_image(hash, defaultImage) : {}
    this.matterObj = this.build_matterObj(type)
    if (type == 'svg') { this.create_svg_elements(layerId, hash) } /* 👀 👇 Yes need to sandwich both svg conditions around shapes! 👀 */

    const matterBody = this.build_shape(this.shape, type, layerId)

    if (type == "svg") { /* 👀 👆 Yes need to sandwich both svg conditions around shapes! 👀 */
      window[layerId].innerHTML += new XMLSerializer().serializeToString(this.svg)
      this.svg = document.getElementById(this.svgId)
      matterBody.Body = this 
    }
    return matterBody
  }

  build_shape(shape, type, layerId) {
    if (type == 'svg') {
      this.getSVG()
      const offsetX = this.svgPos.x - this.prescale.x // 🔥 We need Y here?
      const offsetY = this.svgPos.y - this.prescale.y
      this.svgPos.oX = shape == 'rect' ? (this.svgPos.w/2) - offsetX : offsetX
      this.svgPos.oY = shape == 'rect' ? (this.svgPos.h/2) - offsetY : offsetY
      if (shape != 'cir_image') { 
        this.setSVG(shape, this.svgPos.r * 2)
      } else {
        this.clipId = this.svgId+"_clip"
        window[layerId].children[0].innerHTML += /*html*/`
          <clipPath id=${this.clipId}>
            <circle cx="${this.svgPos.x}" cy="${this.svgPos.y}" r="${this.svgPos.r}" />
          </clipPath>
        `
        this.svg.setAttribute('clip-path', "url(#"+this.clipId+")")
        this.setSVG(shape, this.svgPos.r * 2)
      }
    }
    if (shape == 'rect') {
      return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, this.matterObj)
    } 
    else if (shape == 'cir' || shape == 'cir_image') {
      return Matter.Bodies.circle(this.x, this.y, this.r, this.matterObj)
    }
    else if (shape == 'verts') {
      return Matter.Bodies.fromVertices(this.x, this.y, this.v, this.matterObj)
    }
  }

  getSVG() {
    this.svgPos = {
      x: parseInt(this.svg.getAttribute('x')) || this.prescale.x,
      y: parseInt(this.svg.getAttribute('y')) || this.prescale.y,
      r: parseInt(this.svg.getAttribute('r')) || this.prescale.r,
      soX: parseInt(this.svg.getAttribute('ox')) || 0,
      soY: parseInt(this.svg.getAttribute('oy')) || 0,
      w: parseInt(this.svg.getAttribute('width')) || (this.prescale.w || 0),
      h: parseInt(this.svg.getAttribute('height')) || (this.prescale.h || 0)
    } 
  }

  setSVG(shape, widthHeight) {
    const whrX = shape == 'rect' ? (this.svgPos.w/2 ) : this.svgPos.r
    const whrY = shape == 'rect' ? (this.svgPos.h/2 ) : this.svgPos.r
    this.svg.setAttribute('x', this.svgPos.x - whrX + this.svgPos.soX)  
    this.svg.setAttribute('y', this.svgPos.y - whrY + this.svgPos.soY) 
    this.svg.setAttribute('cx', this.svgPos.x + this.svgPos.soX ) 
    this.svg.setAttribute('cy', this.svgPos.y + this.svgPos.soY ) 
    this.svg.setAttribute('r', this.svgPos.r ) 
    this.svg.setAttribute('width', widthHeight || this.svgPos.w)
    this.svg.setAttribute('height', widthHeight || this.svgPos.h)
  }

  updateSVG(b) { 
    const shapeOffSetX = this.shape == 'rect' ? (this.svgPos.oX*-1) : (this.svgPos.oX - this.svgPos.r)
    const shapeOffSetY = this.shape == 'rect' ? (this.svgPos.oY*-1) : (this.svgPos.oY - this.svgPos.r)
    const x = b.position.x / this.scale 
    const y = b.position.y / this.scale 
    
    this.svg.setAttribute('x', x + shapeOffSetX + this.svgPos.soX)
    this.svg.setAttribute('y', y + shapeOffSetY + this.svgPos.soY)
   
    this.svg.setAttribute('cx', x + this.svgPos.oX + this.svgPos.soX)
    this.svg.setAttribute('cy', y + this.svgPos.oY + this.svgPos.soY)

    if (this.shape == 'cir_image') {
      const c = document.getElementById(this.clipId).children[0]
      c.setAttribute('cx', x + this.svgPos.oX )
      c.setAttribute('cy', y + this.svgPos.oY )
    }
    this.svg.setAttribute('transform', `rotate(${b.angle * (180 / Math.PI)}, ${x}, ${y})`)
  }

}