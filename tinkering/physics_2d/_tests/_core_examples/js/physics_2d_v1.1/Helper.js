class Helper {

  constructor(params) { 
    Object.assign(this, params) 
    this.widthScale = 100 // * 100 meaning x,y,w,h,r are a percent of the width. So changing it to 1 would 0-1 represents entire width scale.
    // * NOTE: you could switch this back to being direct pixels by setting the window[this.default_container_id].clientWidth to that fixed number.
  }

  async check_hash_image() {
    const hash = window.location.hash.split('#')[1]
    if (!hash) {    
      this.hashImage = this.default_user_image
    } else {
      this.hashImage = hash.split('http')[1] ? hash : "assets/"+hash
      const checkedImage = await toolkit_check_image(this.hashImage)
      if (checkedImage == "error") this.hashImage = this.default_user_image
    }
  }

  set_width_height() {
    const containerWidth = window[this.default_container_id].clientWidth
    this.w = containerWidth > this.maxWidth ? this.maxWidth : containerWidth
    this.h = this.w * (this.heightRatio)
    this.scale = this.w / this.widthScale
  }

  build_walls() {
    this.walls.thickness = this.set_body_ratio({ t: this.walls.thickness }).t
    const t = this.walls.thickness, w = this.w, h = this.h
    const show = this.walls.show, bodies = []
    const options = { isStatic: true }
    if (show[0]) bodies.push(this.build_rect({ x:w/2, y:t/2, w:w, h:t, options }))
    if (show[1]) bodies.push(this.build_rect({ x:w-t/2, y:h/2, w:t, h:h, options }))
    if (show[2]) bodies.push(this.build_rect({ x:w/2, y:h-t/2, w:w, h:t, options }))
    if (show[3]) bodies.push(this.build_rect({ x:t/2, y:h/2, w:t, h:h, options }))
    return bodies
  }

  build_layers() {
    this.layers.forEach(layer => {
      const elm = window[this.default_container_id]
      if (layer.type === "matter") {
        elm.innerHTML += /*html*/`
          <div id="${layer.id}"></div>
        `
      } else if (layer.type === "svg") {
        elm.innerHTML += /*html*/`
          <div class="svg-layer-container">
            <svg id="${layer.id}" width="${this.w}" height="${this.h}"></svg>
          </div>
        `
      } 
    })
  }

  async add_bodies() { 
    const bodies_array = []    
    for (const group of this.dynamic_bodies) {
      for (let b of group.bodies) {

        b = this.set_body_ratio(b)

        if (group.type === "svg") { 
          window[group.id].innerHTML += b.svg
        } 

        b.options = { 
          sprite: b.image ? await this.build_sprite_image(b) : {}
        }

        if (b.shape === "circle") {
          const circle = this.Bodies.circle(b.x, b.y, b.r, {
            density: 0.0007, // 🔥 This options arn't set yet. Are they default without? It seems to act the same when i not them out. 
            friction: 0.01,
            frictionAir: 0.02,
            restitution: 0.3,
            render: {
              // * strokeStyle: '#ffffff', lineWidth: 4, fillStyle: "red",
              sprite: b.options.sprite,
            }
          })
          bodies_array.push(circle)
        }
        else if (b.shape === "rect") {
          bodies_array.push(this.build_rect(b))
        }
      }
    }
    return bodies_array
  }

  build_rect(b) {
    const rect = this.Bodies.rectangle(b.x, b.y, b.w, b.h, {
      density: 0.0007, // * default: 0.0007 🔥 This options arn't set yet. Are they default without? It seems to act the same when i not them out. 
      friction: 0.01, // * default: 0.01
      frictionAir: 0.02, // * default: 0.02
      restitution: 0.3, // * default: 0.3
      isStatic: b.options?.isStatic || false,
      render: {
        sprite: b.options?.sprite || false
      }
    })
    return rect
  }

  set_body_ratio(b) {
    ;['x','y','w','h','r','t'].forEach(p => {
      if (b[p]) { b[p] = b[p] * this.scale }
    })
    return b
  }

  async build_sprite_image(b) {
    /* 👀 ORDER SENTITIVE 👀 */
    if (b.image === "avatar") { b.image = this.hashImage } 
    if (b.options?.rounded) { b.image = await toolkit_round_image(b.r*2, b.r*2, b.image)} 
    if (b.options?.opacity) { b.image = await toolkit_image_opacity(b.options.opacity, b.image)}
    const { w, h } = await toolkit_get_image_size(b.image) // * Needs to be "var" to hoist up. const isn't defined later on.
    if (b.options?.resize) {
      b.options.resize = this.set_body_ratio(b.options.resize)
    }
    const rw = b.options?.resize?.w || (b.r ? b.r : b.w)
    const rh = b.options?.resize?.h || (b.r ? b.r : b.h)
    const scale = { x: (rw * 2) / w, y: (rh * 2) / h }
    return { 
      texture: b.image, 
      xScale: scale.x, 
      yScale: scale.y 
    }
  }

  async build_matter() { // 🔥 Rough Copy/Paste from `drop_on_blocks`
    const Engine = Matter.Engine
    const Render = Matter.Render
    const Runner = Matter.Runner
    // * const Composites = Matter.Composites // * SAVE for later use
    // * const Common = Matter.Common // * SAVE for later use
    const MouseConstraint = Matter.MouseConstraint
    const Mouse = Matter.Mouse
    const Composite = Matter.Composite
    this.Bodies = Matter.Bodies
  
    const engine = Engine.create()
    engine.gravity.x = this.gravity.x
    engine.gravity.y = this.gravity.y

    const world = engine.world
  
    const render = Render.create({
      element: window[this.default_main_matter_id], 
      engine: engine,
      options: {
        width: this.w,
        height: this.h,
        showAngleIndicator: false,
        wireframes: this.wireframe
      }
    })
  
    Render.run(render)
    const runner = Runner.create()
    Runner.run(runner, engine)
    
    const walls = this.build_walls()
    const bodies = await this.add_bodies()
    Composite.add(world, walls)
    Composite.add(world, bodies)
  
    const mouse = Mouse.create(render.canvas) // add mouse control
    const mouseConstraint = MouseConstraint.create(engine, { 
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })

    Composite.add(world, mouseConstraint)
    render.mouse = mouse // keep the mouse in sync with rendering
    Render.lookAt(render, { // fit the render viewport to the scene
      min: { x: 0, y: 0 },
      max: { x: this.w, y: this.h }
    })
  }

}