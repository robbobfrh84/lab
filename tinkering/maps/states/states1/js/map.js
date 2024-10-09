const build_map = () => {
  const statesSVG = prep_SVG()
  unselected_state_color = getComputedStyle(statesSVG[0]).fill
  build_states(statesSVG)
}

const prep_SVG = (svg) => {
  const paths =  Array.from(svgContainer.querySelectorAll('path'))
  const polylines =  Array.from(svgContainer.querySelectorAll('polyline'))
  let statesSVG = paths.concat(polylines)

  const filterStates = ['InteriorOutlines', 'DC']
  statesSVG = statesSVG.filter(state => !filterStates.includes(state.id))
  statesSVG = statesSVG.filter(state => state.classList.contains('state'))
  return statesSVG
}

const build_states = (statesSVG) => {   
  statesSVG.forEach(state => {
    add_state_click_event(state)
    // * statesData.push({ name: state.id, groups: [], }) // * here's how you would rebuilt the statesData object from the svg. 
  })
}

const add_state_click_event = (state) => {
  state.addEventListener('click', function() {
    const stateData = statesData.filter(s => s.name === state.id)[0]
    const newGroupIndex = GROUPS.findIndex(g => g.id === selectedGroup.id);
    if (state.style.fill && (state.style.fill != unselected_state_color)) {
      state.style.fill = unselected_state_color
      // ✨ We can handle multiple groups here! 
      // Even if it's several groups, it breaks down to this...
      // If the current group is NOT in the array, we add it to the array. 
      // If the current group IS in the array, we remove it from the array!
      const oldGroupIndex = GROUPS.findIndex(g => g.label === stateData.groups[0])
      GROUPS[oldGroupIndex].states = GROUPS[oldGroupIndex].states.filter(s => s.name !== stateData.name)
      stateData.groups = ["unselected"]
    } else {
      state.style.fill = selectedGroup.color
      stateData.groups = [selectedGroup.label]
      GROUPS[newGroupIndex].states.push(stateData)
    }
    build_tables()
  })
}