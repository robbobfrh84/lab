# Where It's At
- 🤔 I finished realizing the touch even should probaby just be the entire document. 
  - 🤔 Then, just solve for elements with specific classes or ids 
  - ✅ So that's what I've done, 
    - 🌕 but in app.js there still the old code needed to be removed❌ 


# Next 3 ✅ 🌕... 
- 🌕 Mobile
  - ✅ 🌕 Tap starts hover effect 
  - ✅ 🌕 make hover over bees fire (use offset)
    - ✅ 🌕 make starting with tap + drag on a bee work
  - ✅ 🌕make first hover on body, THEN hover over image work. 
  - Ok... 2x ways to move
    - Tap(`ontouchstart`) + Tap(`ontouchstart`)
    - Swipe! `ontouchstart` > `ontouchmove` > `ontouchend`
    - AND, either works and first or second option with `bee.isHover`
- finish trimming tracks
- Photoshop sparkles. 

# To Do ✅ 🌕

🌕 Mobile ~~~

audio
- Add hanna "oooooOOOOoooo" sound effect for sparkles
- Trim audios
- start by having all bees out of screen.
- then fly in one by one with sound.  
- add sound effect
  - 4x individual resting bee sounds
  - struggling (hover) bee sound
  - hanna sigh sound.
  - hanna 'oh' when return. 

Sparkles
- photoshop 
- make hanna "ooooOOOOoooo" sound effect 
- Randomly place over image (minus 5-10%), add 1 every like .2s fadin/out over 1s for like 3-4s. fade all out? bees come back!
- End with "oh" sound effect. 

Starting sequence
- Make "Click/Tap to enter dynamic
- Add fade-in / out effect
- Let's stack "Click/Top to" as smaller font above "enter" with dividing line.

Info Page
- Start by writing it out in "Starting Sequence"
- Then, you can opacity 0 it. and cross fade like on start but then fade the info in...

Finalize
- test on mobile

After done
- Create code pen 
- Send to hanna (ask if i can posts a gif / video)
- IG Post (GIF and live link & credit hanna (link to both images) )
- twitter post with live and codepen link 
  - follow up with IG link in replies (message - 'i'm here now too')

~~~
- ...


# Resources

How to find what element touchmove is over and when to detect change. 
- https://stackoverflow.com/questions/59855116/stop-touchmove-event-when-finger-is-not-on-the-element-anymore-but-still-presse

Detect offset locatin of touchmove
- https://stackoverflow.com/questions/33548926/how-to-detect-touchmove-length-offsets - See LAST non-JQ answer. 
