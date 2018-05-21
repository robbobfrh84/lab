### Where I Left Off...
* Ok... now you fixed the odd thing with the highlighting being off when you were selecting 4 grid.
* now, selected multiple posts, then NOT selecting a new location, then trying to selected and move another doesn't work. they're conflicting with ids somehow.
* You used to actually have it dynamic classes with id names. that might be what you're missing now... 

### 3-step
* Start to build new post of appends... consider refactoring the rename refactoring you did on whiteboard.
* FIX: figure out if we should remove the re-set of the 9 grid, or use that part of page_showcase to build our actual grid and largethumb instead...
* ADD: multi-click and move blk
* STYLE: appends page parent
  * remove [view appends (2)] button.
  * make more obvious.
* ADD: appends section in accounts.

### To-Do
* BUG: open showcase, click sixteen, move blk down ONE, click 9, click 4. wrong boxes are highlighing
* ADD: clear button below swatch.
* ADD: "view" func on "accounts" to go to "appends" of post, even if empty.
* BUG: jumping around different types of "create" pages, causes errors. investigate...
* ADD: view append *if* it has some
* ADD: create a wire-frame box for galery thumbs. will make stand out more.
* REFACTOR: re-style create and create_append to have a more "set"/decided feel.
  * - HardCode sizes into create.css/main.css as well. may need 3x sets.
* REFACTOR: just make static 4/9/16 css for > .showcase-canvas-empty / -mask and remove from `_blkBuilds`

### Sprint
* Curate create page only for initial append... 1
* Clean code, test
* Create clone for Matt to play with
* email Matt
* Update this .md

### Down the Road
* Start building recursive
* Edit appends-create page to handle moves
* fill button for create
* clear all button for create
* transparent button.
* move blks from one post to other/combine posts before append.
* create clipboard 5-10  or so to drag/drop.

### resources
* Organized Colors: https://www.w3schools.com/colors/colors_groups.asp
