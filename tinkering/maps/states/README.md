# US States Thematic Map Builder
Building an interactive US states map for blog posts.

### To Do 🟡 ✅ 🚨
- Finishing implimenting HEADER_KEYS > should loop DEFAULT HEADER instead of state obj.
- Finished Capitolize Global vars. 
- 🟡 REVIEW this README.md > Plan next


### Unordered To Do
👤 Title & Info box:
  - Title with a lot of letter spacing
  - INFO on HOVER: 🤔 Need to consider All three containers map,colors,tables... 
三 Menu Bar (top right section)
  - Info icon > modal > general info about map / .gif examples.  
🗺️ Map Container:
  - Tighten up mobile margins and padding.
  - multi-color gradient: https://chatgpt.com/c/67043849-20dc-8002-808d-8bedcd4e7a70
  - Hover previews selected color.
  - Add lines and bubble for small states.
  - Add zoom in / out 
  - Handle click drag (browser + Mobile will differ)
🎨 Color Selector: 
  - Create select all(remaining)
  - Deselect all: Basic confirm modal
  - Add color: 
    - Group name lable & input
    - Modal w/ 12 colors swatch 
    - hash value with 3x sliders for "custom"
    - Save button
  - Edit color: Add edit button next to (+) button 
    - Modal of list of colors with names
    - click color opens in Add color modal (but with "update" button gray if no change)
🎼 Group Tables: 
  - Adding sort. 
  - Style
🖥️ Browser:
  - Find us outline .png for icon (put something fun inside... sparkle?)
  - Create browser tab icon & Review Tab Title still matches.   
✨ Misc. Enhancements / Refactor
  - ...


### MVP - Group Map Builder
- Clean Framework: resizing, framing, zooming, transitions, hovers.
- Title Info button(top right): Modal with content/directions/examples/links etc...
- Lists (Groups) Section(s):
- Post: 
  - Copy/Paste into `posts/blog/states1` 
  - Add a Substack subscribe box at bottom with message about "Subscribe to... for more updates and more interactive data, games and other web apps. Also, I create and write about open-source Software Development."


### MVP - Download .csv (or .xml/google sheet) & Png & Svg
- Create new folder `states2`
- Move detailed notes 👇... to Unordered 👆 and simplify MPV outline.

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
