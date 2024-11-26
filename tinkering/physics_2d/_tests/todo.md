### Where I Left Off
- I left off thinking maybe Body's can do more work and make more since as we continue. just feels like more at this point cus your 1/2 done and there's going to be a lot of code to remove and re-order. 
- The Helper boject feels big and redudent. I just think we've decided to preserve the original code. we COULD do something like `b.Body.config = savedConfigBody`

# TO DO ✅ 🟡 🟠

## `_tests/_overview`
- ✅ create scale_bodies()
- ✅ `'circle'` -> `'cir'` ? in config file
- ✅ check walls again to see if you can "pre-scale" w,h
- ✅ `if (b.options?.resize)` Move to Body, same thing!
- ✅ create add_bodies
- ✅ Push code for pre-removal of notes
- ✅ Move all add bodies code into Bodys
- Push before Body refactor
- Refactor Body to matterObj
  - Also sprite. make sure it's seemly added to matterObj too. 
- Scale svgs
- Only Add to the Helper class and modify those changes. We should maintain config.
- 🟡 Handling walls / refactoring...
  - First at `build_walls` lets add `bodies` & remove "setting" the bodies there
  - Then a new function `add_walls` sets them.
- Build out class Body

- Scale svgs
- How can we better handle `options`
- Svgs ELEMENT attributes need to be resized, 
- 🟡 Make custom 0-100 Range for all bodies 
- root name still need to change to physics_2d

- Extend `Helper` to add `Helper_Bodies.js`. 
  - Should we create `Body.js` It wouldn't be much. 

- Let's setup dyanmic layer tracking for svg. (see tourdefrance in shed)

- Ok, avitar needs to be SVG! and use #<url>!
- PUSH! ligit push with comment

- COPY/PASTE `/physics_2d_v1.1` -> `/_dependency_versions`
- review all code for notes / cleanup.
- PUSH! ligit push with comment

#### Un-Ordered To Do (maybe punt to later MVP)
- Add basic static block with `html` mask
- Add button to basic static block with html that remove the matter & overlay.
- Add basic static curve

- Walls and Backgrounds
  - Add Texture to background
  - Add texture to walls
  - Add Drop shaddow inset to background
  - Add to walls:`insetCurve: 10` (for all walls, anything else, just use static bodies)
- Mask walls - simple textures (add the 5 we have and test)

- resize event? ()
- Convert to Progressive Web App (PWA) 
  - chatGPT guide: https://chatgpt.com/c/673e378a-5aec-8002-ac19-bf226b70abfc

- Info
  - negative thickness (-) on rectanges seems to be visually 0 BUT has effect!
  - However, setting =0 seems to break matter and not show up OR take effect

- Review code as MVC and make basic notes about code structure in a ?new readme.md at `/_tests` root level. 

----
# Physics 2d Library

### MVP (prep for Odd balls)
- `#url` images should work.

### MVP + 1

- Consider adding a "demo" changer from a list in a menu popup. use US Maps component.
  - Then, create a folder inside `_core_examples` of `/configs` so we can toggle through different examples easy. 
- Drag and drop to update avatar image. 
- Create a `_DOCs.md` that has all config settings and options layed out. 

- Fast moving objects escape body. Look into matter js for a way to handle this.
  - Fall back to just making the wall exists in negative space a bunch.

`_core_examples` menu toggle tests to add.
  - Bounce box demoing mass and multi-bodies objects.

### MVP++ Daydreams & Down the Road...

Wait for usecase...
- Add a layer type 'html'? I think it'd be pretty easy, just build around a `<div>` instead of an `<svg>`. One usecase could be .gifs. I'm not sure they work in svgs 


----
# Example Post Ideas...

### "Ramp", rounded_corners
- avatar rolls down a ramp into a column of blocks 

### "Moving Static Bodies"
- Polygon that can be modified by points, 3(tryange), 4, 5, 6,.. 8(octogon)
  - Ok to be hard coded. 
- Button press on level flicks like a pin-ball paddle. But this object is static.  