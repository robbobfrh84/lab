### Where I Left Off
- For adding the image to the svg, i'm starting with the circle and need to add a clip to the main svg. 
- Ok, see note in Body.js @66

# TO DO ✅ 🟡 🟠

## `_tests/_overview`
- ✅ Handle hard-coded svg images first. 
- ✅  Figureout rotate. 
- ✅  Add Shareena Insta... & setup funny while you refactor. 
- update for avatar with # hash image. 
  - Post

- More SVG initial building...
  - OK you MUST set for Matter JS, and here are the options..
    - 1. Default setting of location and size - No need to set(done for circle)
    - 2. Override by "100s" 's' meaning scale. 

- So... hight isn't 0-100 meaning x: 50, y: 50 isn't centered if 2/3 ratio. Think about how best to fix this. Could just handle "h" by ratio and might work. 

Static Objects
- Add a static_object
- Give static object an svg overlay
- create new static object that moves/rotates

Cleanup
- Should "options" be "render" just so that it matches Matter terminology?
- Let's review all the example and only have what is needed for use-cases/tests

#### Un-Ordered To Do (? Maybe move to later MVP!?)

- Walls and Backgrounds
  - Add Texture to background
  - Add texture to walls
  - Add Drop shaddow inset to background

- Add curved Object to put in courners (don't add to wall object, that's to specific)
  - Add to walls:`insetCurve: 10` (for all walls, anything else, just use static bodies)

- Convert to Progressive Web App (PWA) 
  - chatGPT guide: https://chatgpt.com/c/673e378a-5aec-8002-ac19-bf226b70abfc


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


----
# Example Post Ideas...

### "Ramp", rounded_corners
- avatar rolls down a ramp into a column of blocks 

### "Moving Static Bodies"
- Polygon that can be modified by points, 3(tryange), 4, 5, 6,.. 8(octogon)
  - `<` & `>` external muttons add/remove points, min 3, max 20,  
  - And this rotates and can be controlled by additional `<` & `>` buttons.
- And, under a Button press flicks a body like a pin-ball paddle. (static?)