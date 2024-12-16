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

  // static_bodies: [  
  //   {
  //     name: "static matter tests", type: "matter", 
  //     bodies: [
  //     ]
  //   }
  // ],

  dynamic_body_groups: [
    { // * 🧚‍♀️ Using Matter.js to render styles and sprites examples
      name: "dynamic matter tests", type: "matter", 
      bodies: [ 
        { shape: 'verts', x: 80, y: 12, v: [
            { x: 0, y: 0 }, { x: 10, y: 7 }, { x: 0, y: 14 },
            { x: 3, y: 8 }, { x: -8, y: 7 }, { x: 3, y: 5 },
          ],
          options: { fillStyle: "red" } 
        },
        { shape: 'verts', x: 80, y: 35, v: [
            { x: 0, y: -10 }, { x: 4, y: -8 },
            { x: 10, y: 0 }, { x: 7, y: 6 },
            { x: 0, y: 10 }, { x: -4, y: 8 },
            { x: -10, y: 0 }, { x: -7.5, y: -7.5 },
          ],
          options: { fillStyle: "rgba(200,200,200)" } 
        },
        { shape: 'verts', x: 80, y: 55, v: [
            { x: 0, y: -8 }, { x: 4, y: -8 },
            { x: 8, y: 0 }, { x: 7, y: 6 },
            { x: 0, y: 8 }, { x: -4, y: 8 },
            { x: -8, y: 0 }, { x: -7.5, y: -7.5 },
          ],
          options: { fillStyle: "rgba(200,200,200)" } 
        },
        { shape: 'verts', x: 80, y: 75, v: [
            { x: 0, y: -7 }, { x: 3, y: -6 },
            { x: 8, y: 0 }, { x: 5, y: 6 },
            { x: 0, y: 8 }, { x: -4, y: 6 },
            { x: -7, y: 0 }, { x: -5, y: -5 },
          ],
          options: { fillStyle: "rgba(200,200,200)" } 
        },
      ]
    },

    { 
     name: "svg fromVerticies",  type: "svg", layerId: "mask_layer",
      bodies: [    
        { shape: 'rect', x: 11, y: 74, w: 16, h: 16, svg: /*html*/` 
          <image href="assets/gbox1.png" />
        `},
        // { shape: 'verts', x: 20, y: 20, v: [
        //     { x: 0, y: -7 }, { x: 3, y: -6 },
        //     { x: 8, y: 0 }, { x: 5, y: 6 },
        //     { x: 0, y: 8 }, { x: -4, y: 6 },
        //     { x: -7, y: 0 }, { x: -5, y: -5 },
        //   ],
        //   svg: /*html*/` 
        //     <image href="assets/gbox1.png" />
        //   `,
        // }
      ]
    }

  ],

}
