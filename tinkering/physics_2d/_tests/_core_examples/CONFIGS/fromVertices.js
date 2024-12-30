var fromVertices = { // Config
  wireframe: true, // * Default false - Matter.js wireframe mode (Can't be done individually, it's all on or off!)
  svgOpacity: 0.5, // * Default 1
  maxWidth: 600,  
  heightRatio: 1, // * 1="Square" - 2/3,9/16="landscape" - 3/2,16/9="Portrait"
  widthScale: 100, // * WARNING: Changing this will change the ratio of the hardcoded x,y location & size are of each body. You'll have to re-hard code each. If 100, layout will be 0-100 x, and 0-100 y on the canvas. So location and size represented by a %.
  background: "cornflowerblue", // * Default is "2a2a2a"
  gravity: { x: 0, y: 1 }, // * Matter.js gravity. Default(x:0,y:1)
  default_user_image: "assets/cat.png",
  default_container_id: "physics_2d_container",
  default_main_matter_id: "main_matter_layer", // * 👇 Set in layers.
  default_main_svg_id: "mask_layer", // * 👇 Set in layers.
  layers: [ // types: 'matter','svg'
    { type: "svg", id: "border_layer" },
    { type: "svg", id: "background_layer" },
    { type: "matter", id: "main_matter_layer" },
    { type: "svg", id: "mask_layer" }, 
  ],
  wall_bodies: { thickness: 2, show: [ true, true, true, true ] }, // show: [top, right, bottom, left]

  static_body_groups: [  

    {
      name: "ramp - matter only - third column", type: "matter", 
      bodies: [
        { shape: 'verts', name: 'arrow', x: 73, y: 60, v: [
            [0, -8], [3, -3], [8, 2], [16,8], [0, 8]
          ], options: { fillStyle: "red" } 
        },
      ]
    },

    {
      name: "ramp - svg fill - second column", type: "svg", layerId: "mask_layer",
      bodies: [
        { shape: 'verts', name: 'ramp', x: 47, y: 80, 
          v: [ [-10, -16], [4, 6], [10, 12], [20, 16], [0, 16] ],
          svg: /*html*/`
            <polygon fill="lime"/>`,
        },
      ]
    }

  ],

  dynamic_body_groups: [

/* 🌙 SVG Examples */
    { 
      name: "1️⃣ svg image overlay column",  type: "svg", layerId: "mask_layer",
      bodies: [ 
        { 
          shape: 'verts', name: 'lg snowball', x: 20, y: 20, v: [
            [-3,-11], [6,-7.5],  [10.4,0], [7,6],
            [0-0.5,8.5], [-6.5,6],   [-10.5,1], [-9,-7],
          ], svg: /*html*/`
          <g>
            <image width="22" x="-11" y="-10" transform="rotate(45,0,0)"
              href="assets/big_snowball_1.png" />
            <circle r="4" stroke-width="2" opacity="1" stroke="green" fill="orange"/>
          </g>`,
        }, // transform="rotate(45,20,20)" x="-11" y="-11"
        { 
          shape: 'verts', name: 'md snowball', x: 20, y: 50, v: [
            [0,-8], [4,-8], [8,0], [6,5], [0,7], [-4,7], [-8,0], [-6,-6.5]
          ], 
          svg: /*html*/`
          <g>
            <image width="18" x="-9" y="-9" transform="rotate(0,0,0)"
              href="assets/med_snowball_1.png" />
          </g>`,
        },
        { 
          shape: 'verts', name: 'sm snowball', x: 20, y: 75, v: [
            [0, -5], [3.5, -4], [8, 1], [4.5, 6],
            [1, 7], [-2, 5], [-5.5, 1], [-4, -4],
          ], svg: /*html*/`
          <g>
            <image width="22" x="-11" y="-11" transform="rotate(25,0,0)"
              href="assets/sm_snowball_1.png" />
          </g>`,
        },
      ]
    },

    { 
      name: "2️⃣ svg fill column",  type: "svg", layerId: "mask_layer",
      bodies: [    
        { 
          shape: 'verts', name: 'path layer svg - matter set', x: 50, y: 20, v: [
            [8, 0], [9, 6], [16, 8], [13, 12],
            [8, 16], [4, 14], [0, 8], [5, 5],
          ], 
          svg: /*html*/`
          <polygon fill="lime"/>`,
          options: {
            friction: 0.2, // * Default 0.01
          }
        },
        { 
          shape: 'verts', name: 'svg path overide', x: 50, y: 40, v: [
            [0, -7], [3, -6], [7, -2], [5, 6],
            [0, 8], [-4, 6],  [-8, 2], [-5, -5],
          ], svg: /*html*/`
            <polygon points="
              0,-7 3,-6 7,-2 5,6 0,8 -4,6 -8,2 -5,-5
            " fill="lime"/>`,
        }, // 👀 using "[" or "]" in svg polygon is just ignored. So both ways work (easy for copy/paste)
        { 
          shape: 'verts', name: '🔥 overrideOffSet svg path for stroke', x: 50, y: 60, v: [
            [0, -7], [3, -6], [8, 0], [5, 6],
            [0, 8], [-4, 6],  [-7, 0], [-5, -5],
          ], 
          overrideOffSet: true, 
          svg: /*html*/` 
            <polygon points="[ 
              [0, -6.5], [2.5, -5.5], [6.7, 0], [4, 5],
              [0, 6.5], [-3.5, 5],  [-6, -0.5], [-4.5, -4.5],
            ]" fill="lime" stroke="violet" stroke-width="2"/>`,
        }, // 👀 using "[" or "]" in svg polygon is just ignored. So both ways work (easy for copy/paste)
      ]
      // [8, 1], [11, 2], [16, 8], [13, 14],
      // [8, 16], [4, 14],  [1, 8], [3, 3],
    },

  /* 🧚‍♀️ Using Matter.js only to render styles and sprites examples */
    { 
      name: "3️⃣ matter only column", type: "matter", 
      bodies: [ 
        { shape: 'verts', name: 'arrow', x: 80, y: 12, v: [
            [0, 0], [10, 7], [0, 14],
            [3, 8], [-8, 7], [3, 5],
          ], options: { fillStyle: "red" } 
        },
        { shape: 'verts', name: 'snowball', x: 80, y: 35, v: [
            [0, -7], [3, -6], [8, 0], [5, 6],
            [0, 8], [-4, 6], [-7, 0], [-5, -5],
          ], options: { fillStyle: "rgba(200,200,200)" } 
        },
      ]
    },

  ],

}

