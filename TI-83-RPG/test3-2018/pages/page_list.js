_build_List = (fsort, active)=>{

  build = ()=>{
    const fightersList = document.getElementById('page_list');
    if (!active) active = 'id'
    let skillsDisplay = "Skills"
    if (active.split('.').length > 1) {
      let name = active.split('.')[1]
      name = name === 'willPower' ? 'will power' : name
      skillsDisplay = '<em>'+name+'</em>'
    }
    fightersList.innerHTML = /*html*/`
      <h3> Fighters List </h3>
      <table id='fighters-list-table'>
        <tr id='fighters-list-table-column-names-top'>
          <th class='cnt'></th>
          <th class='cnt'></th>
          <th class='cnt'></th>
          <th class='cnt'></th>
          <th class='cnt'></th>
          <th class='col-name-th' 
            colspan="${Object.keys(fighters[0].skills).length}" 
            id='topCol'>
            ${skillsDisplay}
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
    for (const name in fsort[0]) {
      let ac = name === active ? 'activeColumn' : ''
      if (name === 'skills') {
        for (const sk in fsort[0][name]) {
          ac = sk === active.split('.')[1] ? 'activeColumn' : ''
          colNames.innerHTML += /*html*/`
            <th class='col-name-th'>
              <div class="arrow-up-${ac}-${_sortref.dir}"></div>
              <div class='col fighters-list-table-column-name ${ac} col-skills-${sk}'
                   onclick='toggleCol()' 
                   onmouseover='skillsHover()'
                   onmouseout='skillsHoverOff()'
                   name='${name}.${sk}'> 
                ${sk[0]+sk[1]+sk[2]+'.'} 
              </div>
              <div class="arrow-down-${ac}-${_sortref.dir}"></div>
            </th>
          `
        }
      } else {
        colNames.innerHTML += /*html*/`
          <th class='col-name-th'>
            <div class="arrow-up-${ac}-${_sortref.dir}"></div>
            <div class='col fighters-list-table-column-name ${ac}' 
                 onclick='toggleCol()'
                 name='${name}'> 
              ${name[0].toUpperCase() + name.slice(1)} 
            </div>
            <div class="arrow-down-${ac}-${_sortref.dir}"></div>
          </th>
        `
      }
    }
    for (var i = 0; i < fsort.length; i++) {
      table.innerHTML += /*html*/`
        <tr class='fighter-i' id='fighter-${fsort[i].name}'>
          <td class='cnt-i'> ${i+1} </td>
        </tr>
      `
      const fighter = document.getElementById('fighter-'+fsort[i].name)
      for (const val in fsort[i]) {
        if (val === 'skills') {
          for (const sk in fsort[i][val]) {
            fighter.innerHTML += /*html*/`
              <td class='fighter-row-${val} col-skills-cell-${sk}'> 
                ${fsort[i][val][sk]} 
              </td>
            `
          }
        } else {
          const v = valStr(fsort[i][val])
          fighter.innerHTML += /*html*/`
            <td class='fighter-row-${val}'> ${v} </td>
          `
        }
      }
    }
  }
  
  toggleCol = (name = event.target.attributes.name.value)=>{
    _sortref.dir = !_sortref.dir
    if (_sortref.name !== name) _sortref.dir = false
    _sortref.name = name
    let sf = fsort
    if (name === 'id') {
      if (_sortref.dir) fsort.sort((a,b)=>{
        return b[name].split('#')[1] - a[name].split('#')[1]
      })
      else sf.sort((a,b)=>{return a[name].split('#')[1] - b[name].split('#')[1]})
    } else if (name === 'gender' || name === 'name') {
      if (!_sortref.dir) sf.sort((a,b)=>{return ('' + a[name]).localeCompare(b[name])})
      else sf.sort((a,b)=>{return ('' + b[name]).localeCompare(a[name])})
    } else if (name.split('.')[0] === 'skills') {
      const v = name.split('.')
      if (_sortref.dir) sf.sort((a,b)=>{return a[v[0]][v[1]] - b[v[0]][v[1]]})
      else sf.sort((a,b)=>{return b[v[0]][v[1]] - a[v[0]][v[1]]})
    } else {
      if (_sortref.dir) sf.sort((a,b)=>{return a[name] - b[name]})
      else sf.sort((a,b)=>{return b[name] - a[name]})
    }
    _build_List(sf, name)
  }
  
  skillsHover = ()=>{
    const skill = document.getElementById('topCol')
    let name = event.target.attributes.name.value.split('.')[1]
    name = name === 'willPower' ? 'will power' : name
    if (event.target.attributes.name.value.split('.')[1] != skill.innerHTML) {
      skill.innerHTML = '<em>'+name+'</em>'
    }
  }
  
  skillsHoverOff = ()=>{
    const skill = document.getElementById('topCol')
    skill.innerHTML = 'Skills'
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

  build()
}


