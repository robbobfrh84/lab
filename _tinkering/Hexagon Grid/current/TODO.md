# Where I Left Off 
- You'd fixed the 2d array layout of columns and rows. it was all confused
- THEN, realized there are TWO hexagon orientations to display
  - When an edge points UP and DOWN and when they point LEFT & RIGHT
- SO... NEED. TO. FINISH. adding the "Rotate" button in the menu toggled the layout with
  - ...a new var: this.orientation = "left-right" / "up-down"

- NOTE: I turned OFF **HOVER** ! in events.js it was messing with row/column flip work. 
- need to fixe canvas size, it's all off

# To Do
- 🟡 Setting the grid, 
  - ✅ Set the grid static (Keep size dynamic?)
  - Keep same grid numbers but expand individual sizes to fill available space. 
  - need to fix canvas size, it's all off & center grid...
  - Consider mobile. So square? - 32x32 ? 
  - IDK... 😭the grid as a Hexagon is what i really want.
- OK... Should we flip to SVG? hover will be WAY easier. AND, we can save data AS SVG files, which I kinda like. 
- background color? white or black / grain ? (See _shed: i kinda liked darker better...)

# MVP 
- Add elevation colors when clicking, start at 0
  - Shift + Click lowers elevation.
  - ? Add a key: it shows all levels & when you hover it highlight the current elevation.
- Easy "placeholder' for back end while in early development...
  - SAVE to local storage: `localStorage.HexigonGrids = [{name: 'bla', data: ''}]`
  - OPEN from Storage. DONE!

# POST MVP - 💐 What fun project will bloom 💐 from this?
- GAS Up back end for open & save.
