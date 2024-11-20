const Config = { // Config
  w: 600,  // Matter container size in px. w/h can both be specific or... 👇
  h: 600,  // "portrait"(9:16),"landscape"(16:9) or "square". Either w/h can scale.
  wireframe: false, // * Matter.js wireframe mode (Can't be done individually, unless styled to mimic wireframe)
  default_user_image: "assets/cat.png",
  default_container_id: "physics_2d_container",
  default_main_matter_id: "main_matter_layer", // 👇 Decalared below
  layers: [ // types: 'matter','svg'
    { type: "svg", id: "border_layer" },
    { type: "svg", id: "background_layer" },
    { type: "matter", id: "main_matter_layer" },
    { type: "svg", id: "mask_layer" },
  ],

  walls: { w: 10, show: [ false, true, true, true ]}, // show: [top, right, bottom, left]
  // 🔥 change name to walls?

  static_bodies: [   // 🔥 change name to static_bodies?
    // 🔥 moving static bodies should be an options here...
  ],

  live_bodies: [
    { // * 🧚‍♀️ Use Matter.js to render styles and sprites examples
      type: "matter",
      bodies: [ 
        { shape: 'circle', x: 400, y: 50, r: 50, image: "avatar", 
          options: { 
            rounded: true,
          }
        },
        { shape: 'circle', x: 75, y: 50, r: 50, 
          image: "assets/ball_bad_crop_example.png", 
          options: {
            resize: { w: 63, h: 63 }, // * Here's an example of resize that makes sense. This png has a transparent border of around 63 pix. So we need to scale up so that the physics matched the ball border.
            opacity: 0.25,
          }
        },
        { shape: 'circle', x: 480, y: -1500, r: 20, image: "assets/ball.png" },
    
        // * 📝 Recangles are render center out. 
        { shape: 'rect', x: 355, y: 410, w: 70, h: 70, image: "assets/box.png" },
        { shape: 'rect', x: 305, y: 210, w: 35, h: 70, image: "assets/box.png" },
        { shape: 'rect', x: 350, y: 0, w: 20, h: 20 },
        
        // TEST: Overscaled Rectangle. Should stretch beyond physical walls, overlapping other objects.
        // { shape: 'rect', x: 305, y: -210, w: 35, h: 70, image: "assets/box.png",
        //   options: { resize: { w: 70, h: 140 },} },
      ]
    },
    { // * 🎨 SVG tracking Mask Examples 
      type: "svg",
      id: "mask_layer",
      bodies: [    
        { shape: 'circle', x: 200, y: 50, r:"20", svg: /*html*/`
          <circle cx="200" cy="50" r="20" stroke-width="5" stroke="cornflowerblue" 
            fill="yellow" opacity="0.25" />
        `},
        // { layerId:"mask_layer", svg: /*html*/`
        //   <circle cx="0" cy="0" r="50" stroke="red" stroke-width="3" fill="yellow" />
        // `},
        
        // { layerId:"mask_layer", svg: /*html*/`
        //   <image href="assets/cat.png" x="200" y="80" height="50" width="50" clip-path="circle(50%)"/>
        // `},
        // { layerId:"mask_layer", svg: /*html*/`
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
