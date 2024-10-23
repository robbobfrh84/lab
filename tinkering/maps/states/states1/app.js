const _config = {
  states: CLIENT_STATES_DATA, // * from data/statesData.js
  groups: [
    { id: 1, color: 'green', label: 'Group A', states: [] },
    { id: 2, color: 'red', label: 'Group B', states: [] },
    { id: 3, color: 'blue', label: 'Group C', states: [] },
    { id: 4, color: 'orange', label: 'Group D', states: [] },
  ],
  unselectedGroup: { id: 0, color: '#505050', label: 'unselected' },
  headers: [ 'id', 'name', 'pop', 'cap', 'au' ], // * Default headers to show,
  headerKeys: { id: "Abbr.", name: "Name", pop: "Pop.", cap: "Cap.", au: "Est.", sqm: "Sqr M", gdp: "GDP" }, 
  style: {
    delay_fade_in: 500,
  }
}

const _sesh = {
  filteredStates: [], // * Built in app_preload()
}

const STATE = { // * ✨ This is setting the DEFAULT STATE, and replaced by Saved states.
  groups: _config.groups,
  selectedGroupId: _config.groups[0].id,
  unselectedGroup: _config.unselectedGroup,
  headers: _config.headers
}


const app_preload = () => {
  svgContainer.innerHTML = statesJS
  map_filter_states()
  map_build()
  color_selector_build()
}

window.onload = () => { 
  const mainSections = document.querySelectorAll('section')
  mainSections.forEach( (section, index) => {
    setTimeout(() => { 
      section.style.opacity = 1 
    }, _config.style.delay_fade_in + (index * 200) )
  })
}