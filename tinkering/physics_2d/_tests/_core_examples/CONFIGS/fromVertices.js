var fromVertices = { // Config
  maxWidth: 600,  
  heightRatio: 1, // * 1="Square" - 2/3,9/16="landscape" - 3/2,16/9="Portrait"
  widthScale: 100, // * WARNING: Changing this will change the ratio of the hardcoded x,y location & size are of each body. You'll have to re-hard code each. If 100, layout will be 0-100 x, and 0-100 y on the canvas. So location and size represented by a %.
  background: "cornflowerblue", // * Default is "2a2a2a"
  wireframe: true, // * Default false - Matter.js wireframe mode (Can't be done individually, it's all on or off!)
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
  wall_bodies: { thickness: 2, show: [ false, true, true, true ] }, // show: [top, right, bottom, left]

  static_bodies: [  
    {
      name: "static matter tests", type: "matter", 
      bodies: [
       
      ]
    }
  ],

  dynamic_body_groups: [
    { // * 🧚‍♀️ Using Matter.js to render styles and sprites examples
      name: "dynamic matter tests", type: "matter", 
      bodies: [ 
        { shape: 'cir', x: 12, y: 10, r: 7, 
          options: { rounded: true, }
        },
       
      ]
    },

    { 
     name: "svg fromVerticies",  type: "svg", layerId: "mask_layer",
      bodies: [    
        // { shape: 'rect', x: 11, y: 74, w: 16, h: 16, svg: /*html*/` 
        //   <image href="assets/gbox1.png" />
        // `},
      ]
    }
  ],

}
