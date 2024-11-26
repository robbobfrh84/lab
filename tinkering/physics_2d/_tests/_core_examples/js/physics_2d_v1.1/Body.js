class Body {

  constructor(params, scale) { 
    Object.assign(this, params) 
    if (!this.options) { this.options = {} }
    if (scale) { this.scale_ratio(scale, this) }
    if (this.options.resize) {
      this.scale_ratio(scale, this.options.resize)
    }
  }

  scale_ratio(scale, obj) {
    ;['x','y','w','h','r','t'].forEach(name => {
      if (obj[name]) { obj[name] = obj[name] * scale }
    })
  }

}