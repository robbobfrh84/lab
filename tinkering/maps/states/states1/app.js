const GROUPS = [
  { id: 1, color: 'green', label: 'Group A', states: [] },
  { id: 2, color: 'red', label: 'Group B', states: [] },
  { id: 3, color: 'blue', label: 'Group C', states: [] },
]

const DEFAULT_HEADERS = [ 'id', 'name', 'pop', 'cap', 'au' ] 
const HEADER_KEYS = { id: "Abbr.", name: "Name", pop: "Pop.", cap: "Cap.", au: "Est.", sqm: "Sqr M", gdp: "GDP" }

let selectedGroup = GROUPS[0]
let selected_state_color = selectedGroup.color 
let unselected_state_color; // * declared in css '.state' and set in javescript.
svgContainer.innerHTML = statesJS // * assets/states_svg.js
const delay_fadin = 500;


/* 🎬 PRELOAD 🎬 */
build_map()
build_color_selector()

window.onload = ()=>{ 
  const mainSections = document.querySelectorAll('section')
  mainSections.forEach( (section, index) => {
    setTimeout(() => { 
      section.style.opacity = 1 
    }, delay_fadin + (index * 200) )
  })
}