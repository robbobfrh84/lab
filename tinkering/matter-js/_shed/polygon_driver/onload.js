const _config = { // 🚨 Move to window.onload in production to protect global vars
  w: window.innerWidth * 0.9, // * 512, 768 * No height needed, because this has to be a square.
  rotateDegs: 5, 
  gravity: { x: 0, y: 0, scale: 0.001 }, // Default { x: 0, y: 1, scale: 0.001 }
  speed: 1,
  maxMove: 10, // in pixels
  dKeyPressed: {
    ArrowUp: "up",
    ArrowDown: "up",
    ArrowLeft: "up",
    ArrowRight: "up"
  },
  polyA: null
}


window.onload = ()=>{
  startMatterJS(_config)
  buildStatic(_config)
  buildPolygons(_config)
  render(_config)
}

function startMatterJS() {
  _config.engine = Matter.Engine.create()
  _config.engine.timing.timeScale = _config.speed;
  _config.engine.gravity = _config.gravity
  _config.render = Matter.Render.create({
      element: window.matterJsContainer,
      engine: _config.engine,
      options: {
        width: _config.w,
        height: _config.w,
        showAngleIndicator: true,
        // wireframes: false,
      }
  })

}

function buildStatic({ engine, render, shapes }) {
  const ledge = Matter.Bodies.trapezoid(p(50),p(50),p(50),p(15),0.9,{isStatic: true});
  Matter.Composite.add(engine.world, [
    ledge, // Walls 👇
    Matter.Bodies.rectangle( p(50),p(1.25),p(100),p(2.5),{isStatic:true}), // TOP
    Matter.Bodies.rectangle( p(50),p(98.75),p(100),p(2.5),{isStatic:true}), // BOTTOM
    Matter.Bodies.rectangle( p(1.25),p(50),p(2.5),p(100),{isStatic:true}), // LEFT
    Matter.Bodies.rectangle( p(98.75),p(50),p(2.5),p(100),{isStatic:true}), // RIGHT
  ])
}

function buildPolygons({ engine, shapes }) {
  _config.polyA = Matter.Bodies.polygon(p(75),p(25),6,25)
  Matter.Composite.add( engine.world, _config.polyA )
}


function render({ render, engine, shapes }) {
  Matter.Render.run(render);
  var runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);
}

function p(n) { // * FOR SQUARE ONLY! Convert from percent to real size. 
  return ((n *_config.w) / 100)
}