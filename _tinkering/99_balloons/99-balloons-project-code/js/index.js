/*    index.js File Notes...

- This is the "root" Javascript file
- The first file to load to the DOM(Document Object Model).
- Hold Major game settings(🌍 GLOBAL 🌍 variables).
- Handle setting initial varables to the DOM

*/


// ⛰ CONSTANT VARIABLES
const balloon_total = 99
const intial_delay = 500 // in milliseconds
const balloon_color_wheel = [
  "cornflowerblue",
  "firebrick",
  "goldenrod",
  "purple",
  "green",
]

// 🦅 VARIABLES that "will", or "may" Change
let release_speed = 1000  // in milliseconds

// 🌍 VARIABLES that are global, BUT no intial value
let balloons_gone_by = []
let balloons_popped = []


function set_init_vals(){
  const title = document.getElementById("main-title")
  title.innerHTML = "🎈"+balloon_total+"🎈 Balloons"
}

window.onload = set_init_vals()
