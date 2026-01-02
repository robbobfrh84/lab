# TOC 2025 - Hidden Values

Google Sheet: https://docs.google.com/spreadsheets/d/1JIXolkM-XXJJdzm33evUv-zXYT6XGuliEZmt4B4UdHw/edit?gid=242964432#gid=242964432

----
# Where I left off...
- Done with select chars part.

# To Do ✅ 🟠 🟡
🟡 Match:
- ✅ Offical and spar should be disabled to start.
- ✅ When both chars are selected, enable both buttons.
- ✅ Create events for both buttons to call and pass 3 vars to `simulate.js`
- ✅ Disable buttons, and force a clear press to set up again.
- ✅ Fix how selected chars look

- Fix Styling for both desktop and mobile on Match view!
  - ✅ Desktop: bolder name, i think that's it.
  - Mobile: generate all conditions and tinker (DONT FUSS TO MUCH!)
    - Maximise width.

- Quick fix, when we say "* This table is empty. click [Create]..."
  - Change that else to an `else if` that check for length of `chars.length > 0`
  - filtering out everything should just be blank
  - test for both.

Match Simulate:
- Ok, we need our decoder! probably need to look up in github!

Table:
- KISS!


# MVP - Simple 3-pages Home, Create, Fight

Pages: (All pages request sheet onload.)
- Home:   
  - Finish table 👇
  - Add Help / directions for creating new sheet (Just an alert box)
- Table:
  - row for 2x buttons [All] | [Regions] (default: all)
  - Display as Regions with titles and colors
  - Style with mobile in mind.
  - Style (I think you might just need to jump in)
- ✅ Create: 
  - Match Input Styling?
- Match: 
  - All being done now ☝️ in To Do section...

Cleanup: readme that MVP1 had been met, and to see "MVP+"
- Make sure you have directions to create a new sheet somwhere


---
### MVP - Pitch 
- I want to make it really easy to just add fighters to start a new regional bracket, or even just a round robin fun 1-time thing. could even be supplimented for football teams!
- But have raw, but clear directions on how to copy/paste a new table in the sheets
- Then update the sheet id and just start creating fighters and having matches as "spars" and "Offical Match"(keeps W/L)
- Allows me to write my own brackets tables. History isn't to be tracked.


----
### MVP+

History
- Add Match History
- Details page 
  - Shows history
- Match Details (Popup) shows if characters

Tables pages
- Create new
- changes what's on sheet

Password Protect
- Also add custom Gsheet id, not just sheet. 

