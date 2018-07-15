const fightersList = document.getElementById('fighters-list');

buildFighersList = (fighters, active)=>{
  if (!active) active = 'id'
  fightersList.innerHTML = /*html*/`
    <table id='fighters-list-table'>
      <tr id='fighters-list-table-column-names-top'>
        <th class='cnt'></th>
        <th colspan="${Object.keys(fighters[0]).length}" class='topCol'>
         ...notes (neets to add .skills in .length & blanks to start)
        </th>
      </tr>
      <tr id='fighters-list-table-column-names'></tr>
    </table>
  `
  const table = document.getElementById('fighters-list-table')
  const colNames = document.getElementById('fighters-list-table-column-names')
  colNames.innerHTML += `
    <th class='cnt'></th>
  `
  for (const name in fighters[0]) {
    let ac = name === active ? 'activeColumn' : ''
    if (name === 'skills') {
      for (const sk in fighters[0][name]) {
        ac = sk === active.split('.')[1] ? 'activeColumn' : ''
        colNames.innerHTML += /*html*/`
          <th class='col col-${name} ${ac}' onclick='toggleCol()' name='${name}.${sk}'>
            <div class="arrow-up-${ac}-${sortref.dir}"></div>
            <div class='fighters-list-table-column-name'> 
              ${sk[0]+sk[1]+sk[2]+'.'} 
            </div>
            <div class="arrow-down-${ac}-${sortref.dir}"></div>
          </th>
        `
      }
    } else {
      colNames.innerHTML += /*html*/`
        <th class='col col-${name} ${ac}' onclick='toggleCol()' name='${name}'>
          <div class="arrow-up-${ac}-${sortref.dir}"></div>
          <div class='fighters-list-table-column-name'> 
            ${name[0].toUpperCase() + name.slice(1)} 
          </div>
          <div class="arrow-down-${ac}-${sortref.dir}"></div>
        </th>
      `
    }
  }
  for (var i = 0; i < fighters.length; i++) {
    table.innerHTML += /*html*/`
      <tr class='fighter-i' id='fighter-${fighters[i].name}'>
        <td class='cnt-i'> ${i+1} </td>
      </tr>
    `
    const fighter = document.getElementById('fighter-'+fighters[i].name)
    for (const val in fighters[i]) {
      if (val === 'skills') {
        for (const sk in fighters[i][val]) {
          fighter.innerHTML += /*html*/`
            <td class='fighter-row-${val}'> ${fighters[i][val][sk]} </td>
          `
        }
      } else {
        const v = valStr(fighters[i][val])
        fighter.innerHTML += /*html*/`
          <td class='fighter-row-${val}'> ${v} </td>
        `
      }
    }
  }
}

toggleCol = (name = event.target.attributes.name.value)=>{
  sortref.dir = !sortref.dir
  if (sortref.name !== name) sortref.dir = false
  sortref.name = name
  let sf = fighters
  if (name === 'id') {
    if (sortref.dir) fighters.sort((a,b)=>{
      return a[name].split('#')[1] - b[name].split('#')[1]
    })
    else sf.sort((a,b)=>{return b[name].split('#')[1] - a[name].split('#')[1]})
  } else if (name === 'gender' || name === 'name') {
    if (!sortref.dir) sf.sort((a,b)=>{return ('' + a[name]).localeCompare(b[name])})
    else sf.sort((a,b)=>{return ('' + b[name]).localeCompare(a[name])})
  } else if (name.split('.')[0] === 'skills') {
    const v = name.split('.')
    if (sortref.dir) sf.sort((a,b)=>{return a[v[0]][v[1]] - b[v[0]][v[1]]})
    else sf.sort((a,b)=>{return b[v[0]][v[1]] - a[v[0]][v[1]]})
  } else {
    if (sortref.dir) sf.sort((a,b)=>{return a[name] - b[name]})
    else sf.sort((a,b)=>{return b[name] - a[name]})
  }
  buildFighersList(sf, name)
}

valStr = (val)=>{
  let strVal = ''
  if (typeof val !== 'object') {
    return val
  } else {
    for (const v in val) {
      strVal += val[v] + ','
    }
  }
  return strVal.slice(0,strVal.length-1)
}
