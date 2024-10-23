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
  statesSVG.forEach(state => {
    map_add_state_click_event(state)
    state.style.fill = STATE.unselectedGroup.color
    state.groupId = STATE.unselectedGroup.id
  })
}

const map_add_state_click_event = (state) => {
  state.addEventListener('click', function() {
    const stateData = _config.states.filter(s => s.name === state.id)[0]
    const groupIndex = STATE.groups.findIndex(g=>g.id === STATE.selectedGroupId);
    const selectedGroup = STATE.groups[groupIndex]

    const stateGroups = []
    STATE.groups.forEach(g=>{
      g.filter(s=>s.id == stateData.id)
    })


    if (state.groupId == 0) {
      console.log('Make group')
      state.style.fill = selectedGroup.color
      state.groupId = selectedGroup.id

      stateData.groups = [selectedGroup.label]
      // const filteredStateData = {}
      // STATE.headers.forEach( key => filteredStateData[key] = stateData[key] ) // 🚨this shouldn't be here. and if we want to have custom headers (no) it should be just done once...
      // STATE.groups[groupIndex].states.push(filteredStateData)
      STATE.groups[groupIndex].states.push(stateData)


    } else if (state.groupId != 0 && state.groupId != selectedGroup.id ) {
      console.log('Make multi group')
      state.style.fill = 'pink'
      state.groupId = selectedGroup.id




    } else {
      console.log('remove group')
      state.style.fill = STATE.unselectedGroup.color
      state.groupId = STATE.unselectedGroup.id

      const oldGroupIndex = STATE.groups.findIndex(g => g.label === stateData.groups[0])
      STATE.groups[oldGroupIndex].states = STATE.groups[oldGroupIndex].states.filter(s => s.name !== stateData.name)
    }



    // if (state.groupId != STATE.unselectedGroup.id) {
    //   state.style.fill = STATE.unselectedGroup.color
    //   state.groupId = STATE.unselectedGroup.id

    //   const oldGroupIndex = STATE.groups.findIndex(g => g.label === stateData.groups[0])
    //   STATE.groups[oldGroupIndex].states = STATE.groups[oldGroupIndex].states.filter(s => s.name !== stateData.name)
    //   // stateData.groups = STATE.unselectedGroup.label
    // } else {
    //   state.style.fill = selectedGroup.color
    //   state.groupId = selectedGroup.id

    //   stateData.groups = [selectedGroup.label]
    //   const filteredStateData = {}
    //   STATE.headers.forEach( key => filteredStateData[key] = stateData[key] )
    //   STATE.groups[groupIndex].states.push(filteredStateData)
    // }
    group_build_tables()
  })
}