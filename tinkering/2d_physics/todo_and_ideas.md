# To Do ✅ 🟡
see: `/_tests/todo.md` for developing the `_dependency_verions` and adding tests.

#### ODD balls prep! 
- 🔥 Where I left off!!!
  - FUCK canvis embeding. I think overlaying .svgs is gonna be best at this point. 
  - If i hit a wall and the embeded images needs to be figured out I'll tackle it then. BUt until now. fuck that shit. 
- ✅✅✅✅✅ Review and restructure
- Add dynamic width/hight to images (we can actually get the w/h)
  - ✅ Re-order and organize new folder as `2d_physics`
  - ✅ add method at end to check for broken image and clean up code
  - ✅ Get Rounded working
  - ✅ Create toolkit
  - Stop! copy/paste `_overview` as into `_shed/embeded_images_example`
    - Make a note in README about embeded images and point to `embeded_images_example`
    - push and gut code for new svg overlays
  - Create Image Overlays menthod
    - We're going to have to figure out what to do with embeded sprites. 
    - I think maybe we just keep matter_v1.0 as is, that'll be our source in the future. 
    - maybe keep something in the shed

  - remove explicit adding of w/h in config for all images. 
  - move link notes and explinations to config.js (ok, to make long singleline notes!)
- Make notes about shadows and transparency. 
  - Transparency is easy, but shadows in a whole can of warms

- Let's deal with w/h...
  - I'm honestly thinking this is a container issues. really we just need to...
    - Make width 100% of container. Not an option because we can add widths margins by container(s) work. 
    - Then hight is determined by ratios. Can just do math do here...
      - 1, 9/16 or 16/9, or even 2/3, etc... 1 is square.
    - Then everything should be 0-1 now. 
    - But need a Max Width!
- update `_tests/todo.md`
- add/update `matter_hellper_v1.0.js` & NEW `toolkit_v1.0.js`
- PUSH! ligit push with comment

Next?... -> Break up `_tests`...?
- We need `_overview` to be more like `_build_conifg_overview`
- Post config actions or _non-basic_ builds added later. 

#### ODD balls next steps!
- probably wanna build a lot of this in '_overview' and/or a new test folder. 
  - Need to add background color? transparent? 
    - 🚨 check to see if I already have this tho...
  - new test folder: `rotating_bodies`
    - need to figureout how to rotate a body with body's inside
  - need to figureout 


# Example Post Ideas...

### "Drop on Blocks": sprites
- Use the Sprites example and add an avatar and your own box image
- Use 4x different colors
- Stack them in a column so when the avatar drops it tplles it over slowely
- Add A border { SQUARE } **we'll lean about rounded in another post**. 
- Add background... just grainy gray?

### "ramp", rounded_corners
- avatar rolls down a ramp into a column of blocks 

#
