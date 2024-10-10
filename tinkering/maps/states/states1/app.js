const _config = {
  data: CLIENT_STATES_DATA, // * from data/statesData.js
  groups: [
    { id: 1, color: 'url(#striped-pattern)', label: 'Group A', states: [] },
    { id: 2, color: 'red', label: 'Group B', states: [] },
    { id: 3, color: 'blue', label: 'Group C', states: [] },
  ],
  unselectedGroup: { id: 0, color: '#505050', label: 'unselected' },
  headers: [ 'id', 'name', 'pop', 'cap', 'au' ], // * Default headers to show,
  headerKeys: { id: "Abbr.", name: "Name", pop: "Pop.", cap: "Cap.", au: "Est.", sqm: "Sqr M", gdp: "GDP" }, 
  style: {
    delay_fade_in: 500,
  }
}

const STATE = { // * ✨ This is setting the DEFAULT STATE, and replaced by Saved states.
  groups: _config.groups,
  selectedGroup: _config.groups[0],
  unselectedGroup: _config.unselectedGroup,
  headers: _config.headers
}

const preload = () => {
  svgContainer.innerHTML = statesJS
  build_map()
  build_color_selector()
}

window.onload = () => { 
  const mainSections = document.querySelectorAll('section')
  mainSections.forEach( (section, index) => {
    setTimeout(() => { 
      section.style.opacity = 1 
    }, _config.style.delay_fade_in + (index * 200) )
  })
}