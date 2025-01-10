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
    obj.prescale = {}
    ;['x','y','w','h','r'].forEach( name => {
      if (obj[name]) { 
        obj.prescale[name] = obj[name]
        obj[name] = obj[name] * this.scale 
      }
    })
    if (obj.v) { 
      obj.prescale.v = [] 
      obj.v.forEach( v => { obj.prescale.v.push([v[0],v[1]])})
      obj.v = obj.v.map( v => { return { x: v[0] * this.scale, y: v[1] * this.scale } }) // * Formating as Objects for matter's fromVertices.
    }
  }

  async build_body(type, layerId, hash, defaultImage) {
    this.options.sprite = this.image ? await this.build_sprite_image(hash, defaultImage) : {}
    this.matterObj = this.build_matterObj(type)
    if (type == 'svg') { this.create_svg_elements(layerId, hash) } /* 👀 👇 Yes need to sandwich both svg conditions around shapes! 👀 */

    const matterBody = this.build_shape(this.shape, type, layerId) 
    matterBody.Body = this 
    this.matterBody = matterBody

    if (type == "svg") { /* 👀 👆 Yes need to sandwich both svg conditions around shapes! 👀 */
      window[layerId].innerHTML += new XMLSerializer().serializeToString(this.svg)
      this.svg = document.getElementById(this.svgId)
      this.AdjustSVG() // * 👀 Need be here because we need to set the svg first, so we can reference it.
    }

    if (this.rotate) {
      this.radianRotate = this.rotate * (Math.PI / 180)
      Matter.Body.rotate(this.matterBody, this.radianRotate)
    } else {
      this.radianRotate = 0
    }

    return this.matterBody
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

  build_shape(shape, type, layerId) {
    if (type == 'svg') {
      this.getSVG()
      this.setSVG(layerId) 
    }

    if (shape == 'rect') {
      return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, this.matterObj)
    } 
    else if (shape == 'cir' || shape == 'cir_image') {
      return Matter.Bodies.circle(this.x, this.y, this.r, this.matterObj)
    }
    else if (shape == 'verts') {
      return Matter.Bodies.fromVertices(this.x, this.y, this.v, this.matterObj, true)
    }
    //
    //
    else if (shape == 'poly') {
      return Matter.Bodies.polygon(this.x, this.y, this.sides, this.r, this.matterObj)
    }
    else if (shape == 'trap') {
      return Matter.Bodies.trapezoid(this.x, this.y, this.w, this.h, this.slope, this.matterObj)
    }
    //
    //
  }

  getSVG() {
    if (!this.w) { this.prescale.w = parseInt(this.svg.getAttribute('height')) || 0 }
    if (!this.h) { this.prescale.h = parseInt(this.svg.getAttribute('width')) || 0 }

    this.svgPos = {
      x: parseInt(this.svg.getAttribute('x')) || this.prescale.x,
      y: parseInt(this.svg.getAttribute('y')) || this.prescale.y,
      r: parseInt(this.svg.getAttribute('r')) || this.prescale.r || this.prescale.w/2 || 0,
      ox: parseInt(this.svg.getAttribute('ox')) || 0,
      oy: parseInt(this.svg.getAttribute('oy')) || 0,
      w: parseInt(this.svg.getAttribute('width')) || this.prescale.w || 0,
      h: parseInt(this.svg.getAttribute('height')) || this.prescale.h || 0,
      v: this.svg.getAttribute('points') || this.prescale.v || [],
    }

    if (this.svg.getAttribute('points')) { // 🔥Can this be moved to where offset is happening for vertices...? was in build_body when i made this note, but i also know I want to create a sperate func for this.
      this.svgPos.v = process_string_verticies(this.svgPos.v)
    }
  }

  setSVG(layerId) {
    if (this.shape == 'cir_image') { 
      this.clipId = this.svgId+"_clip"
      window[layerId].children[0].innerHTML += /*html*/`
        <clipPath id=${this.clipId}>
          <circle r="${this.svgPos.r}" >
        </clipPath>
      `
      this.svg.setAttribute('clip-path', "url(#"+this.clipId+")")
    }

    if (this.shape == 'rect') {
      this.svg.setAttribute('width', this.svgPos.w )
      this.svg.setAttribute('height', this.svgPos.h )
      this.svg.setAttribute('x', (this.svgPos.w/2)*-1 + this.svgPos.ox)  
      this.svg.setAttribute('y', (this.svgPos.h/2)*-1 + this.svgPos.oy) 
    } else {
      this.svg.setAttribute('r', this.svgPos.r)
      this.svg.setAttribute('width', this.svgPos.r * 2)
      this.svg.setAttribute('height', this.svgPos.r * 2)
      this.svg.setAttribute('x', this.svgPos.r * -1)  
      this.svg.setAttribute('y', this.svgPos.r * -1) 
      this.svg.setAttribute('cx', this.svgPos.ox)  
      this.svg.setAttribute('cy', this.svgPos.oy) 
      this.svg.setAttribute('points', this.svgPos.v)
    }

    const x = this.x / this.scale 
    const y = this.y / this.scale 

    // * 👀 This is what keeps the svg aligned. And, what's updated. That's it everything else preps for that!
    this.svg.setAttribute('transform', `translate(${x}, ${y})`)
  }

  AdjustSVG() {
    if (this.shape == "verts") {
      if (typeof this.svgPos.v === 'string') {
        this.svgPos.v = this.svgPos.v.split(' ').map(p => p.split(',').map(Number))
      }
      const bX = this.matterBody.bounds.min.x / this.scale // 🔥 Actually a shared value, can go above
      const bY = this.matterBody.bounds.min.y / this.scale // 🔥 Actually a shared value, can go above
      const mX = Math.min(...this.svgPos.v.map(point => point[0])) // 🔥 See notes, I'm pretty sure we're just gonna remove this.
      const mY = Math.min(...this.svgPos.v.map(point => point[1])) // 🔥 See notes, I'm pretty sure we're just gonna remove this.

      if (!this.overrideOffSet) { // 🔥 See notes, I'm pretty sure we're just gonna remove this.
        this.svgPos.v = this.svgPos.v.map( v => 
          [v[0]+bX-this.prescale.x-mX, v[1]+bY-this.prescale.y-mY]
        )
      }

      this.svg.setAttribute('points', this.svgPos.v)
    } 
    else if ( 
      (this.shape == "poly" || this.shape == "trap") 
      && this.svgPos.v.length < 1
    ) {
      const pX = this.matterBody.position.x / this.scale
      const pY = this.matterBody.position.y / this.scale
      this.svgPos.v = this.matterBody.vertices.map( v => 
        [ (v.x / this.scale)-pX, (v.y / this.scale)-pY ]
      )
      this.svg.setAttribute('points', this.svgPos.v)
    }
  }

  updateSVG(b) { 
    const x = b.position.x / this.scale 
    const y = b.position.y / this.scale 
    this.svg.setAttribute('transform', `
        rotate(${(b.angle-this.radianRotate) * (180 / Math.PI)}, ${x}, ${y})
        translate(${x},${y})
      `
    )
  }

}