# Where I Left Off 
- Rotate isn't really what you've implimented. Notice how 3x4 dosn't match when rotated, it's aligned properly, but is still 3x4, when it shold be 4x3. 
- BUT, we're also rotating 60 deg. our current example handles it as 90... 
- THIS could be pretty complicated, and margins will need to be handled, as well as code to calculate new sizes potentially 
- I also think there's actually 12 views if we're handling flat edge and point edge.
- we "could" just use an svg rotate. BUT, if we wanna move to 3d, we'll need to plot it out knowing our true view angle.

# To Do
- ✅ Reviewed where I left off
- ✅ Add Readme and Dissolve resoure links. 
- ✅ Quick review of this file. 
- ✅ Finished github copilot tutorial (add to vs code guide or keep as own file?)
- ✅ Cleanup Dev UI > 🛠️ {🔄} Deg:[]
- ✅ Gut dead code that's noted out from canvas. 
- ✅ impliment svgWidth 
- ✅ create a new `hexMapUI.js`
- ✅ Refactor:  `buildHexMap`(replace `buildPolygons`?)
- ✅ Impliment svgConfig svgWidth for both "%" & "px" should drop drop into css as str..
- ✅ Set for default empty hexgrid that get's build onload, BUT the `obj` needs to be pushed through `buildHexGrid` the same as any. This should also use a new `hexMap.viewDegree`.
- STOP! Let's get the unpunished `current` folder from GitHub website > download and add to set with date change. `/before_08_2024_refactor`
- Color changeing are getting off, add a color change, click rotate, see it went 1 one elevation. Need to fix that. 
- Top Color oes back to bottom. But make reverse (Shiftclick) go from bottom to top.
- 🙋🚨: Do we want the obj to be a 2d array. Or, rather just a single array with row/column directions? what makes more since for data storage? As long as it's a simple data parse. 
- Fix Stroke. make inset(make individual to polygon)
-  🙋🚨: How do we handle angle. Can we just use rotate (and then re-visualize 3d perspective from new bottom up?)
- Create "/hexMaps" folder with "/tests" & "/templates" put `const HexMaptemplate` in.
- ⭐️ Impliment rotate (Break down tasks...)
- SAVE > saves to localstorage array (make one if none). Just appends (can edit later)
- OPEN > opens page with "lists" "SAVE 1", "SAVE 2"
  - Add Edit to rename and delete buttons
  - Also checks in "/saved" folder for hard-coded ones. 
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
