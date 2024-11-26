class Helper {

  constructor(params) { 
    Object.assign(this, params) 
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

  build_bodies() {
    this.dynamic_bodies.forEach(group => { group.bodies.forEach(b => {
      b.Body = new Body(b, this.scale)
    })})
  }

  // set_body_ratio(b) {
  //   const a = {}
  //   ;['x','y','w','h','r','t'].forEach(p => {
  //     if (b[p]) { a[p] = b[p] * this.scale }
  //   })
  //   return a
  //   // ;['x','y','w','h','r','t'].forEach(p => {
  //   //   if (b[p]) { b[p] = b[p] * this.scale }
  //   // })
  //   // return b
  // }

  build_walls() {
    this.wall_bodies.thickness = this.wall_bodies.thickness * this.scale
    const t = this.wall_bodies.thickness, w = this.w, h = this.h
    const show = this.wall_bodies.show, options = { isStatic: true }
    this.wall_bodies.bodies = []
    if (show[0]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w/2, y:t/2, w:w, h:t, shape:"rect", options },)})}
    if (show[1]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w-t/2, y:h/2, w:t, h:h, shape:"rect", options })} ) }
    if (show[2]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w/2, y:h-t/2, w:w, h:t, shape:"rect", options })} ) }
    if (show[3]) { this.wall_bodies.bodies.push( { Body: new Body({ x:t/2, y:h/2, w:t, h:h, shape:"rect", options })} ) }
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

  async add_bodies({bodies, type, layerId}) { 
    const bodies_array = []    
    // for (const group of bodies) {
      // for (let b of group.bodies) {
      for (let { Body } of bodies) {
        // const b = body.Body
        console.log('Body:',Body.svg)
        if (type == 'svg') { 
          window[layerId].innerHTML += Body.svg
        } 

        
        // b.options = { 
        //   sprite: b.image ? await this.build_sprite_image(b) : {}
        // }
        Body.options.sprite = Body.image ? await this.build_sprite_image(Body) : {}

        if (Body.shape === "cir") {
          const circle = this.Matter.Bodies.circle(Body.x, Body.y, Body.r, {
            density: 0.0007, // 🔥 This options arn't set yet. Are they default without? It seems to act the same when i not them out. 
            friction: 0.01,
            frictionAir: 0.02,
            restitution: 0.3,
            isStatic: Body.options?.isStatic || false,
            render: {
              // * strokeStyle: '#ffffff', lineWidth: 4, fillStyle: "red",
              sprite: Body.options.sprite || false,
            }
          })
          bodies_array.push(circle)
        }
        else if (Body.shape === "rect") {
          bodies_array.push(this.build_rect(Body))
        }
      }
    // }
    return bodies_array
  }

  build_rect(b) {
    const rect = this.Matter.Bodies.rectangle(b.x, b.y, b.w, b.h, {
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



  async build_sprite_image(b) {
    /* 👀 ORDER SENTITIVE 👀 */
    if (b.image === "avatar") { b.image = this.hashImage } 
    if (b.options?.rounded) { b.image = await toolkit_round_image(b.r*2, b.r*2, b.image)} 
    if (b.options?.opacity) { b.image = await toolkit_image_opacity(b.options.opacity, b.image)}
    const { w, h } = await toolkit_get_image_size(b.image) // * Needs to be "var" to hoist up. const isn't defined later on.
    const rw = b.options?.resize?.w || (b.r ? b.r : b.w)
    const rh = b.options?.resize?.h || (b.r ? b.r : b.h)
    const scale = { x: (rw * 2) / w, y: (rh * 2) / h }
    return { 
      texture: b.image, 
      xScale: scale.x, 
      yScale: scale.y 
    }
  }

  async initiate_matter() { 
    this.Matter = {} // 🔥 Should this be return and passed to start_matter?
    this.Matter.Bodies = Matter.Bodies // 🔥 should this just be passed here and not global?
    this.Matter.engine = Matter.Engine.create()
    this.Matter.engine.gravity.x = this.gravity.x
    this.Matter.engine.gravity.y = this.gravity.y

    // const Engine = Matter.Engine
    // const Render = Matter.Render
    // const MouseConstraint = Matter.MouseConstraint
    // const Mouse = Matter.Mouse
    // const Composite = Matter.Composite

    const world = this.Matter.engine.world
    
    // 🔥 ? Why is this in here ? I these shold be on app.js, to understand flow better.
    //
    const walls = await this.add_bodies({ bodies: this.wall_bodies.bodies})
    // Matter.Composite.add(world, walls)
    for (const group of this.dynamic_bodies) {
      const bodies = await this.add_bodies(group)
      Matter.Composite.add(world, bodies)
    }
    //
    //🔥  ? Why is this in here ?

    Matter.Composite.add(world, walls)
    // Matter.Composite.add(world, bodies)

    const render = Matter.Render.create({
      element: window[this.default_main_matter_id], 
      engine: this.Matter.engine,
      options: {
        width: this.w,
        height: this.h,
        showAngleIndicator: false,
        wireframes: this.wireframe
      }
    })
  
    const mouse = Matter.Mouse.create(render.canvas) // add mouse control
    const mouseConstraint = Matter.MouseConstraint.create(this.Matter.engine, { 
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })

    Matter.Composite.add(world, mouseConstraint)
    render.mouse = mouse // keep the mouse in sync with rendering
    Matter.Render.lookAt(render, { // fit the render viewport to the scene
      min: { x: 0, y: 0 },
      max: { x: this.w, y: this.h }
    })
    Matter.Render.run(render)
  }

  start_matter() {
    const runner = Matter.Runner.create()
    Matter.Runner.run(runner, this.Matter.engine)
  }

}