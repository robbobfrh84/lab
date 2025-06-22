const animate = function(illo, elm, selectedDice, w, h, selected, rotate) {
  if (!rotate) {
    illo.updateRenderGraph()
  } else if (selected) {
    start_spinning_and_update(illo, elm, selectedDice, w, h)
    // test_dodecahedron_goTo(illo, elm, selectedDice, w, h)
  } else {
    start_spinning(illo)
  }
}

const start_spinning = function(illo) {
  function animate() {
    illo.rotate.x += 0.01
    illo.rotate.y -= 0.003
    illo.updateRenderGraph()
    requestAnimationFrame( animate )
  }
  animate()
}

const start_spinning_and_update = function(illo, elm, selectedDice, w, h) {

  const TAU = Zdog.TAU
  let isSpinning = true;
  let viewRotation = new Zdog.Vector();

  /* * Save For "rotation to point" Animation to points example
    var keyframes = [
      { x:   0, y:   0 },
      { x:   0, y: TAU },
      { x: TAU, y: TAU },
    ];
    let ticker = 0;
    var cycleCount = 180;
    var turnLimit = keyframes.length - 1;
  */

  function update() {

    if ( isSpinning ) {
      /* * Save For "rotation to point" Animation to points example
        var progress = ticker / cycleCount;
        var tween = Zdog.easeInOut( progress % 1, 4 );
        var turn = Math.floor( progress % turnLimit );
        var keyA = keyframes[ turn ];
        var keyB = keyframes[ turn + 1 ];
        viewRotation.x = Zdog.lerp( keyA.x, keyB.x, tween );
        viewRotation.y = Zdog.lerp( keyA.y, keyB.y, tween );
        ticker++;
      */

      // * Not out if swapping for ☝️ animation.
      viewRotation.x += 0.01
      viewRotation.y -= 0.003
    }

    selectedDice.rotate.set( viewRotation );

    illo.updateGraph();
  }

  const displaySize = Math.min( w, h );
  let dragStartRX
  let dragStartRY 

  new Zdog.Dragger({
    startElement: elm,
    onDragStart: function() {
      isSpinning = false
      dragStartRX = viewRotation.x
      dragStartRY = viewRotation.y
      // 🔥 CHANGES SCALE (AKA 3D Height persepctive)
      // 🔥
      // illo.scale.x = illo.scale.x - 0.05
      // illo.scale.y = illo.scale.y - 0.05
      // 🔥
      // 🔥 CHANGES SCALE (AKA 3D Height persepctive)
    },
    onDragMove: function( pointer, moveX, moveY ) {
      viewRotation.x = dragStartRX - ( moveY / displaySize * TAU )
      viewRotation.y = dragStartRY - ( moveX / displaySize * TAU )
    },
    onDragEnd: function() {
      isSpinning = true      
    },

  })

  function animate() {
    update();
    illo.renderGraph();
    requestAnimationFrame( animate );
  }

  animate();

}


// 🧪🔬🧫🥽
const test_dodecahedron_goTo = function(illo, elm, selectedDice, w, h) {
  // * 🥽 full rotation is Math.PI*2 = ~ 6.283

  // 🔥 Get a Dnd Die to make sure they're in the correct order, the numbers that is.

  // ~ DEFTAULT 0,0 dosn't face a direction, rather 1/2 rotation off x face
  illo.rotate.x = 0 
  illo.rotate.y = 0
  illo.updateRenderGraph()

  // 1 1st purple
  // illo.rotate.x = ((Math.PI/8) * 4)
  // illo.rotate.y = 0
  // illo.updateRenderGraph()

  // 2 2nd purple
  // illo.rotate.x =  ((Math.PI/8) * 7)
  // illo.rotate.y = 0
  // illo.updateRenderGraph()

  // 3 1st yellow
  // illo.rotate.x = ((Math.PI/8) * 12)
  // illo.rotate.y = 0
  // illo.updateRenderGraph()

  // 4 2nd yellow
  // illo.rotate.x = ((Math.PI/8) * 15)
  // illo.rotate.y = 0
  // illo.updateRenderGraph()

  // 5 1st Gold (note, doing from default)
  // illo.rotate.x = ((Math.PI/8) * 1)
  // illo.rotate.y = ((Math.PI/8) * 1.5)
  // illo.updateRenderGraph()

  // 5 1nd Red-purple (note, doing from default)
  illo.rotate.x = ((Math.PI/8) * 1.25)
  illo.rotate.y = ((Math.PI/8) * 4.75)
  illo.updateRenderGraph()


}
