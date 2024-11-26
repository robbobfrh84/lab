class Body {

  constructor(params, scale, hash) { 
    Object.assign(this, params) 
    if (!this.options) { this.options = {} }
    if (scale) { this.scale_ratio(scale, this) }
    if (this.options.resize) {
      this.scale_ratio(scale, this.options.resize)
    }
  }

  scale_ratio(scale, obj) {
    ;['x','y','w','h','r'].forEach(name => {
      if (obj[name]) { obj[name] = obj[name] * scale }
    })
  }

  async build_sprite_image(hash) { /* 👀 ORDER SENTITIVE 👀 */
    if (this.image === "avatar") { this.image = hash } 
    if (this.options?.rounded) { this.image = await toolkit_round_image(this.r*2, this.r*2, this.image)} 
    if (this.options?.opacity) { this.image = await toolkit_image_opacity(this.options.opacity, this.image)}
    const { w, h } = await toolkit_get_image_size(this.image) // * Needs to be "var" to hoist up. const isn't defined later on.
    const rw = this.options?.resize?.w || (this.r ? this.r : this.w)
    const rh = this.options?.resize?.h || (this.r ? this.r : this.h)
    const scale = { x: (rw * 2) / w, y: (rh * 2) / h }
    return { 
      texture: this.image, 
      xScale: scale.x, 
      yScale: scale.y 
    }
  }

  async build_body(type, layerId, hash) {
    this.options.sprite = this.image ? await this.build_sprite_image(hash) : {}
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
    
    const circle = Matter.Bodies.circle(this.x, this.y, this.r, {
      density: 0.0007, // 🔥 This options arn't set yet. Are they default without? It seems to act the same when i not them out. 
      friction: 0.01,
      frictionAir: 0.02,
      restitution: 0.3,
      isStatic: this.options?.isStatic || false,
      render: {
        // * strokeStyle: '#ffffff', lineWidth: 4, fillStyle: "red",
        sprite: this.options.sprite || false,
      }
    })
    return circle
  }

  build_rectangle() {
    const rect = Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, {
      density: 0.0007, // * default: 0.0007 🔥 This options arn't set yet. Are they default without? It seems to act the same when i not them out. 
      friction: 0.01, // * default: 0.01
      frictionAir: 0.02, // * default: 0.02
      restitution: 0.3, // * default: 0.3
      isStatic: this.options?.isStatic || false,
      render: {
        sprite: this.options?.sprite || false
      }
    })
    return rect
  }


}