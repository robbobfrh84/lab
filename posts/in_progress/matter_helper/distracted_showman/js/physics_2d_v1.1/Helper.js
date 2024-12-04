class Helper {

  constructor(params) { 
    Object.assign(this, params) 
    this.track = []
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

  build_walls() {
    const t = this.wall_bodies.thickness * this.scale, w = this.w, h = this.h
    const show = this.wall_bodies.show, options = { isStatic: true }
    this.wall_bodies.bodies = []
    if (show[0]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w/2, y:t/2, w:w, h:t, shape:"rect", options },)})}
    if (show[1]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w-t/2, y:h/2, w:t, h:h, shape:"rect", options })} ) }
    if (show[2]) { this.wall_bodies.bodies.push( { Body: new Body({ x:w/2, y:h-t/2, w:w, h:t, shape:"rect", options })} ) }
    if (show[3]) { this.wall_bodies.bodies.push( { Body: new Body({ x:t/2, y:h/2, w:t, h:h, shape:"rect", options })} ) }
  }

  async build_bodies() {
    this.dynamic_bodies.forEach(group => { group.bodies.forEach(b => {
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
    const walls = await this.add_group_bodies({ bodies: this.wall_bodies.bodies})
    for (const group of this.dynamic_bodies) {
      const bodies = await this.add_group_bodies(group)
      if (group.type == "svg") {
        // this.track[group.layerId] = bodies // 🔥 should be handled individually
        // BUTTT, just test like this first...
        this.track.push(bodies)
      }
      Matter.Composite.add(this.Matter.engine.world, bodies)
    }
    Matter.Composite.add(this.Matter.engine.world, walls)
  }

  set_matter() {
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
    Matter.Composite.add(this.Matter.engine.world, mouseConstraint)
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
    const track = this.track
    Matter.Events.on(this.Matter.engine, 'afterUpdate', function() {
      // console.log('-',this.world.bodies[3].position)
      track.forEach(g=>{
        g.forEach(b=>{
          const svg = document.getElementById(b.svg.svg.id)
          svg.setAttribute('cx', b.position.x)
          svg.setAttribute('cy', b.position.y)
        })
      })
    });
  }

  /* Methods that are only internally called */

  async add_group_bodies({bodies, type, layerId}) {
    const bodies_array = []    
    for (let { Body } of bodies) {
      const b = await Body.build_body(type, layerId, this.hashImage)
      bodies_array.push(b)
    }
    return bodies_array
  }

}