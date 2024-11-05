const CONFIG = {
  states: CLIENT_STATES_DATA, // * from data/statesData.js
  groups: [ // * 🚨 NOTE: `id: 0` is reserved for All States group.
    { id: 1, color: 'green', label: 'Group A', states: [] },
    { id: 2, color: 'red', label: 'Group B', states: [] },
    { id: 3, color: 'blue', label: 'Group C', states: [] },
    { id: 4, color: 'orange', label: 'Group D', states: [] },
  ],
  unselectedGroup: { id: 0, color: '#505050', label: 'unselected' },
  headers: [ 'id', 'name', 'pop', 'cap', 'au' ], // * Default headers to show,
  headerKeys: { id: "Abbr", name: "Name", pop: "Pop.", cap: "Cap.", au: "Est.", sqm: "Sqr M", gdp: "GDP" }, 
  style: {
    delay_fade_in: 500,
  }
}

const SESH = {
  filteredStates: [], // * Built in app_preload()
  multi_group_patterns: [], // * Added in map.js when needed. 
}

const STATE = { // * This is setting the DEFAULT STATE, and replaced by Saved states.
  allStates: { sort: "name", order: "ascending" }, // * order: "ascending" or "descending"
  groups: CONFIG.groups,
  selectedGroupId: CONFIG.groups[0].id,
  unselectedGroup: CONFIG.unselectedGroup,
  headers: CONFIG.headers,
  showStateNames: true,
  showBubbles: true,
  showDC: false,
}

const app_preload = () => {
  map_build("svg_container")
  SESH.filteredStates = tk_sort(SESH.filteredStates, STATE.allStates.sort, STATE.allStates.order)
  groups_build()
  _toggleDC(true, true) // * 1st arg is "holdToggle" and prevents UI from toggling. 2nd arg is "holdTableBuild" and prevents a doulbe load of all states table.
  tables_build_allStates()
}

window.onload = () => { 
  const mainSections = document.querySelectorAll('section')
  mainSections.forEach( (section, index) => {
    setTimeout(() => { 
      section.style.opacity = 1 
    }, CONFIG.style.delay_fade_in + (index * 200) )
  })
}