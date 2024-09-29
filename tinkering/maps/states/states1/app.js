const delay_fadin = 500;
let unselected_state_color;
let selected_state_color = 'rgb(255, 0, 0)' 

window.onload = ()=>{ 
  svgContainer.innerHTML = statesJS 
  setTimeout(() => { svgContainer.style.opacity = 1 }, delay_fadin);
  build_SVG_map()
}

const build_SVG_map = () => {
  const paths =  Array.from(svgContainer.querySelectorAll('path'))
  const polylines =  Array.from(svgContainer.querySelectorAll('polyline'))
  let states = paths.concat(polylines)

  const filterStates = ['InteriorOutlines', 'DC']
  states = states.filter(state => !filterStates.includes(state.id))
  states = states.filter(state => state.classList.contains('state'))
  build_states(states)
  unselected_state_color = states[0].style.fill 
}

const build_states = (states) => {   
  states.forEach(state => {
    add_state_click_event(state)
  })
}

const add_state_click_event = (state) => {
  state.addEventListener('click', function() {
    console.log('state clicked:', state.id)
    if (state.style.fill != unselected_state_color) {
      state.style.fill = unselected_state_color
    } else {
      state.style.fill = selected_state_color
    }
  })
}