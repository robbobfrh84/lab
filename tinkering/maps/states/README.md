# US States Thematic Map Builder
Building an interactive US states map for blog posts.

### To Do 🟡 ✅ 🚨
- ✅ Convert `statesObj` to `statesData` = [] * AS ARRAY
- ✅ we shouldn't need to pass any arguments within the app.js onload.
- ✅ BUG: create a green state > click red > click same state
- ✅ Once done, it should be saved ass `statesData.js` HARDCODED!
- ✅ add id to be abbreviations
- ✅ Test feeding Gemini statesData 
- Finishing implimenting HEADER_KEYS > should loop DEFAULT HEADER instead of state obj.
- Finished Capitolize Global vars. 
- REVIEW this README.md > Plan next


- Hover over should really show what the next color is going to be. I think this is just a quick change of the css's hover background color on color change.

- Settle on mobile margins and padding.
  - This really needs to be tightened up for mobile.
- Zoom Browser: ? How do I wanna handle this?
- Zoom Mobile: ? How do I wanna Handle this?
- User story: Think about this before jumping into thoughts on different colors
  - Onload: User just wants to click a state and see what happens. 
  - So maybe we have a "default"("green") group that starts to populate as you click.
- INFO on HOVER: 🤔 Need to consider All three containers map,colors,tables... 

- Table Design
  - How to handle abbreviations

Unordered
- Create select all and Deselect all button
- Menu
  - Menu icon > modal > buttons (Handle show hide) *See polygons
  - Add "Upload Map" button  
  - Add "Download Map" Button
  - Create 🛠️ Dev tests bottom section & Add hardcoded maps to upload
  - Add test objects to menu button
- Enhancements
  - Allow multi-colored / group states. 
- Create browser tab icon & Review Tab Title still matches. 

### MVP (Blog Post #1) - Creating and saving maps (.png map & .csv data)
- Framework:
  - Mobile/Desktop resizing, framing, zooming.
- Title info button & modal:
  - Add title with a lot of letter spacing
  - Add a info icon (i) to the right of map
  - Create an info icon 
- Lists (Groups) Section(s):
  - ...This needs thoughts...
- Download .png from map svg and .csv from Lists section
- Post: 
  - Copy/Paste into `posts/blog/states1` 
  - Add a Substack subscribe box at bottom with message about "Subscribe to... for more updates and more interactive data, games and other web apps. Also, I create and write about open-source Software Development."

### MVP (Blog Post #2) - Adding AI
- Create new folder `states2`
- Theme: Thematic Map Generator with AI
- Various Changes
  - Let's remove less static things from `statesData`. like population/GDP can change. better to let AI answer that. 

### MVP (Blog Post #3) - Adding Authentication and DB