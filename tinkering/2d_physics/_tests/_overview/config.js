const C = { // Config
  w: 600,  // Matter container size in px. w/h can both be specific or... 👇
  h: 600,  // "portrait"(9:16),"landscape"(16:9) or "square". Either w/h can scale.
  default_user_image: "assets/cat.png",
  default_matter_container_id: "matterContainer",
  default_mask_container_id: "maskContainer",
  matter_walls: { w: 10, show: [ false, true, true, true ]}, // show: [top, right, bottom, left]

  matter_static_bodies: [
   
  ],

  matter_live_bodies: [
    { shape: 'circle', x: 75, y: 50, rSize: 50, image: "assets/ball.png", 
      imageSize: { x: 92, y: 92 } },
//
    // Avatar Hash image endpoint examples: 
    // - Local asset example: #woman1
    // - BROKEN example: #womann1
    // - Direct link example: #https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390fb4b-aa53-4d49-a083-fab870f16ee6_1436x1436.jpeg
    // - BROKEN direct link example: ##https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390fb4b-aa53-4d49-a083-fab870f16ee6_1436x1436x.jpeg
    { shape: 'circle', x: 400, y: 50, rSize: 50, image: "avatar", 
      imageSize: { x: 200, y: 200 } },
      // imageSize: { x: 500, y: 500 } },
//

    { shape: 'rect', x: 355, y: 410, w: 70, h: 70, image: "assets/box.png", 
      imageSize: { x: 64, y: 64 } },
    { shape: 'circle', x: 480, y: -1500, rSize: 20, image: "assets/ball.png",
       imageSize: { x: 92, y: 92 } },
  ],

}

