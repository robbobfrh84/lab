# US States Thematic Map Builder
...Thoughts
- 

### To Do 🟡 ✅ 🚨
- ✅ let's rename all `/js` function with the prefix `map_...`, etc..
- multi-color gradient: https://chatgpt.com/c/67043849-20dc-8002-808d-8bedcd4e7a70
  - ✅ see states_svg at top for hardcoded griant guide. 
  - ✅ make multi placeholder `pink` and when clicked again it removes
  - need to add state to current group table when pink
  - need to remove state from ALL groups when unselected from pink
  - make `map_fill_state()`



### Unordered To Do
- 👤 Title & Info box:
  - Title with a lot of letter spacing
- 三 Menu Bar (top right section - consider more room for other icons )
  - Info icon > modal > general info about map / .gif examples.  
- 🗺️ Map Container:
  - Tighten up mobile margins and padding.
  - handling multi group in STATE... kinda need to think about this... see inline notes in add_state_click_event 
  - Add lines and bubble for small states.
  - Add zoom in / out 
    - Handle click drag (browser + Mobile will differ)
- 🎨 Color Selector: 
  - Create select all(remaining)
  - Deselect all: Basic confirm modal
  - Add color: (No sliders this MVP)
    - Group name lable & input
    - Modal w/ 12 colors swatch 
    - Save button
  - Edit color: Add edit button next to (+) button 
    - Modal of list of colors with names
    - click color opens in Add color modal (but with "update" button gray if no change)
- 🎼 Group Tables: 
  - Adding sort. 
  - Style
  - ? HOw do we handle if a state is in multiple groups? 
- 🖥️ Browser:
  - Find USA country icon outline .png for icon (put something fun inside... sparkle?)
  - Create browser tab icon & Review Tab Title still matches.   
- ✨ Misc. Enhancements / Refactor
  - INFO on HOVER: 🤔 Need to consider All three containers map, colors, tables...  
    - show selected color's group name.
    - show state name
    - shows edit buttons details. 
    - show header full name sqm = "Total Square Miles"
  - White is too white. Our white lines, around states, buttons are kinda "Stingy" let's take this moment to create a /css and break apart and add _vars.css and add white. 

### Misc... MVP
- Add a number count column, that can be reversed so that the states that show up are added to the top NOT bottom. 

### 🟡 MVP - Group Map Builder
- Clean Framework: resizing, framing, zooming, transitions, hovers.
- Title Info button(top right): Modal with content/directions/examples/links etc...
- Lists (Groups) Section(s):
- Post: 
  - Copy/Paste into `posts/blog/states1` 
  - Add a Substack subscribe box at bottom with message about "Subscribe to... for more updates and more interactive data, games and other web apps. Also, I create and write about open-source Software Development."


### MVP - Download .csv (or .xml/google sheet) & Png & Svg
- Create new folder `states2`
- Move detailed notes 👇... to Unordered 👆 and simplify MPV outline.
  - Add color: 
    - hash value with 3x sliders for "custom"

三 Menu Bar (top right section)
  - Info icon > modal > general info about map / .gif examples.  
  - Menu icon > modal > buttons (Handle show hide) *See polygons
  - Add "Upload Map" button  
  - Add "Download Map" Button
  - Create 🛠️ Dev tests bottom section & Add hardcoded maps to upload


### MVP - Heat Map
- Create new folder `states?`
- Move detailed notes 👇... to Unordered 👆 and simplify MPV outline.


### MVP (Blog Post) - Adding AI
- Create new folder `states2`
- Move detailed notes 👇... to Unordered 👆 and simplify MPV outline.

- Theme: Thematic Map Generator with AI
- Various Changes
  - Let's remove less static things from `statesData`. like population/GDP can change. better to let AI answer that. 

### MVP (Blog Post) - Adding Authentication and DB
