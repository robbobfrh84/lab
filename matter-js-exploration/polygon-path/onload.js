const control = { // 🚨 Move to window.onload in production
  gravity: { x: 0, y: 0, scale: 0.001 }, // Default { x: 0, y: 1, scale: 0.001 }
  speed: 1,
  maxMove: 10, // in pixels
  dKeyPressed: {
    ArrowUp: "up",
    ArrowDown: "up",
    ArrowLeft: "up",
    ArrowRight: "up"
  }
}

window.onload = ()=>{
  startMatterJS(control)
  buildStatic(control)
  buildPolygons(control)
  render(control)
  alert("USE arrowkeys to move and and < > to rotate")
}

function startMatterJS(control) {
  control.engine = Matter.Engine.create()
  control.engine.timing.timeScale = control.speed;
  control.engine.gravity = control.gravity
  control.render = Matter.Render.create({
      element: window.matterJsContainer,
      engine: control.engine,
      options: {
        width: 1000,
        height: 562,
        showAngleIndicator: true,
        // wireframes: false,
        // background: 'blue'// 'transparent'
      }
  })

}

function buildStatic({ engine, render, shapes }) {
  const ledge = Matter.Bodies.trapezoid(500,300,500,100,.9,{isStatic: true});
  Matter.Composite.add(engine.world, [
    ledge,
    // Walls 👇
    Matter.Bodies.rectangle( 500,0,1000,30,{isStatic:true}), // TOP
    Matter.Bodies.rectangle( 1000,281,30,562,{isStatic:true}), // Right
    Matter.Bodies.rectangle( 500,562,1000,30,{isStatic:true}), // Bottom
    Matter.Bodies.rectangle( 0,281,30,562,{isStatic:true}), // Left
  ])
}

function buildPolygons({ engine, shapes }) {
  polyA = Matter.Bodies.polygon(700,100,5,25)
  Matter.Composite.add( engine.world, polyA )
}


function render({ render, engine, shapes }) {
  Matter.Render.run(render);
  var runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);
}
