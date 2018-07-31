_page_list = (fsort, active)=>{
  const hideFields = ['id','status', 'history']
  const changeLabel = {
    speed: 'spd.',
    strangth: 'str.',
    experience: 'exp.',
    intelligence: 'int.',
    willPower: 'wp',
    wins: 'W',
    losses: 'L',
    winP: '%',
    rating: 'Rat.'
  }

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
      <table id='fighters-list-table'>
        <tr id='fighters-list-table-column-names-top'>
          <th></th><th></th><th></th><th></th>
          <th id='topCol' class='col-name-th' colspan="5" >
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
    fsort[0].winP = '-'
    for (const name in fsort[0]) {
      let ac = name === active ? 'activeColumn' : ''
      if (name === 'skills') {
        for (const sk in fsort[0][name]) {
          ac = sk === active.split('.')[1] ? 'activeColumn' : ''
          let label = sk
          if (changeLabel[label]) label = changeLabel[label]
          colNames.innerHTML += /*html*/`
            <th class='col-name-th'>
              <div class="arrow-up-${ac}-${_sortref.dir}"></div>
              <div class='col fighters-list-table-column-name ${ac} col-skills-${sk}'
                   onclick='toggleCol()'
                   onmouseover='skillsHover()'
                   onmouseout='skillsHoverOff()'
                   name='${name}.${sk}'>
                ${label}
              </div>
              <div class="arrow-down-${ac}-${_sortref.dir}"></div>
            </th>
          `
        }
      } else {
        let label = name[0].toUpperCase() + name.slice(1)
        if (label === 'Gender') label = '&#x26A7'
        if (changeLabel[name]) label = changeLabel[name]
        if (!hideFields.includes(name)){
          colNames.innerHTML += /*html*/`
            <th class='col-name-th'>
              <div class="arrow-up-${ac}-${_sortref.dir}"></div>
              <div class='col col-${name} fighters-list-table-column-name ${ac}'
                  onclick='toggleCol()'
                  name='${name}'>
                ${label}
              </div>
              <div class="arrow-down-${ac}-${_sortref.dir}"></div>
            </th>
          `
        }
      }
    }
    for (var i = 0; i < fsort.length; i++) {
      table.innerHTML += /*html*/`
        <tr class='fighter-i' id='fighter-${fsort[i].name}'>
          <td class='cnt-i'> ${i+1} </td>
        </tr>
      `
      const fighter = document.getElementById('fighter-'+fsort[i].name)
      if (fsort[i].wins + fsort[i].losses === 0) {
        fsort[i].winP = parseFloat(0.000).toFixed(3)
      } else {
        fsort[i].winP = fsort[i].wins / (fsort[i].wins + fsort[i].losses)
        fsort[i].winP =  parseFloat(Math.round(fsort[i].winP * 100) / 100).toFixed(3)
      }
      for (const val in fsort[i]) {
        if (val === 'skills') {
          for (const sk in fsort[i][val]) {
            fighter.innerHTML += /*html*/`
              <td class='fighter-row-${val} col-skills-cell-${sk}'>
                ${fsort[i][val][sk]}
              </td>
            `
          }
        } else if (!hideFields.includes(val)){
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
    _page_list(sf, name)
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
