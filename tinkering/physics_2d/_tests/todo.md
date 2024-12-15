### Where I Left Off
- I don't want this Helper to be a blcoker, where anytime you change anything in the class, you have to go back and test and update everything. 
- You have to decide to start, edit Helper on the fly, make notes, then come back. 

# TO DO ✅ 🟡 🟠
🟡 Refactor
- 🔥 AHHH cut out test example for Vertices "save here at bottom" 
- pre code clean lazypush
- 🟡(...✅ just test a little more) Add to us `oX="-1" oY="2"` on svg
- review all code. 
- Push again with comment

Cleanup / Breakup _core_examples. Individual `app.js`, `config.js`, etc... 
- ⛄️ Needed for snowman game 
  - _blank_example_copyPaste
  - ⚙️ complete_config
  - 🙆‍♂️ avatars. 
    - 6x - Svg & matter - Three `<<avatar>>` #local, #url, default
  - 🟣 circles_&_squares
    - demo "over" scale
    - try for `<g></g>` groups and adding shadow layer. 
    - offset svg examples. (make sure to note x,y vs. oX,oY)
    - JUST ONE example for matter, the original box.png overscale. 
⛄️- 🔶 other_shapes
  - 🧱 static_bodies
    - include svg examples
    - ramps_&_rounded_courners
  - 🖼️ backgrounds_and_shadow_layers
    - Make walls offset
    - Add textures
    - Add Drop shaddow inset to background
    - Add curved Object to put in courners (don't add to wall object, that's to specific)
      - Add to walls:`insetCurve: 10` (for all walls, anything else, just use static bodies)
  - 🌋 moving_static_bodies
  - ☄️ options explore
⛄️- 🪟 tracking_zone_events
?⛄️- 🍡 binding_bodies_in_motion
- Remove unused images. 

Create new `_test` called `width_height_scale` (This is a bit of a tinker)
- So... hight isn't 0-100 meaning x: 50, y: 50 isn't centered if 2/3 ratio. Think about how best to fix this. Could just handle "h" by ratio and might work. 
- Set up an easy toggle between 600 v 1200, etc. 
- If the window allows for 1000x1000, they physics will behave differently. I think the fix for this is to lock in a width, 600, 1000, 1200? Then use `transform: scale()` to match window width. 

Cleanup
- Should "options" be "render" just so that it matches Matter terminology?
- Let's review all the example and only have what is needed for use-cases/tests

### To DOCUMENT
- Rectangles
  - Explain how they're fitted to matter js, i.e. x,y,w,h...
  - How they're built center out, rather than right-> like svgs. 
- SVG don't use `options.resize` do manually in svg element.
  - Use the same 0-100 and it'll be scaled. 
  - Remember Rectangles are built differently.
  - Within the actualy SVG ELM...
    - Use `oX="-3" oY="2"` when you want to offset relative to x,y
    - YOU CAN directly put in x,y but it'll just be harder to head math the locations.
- Notes on scaling matter canvas (git branch `higher-resolution-tester`)
  - "fixes blurry and fussy lines for matter layers" etc...
  - I messed around with this a bit, and discovered that while possible (see branch), the downside is that it changes the physics, meaning the numbers that build the physics are built into the pixel size it seems. 

#### Un-Ordered To Do (? Maybe move to later MVP!?)

- ...

----
# Physics 2d Library

### 🟡 MVP - Basic Setup: 
- layers
- tracking
- backgournds
- curve static
- `#url` images for avatar.
- Move v1.1 to dependency_versions
- 🦋 POST: Curate and post ramp example with basic backgrounds. 

### MVP - Expand and clean up `_tests` & BASIC Documentation
- Add `index.html` to root level of tests. simple links to all `_tests`
- Move `physics_2d_v1.1` out of `_core_examples`. We do want to share
- When we add changes to the libs, we create a new folder (`c/p`) and incremient
- THEN, we can switch each test over one-by-one as we test 😜.
- Or: keep the same structure we have? Either way...👇 This MVP thinks this out. 
- Add `README.md` and explain work flow and gotach (`### Jumping Back In?`)
  - Add `### How SVGs are rendered to Matter`
    - "the object" MUST have shape match. 
- Review `physics_2d/README.md` to reflect changes.

### MVP - ODD balls (start in projects)
- Create new `_test` > `rotating_complex_object`

### MVP - Complex objects 
- Matter.Bodies >`{rectangle: ƒ, trapezoid: ƒ, circle: ƒ, polygon: ƒ, fromVertices: ƒ}`

### MVP+ (Needs MVP home)
- Image Drag and drop Box - to update avatar image. 
- Re-evaluating walls:
  - Negative thickness i.e.(`= -2`) on rectanges seems to be visually 0 BUT has effect!
  - However, setting `=0` seems to break matter and not show up OR take effect.
  - Also, should we add `negThickness:10` to build into empty space to stop fast object?
- resize event? this might be problamatic.. or super easy. lol. 

Tests (`_tests`)
- Bounce box in circle. Tests max object load with 1. svgs, 2. images, 3.r aw objects

### MVP++ "Wait for usecase" / "Daydreams" & "Down the Road"...

Wait for usecase...
- Add a layer type `html`? Just build around a `<div>` instead of an `<svg>`. 
  - Usecases: .gifs, Complex UI 💡(moving control panel) Even whole svgs embed.
- Convert to Progressive Web App (PWA) 
  - chatGPT guide: https://chatgpt.com/c/673e378a-5aec-8002-ac19-bf226b70abfc

----
# Example Post Ideas...

### "Ramp", rounded_corners
- avatar rolls down a ramp into a column of blocks 

### "Moving Static Bodies"
- Polygon that can be modified by points, 3(tryange), 4, 5, 6,.. 8(octogon)
  - `<` & `>` external muttons add/remove points, min 3, max 20,  
  - And this rotates and can be controlled by additional `<` & `>` buttons.
- And, under a Button press flicks a body like a pin-ball paddle. (static?)



----

//
//
// 🔥 AHHH cut this out and do code review FIRST

const starVertices = [
  { x: 0, y: -50 },
  { x: 14, y: -20 },
  { x: 47, y: -15 },
  // { x: 23, y: 7 },
  // { x: 29, y: 40 },
  // { x: 0, y: 25 },
  // { x: -29, y: 40 },
  // { x: -23, y: 7 },
  // { x: -47, y: -15 },
  // { x: -14, y: -20 },
];

// Create a body from the vertices
const starBody = Matter.Bodies.fromVertices(400, 300, [starVertices], {
  isStatic: false, // Make it dynamic
  render: {
      fillStyle: 'yellow',
      strokeStyle: 'black',
      lineWidth: 1,
  },
});

// Add the body to the world
// World.add(world, starBody);
Matter.Composite.add(this.Matter.engine.world,starBody)

//
//
