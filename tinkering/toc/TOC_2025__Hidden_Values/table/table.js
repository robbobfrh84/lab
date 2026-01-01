const setTable = function(data) {

  if (data.rows.length > 0) {
    
    let tableHTML = '<table><thead><tr>'
    tableColumns.forEach(col => { tableHTML += `<th>${col.label}</th>` })
    tableHTML += '</tr></thead><tbody>'
    
    if (data && data.rows) {
      data.rows.forEach(row => {
        tableHTML += '<tr>'
        tableColumns.forEach(col => {
          let value = ''
          if (col.func) {
            value = col.func(row)
          } else {
            value = row[col.name] !== undefined && row[col.name] !== null ? row[col.name] : ''
          }
          tableHTML += `<td>${value}</td>`
        })
        tableHTML += '</tr>'
      })
    }
    
    tableHTML += '</tbody></table>'
    table_container.innerHTML = tableHTML
  } else {
    table_container.innerHTML = " * This table is empty. Select [Create] "
  }

}

function calcWinPercent(row) {
  const w = row.wins || 0
  const l = row.losses || 0
  const total = w + l
  if (total === 0) return ''
  const percent = w / total
  if (percent === 1) return '1.000'
  return percent.toFixed(3).substring(1)
}