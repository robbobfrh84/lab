# Where It's At
- ... AH, the audio is long like 89 sec. so need to trim the actual length on garagaband and resave. 
- Then > See who uses fade in/out still...

# Next 3 ✅ 🌕... 
🌕 Solid buzz update
- 🌕 make 30-to-60 buzz background sound
- Remove unused audio code. fade in/out?
- Maybe: have all audio global in array or objects 
  - `audio = [{audio: new Audio(file), name: "buzzes" }]`

# To Do ✅ 🌕

BUG: when a single bee returns. They eyes look at it, but there isn't a delay
- but just do `setFace(0,0,300)` and you'll see the 300m delay
- So probably just something you may have forgot to add.

Final Tinker 
- Audio levels.
- Eyes look around during sparkles.
  - Need to ignor mouse/touch & resetFace first.

Info Page
- The look should be written over the the "white" background with face and bees gone.
- To go back: hit the info (or reset) button to "reset" page. 

MOBILE 
- thoughtfully figure out resonable solution for this
- Set up dev env for mobile. 
  - Find the hot reload so you aren't 'jumping through hoops' testing
  - figure how to get logs 

Post on 
  - IG Post (GIF and live link & credit hanna (link to both images) )
  - Twitter post with live and gif
    - follow up with IG link in replies (message - 'i'm here now too')

Testing
- Desktop Chrome
- Desktop Firefox
- Desktop Safari
- Mobile Chrome
- Mobile Firefox
- Mobile Safari



----
# Resources

How to find what element touchmove is over and when to detect change. 
- https://stackoverflow.com/questions/59855116/stop-touchmove-event-when-finger-is-not-on-the-element-anymore-but-still-presse

Detect offset locatin of touchmove
- https://stackoverflow.com/questions/33548926/how-to-detect-touchmove-length-offsets - See LAST non-JQ answer. 
