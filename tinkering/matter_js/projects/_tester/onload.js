const C = { // Config
  w: 600,  // Matter container size in px. w/h can both be specific or... 👇
  h: 600,  // "portrait"(9:16),"landscape"(16:9) or "square". Either w/h can scale.
  default_user_image: "images/cat.png",
  default_matter_container_id: "matterContainer",
  default_mask_container_id: "maskContainer",
  matter_walls: { w: 10, show: [ false, true, true, true ]}, // show: [top, right, bottom, left]

  matter_static_bodies: [
   
  ],

  matter_live_bodies: [
    { shape: 'circle', x: 75, y: 50, rSize: 50, image: "images/ball.png", imageSize: { x: 92, y: 92 } },
    { shape: 'circle', x: 400, y: 50, rSize: 50, image: "avatar", imageSize: { x: 200, y: 200 } },
    { shape: 'rect', x: 355, y: 410, w: 70, h: 70, image: "images/box.png", imageSize: { x: 64, y: 64 } },
    { shape: 'circle', x: 480, y: -1500, rSize: 20, image: "images/ball.png", imageSize: { x: 92, y: 92 } },
  ],

}


window.onload = () => {
  const MH = new Matter_Helper({ C })
  MH.get_hash_image()
  console.log('MH:', MH)
}