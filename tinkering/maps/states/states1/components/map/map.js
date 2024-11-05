const map_build = (mapId) => {
  map_container.innerHTML = /*html*/`<div id=${mapId}>${statesJS}</div>`
  const statesSVG = map_prep_SVG()
  map_filter_states()
  map_build_states(statesSVG)
}

const map_prep_SVG = (svg) => {
  // const paths = Array.from(svg_container.querySelectorAll('path'))
  // const polylines = Array.from(svg_container.querySelectorAll('polyline'))
  // const g = Array.from(svg_container.querySelectorAll('g'))
  // let statesSVG = paths.concat(polylines)
  // statesSVG = statesSVG.concat(g)

  let statesSVG = Array.from(svg_container.querySelectorAll('g'))

  // statesSVG = statesSVG.filter(state => !CONFIG.filterElements.includes(state.id))
  statesSVG = statesSVG.filter(state => state.classList.contains('state'))
  return statesSVG
}


const map_filter_states = () => {
  CONFIG.states.forEach( state => {
    const filtered = {}
    STATE.headers.forEach( key => filtered[key] = state[key] )
    SESH.filteredStates.push(filtered)
  })
}

const map_build_states = (statesSVG) => {   
  statesSVG.forEach(state => { // maybe just have this is map_build? Keep events there too. 
    map_add_state_click_event(state)
    state.style.fill = STATE.unselectedGroup.color
    // const bubble = state.querySelector('circle')
    // if (bubble) {
    //   bubble.style.fill = STATE.unselectedGroup.color
    // }
    state.groupId = STATE.unselectedGroup.id
  })
}

const map_add_state_click_event = (state) => {
  state.addEventListener('click', function() {
    const stateData = SESH.filteredStates.filter(s => s.name === state.id)[0]   
    const groupIndex = STATE.groups.findIndex(g=>g.id === STATE.selectedGroupId)
    const selectedGroup = STATE.groups[groupIndex]
    const stateGroups = map_get_groups(stateData)
    
    if (stateGroups.length <= 0) {
      state.style.fill = selectedGroup.color
      STATE.groups[groupIndex].states.push(stateData)

    } else if (!stateGroups.filter(g=>g.id == selectedGroup.id)[0]) {
      state.style.fill = map_build_multi_group([...stateGroups, selectedGroup])
      STATE.groups[groupIndex].states.push(stateData)

    } else {
      state.style.fill = STATE.unselectedGroup.color
      STATE.groups.forEach(g=>g.states = g.states.filter(s => s.id !== stateData.id))
    }

    tables_build()
  })
}


const map_build_multi_group = (multiGroup) => {
  multiGroup.sort((a,b) => a.id - b.id)
  let defId = multiGroup.map(g=>g.id+'-'+g.color).join('_')

  if (!SESH.multi_group_patterns.includes(defId)) {
    SESH.multi_group_patterns.push(defId)
    let stripWidth = 4
    if (multiGroup.length > 3) stripWidth = 2
    let range = multiGroup.length * stripWidth
    let rects = ''
    multiGroup.forEach( (g, i) => { rects += /*html*/`
      <rect 
        x="${i * stripWidth}"
        width="${stripWidth}" 
        height="${range}" 
        fill="${g.color}"
      />
    `})  
    map_defs.innerHTML += /*html*/`
      <pattern id="${defId}" width="${range}" height="${range}" patternUnits="userSpaceOnUse" patternTransform="rotate(315)">
        ${rects}
      </pattern>
    `
  }

  return `url(#${defId})`
}

const map_get_groups = (stateData) => {
  const stateGroups = []
  STATE.groups.forEach(g=>{ 
    g.states.forEach(s=>{ 
      if (s.id == stateData.id) stateGroups.push({id: g.id, color: g.color}) 
    })
  })
  return stateGroups
}
