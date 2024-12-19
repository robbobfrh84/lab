class Body extends Helper {

  constructor(params) { 
    super()
    Object.assign(this, params) 
    this.scale = this.getHelperVar('scale')
    this.pOffset = 2/this.scale
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
    // 🔥 || obj.d ?
    // Maybe this should be a seperate method? scale_verticies_ratio()?
    if (obj.v) { 
      obj.prescale.v = [] // * It uses matter's `v` array.
      obj.v.forEach( v => { 
        obj.prescale.v.push([v[0]-this.pOffset,v[1]-this.pOffset])
      })
      obj.v = obj.v.map( v => { // * Setting objs for matter's fromVertices.
        return { x: v[0] * this.scale, y: v[1] * this.scale } 
      })
    }
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
      // const offsetX = this.svgPos.x - this.prescale.x 
      // const offsetY = this.svgPos.y - this.prescale.y
      // this.svgPos.oX = shape == 'rect' ? (this.svgPos.w/2) - offsetX : offsetX
      // this.svgPos.oY = shape == 'rect' ? (this.svgPos.h/2) - offsetY : offsetY
      if (shape != 'cir_image') { 
        // this.setSVG(shape, this.svgPos.r * 2)
        this.TESTY_setSVG()
      } else {
        this.clipId = this.svgId+"_clip"
        // window[layerId].children[0].innerHTML += /*html*/`
        //   <clipPath id=${this.clipId}>
        //     <circle cx="${this.svgPos.x}" cy="${this.svgPos.y}" r="${this.svgPos.r}" />
        //   </clipPath>
        // `

        window[layerId].children[0].innerHTML += /*html*/`
          <clipPath id=${this.clipId}>
            <circle r="${this.svgPos.r}" >
          </clipPath>
        `
        this.svg.setAttribute('clip-path', "url(#"+this.clipId+")")
        // this.setSVG(shape, this.svgPos.r * 2)
        this.TESTY_setSVG()
        // this.TESTY_setSVG_Cir_Image()
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
    // 🔥Do we need this anymore?
    if (!this.w) { this.prescale.w = parseInt(this.svg.getAttribute('height')) }
    if (!this.h) { this.prescale.h = parseInt(this.svg.getAttribute('width')) }

    // 🔥 maybe do conditions here to make it clear what shape uses what? THey all use x, y so we could start with that. 
    this.svgPos = {
      x: parseInt(this.svg.getAttribute('x')) || this.prescale.x,
      y: parseInt(this.svg.getAttribute('y')) || this.prescale.y,
      // r: parseInt(this.svg.getAttribute('r')) || this.prescale.r || (this.shape == "verts" ? this.prescale.w/2 : 0),
      r: parseInt(this.svg.getAttribute('r')) || this.prescale.r || this.prescale.w/2 || 0,
      soX: parseInt(this.svg.getAttribute('ox')) || 0,
      soY: parseInt(this.svg.getAttribute('oy')) || 0,
      w: parseInt(this.svg.getAttribute('width')) || this.prescale.w || 0,
      h: parseInt(this.svg.getAttribute('height')) || this.prescale.h || 0,
      // v: this.svg.getAttribute('points') || this.prescale.v || [],
    } 
    // if (this.svg.getAttribute('points')) {
    //   // review code for better implimentation .. ?
    //   this.svgPos.v = this.svg.getAttribute('points').split(' ').map(point => {
    //     const [x, y] = point.split(',').map(Number)
    //     if (!isNaN(x) && !isNaN(y)) {
    //       return [x-this.pOffset, y-this.pOffset]
    //     }
    //   }).join(' ')
    // }
  }

  TESTY_setSVG() {
    // this.svg.setAttribute('x', this.svgPos.r * -1)  
    // this.svg.setAttribute('y', this.svgPos.r * -1) 


    if (this.shape == 'rect') {
      this.svg.setAttribute('width', this.svgPos.w )
      this.svg.setAttribute('height', this.svgPos.h )
      this.svg.setAttribute('x', (this.svgPos.w/2)*-1 + this.svgPos.soX)  
      this.svg.setAttribute('y', (this.svgPos.h/2)*-1 + this.svgPos.soY) 
    } else {
      this.svg.setAttribute('r', this.svgPos.r)
      this.svg.setAttribute('width', this.svgPos.r * 2)
      this.svg.setAttribute('height', this.svgPos.r * 2)
      // this.svg.setAttribute('width', this.svgPos.w)
      // this.svg.setAttribute('height', this.svgPos.h)
      this.svg.setAttribute('x', this.svgPos.r * -1)  
      this.svg.setAttribute('y', this.svgPos.r * -1) 
      this.svg.setAttribute('cx', this.svgPos.soX)  
      this.svg.setAttribute('cy', this.svgPos.soY) 
    }

    this.svg.setAttribute('points', this.prescale.v)

    // this.svg.setAttribute('cx', this.svgPos.soX)  
    // this.svg.setAttribute('cy', this.svgPos.soY) 

    const x = this.x / this.scale 
    const y = this.y / this.scale 

    this.svg.setAttribute('transform', `translate(${x}, ${y})`)
  }

  // TESTY_setSVG_Cir_Image() {
  //   console.log('🔥this:',this)
  //   // this.svg.setAttribute('x', this.svgPos.x - whrX + this.svgPos.soX)  
  //   // this.svg.setAttribute('y', this.svgPos.y - whrY + this.svgPos.soY) 
  //   this.svg.setAttribute('width', this.prescale.r * 2)
  //   this.svg.setAttribute('height', this.prescale.r * 2)

  //   const x = this.x / this.scale 
  //   const y = this.y / this.scale 
  //   this.svg.setAttribute('transform', `translate(${x}, ${y})`)
  // }

  // setSVG(shape, widthHeight) { // * 🔥 REPLACING WITH TESTY_setSVG
  //   const whrX = ['rect','verts'].includes(shape) ? (this.svgPos.w/2 ) : this.svgPos.r
  //   const whrY = ['rect','verts'].includes(shape) ? (this.svgPos.h/2 ) : this.svgPos.r
  //   this.svg.setAttribute('x', this.svgPos.x - whrX + this.svgPos.soX)  
  //   this.svg.setAttribute('y', this.svgPos.y - whrY + this.svgPos.soY) 
  //   this.svg.setAttribute('cx', this.svgPos.x + this.svgPos.soX ) 
  //   this.svg.setAttribute('cy', this.svgPos.y + this.svgPos.soY ) 
  //   this.svg.setAttribute('width', widthHeight || this.svgPos.w)
  //   this.svg.setAttribute('height', widthHeight || this.svgPos.h)

  //   // this.svg.setAttribute('points', this.svg.getAttribute('points') || this.prescale.sV || [])
  // }

  updateSVG(b) { 
    // const shapeOffSetX = this.shape == 'rect' ? (this.svgPos.oX*-1) : (this.svgPos.oX - this.svgPos.r)
    // const shapeOffSetY = this.shape == 'rect' ? (this.svgPos.oY*-1) : (this.svgPos.oY - this.svgPos.r)
    // const x = b.position.x / this.scale 
    // const y = b.position.y / this.scale 
    
    // this.svg.setAttribute('x', x + shapeOffSetX + this.svgPos.soX)
    // this.svg.setAttribute('y', y + shapeOffSetY + this.svgPos.soY)
   
    // this.svg.setAttribute('cx', x + this.svgPos.oX + this.svgPos.soX)
    // this.svg.setAttribute('cy', y + this.svgPos.oY + this.svgPos.soY)

    // if (this.shape == 'cir_image') {
    //   const c = document.getElementById(this.clipId).children[0]
    //   c.setAttribute('cx', x + this.svgPos.oX )
    //   c.setAttribute('cy', y + this.svgPos.oY )
    // }
    // this.svg.setAttribute('transform', `rotate(${b.angle * (180 / Math.PI)}, ${x}, ${y})`)





    const x = b.position.x / this.scale 
    const y = b.position.y / this.scale 

    let transform = ""
    transform = `translate(${x}, ${y})`
    // if (this.shape == 'verts') {
    //   transform = `translate(${x}, ${y})`
    // }

    this.svg.setAttribute('transform', 
      `rotate(${b.angle * (180 / Math.PI)}, ${x}, ${y})
      ${transform}
      `
    )


  }

}