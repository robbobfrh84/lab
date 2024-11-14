# US Thematic Map Builder
-

### To Do 🟡 ✅ 🚨 (✋ PUSH CHANGES -> 👀 Actually review changes!)
- ✅ Break up main.css
  - You changed your mind. rather do `.group .elms`
    - see: https://chatgpt.com/c/672cfeb3-2694-8002-8a36-c17882f6a5e9
  - Example: You changed to` group_elms` fix and update
  - See index.html where i've added `map`, `groups`, `tables` to class.
  - Review and update sitewide: include `state_svg.js` in `map.css`
- Update states_svg classes and ids to be `map_`...?
- Finish implimenting sort for ALL GROUPS and all states table. 
  - 👀 Starter code is there NOTED OUT from Copilot....
✋ PUSH CHANGES -> 👀 Actually review changes!


- Let's Add a settings icon (use ai) > top right and "topNav" section
  - Add header `"US Map Data" Powered by Gemini AI` - (mapdata.farm)
  - Clicking opens "clean-ish" layout of dev tools.
  - make a sub-section (keep in html) that includes _dev_tools.js. But all we've built so far should be normal Settings options.

✋ PUSH CHANGES -> 👀 Actually review changes!

- Review and match how all html is added site-wide (_dev_tools too.)
  - This will be mostly in maps and tables (some in group too). might take some decent work here.
✋ PUSH CHANGES -> 👀 Actually review changes!

🚨 Major Pruning, dissolved this `### To Do` into MVP and Prune there.
- Try to really have a since of mvp now. BIG QUESTION, when do we want to add AI?
✋ PUSH CHANGES -> 👀 Actually review changes!


- Adding "spectrum" map (This needs be thought out and planned before jumping in)
  - could start by having a "Spectrum ( ▻ ) " button in each tab of the all group.
- Modal: 
  - Review and refactor AI Add & Edit groups code....
  - When color or name is changed, the STATE.groups.states need to be changed too..
  - And, we need to update the maps colors too. Updating the the STATE might just work. BUT, maybe not, i think i still need to call the correct function...
- Add Raw group color change
  - Have 12 options (2x rows)
  - Changing after groups have been selected should change: map, multi, list.
- ✋ PUSH CHANGES -> 👀 Actually review changes!


- New UI idea: see notepad drawing notes and Wireframe.
  - 🚨 This needs be thought out and planned before jumping in
- Clean `### Unordered To Do` & `mvp`
  - Break up MVP to be ready to post sooner. `list` stuff can just be stylized as is and updated in another post with save. Make the focus just simple map building with names.
  - Could also talk about first post that you're building it toward AI. 

### Unordered To Do
- 👤 Title & Info box:
  - Title with a lot of letter spacing
- 三 Menu Bar (top right section - consider more room for other icons )
  - Info icon > modal > general info about map / .gif examples.  
- 🗺️ Map Container:
  - Tighten up mobile margins and padding.
  - Add zoom in / out 
    - Handle click drag (browser + Mobile will differ)
  - Add stroke to all states and (? remove inbetween state lines ?)
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
  - Groups Column with small color dots that have tooltip of group name when hovered 
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

### 🟡 MVP - Group Map Builder
- Clean Framework: resizing, framing, zooming, transitions, hovers.
- Title Info button(top right): Modal with content/directions/examples/links etc...
- Lists (Groups) Section(s):
- Post: 
  - Add README.md overview in `states1`. This one is at a higher level. 
  - Copy/Paste into `posts/blog/states1` 
  - Add a Substack subscribe box at bottom with message about "Subscribe to... for more updates and more interactive data, games and other web apps. Also, I create and write about open-source Software Development."

### ~ Misc... MVP
- Add a number count column, that can be reversed so that the states that show up are added to the top NOT bottom. 
- Add Puerto Rico?

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
- 

# Reources
- multi-color gradient: https://chatgpt.com/c/67043849-20dc-8002-808d-8bedcd4e7a70
