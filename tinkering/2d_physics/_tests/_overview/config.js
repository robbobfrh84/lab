const C = { // Config
  w: 600,  // Matter container size in px. w/h can both be specific or... 👇
  h: 600,  // "portrait"(9:16),"landscape"(16:9) or "square". Either w/h can scale.
  default_user_image: "assets/cat.png",
  default_container_id: "2d_physics_container",
  layers: [ // 🔥 not yet implimented
    { type: "svg", id: "border" },
    { type: "svg", id: "background" },
    { type: "matter", id: "main_matter" },
    { type: "svg", id: "masks" },
  ],

  matter_walls: { w: 10, show: [ false, true, true, true ]}, // show: [top, right, bottom, left]
  // 🔥 change name to walls?

  matter_static_bodies: [   // 🔥 change name to static_bodies?
    // 🔥 moving static bodies should be an options here...
   
  ],

  matter_live_bodies: [
    // #️👤 Avatar Hash image endpoint examples: 
    // - Local asset example: #woman1.png
    // - BROKEN example: #womann1.png
    // - Direct link example: #https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390fb4b-aa53-4d49-a083-fab870f16ee6_1436x1436.jpeg
    // - BROKEN direct link example: ##https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390fb4b-aa53-4d49-a083-fab870f16ee6_1436x1436x.jpeg
    { shape: 'circle', x: 400, y: 50, r: 50, image: "avatar", 
      options: {
        rounded: true,
      }
    },
    { shape: 'circle', x: 75, y: 50, r: 50, image: "assets/ball_bad_crop_example.png", 
      options: {
        resize: { w: 63, h: 63 },
        opacity: 0.25,
      }
    },

    // { shape: 'circle', x: 200, y: 50, r: 50, layer:1, svg: /*html*/`
      
    // `},

    // * 📝 Recangles are render center out. so w/h are doulble, lik radius
    { shape: 'rect', x: 355, y: 410, w: 70, h: 70, image: "assets/box.png" },
    { shape: 'rect', x: 305, y: 210, w: 35, h: 70, image: "assets/box.png" },
    { shape: 'circle', x: 480, y: -1500, r: 20, image: "assets/ball.png" },

/* - - - - - 🧪 TESTS - - - - - */

// Overscaled Rectangle. Should stretch beyond physical walls, overlapping other objects.
    // { shape: 'rect', x: 305, y: -210, w: 35, h: 70, image: "assets/box.png",
    //   options: { resize: { w: 70, h: 140 },}
    // },
  ],

}

