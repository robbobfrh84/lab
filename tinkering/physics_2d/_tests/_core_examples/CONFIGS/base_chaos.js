var base_chaos = { // Config
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
  wall_bodies: { thickness: 2, show: [ false, true, true, true ] }, // show: [top, right, bottom, left]

  static_body_groups: [  
    {
      name: "static matter tests", type: "matter", 
      bodies: [
        { shape: 'rect', x: 15, y: 15, w: 10, h: 2, options: { fillStyle: "red" }},
        { shape: 'rect', x: 25, y: 30, w: 10, h: 5, options: { fillStyle: "green" } },
        { shape: 'cir', x: 44, y: 35, r: 3, options: { fillStyle: "orange" }},
        { shape: 'rect', x: 35, y: 38, w: 3, h: 1, options: { fillStyle: "blue" }},
      ]
    }
  ],

  dynamic_body_groups: [
    { // * 🧚‍♀️ Using Matter.js to render styles and sprites examples
      name: "dynamic matter tests", type: "matter", 
      bodies: [ 
        { shape: 'cir', x: 90, y: 10, r: 7, 
          image: "<<avatar>>", 
          options: { rounded: true, }
        },
        { shape: 'cir', x: 75, y: 10, r: 7, 
          image: "assets/woman1.png", 
          options: { rounded: true, }
        },
        { shape: 'cir', x: 60, y: 10, r: 7, 
          image: "assets/ball_bad_crop_example.png", 
          options: {
            resize: { w: 17, h: 17 }, // * Here's an example of resize that makes sense. This png has a transparent border of around 63 pix. So we need to scale up so that the physics matched the ball border.
            opacity: 0.25, // * Default 1
            density: 0.0007, // * Default 0.0007
            friction: 0.0, // * Default 0.01
            frictionAir: 0.0, // * Default 0.02
            restitution: 1, // * Default 0.3
          }
        },
        { shape: 'cir', x: 31, y: 20, r: 2.5,
           options: { fillStyle: "red" } 
        },
        { shape: 'cir', x: 81, y: -200, r: 2.5, image: "assets/ball.png" },
    
        // // // * 📝 Recangles are render center out. 
        { shape: 'rect', x: 50, y: 75, w: 8, h: 8, image: "assets/box.png",
          options: { resize: { w: 16, h: 16 } }
        },
        { shape: 'rect', x: 30, y: 50, w: 16, h: 16, image: "assets/square_red_squirrel.png" },
      ]
    },
// * 🎨 SVG tracking Mask Examples 
    { 
      name: "svg circles", type: "svg",layerId: "mask_layer",
      bodies: [    
        { shape: 'cir_image', x: 90, y:24, r: 7, svg: /*html*/`
          <image href="<<avatar>>" />
        `},
        { shape: 'cir_image', x: 75, y: 24, r: 7, svg: /*html*/`
          <image href="assets/woman1.png" />
        `},
        { shape: 'cir', x: 75, y:40, r: 5, svg: /*html*/`
          <image href="assets/gball1.png"/>
        `},
        { shape: 'cir', x: 60, y: 24, r:3, svg: /*html*/`
          <circle fill="goldenrod" opacity="1" />
        `},
        { shape: 'cir', x: 60, y: 37, r:5, svg: /*html*/`
          <circle r="4" stroke-width="2" opacity="1" stroke="green" fill="orange"/>
        `},
        { shape: 'cir', x: 60, y: 50, r:5, svg: /*html*/` 
          <circle ox="5" oy="5" r="6" fill="orange" opacity="0.5" />
        `}, // * 🔥 It SHOULD be OFFSET & OVERSIZED!
      ]
    },
    { 
     name: "svg rectangles",  type: "svg", layerId: "mask_layer",
      bodies: [    
        { shape: 'rect', x: 11, y: 74, w: 16, h: 16, svg: /*html*/` 
          <image href="assets/gbox1.png" />
        `},
        { shape: 'rect', x: 10, y: 90, w: 16, h: 16, svg: /*html*/`
          <image width="32" height="32" href="assets/box.png" />
        `},
        { shape: 'rect', x: 35, y: 70, w: 14, h: 8, svg: /*html*/`
          <rect width="13" height="7" stroke-width="1" stroke="red"  fill="rgba(0,255,0,0.5)"/>
        `},
        { shape: 'rect', x: 35, y: 90, w: 16, h: 16, // * 🔥 Keep two examples for offsetting using x,y and ox,oy to show how they're the same! :)
          svg: /*html*/` <image ox="-2" oy="-2" width="14" height="14"
            href="assets/gbox1.png" 
          />
        `}, // * 🔥 It SHOULD be OFFSET & UNDERsized
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
