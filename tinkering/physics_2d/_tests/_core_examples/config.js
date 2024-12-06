const Config = { // Config
  maxWidth: 600,  
  heightRatio: 1, // * 1="Square" - 2/3,9/16="landscape" - 3/2,16/9="Portrait"
  widthScale: 100, // * WARNING: Changing this will change the ratio of the hardcoded x,y location & size are of each body. You'll have to re-hard code each. If 100, layout will be 0-100 x, and 0-100 y on the canvas. So location and size represented by a %.
  background: "cornflowerblue", // * Default is "2a2a2a"
  showAngleIndicator: false, // * Default "false" - Shows angle indicator on all bodies
  wireframe: false, // * Default "false" - Matter.js wireframe mode (Can't be done individually, it's all on or off!)
  gravity: { x: 0, y: 1 }, // * Matter.js gravity. Default(x:0,y:1)
  default_user_image: "assets/cat.png",
  default_container_id: "physics_2d_container",
  default_main_matter_id: "main_matter_layer", // 👇 Decalared below
  layers: [ // types: 'matter','svg'
    { type: "svg", id: "border_layer" },
    { type: "svg", id: "background_layer" },
    { type: "matter", id: "main_matter_layer" },
    { type: "svg", id: "mask_layer" }, // Add animate="true"
  ],
  wall_bodies: { thickness: 3, show: [ false, true, true, true ] }, // show: [top, right, bottom, left]

  static_bodies: [  // 🔥 moving static bodies should be an options here...
    {
      name: "static matter tests", type: "matter", 
      bodies: [
        { shape: 'rect', x: 18, y: 25, w: 5, h: 5, options: { fillStyle: "red" }},
        { shape: 'rect', x: 20, y: 50, w: 10, h: 5, options: { fillStyle: "green" } },
        { shape: 'cir', x: 44, y: 60, r: 3, options: { fillStyle: "orange" }},
        { shape: 'rect', x: 20, y: 75, w: 20, h: 5, options: { fillStyle: "dodgerblue" }},
      ]
    }
  ],

  dynamic_body_groups: [
// * 🧚‍♀️ Using Matter.js to render styles and sprites examples
    { 
      name: "dynamic matter tests", type: "matter", 
      bodies: [ 
        { shape: 'cir', x: 37.5, y: 23, r: 7, 
          image: "<<avatar>>", 
          options: { 
            rounded: true, 
          }
        },
        { shape: 'cir', x: 15, y: 50, r: 10, 
          image: "assets/ball_bad_crop_example.png", 
          options: {
            resize: { w: 12.5, h: 12.5 }, // * Here's an example of resize that makes sense. This png has a transparent border of around 63 pix. So we need to scale up so that the physics matched the ball border.
            opacity: 0.25,
            friction: 0,
            frictionAir: 0,
            restitution: 1
          }
        },
        { shape: 'cir', x: 70, y: 20, r: 2.5,
           options: { fillStyle: "red" } 
        },
        { shape: 'cir', x: 81, y: -200, r: 2.5, image: "assets/ball.png" },
    
        // // // * 📝 Recangles are render center out. 
        { shape: 'rect', x: 50, y: 75, w: 10, h: 10, image: "assets/box.png" },
        { shape: 'rect', x: 50, y: 50, w: 5, h: 5, image: "assets/box.png" },
        
        // // 🧪TEST: Overscaled Rectangle. Should stretch beyond physical walls, overlapping other objects.
        // { shape: 'rect', x: 50, y: -25, w: 5, h: 10, image: "assets/box.png",
        //   options: { resize: { w: 10, h: 20 },} 
        // },
      ]
    },
// * 🎨 SVG tracking Mask Examples 
    { 
      name: "svg circles", type: "svg",layerId: "mask_layer",
      bodies: [    
        { shape: 'cir_image', x: 37, y:8, r: 7, svg: /*html*/`
          <image href="<<avatar>>" />
        `},
        { shape: 'cir', x: 25, y: 60, r:5, svg: /*html*/`
          <circle stroke-width="5" stroke="green" fill="goldenrod" opacity="1" />
        `},
        { shape: 'cir_image', x: 37, y:-200, r: 8, svg: /*html*/`
          <image href="assets/shareena.png" />
        `},
        { shape: 'cir_image', x: 21, y:10, r: 8, svg: /*html*/`
          <image href="assets/bob_square.jpg" />
        `},
      ]
    },
    { 
     name: "svg rectangles",  type: "svg", layerId: "mask_layer",
      bodies: [    
        { shape: 'rect', x: 19, y: 70, w: 8, h: 5, svg: /*html*/`
          <rect stroke="pink" stroke-width="2" fill="blue"/>
        `},
      ]
    }
  ],

}

/* - - - - - 🧪 TESTS / EXAMPLES 🧪 - - - - - 

 // #️👤 Avatar Hash image endpoint examples: 
    // - Local asset example: #woman1.png
    // - BROKEN example: #womann1.png
    // - Direct link example: #https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390fb4b-aa53-4d49-a083-fab870f16ee6_1436x1436.jpeg
    // - BROKEN direct link example: ##https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390fb4b-aa53-4d49-a083-fab870f16ee6_1436x1436x.jpeg

    //Overscaled Rectangle. Should stretch beyond physical walls, overlapping other objects.
    { shape: 'rect', x: 305, y: -210, w: 35, h: 70, image: "assets/box.png",
      options: { resize: { w: 70, h: 140 },}
    },
- - - - - - - - - - - - - - - - - - - - - - -  */
