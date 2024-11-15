class Matter_Helper {

  constructor(params) { Object.assign(this, params) }

  async check_hash_image() {
    const hash = window.location.hash.split('#')[1]
    if (!hash) {    
      this.hashImage = this.C.default_user_image
    } else {
      this.hashImage = hash.split('http')[1] ? hash : "assets/"+hash
      const checkedImage = await toolkit_check_image(this.hashImage)
      if (checkedImage == "error") this.hashImage = this.C.default_user_image
    }
  }

  build_walls(Composite, Bodies, world) {
    const offset = C.matter_walls.w
    const options = { isStatic: true }
    const walls = []
    if (C.matter_walls.show[0]) { walls.push(
      Bodies.rectangle(this.C.w/2, -offset, this.C.w+2.5 * offset, 50.5, options))}
    if (C.matter_walls.show[1]) { walls.push(
      Bodies.rectangle(this.C.w + offset, this.C.h/2, 50.5, this.C.h+2.5 * offset, options))}
    if (C.matter_walls.show[2]) { walls.push(
      Bodies.rectangle(this.C.w/2, this.C.h + offset, this.C.w+2.5 * offset, 50.5, options))}
    if (C.matter_walls.show[3]) { walls.push(
      Bodies.rectangle(-offset, this.C.h/2, 50.5, this.C.h+2.5 * offset, options))}
    Composite.add(world, walls)
  }

  async add_bodies(Bodies) { // 🔥 Rough Copy/Paste from `drop_on_blocks`
    const bodies_Array = []
    for (const b of this.C.matter_live_bodies) {     
      /* 👀 ORDER SENTITIVE 👀*/
      if (b.image === "avatar") { b.image = this.hashImage } 
      if (b.options?.rounded) { b.image = await toolkit_round_image(b.r*2, b.r*2, b.image)} 
      if (b.options?.opacity) { b.image = await toolkit_image_opacity(b.options.opacity, b.image)}
      const { w, h } = await toolkit_get_image_size(b.image) 

      if (b.shape === "circle") {
        const rw = b.options?.resize?.w || b.r
        const rh = b.options?.resize?.h || b.r
        const scale = { x: (rw * 2) / w, y: (rh * 2) / h }

        const circle = Bodies.circle(b.x, b.y, b.r, {
          density: 0.0007,
          frictionAir: 0.02,
          restitution: 0.3,
          friction: 0.01,
          render: {
            sprite: { 
              texture: b.image, 
              xScale: scale.x, 
              yScale: scale.y,
            }
          }
        })
        bodies_Array.push(circle)
      }
      else if (b.shape === "rect") {
        const rw = b.options?.resize?.w || b.w
        const rh = b.options?.resize?.h || b.h
        const scale = { x: (rw*2) / w, y: (rh*2) / h }

        const rect = Bodies.rectangle(b.x, b.y, b.w, b.h, {
          render: {
            strokeStyle: '#ffffff',
            sprite: {
              texture: b.image,
              xScale: scale.x, 
              yScale: scale.y,
            }
          }
        })
        bodies_Array.push(rect)
      }
    }
  
    return bodies_Array
  }

  async build_matter() { // 🔥 Rough Copy/Paste from `drop_on_blocks`
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      // * Composites = Matter.Composites, // * SAVE for later use
      // * Common = Matter.Common, // * SAVE for later use
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies
  
    const engine = Engine.create(),
      world = engine.world
  
    const render = Render.create({
      element: window[this.C.default_container_id], // document.body,
      engine: engine,
      options: {
        width: this.C.w,
        height: this.C.h,
        showAngleIndicator: false,
        wireframes: false
      }
    })
  
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
  
    world.bodies = []
  
    this.build_walls(Composite, Bodies, world)
    const newBodies = await this.add_bodies(Bodies)
    Composite.add(world, newBodies);
  
    const mouse = Mouse.create(render.canvas) // add mouse control
    const mouseConstraint = MouseConstraint.create(engine, { 
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });
  
    Composite.add(world, mouseConstraint);
  
    render.mouse = mouse // keep the mouse in sync with rendering
  
    Render.lookAt(render, { // fit the render viewport to the scene
      min: { x: 0, y: 0 },
      max: { x: this.C.w, y: this.C.h }
    })
  }

}