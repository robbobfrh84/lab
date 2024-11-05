const tables_build_allStates = () => {

  SESH.filteredStates = tk_sort(
    SESH.filteredStates, 
    STATE.allStates.sort, 
    STATE.allStates.order
  )

  const tbody = tables_build_tbody({
    id:0, label: 'All States', color: CONFIG.unselectedGroup.color
  }, 'all_states_tables_container')

  SESH.filteredStates.forEach((state, rowIndex) => {
    const row = tbody.insertRow()
    const numberCell = row.insertCell(0)
    numberCell.innerHTML = rowIndex + 1
    STATE.headers.forEach((key, index) => {
      const cell = row.insertCell(index + 1) 
      cell.innerHTML = state[key]
    })
  })

}

const tables_build = () => {
  STATE.groups.forEach(group => {
    if (group.states.length > 0) {
      const tbody = tables_build_tbody(group, 'tables_container')
      group.states.forEach((state, rowIndex) => {
        const row = tbody.insertRow()
        const numberCell = row.insertCell(0)
        numberCell.innerHTML = rowIndex + 1
        STATE.headers.forEach((key, index) => {
          const cell = row.insertCell(index + 1) 
          cell.innerHTML = state[key]
        })
      })
    } else if (window['states_table_'+group.id]) {
      window['states_table_'+group.id].style.display = 'none'
    }
  })
}

const tables_build_tbody = (group, container) => {
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
    const numberHeaderCell = header_row.insertCell(0)
    numberHeaderCell.innerHTML = "#"
    STATE.headers.forEach((key, index) => {
      const header_cell = header_row.insertCell(index + 1) 
      header_cell.innerHTML = CONFIG.headerKeys[key]
      //
      //
      // const sortButton = document.createElement('button')
      // sortButton.innerHTML = '⇅'
      // sortButton.onclick = () => {
      //   SESH.filteredStates = tk_sort(SESH.filteredStates, key, STATE.allStates.order === 'ascending' ? 'descending' : 'ascending')
      //   STATE.allStates.order = STATE.allStates.order === 'ascending' ? 'descending' : 'ascending'
      //   tables_build_allStates()
      // }
      // header_cell.appendChild(sortButton)
      //
      //
    })
    tbody = table.createTBody()
    window[container].appendChild(table)
  } else {
    const table = window['states_table_'+group.id]
    tbody = table.querySelector('tbody')
    window['states_table_'+group.id].style.display = ''
  }
  tbody.innerHTML = '' // * copilot said this is the best way to learn an html element
  return tbody
}