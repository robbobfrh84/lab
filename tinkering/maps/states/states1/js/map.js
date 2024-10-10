const build_map = () => {
  const statesSVG = prep_SVG()
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
    state.style.fill = STATE.unselectedGroup.color
    state.groupId = STATE.unselectedGroup.id
  })
}

const add_state_click_event = (state) => {
  state.addEventListener('click', function() {
    const stateData = _config.data.filter(s => s.name === state.id)[0]
    const newGroupIndex = STATE.groups.findIndex(g=>g.id === STATE.selectedGroup.id);
    if (state.groupId != STATE.unselectedGroup.id) {
      state.style.fill = STATE.unselectedGroup.color
      state.groupId = STATE.unselectedGroup.id
      // ✨ We can handle multiple groups here! 
      // Even if it's several groups, it breaks down to this...
      // If the current group is NOT in the array, we add it to the array. 
      // If the current group IS in the array, we remove it from the array!
      const oldGroupIndex = STATE.groups.findIndex(g => g.label === stateData.groups[0])
      STATE.groups[oldGroupIndex].states = STATE.groups[oldGroupIndex].states.filter(s => s.name !== stateData.name)
      stateData.groups = STATE.unselectedGroup.label
    } else {
      state.style.fill = STATE.selectedGroup.color
      state.groupId = stateData
      stateData.groups = [STATE.selectedGroup.label]
      const filteredStateData = {}
      STATE.headers.forEach( key => filteredStateData[key] = stateData[key] )
      //  ? Does the group need to be added to the state? 
      STATE.groups[newGroupIndex].states.push(filteredStateData)
    }
    build_tables()
  })
}