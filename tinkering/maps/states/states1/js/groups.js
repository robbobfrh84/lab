const build_tables = () => {
  GROUPS.forEach(group => {
    if (group.states.length > 0) {
      const tbody = build_tbody(group)
      group.states.forEach(state => {
        const row = tbody.insertRow()
        Object.keys(state).forEach( (key, index) => {
          if (DEFAULT_HEADERS.includes(key)) {
            const cell = row.insertCell(index) 
            cell.innerHTML = state[key]
          }
        })
      })
    } else if (window['states_table_'+group.label]) {
      window['states_table_'+group.label].style.display = 'none'
    }
  })
}

const build_tbody = (group) => {
  let tbody;
  if (!window['states_table_'+group.label]) {
    const table = document.createElement('table')
    table.id = 'states_table_'+group.label
    table.classList.add('states_table')
    const caption = table.createCaption()
    caption.innerHTML = group.label
    const header = table.createTHead()
    const header_row = header.insertRow(0) 
    Object.keys(statesData[0]).forEach( (key, index) => {
      if (DEFAULT_HEADERS.includes(key)) {
        const header_cell = header_row.insertCell(index) 
        header_cell.innerHTML = capitalizeString(key)
      }
    })
    tbody = table.createTBody()
    tablesContainer.appendChild(table)
  } else {
    const table = window['states_table_'+group.label]
    tbody = table.querySelector('tbody')
    window['states_table_'+group.label].style.display = ''
  }
  tbody.innerHTML = '' // * copilot said this is the best way to clearn an html element
  return tbody
}