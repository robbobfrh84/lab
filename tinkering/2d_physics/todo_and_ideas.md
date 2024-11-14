# To Do ✅ 🟡
see: `/_tests/todo.md` for developing the `_dependency_verions` and adding tests.



#### ODD balls prep! 
- ✅✅✅✅✅ Review and restructure
- Add dynamic width/hight to images (we can actually get the w/h)
  - Need to change this.hashImage to `{ image: '', }` so we can add .w and .h
  - see onload of image in hash section. We can get the w/h
  - check .jpg
  - remove explicit adding of w/h in config for all images. 
  - add method at end to check for broken image and clean up code
  - move link notes and explinations to config.js (ok, to make long singleline notes!)

- Let's deal with w/h...
  - I'm honestly thinking this is a container issues. really we just need to...
    - Make width 100% of container. Not an option because we can add widths margins by container(s) work. 
    - Then hight is determined by ratios. Can just do math do here...
      - 1, 9/16 or 16/9, or even 2/3, etc... 1 is square.
    - Then everything should be 0-1 now. 
    - But need a Max Width!
- update `_tests/todo.md`
- add new `matter_hellper_v1.1.js` 
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
