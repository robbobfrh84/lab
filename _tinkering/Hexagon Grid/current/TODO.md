# Where I Left Off 
- https://stackoverflow.com/questions/52172067/create-svg-hexagon-points-with-only-only-a-length
- https://stackoverflow.com/questions/45773273/draw-svg-polygon-from-array-of-points-in-javascript
- https://stackoverflow.com/questions/42443730/using-svg-filter-to-create-an-inside-stroke


# To Do
- 🟡 Add orientation swap when Rotate button is pressed. 
  - Move back to menu: if the hex isn't empty. Alert "Create new hexMap?"
- Fix Stroke. decide on "empty" fill and stroke color
- Add actual elevation changes and update hexMapObj (Shift+Click to lower elevation) 
- SAVE > saves to localstorage array (make one if none). Just appends (can edit later)
- OPEN > opens page with "lists" "SAVE 1", "SAVE 2"
  - Add Edit to rename and delete buttons
  - Also checks in "/saved" folder for hard-coded ones. 
- Add UI directions for "Shift+Click". (?) button with info page?

# MVP 
- Add elevation colors when clicking, start at 0
  - Shift + Click lowers elevation.
- Easy "placeholder' for back end while in early development...
  - SAVE to local storage: `localStorage.HexigonGrids = [{name: 'bla', data: ''}]`
  - OPEN from Storage. DONE!

# POST MVP - 💐 What fun project will bloom 💐 from this?
- GAS Up back end for open & save.
