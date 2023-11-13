class Matter_Helper {

  constructor(params) {
    Object.assign(this, params)
    this.build_matter()
  }

  get_hash_image() {
    const hash =  window.location.hash.split('#')[1]
    this.hashImage = hash ? "images/"+hash+".png" : this.C.default_user_image
  }

  build_walls(Composite, Bodies, world) {
    const offset = 10
    const options = { isStatic: true }
    Composite.add(world, [ 
      // Bodies.rectangle(config.w/2, -offset, config.w+2.5 * offset, 50.5, options),
      Bodies.rectangle(this.C.w/2, this.C.h + offset, this.C.w+2.5 * offset, 50.5, options),
      Bodies.rectangle(this.C.w + offset, this.C.h/2, 50.5, this.C.h+2.5 * offset, options),
      Bodies.rectangle(-offset, this.C.h/2, 50.5, this.C.h+2.5 * offset, options)
    ]);
  }

  add_bodies(Bodies) {
    const bodies_Array = []
  
    this.C.matter_static_bodies.forEach( b => {
      if (b.image === "avatar") b.image = this.C.default_user_image
      if (b.shape === "circle") {
        const circle = Bodies.circle(b.x, b.y, b.rSize, {
          density: 0.0007,
          frictionAir: 0.02,
          restitution: 0.3,
          friction: 0.01,
          render: {
            sprite: { 
              texture: b.image, 
              xScale: (b.rSize * 2) / b.imageSize.x,
              yScale: (b.rSize * 2) / b.imageSize.y,
            }
          }
        })
        bodies_Array.push(circle)
      }
      else if (b.shape === "rect") {
        const rect = Bodies.rectangle(b.x, b.y, b.w, b.h, {
          render: {
            strokeStyle: '#ffffff',
            sprite: {
              texture: b.image,
              xScale: (b.w) / b.imageSize.x,
              yScale: (b.h) / b.imageSize.y,
            }
          }
        })
        bodies_Array.push(rect)
      }
    })
  
    return bodies_Array
  }

  build_matter = function() {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      Common = Matter.Common,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies
  
    const engine = Engine.create(),
      world = engine.world
  
    const render = Render.create({
      element: document.body,
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
    const newBodies = this.add_bodies(Bodies)
    Composite.add(world, newBodies);
  
    const mouse = Mouse.create(render.canvas), // add mouse control
      mouseConstraint = MouseConstraint.create(engine, {
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

