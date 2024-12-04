const Config = { // Config
  maxWidth: 600,  
  heightRatio: 1, // * 1="Square" - 2/3,9/16="landscape" - 3/2,16/9="Portrait"
  widthScale: 100, // * WARNING: Changing this will change the ratio of the hardcoded x,y location & size are of each body. You'll have to re-hard code each. If 100, layout will be 0-100 x, and 0-100 y on the canvas. So location and size represented by a %.
  wireframe: false, // * Matter.js wireframe mode (Can't be done individually, unless styled to mimic wireframe)
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

  ],

  dynamic_bodies: [ // 🔥 change name to dynamic_bodies_groups?
    { // * 🧚‍♀️ Use Matter.js to render styles and sprites examples
      type: "matter",
      bodies: [ 
        { shape: 'cir', x: 80, y: 10, r: 7, image: "avatar", 
          options: { 
            rounded: true,
          }
        },
        // { shape: 'cir', x: 15, y: 50, r: 10, 
        //   image: "assets/ball_bad_crop_example.png", 
        //   options: {
        //     resize: { w: 12.5, h: 12.5 }, // * Here's an example of resize that makes sense. This png has a transparent border of around 63 pix. So we need to scale up so that the physics matched the ball border.
        //     opacity: 0.25,
        //     friction: 0,
        //     frictionAir: 0,
        //     restitution: 1
        //   }
        // },
        // { shape: 'cir', x: 81, y: -200, r: 2.5, image: "assets/ball.png" },
        { shape: 'cir', x: 10, y: 20, r: 2.5  },

    
        // // // * 📝 Recangles are render center out. 
        // { shape: 'rect', x: 50, y: 75, w: 10, h: 10, image: "assets/box.png" },
        // { shape: 'rect', x: 50, y: 50, w: 5, h: 5, image: "assets/box.png" },
        
        // // TEST: Overscaled Rectangle. Should stretch beyond physical walls, overlapping other objects.
        // { shape: 'rect', x: 50, y: -25, w: 5, h: 10, image: "assets/box.png",
        //   options: { resize: { w: 10, h: 20 },} 
        // },
      ]
    },
    { // * 🎨 SVG tracking Mask Examples 
      type: "svg",
      layerId: "mask_layer",
      bodies: [    
        { shape: 'cir', x: 25, y: 10, r:5, svg: /*html*/`
          <circle stroke-width="5" stroke="cornflowerblue" 
            fill="goldenrod" opacity="1" 
          />
        `},
        { shape: 'cir', x: 50, y: 50, r: 1, svg: /*html*/`
          <circle cx="0" cy="0" r="50" stroke="red" stroke-width="3" fill="yellow" />
        `},
        
        // { shape: 'cir', svg: /*html*/`
        //   <image href="assets/cat.png" x="200" y="80" height="50" width="50" clip-path="circle(50%)"/>
        // `},
        // { shape: 'cir', svg: /*html*/`
        //   <image href="assets/green_grid_smile.jpg" x="130" y="80" height="50" width="50" clip-path="circle(50%)"/>
        // `},
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
