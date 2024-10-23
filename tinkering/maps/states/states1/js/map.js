const map_build = () => {
  const statesSVG = map_prep_SVG()
  map_build_states(statesSVG)
}

const map_prep_SVG = (svg) => {
  const paths =  Array.from(svgContainer.querySelectorAll('path'))
  const polylines =  Array.from(svgContainer.querySelectorAll('polyline'))
  let statesSVG = paths.concat(polylines)

  const filterStates = ['InteriorOutlines', 'DC']
  statesSVG = statesSVG.filter(state => !filterStates.includes(state.id))
  statesSVG = statesSVG.filter(state => state.classList.contains('state'))
  return statesSVG
}

const map_build_states = (statesSVG) => {   
  statesSVG.forEach(state => { // maybe just have this is map_build? Keep events there too. 
    map_add_state_click_event(state)
    state.style.fill = STATE.unselectedGroup.color
    state.groupId = STATE.unselectedGroup.id
  })
}

const map_add_state_click_event = (state) => {
  state.addEventListener('click', function() {
    const stateData = _sesh.filteredStates.filter(s => s.name === state.id)[0]   
    const groupIndex = STATE.groups.findIndex(g=>g.id === STATE.selectedGroupId)
    const selectedGroup = STATE.groups[groupIndex]
    const stateGroups = map_get_groups(stateData)
    
    if (stateGroups.length <= 0) {
      state.style.fill = selectedGroup.color
      STATE.groups[groupIndex].states.push(stateData)

    } else if (!stateGroups.includes(selectedGroup.id)) {
      state.style.fill = map_build_multi_group()
      STATE.groups[groupIndex].states.push(stateData)

    } else {
      state.style.fill = STATE.unselectedGroup.color
      STATE.groups.forEach(g=>g.states = g.states.filter(s => s.id !== stateData.id))
    }

    lists_build_tables()
  })
}

map_build_multi_group = () => {
  console.log('⭐️⭐️⭐️ Make multi group')
  return 'url(#striped-pattern)'
}

map_filter_states = () => {
  _config.states.forEach( state => {
    const filtered = {}
    STATE.headers.forEach( key => filtered[key] = state[key] )
    _sesh.filteredStates.push(filtered)
  })
}

map_get_groups = (stateData) => {
  const stateGroups = []
  STATE.groups.forEach(g=>{ 
    g.states.forEach(s=>{ if (s.id == stateData.id) stateGroups.push(g.id) })
  })
  return stateGroups
}
