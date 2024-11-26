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

  async build_sprite_image(hash) { /* 👀 ORDER SENTITIVE 👀 */
    if (this.image === "avatar") { this.image = hash } 
    if (this.options.rounded) { this.image = await toolkit_round_image(this.r*2, this.r*2, this.image)} 
    if (this.options.opacity) { this.image = await toolkit_image_opacity(this.options.opacity, this.image)}
    const { w, h } = await toolkit_get_image_size(this.image) // * Needs to be "var" to hoist up. const isn't defined later on.
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

  build_matterObj() {
    return {
      density: typeof this.options.density !== 'undefined' ? this.options.density : 0.0007, 
      friction: typeof this.options.friction !== 'undefined' ? this.options.friction : 0.01,
      frictionAir: typeof this.options.frictionAir !== 'undefined' ? this.options.frictionAir : 0.02,
      restitution: typeof this.options.restitution !== 'undefined' ? this.options.restitution : 0.3,
      isStatic: typeof this.options.isStatic !== 'undefined' ? this.options.isStatic : false,
      render: {
        // * strokeStyle: '#ffffff', lineWidth: 4, fillStyle: "red",
        sprite: typeof this.options.sprite !== 'undefined' ? this.options.sprite : false,
      }
    }
  }

  async build_body(type, layerId, hash) {
    this.options.sprite = this.image ? await this.build_sprite_image(hash) : {}
    this.matterObj = this.build_matterObj()
    if (type == 'svg') { 
      window[layerId].innerHTML += this.svg
    } 
    if (this.shape === "cir") {
      return this.build_circle() 
    }
    else if (this.shape === "rect") {
      return this.build_rectangle() 
    }
  }

  build_circle() {
    return Matter.Bodies.circle(this.x, this.y, this.r, this.matterObj)
  }

  build_rectangle() {
    return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, this.matterObj)
  }

}