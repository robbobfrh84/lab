window.onload = function(){
  set_states()
}

const maps = document.getElementById("districts-svg")
const districts = document.getElementById("districts-list")

searchStates.addEventListener('input', function(){
  highlight(this.value.toLowerCase().toString())
})

function set_states(){
  for (const map of maps.children) {
    if (map.id.length === 5) {
      const id = "list-"+map.id
      const state_name = state_names[map.id.split('-')[0]]
      districts.innerHTML += `
        <div id=${id}>
          ${state_name} ${map.id}
        </div>
      `
      console.log(id)
    }
  }
}


function highlight(filter){
  for (const map of maps.children) {
    const name = map.id.toLowerCase().split('-')

    if (name.length > 1) { // if html elm looks like a district
      highlight_state(filter, name[0], map)

      if (filter.length >= 2) { // a state has been filtered
        highlight_districts(filter, name, map)
      }
    }

  }
}

function highlight_state(filter, name, map){
  // const listState = document.getElementById('list-'+filter)
  if (filter.length === 1 && filter === name[0]) {
    map.style.fill = "yellow"
  } else if (filter.slice(0,2) === name){
    map.style.fill = "darkseagreen"
  } else {
    map.style.fill = "#cccccc"
  }
}

function highlight_districts(filter, name, map) {
  const state = filter.slice(0,2)
  const district = filter.replace(/[_ ,-]/, "").slice(2,4)
  const id = "list-"+name[0].toUpperCase()+"-"+name[1].toUpperCase()
  const listState = document.getElementById(id)
  console.log(id, listState)
  if (state === name[0]) {
    if (
      district.length < 1
      || (district.length == 1 && district[0] === name[1][0])
      || (district.length >= 1 && district === name[1])
    ) {
      listState.style.display = 'block'
      map.style.fill = "green"
    }
  } else {
    // console.log(listState.id)
    listState.style.display = 'none'
  }
}
