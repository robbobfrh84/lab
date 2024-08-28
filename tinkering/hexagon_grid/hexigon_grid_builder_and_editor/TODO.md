# Where I Left Off 
- Rotate isn't really what you've implimented. Notice how 3x4 dosn't match when rotated, it's aligned properly, but is still 3x4, when it shold be 4x3. 
- BUT, we're also rotating 30 deg. our current example handles it as 90... 
- THIS could be pretty complicated, and margins will need to be handled, as well as code to calculate new sizes potentially 
- we "could" just use an svg rotate. BUT, if we wanna move to 3d, we'll need to plot it out knowing our true view angle.

# To Do
- ✅ block colors from changing at top and bott.
- ✅ Color changeing are getting off, add a color change, click rotate, see it went 1 one elevation. Need to fix that. 
- Create "/hexMaps" folder with "/tests" & "/templates" put `const HexMaptemplate` in.
- SAVE > saves to localstorage array (make one if none). Just appends (can edit later)
- OPEN > opens page with "lists" "SAVE 1", "SAVE 2"
  - Add Edit to rename and delete buttons
  - Also checks in "/saved" folder for hard-coded ones. 
- AFTER we can save: Let's just settle on ONE color palete, you can test well now
  - https://gis.stackexchange.com/questions/25099/choosing-colour-ramp-to-use-for-elevation?newreg=75ee7ced5400488eb1fb5edaec4ef533
  - I like the deep greens and white top elvations. can use "azure" as top ⭐️
- Create "/hexMaps" folder with "/tests" & "/templates" put `const HexMaptemplate` in.
- SAVE > saves to localstorage array (make one if none). Just appends (can edit later)
- OPEN > opens page with "lists" "SAVE 1", "SAVE 2"
  - Add Edit to rename and delete buttons
  - Also checks in "/saved" folder for hard-coded ones. 
- pushed through `buildHexGrid` the same as any. This should also use a new `hexMap.viewDegree`.
- 🙋🚨: Do we want the obj to be a 2d array. Or, rather just a single array with row/column directions? what makes more since for data storage? As long as it's a simple data parse. 
- Fix Stroke. make inset(make individual to polygon)
- reset if window resize.
- `HexMap.polygons` individual polygons shouldn't have color, because really it's just elevation. I just need to change how they're added in the first place and remove onclick where it's added to the hexMap object. So, `hexmaps`individual polygons shouldn't include color at all. just elevation. 
- Add UI directions for "Shift+Click"

# MVP 
- Add elevation colors when clicking, start at 0 (Shift + Click lowers elevation).
- Easy "placeholder' for storage while in early development...
  - SAVE to local storage: `localStorage.HexigonGrids = [{name: 'bla', data: ''}]`
  - OPEN from Storage. DONE!
- Solve for 6-angles: rotate "dynamic" grid with matching elevation changes. 


# POST MVP - 💐 What fun project will bloom 💐 from this?
- ? Add lines and dots layer to `hexMapObj`
- GAS Up back end for open & save.

----
### To Done (shorterm use only)
Sunday / Monday
- 
