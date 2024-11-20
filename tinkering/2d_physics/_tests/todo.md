### Where I Left Off
- Also, Started adding layers, but realized it may be worth updating matter's w/h.
  - Which will mean I'm going to need to translate all the X,Ys to 0-1 ranges.
  - wondering is 0-100 might be better

# TO DO ✅ 🟡 🟠

## `_tests/_overview`
- ✅ Convert to `physics_2d` & ✅ rename `_core_examples`
- ✅ Fixed layer blocking issues
- switch to 100% & add Max-width
- set hight to be determined by ratios. Can just do math do here...
  - 1, 9/16 or 16/9, or even 2/3, etc... 1 is square.
  - margin's are will be in .css outside of config's order
- Make custom 0-100 Range for all bodies.

- Let's setup dyanmic layer tracking for svg. (see tourdefrance in shed)

- walls `w` dosn't make since. changing it dosn't seem to match... what's going on???
  - Should also handle 0 or 1 for width for a wall that is effectivly the visual wall.

- Ok, avitar needs to be SVG! and use #<url>!
- PUSH! ligit push with comment

- COPY/PASTE `/physics_2d_v1.1` -> `/_dependency_versions`
- review all code for notes / cleanup.
- PUSH! ligit push with comment

#### Un-Ordered To Do
- Add basic static block with `html` mask
- Add button to basic static block with html that remove the matter & overlay.
- Add basic static curve

- Walls and Backgrounds
  - Add Texture to background
  - Add texture to walls
  - Add Drop shaddow inset to background
  - Add to walls:`insetCurve: 10` (for all walls, anything else, just use static bodies)
- Mask walls - simple textures (add the 5 we have and test)


----
# Physics 2d Library

### MVP (prep for Odd balls)
- `#url` images should work.

### MVP + 1
- Add a layer type 'html'? I think it'd be pretty easy, just build around a `<div>` instead of an `<svg>`
- Consider adding a "demo" changer from a list in a menu popup. use US Maps component.
  - Then, create a folder inside `_core_examples` of `/configs` so we can toggle through different examples easy. 
- Drag and drop to update avatar image. 
- Create a `_DOCs.md` that has all config settings and options layed out. 

### MVP++ Daydreams & Down the Road...



----
# Example Post Ideas...

### "Ramp", rounded_corners
- avatar rolls down a ramp into a column of blocks 

### "Moving Static Bodies"
- Polygon that can be modified by points, 3(tryange), 4, 5, 6,.. 8(octogon)
  - Ok to be hard coded. 
- Button press on level flicks like a pin-ball paddle. But this object is static.  