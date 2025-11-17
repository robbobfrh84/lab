RAW DOC (Cleanup and move to `TEMP_WIKI.md`): 

Folders and files
- Folders should aways be lowercased by default.
- Folders of individual components are Capitolized, signifying that it's a component/page `Home/Home.js`

HTML structures and CSS for .embed and .place.
- .place needs id to place in within parent component. So choose a good semantic html for that.
  - .embed does not. however, placing it in a good semantic html, just like you would if it were .place keeps things consistant and clear.
- Unlike react. we don't need to 
- Style id within component, rather than parent component. This is where it can get a bit confuing, but ideally, we'll treat the "shell" element in the parent component as if it were in the child component. 

CSS with Embed Parent Element Example with Ids
- In header, we have an element with a .embed <nav id="NavButton">${NavButton.Embed()}</nav>. But we have styles we want to apply Externally AND internally. 
- User `#Header nav {}` OR `#Header #NavButton`, i chose the former, just to clarify the external styling, but I could only do that because there was one `nav` child. So in many cases you'll have to directly style using the Id.
- Then internal styling will be in `NavButton.css` > `#NavButton {}`

Component Id and class naming
- id: should always be prefixed with the name of the component, `Profile_saveBtn`, etc. They should also use `_` to seperate terms/words
- class: Also prefixed with component name, but use `-` instead `Profile-image-container`, etc.

Testing
- Dementions we support and test 320x568(iphone 5) - to - 800x800(desktop)

Development notes: Gotchas, hangups & oddities
- `aspect-ratio` doesn't seem to work on iphone chrome
  
----
# Disolve into Arcade Main Dev Repos wiki

### .embed and .place structure and styles
