const lists_build_tables = () => {
  STATE.groups.forEach(group => {
    if (group.states.length > 0) {
      const tbody = lists_build_tbody(group)
      group.states.forEach(state => {
        const row = tbody.insertRow()
        STATE.headers.forEach( (key, index) => {
          const cell = row.insertCell(index) 
          cell.innerHTML = state[key]
        })
      })
    } else if (window['states_table_'+group.id]) {
      window['states_table_'+group.id].style.display = 'none'
    }
  })
}

const lists_build_tbody = (group) => {
  let tbody;
  if (!window['states_table_'+group.id]) {
    const table = document.createElement('table')
    table.id = 'states_table_'+group.id
    table.classList.add('states_table')
    const caption = table.createCaption()
    caption.innerHTML = /*html*/`
      ${group.label}: <span style="background-color: ${group.color}; color: ${group.color}">------</span> 
    `
    const header = table.createTHead()
    const header_row = header.insertRow(0) 
    STATE.headers.forEach( (key, index) => {
      const header_cell = header_row.insertCell(index) 
      header_cell.innerHTML = _config.headerKeys[key]
    })
    tbody = table.createTBody()
    tablesContainer.appendChild(table)
  } else {
    const table = window['states_table_'+group.id]
    tbody = table.querySelector('tbody')
    window['states_table_'+group.id].style.display = ''
  }
  tbody.innerHTML = '' // * copilot said this is the best way to learn an html element
  return tbody
}