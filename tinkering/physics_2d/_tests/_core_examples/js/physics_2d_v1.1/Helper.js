class Helper {

  constructor(params) { 
    Object.assign(this, params) 
    this.track = []
    this.allMatterBodies = [] // * Collects all the bodies that are added to Matter. However, while this.track is being used, this isn't being used, and may need to be rethought. It was kind of a scope creep place holder i thought would be nice for testing.
    this.isPaused = false
    if (!this.static_bodies) { this.static_bodies = [] }
    if (!this.dynamic_body_groups) { this.dynamic_body_groups = [] }
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
    this.containerWidth = window[this.default_container_id].clientWidth
    this.w = this.containerWidth > this.maxWidth ? this.maxWidth : this.containerWidth
    this.h = this.w * (this.heightRatio)
    this.scale = this.w / this.widthScale
  }

  build_layers() {
    this.layers.forEach(layer => {
      const elm = window[this.default_container_id]
      if (layer.type === "matter") {
        elm.innerHTML += /*html*/`
          <div id="${layer.id}"></div>
        `
      } else if (layer.type === "svg") {
        
        // elm.innerHTML += /*html*/`
        //   <div class="svg-layer-container">
        //     <svg id="${layer.id}" width="${this.w}" height="${this.h}">
        //       <defs></defs>
        //     </svg>
        //   </div>
        // `


// 🔥HARDCODED DEMINTIONS 600, 100 etc...
        elm.innerHTML += /*html*/`
          <div class="svg-layer-container">
            <svg id="${layer.id}" width="600" height="600" viewBox="0,0,100,100">
              <defs></defs>
            </svg>
          </div>
        `
      } 
    })
  }

  build_walls() {
    const t = this.wall_bodies.thickness, w = this.widthScale, h =this.widthScale
    const show = this.wall_bodies.show, options = { isStatic: true }
    this.wall_bodies.bodies = []
    if (show[0]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w/2, y:t/2, w:w, h:t, shape:"rect", options }, this.scale)})}
    if (show[1]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w-t/2, y:h/2, w:t, h:h, shape:"rect", options }, this.scale)} ) }
    if (show[2]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w/2, y:h-t/2, w:w, h:t, shape:"rect", options }, this.scale)} ) }
    if (show[3]) { this.wall_bodies.bodies.push( { Body: new Body({ x:t/2, y:h/2, w:t, h:h, shape:"rect", options }, this.scale)} ) }
  }

  async build_bodies() {
    this.dynamic_body_groups.forEach(group => { group.bodies.forEach(b => {
      b.Body = new Body(b, this.scale)
    })})
    this.static_bodies.forEach(group => { group.bodies.forEach(b => {
      if (!b.options) { b.options = {} }
      b.options.isStatic = true
      b.Body = new Body(b, this.scale)
    })})
  }

  initiate_matter() { 
    this.Matter = {}
    this.Matter.engine = Matter.Engine.create()
    this.Matter.engine.gravity.x = this.gravity.x
    this.Matter.engine.gravity.y = this.gravity.y
  }

  async add_bodies() {

    const add_group_bodies = async (group) => {
      const bodies_array = []    
      for (let { Body } of group.bodies) {
        const b = await Body.build_body(group.type, group.layerId, this.hashImage, this.default_user_image)
        bodies_array.push(b)
      }
      return bodies_array
    }

    // Wall Bodies
    const wall_bodies = await add_group_bodies({ bodies: this.wall_bodies.bodies})
    this.allMatterBodies.push({ bodies: wall_bodies, name: 'wall_bodies', type: 'wall_bodies', layerId: this.default_main_matter_id })
    Matter.Composite.add(this.Matter.engine.world, wall_bodies)

    // Static Bodies
    for (const group of this.static_bodies) { // 🔥 static_bodies and Dynmic bodies is the same code. so make new method/function here. ALSO, pretty sure walls can use it too. 
      const bodies = await add_group_bodies(group)
      const obj = { bodies, name: group.name, type: group.type }
      if (group.type == "svg") {
        this.track.push(obj)
      }
      this.allMatterBodies.push(obj)
      Matter.Composite.add(this.Matter.engine.world, bodies)
    }

    // Dynamic Bodies
    for (const group of this.dynamic_body_groups) { // 🔥 static_bodies and Dynmic bodies is the same code. so make new method/function here. ALSO, pretty sure walls can use it too. 
      const bodies = await add_group_bodies(group)
      const obj = { bodies, name: group.name, type: group.type, group: group.layerId }
      if (group.type == "svg") {
        this.track.push(obj)
      }
      this.allMatterBodies.push(obj)
      Matter.Composite.add(this.Matter.engine.world, bodies)
    }

    this.track.forEach(g=>{
      g.bodies.forEach( ({ Body })=>{
        Body.svg = document.getElementById(Body.svgId)
      })
    })

  }

  set_matter() {
    const render = Matter.Render.create({
      element: window[this.default_main_matter_id], 
      engine: this.Matter.engine,
      options: {
        width: this.w,
        height: this.h,
        background:  this.background || "#2a2a2a", 
        showAngleIndicator: this.wireframe || false,
        wireframes: this.wireframe || false
      }
    })
    const mouse = Matter.Mouse.create(render.canvas) 
    const mouseConstraint = Matter.MouseConstraint.create(this.Matter.engine, { 
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })
    Matter.Composite.add(this.Matter.engine.world, mouseConstraint)
    render.mouse = mouse // * keep the mouse in sync with rendering
    Matter.Render.lookAt(render, { // * fit the render viewport to the scene
      min: { x: 0, y: 0 },
      max: { x: this.w, y: this.h }
    })
    Matter.Render.run(render)
    this.Matter.runner = Matter.Runner.create()
  }

  start_matter() {
    Matter.Runner.run(this.Matter.runner, this.Matter.engine)
  }

  pause_matter() {
    Matter.Runner.stop(this.Matter.runner)
  }

  matter_events(event) { // * 🤔 This could just be track_matter. was keeping it open for other options, but if i've gone another direction, let's make this simpler. 
    const track = this.track

    if (event == 'track') {
      Matter.Events.on(this.Matter.engine, 'afterUpdate', function() {
        // * Everything in the Matter object is directly available like this example: console.log('-',this.world.bodies[3].position)
        // * Using this.track makes it so we're only targeting what we chose to track. rather than looping through all the bodies. 
        track.forEach(g=>{ 
          g.bodies.forEach(b=>{ b.Body.update_svg(b) })
        })
      })
    }

  }

  /* 👇 Methods that are only internally called 👇 */
  // - ... 👀 I had some... but removed them. BUT, there could be some!

}