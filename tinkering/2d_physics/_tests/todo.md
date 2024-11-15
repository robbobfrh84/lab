# TO DO ✅ 🟡 🟠
- 

## `_tests/_overview`
- ✅ update `_tests/todo.md`
- ✅ Post blueSky
- ✅ Add "WIP" popup for settings icon
- ✅ Update file structure. 
- ✅ cleanup // 🔥 Rough Copy/Paste from `drop_on_blocks`
- ✅ fix default size first. then we'll go onto override size... after re-org config.
- ✅ fix resize to work for ratio.
- ✅ handle toolkit_update_image for `rounded` and `opacity`
- Tackle svg layers to place svg elements inside of.
  - how is this handled in config?
- Tackle rendering image vs svg
- Make option for wireframe. ? IS this an all or none ?  
- update sprites to have type: "image", "svg" (and "options" within)
  - sprites: options: "transparency(0-1)", "rounded(true/false)", customSize:{w:,h:}
    - use ball_bad_crop_example.png cropped as example. (move good drop to _assets)
  - 
- update sprites to fit space > options to override size.  
- create masks: two options `foreground`, `background` in `config.js` built in order.

- Let's deal with w/h...
  - I'm honestly thinking this is a container issues. really we just need to...
    - Make width 100% of container. Not an option because we can add widths margins by container(s) work. 
    - Then hight is determined by ratios. Can just do math do here...
      - 1, 9/16 or 16/9, or even 2/3, etc... 1 is square.
    - Then everything should be 0-1 now. 
    - But need a Max Width!
- add/update `matter_hellper_v1.0.js` & NEW `toolkit_v1.0.js`
- PUSH! ligit push with comment

- walls `w` dosn't make since. changing it dosn't seem to match... what's going on???
  - Should also handle 0 or 1 for width for a wall that is effectivly the visual wall.
- COPY/PASTE `/2d_physics_v1.1` -> `/_dependency_versions`
- PUSH! ligit push with comment

#### Un-Ordered To Do
- Mask walls - simple textures (add the 5 we have and test)
- matter_walls - add - Curved inset -   matter_walls: { w: 10, innerRadius: 10 },
- matter_walls - add - Curved inset and shaddow (border radius!!)
- Mask walls - add - drop shaddow
- Mask walls - add - Example of "Frills" Designs in corners (Like bike one.)



----
# 2D Physic Libraries

### MVP

### MVP + 1

### Daydreams / Down the Road...



----
# Example Post Ideas...

### "Ramp", rounded_corners
- avatar rolls down a ramp into a column of blocks 

### "Moving Static Bodies"
- Polygon that can be modified by points, 3(tryange), 4, 5, 6,.. 8(octogon)
  - Ok to be hard coded. 
- Button press on level flicks like a pin-ball paddle. But this object is static.  