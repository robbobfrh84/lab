const fightersList = document.getElementById('fighters-list');

fightersList.innerHTML += `
  <table id='fighters-list-table'>
    <tr id='fighters-list-table-column-names'></tr>
  </table>
`

buildFighersList = (fighters)=>{
  const table = document.getElementById('fighters-list-table')
  const colNames = document.getElementById('fighters-list-table-column-names')
  colNames.innerHTML += `
    <th class='cnt'></th>
  `
  for (const name in fighters[0]) {
    colNames.innerHTML += `
        <th class='col-${name}'>
          ${name[0].toUpperCase() + name.slice(1)}
        </th>
    `
  }
  for (var i = 0; i < fighters.length; i++) {
    table.innerHTML += `
      <tr class='fighter-i' id='fighter-${fighters[i].name}'>
        <td class='cnt-i'> ${i+1} </td>
      </tr>
    `
    const fighter = document.getElementById('fighter-'+fighters[i].name)
    for (const val in fighters[i]) {
      const v = valStr(fighters[i][val])
      fighter.innerHTML += `
        <td> ${v} </td>
      `
    }
  }
}
