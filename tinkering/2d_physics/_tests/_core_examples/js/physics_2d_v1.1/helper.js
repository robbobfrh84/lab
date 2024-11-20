class Helper {

  constructor(params) { Object.assign(this, params) }

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

  build_walls(Composite, Bodies, world) {
    const offset = this.walls.w
    const options = { isStatic: true }
    const walls = []
    if (this.walls.show[0]) { walls.push(
      Bodies.rectangle(this.w/2, -offset, this.w+2.5 * offset, 50.5, options))}
    if (this.walls.show[1]) { walls.push(
      Bodies.rectangle(this.w + offset, this.h/2, 50.5, this.h+2.5 * offset, options))}
    if (this.walls.show[2]) { walls.push(
      Bodies.rectangle(this.w/2, this.h + offset, this.w+2.5 * offset, 50.5, options))}
    if (this.walls.show[3]) { walls.push(
      Bodies.rectangle(-offset, this.h/2, 50.5, this.h+2.5 * offset, options))}
    Composite.add(world, walls)
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

  async add_bodies(Bodies) { 
    const bodies_array = []    
    for (const group of this.live_bodies) {
      for (const b of group.bodies) {
        if (group.type === "svg") { 
          window[group.id].innerHTML += b.svg
        } 

        let sprite = b.image ? await this.build_sprite_image(b) : {}

        if (b.shape === "circle") {
          const circle = Bodies.circle(b.x, b.y, b.r, {
            density: 0.0007, // 🔥 This options arn't in square. Are they default there?
            frictionAir: 0.02,
            restitution: 0.3,
            friction: 0.01,
            render: {
              // * strokeStyle: '#ffffff', lineWidth: 4, fillStyle: "red",
              sprite: sprite,
            }
          })
          bodies_array.push(circle)
        }
        else if (b.shape === "rect") {
          const rect = Bodies.rectangle(b.x, b.y, b.w, b.h, {
            render: {
              sprite: sprite
            }
          })
          bodies_array.push(rect)
        }
      }
    }
    console.log('bodies_array:',bodies_array)
    return bodies_array
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

  async build_matter() { // 🔥 Rough Copy/Paste from `drop_on_blocks`
    const Engine = Matter.Engine
    const Render = Matter.Render
    const Runner = Matter.Runner
    // * const Composites = Matter.Composites // * SAVE for later use
    // * const Common = Matter.Common // * SAVE for later use
    const MouseConstraint = Matter.MouseConstraint
    const Mouse = Matter.Mouse
    const Composite = Matter.Composite
    const Bodies = Matter.Bodies
  
    const engine = Engine.create()
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
    
    this.build_walls(Composite, Bodies, world)
    const newBodies = await this.add_bodies(Bodies)
    Composite.add(world, newBodies)
  
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