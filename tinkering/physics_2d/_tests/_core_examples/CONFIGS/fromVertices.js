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
      name: "static matter tests", type: "matter", 
      bodies: [
      ]
    }
  ],

  dynamic_body_groups: [
/* 🧚‍♀️ Using Matter.js only to render styles and sprites examples */
    { 
      name: "dynamic matter tests", type: "matter", 
      bodies: [ 
        { shape: 'verts', name: 'arrow', x: 80, y: 12, v: [
            [0, 0], [10, 7], [0, 14],
            [3, 8], [-8, 7], [3, 5],
          ], options: { fillStyle: "red" } 
        },
        { shape: 'verts', name: 'lg snowball', x: 80, y: 35, v: [
            [0,-10], [4,-8],  [10,0], [7,6],
            [0,10], [-4,8],   [-10,0], [-7.5,-7.5],
          ], options: { fillStyle: "rgba(200,200,200)" } 
        },
        { shape: 'verts', name: 'md snowball', x: 80, y: 55, note: "👀 You can also write the vertices in directly like this.",
          v: [
            [0,-8], [4,-8], [8,0], [7,6], [0,8], [-4,8], [-8,0], [-7.5,-7.5]
          ], 
            options: { fillStyle: "rgba(200,200,200)" } 
        },
        { shape: 'verts', name: 'sm snowball', x: 80, y: 75, v: [
            [0, -7], [3, -6], [8, 0], [5, 6],
            [0, 8], [-4, 6], [-7, 0], [-5, -5],
          ], options: { fillStyle: "rgba(200,200,200)" } 
        },
        ]
      },

/* 🌙 SVG Examples */
    { 
     name: "svg fromVerticies",  type: "svg", layerId: "mask_layer",
      bodies: [    
        { shape: 'verts', name: 'path layer svg - matter set', x: 50, y: 20, v: [
            [0, -7], [3, -6], [8, 0], [5, 6],
            [0, 8], [-4, 6], [-7, 0], [-5, -5],
          ], svg: /*html*/`
          <polygon fill="lime"/>`,
        },
        { shape: 'verts', name: 'path layer svg - svg overide', x: 50, y: 40, v: [
          [0, -7], [3, -6], [8, 0], [5, 6],
          [0, 8], [-4, 6], [-7, 0], [-5, -5],
        ], svg: /*html*/`
          <polygon points="
            0,-7 3,-6 8,0 5,6 0,8 -4,6 -7,0 -5,-5
          " fill="lime"/>`,
        },
        { shape: 'verts', name: 'path layer svg - svg overide', x: 50, y: 40, v: [
          [0, -7], [3, -6], [8, 0], [5, 6],
          [0, 8], [-4, 6], [-7, 0], [-5, -5],
        ], svg: /*html*/`
          <polygon points="
            0,-7 3,-6 8,0 5,6 0,8 -4,6 -7,0 -5,-5
          " fill="lime" stroke="violet" stroke-width="1"/>`,
        },
        { shape: 'verts', name: 'lg snowball', x: 20, y: 20, v: [
            [0,-10], [4,-8],  [10,0], [7,6],
            [0,10], [-4,8],   [-10,0], [-7.5,-7.5],
          ], svg: /*html*/`
            <image x="-8" y="-8" width="16" height="16" href="assets/gbox1.png" />`,
        },
        { shape: 'verts', name: 'md snowball', x: 20, y: 50, note: "👀 You can also write the vertices in directly like this.",
          v: [
            [0,-8], [4,-8], [8,0], [7,6], [0,8], [-4,8], [-8,0], [-7.5,-7.5]
          ], 
          svg: /*html*/`
            <circle r="4" stroke-width="2" opacity="1" stroke="green" fill="orange"/>`,
        },
        { shape: 'verts', name: 'sm snowball', x: 20, y: 75, v: [
            [0, -7], [3, -6], [8, 0], [5, 6],
            [0, 8], [-4, 6], [-7, 0], [-5, -5],
          ], svg: /*html*/`
            <circle r="4" stroke-width="2" opacity="1" stroke="green" fill="orange"/>`,
        },
      ]
      
    }

  ],

}

