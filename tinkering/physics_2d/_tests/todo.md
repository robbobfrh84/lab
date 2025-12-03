### Where I Left Off
- 🤔 NOTES FROM JUMPING BACK IN Dec 2025... (I"M lost 😵‍💫)
  - What i need is rounded corners. 
  - Originally, in this section i left myself this note: 
    - "OK! i think i got through Polygons and Trapazoids. Some refactoring next."
  - Don't yet understand the "Update fromVertices See body ~@173" section. 
  - Don't know what's going on with `svg_d_paths_curved`?
  - I need to jump in somewhere. Might be worth building a... 
    - `_core_example/CONFIGS/TEMP_messing_around.js`
    - Then just building out each example to re-orient myself.
  


# TO DO ✅ 🟡 🟠
🟡 `polygons_and_trapezoids` in `_core_examples`
- ✅ https://brm.io/matter-js/docs/classes/Bodies.html
- ✅ Get raw hardcoded `if poly` put in place... 
- ✅ Add solid SVGs
- ✅ Add SVG Stroke example (keep overflow)
- ✅ Add svg override example
- ✅ Add SVG with <g> images
- ✅ Add <g> example with image. 
- ✅ Added place for defs to be added in app.js
- ✅ Add `rotate` to main body object. 
- ✅ HAVE FUN! create a polygon onion of different sides and colors. 
- ✅ Finish adding trapezoids
- ✅ Review all test names in config & cleanup

Update fromVertices See body ~@173
- Remove "overrideOffSet" condition and use if `this.svgPos.v.length < 1`. Should be like polygons
- Refactor updateSVG to share values

Comment and PUSH

`svg_d_paths_curved` in `_core_examples`
- get working for matter x,y
- get working for matter ox,oy
- create 3 different angled ramp

(👀"chamfer") `rounded_corners`  in `_core_examples` 
- already have EMPTY rounded_courners in matter_js_demos
- https://brm.io/matter-js/demo/#rounded

`borders_rounded_courners` in `_core_examples`
- create rounded courners and make option for borders, give all 4 courners as arr.
- Here's where you also make option to `outset` borders.

`svg_borders_and_backgrounds` in `_core_examples`
- simple example without rounded corners
- review how these independent parts tie into the layers array for scaling....
- might need to clear out all _core_examples configs. 

`circle_and_rectangles` in `_core_examples`
- https://brm.io/matter-js/docs/classes/Bodies.html
- Um... maybe Base Choas is actually `circles_rectangles_and_avatars` Save the work?


Refactor / Cleanup / Clarify
- Should "options" be "render" just so that it matches Matter terminology?


Create new `_test` called `width_height_scale` (This is a bit of a tinker)
- So... hight isn't 0-100 meaning x: 50, y: 50 isn't centered if 2/3 ratio. Think about how best to fix this. Could just handle "h" by ratio and might work. 
- Set up an easy toggle between 600 v 1200, etc. 
- If the window allows for 1000x1000, they physics will behave differently. I think the fix for this is to lock in a width, 600, 1000, 1200? Then use `transform: scale()` to match window width. 

BOB > 👀 Ignor templates until after you've built some real stuff to know what works!

Finalize v1.1
- Review and give home to everything in `### To DOCUMENT (raw notes)` section
- Prume this `todo.md` and create seciton for next v1.2 MVP
- Move copy to `_dependency_versions`
- Create It's own REPOSITORY `physics_2d`. It's time. 

Snowman! 
- Build in `_tests`, this will be an example. but IGNOR updating framework!
- create readme outline and include (`# update Physic 2D lib`)
- Update what else should be done for `v1.1`

Cleanup / Breakup _core_examples. Individual `config.js`, etc... 
- ⛄️ Needed for snowman game 
  - ⚙️ complete_config
  - 🙆‍♂️ avatars. 
    - 6x - Svg & matter - Three `<<avatar>>` #local, #url, default
  - ⭕️ circles_&_squares
    - demo "over" scale
    - try for `<g></g>` groups and adding shadow layer. 
    - offset svg examples. (make sure to note x,y vs. oX,oY)
    - JUST ONE example for matter, the original box.png overscale. 
    🟡 -⛄️ 🔶 other_shapes
  - 💠 all svg shapes (Keep simple. Need a complex ref? >see shapes detailed example)
  - 🧱 static_bodies
    - include svg examples
    - ramps_&_rounded_courners
  - 🖼️ backgrounds_and_shadow_layers
    - Make walls offset
    - Add textures
    - Add Drop shaddow inset to background
    - Add curved Object to put in courners (don't add to wall object, that's to specific)
      - Add to walls:`insetCurve: 10` (for all walls, anything else, just use static bodies)
  - 🌋 moving_static_bodies: https://codepen.io/jinjor/pen/XWxvNQL
  - ☄️ options explore
  -⛄️ 🪟 tracking_zone_events
  -?⛄️ 🍡 binding_bodies_in_motion: https://brm.io/matter-js/demo/#collisionFiltering
- Remove unused images. 

Development helper UI
- It'd be really nice to have a mouse over that gives you x,y for pixels, percentages and then if you click an object you get relative location...

### To DOCUMENT (raw notes)
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
- Find good place for Matter JS docs uses, like...
  - https://brm.io/matter-js/docs/classes/Bodies.html
- explain how we can use the toolkit function `gen_poly_pts(7,7,90)` to build and rotate svg polygons.
- explain how `rotate` uses 260 and is applied to matter at root Body level.
  - See polygon examples 
- explain how we can use app.js to put svg `<defs>` in svg elm. 
  - See polygon examples 


#### Un-Ordered To Do (? Maybe move to later MVP!?)

- ...

----
# Physics 2d Library

### 🟡 MVP - Basic Setup: 
- ✅ `#url` images for avatar.
- layers
- zone tracking
- backgournds
- curve static
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

