const color_scheme = {
  greens: {
    name: "Forest&nbsp;Greens",
    primary: "#1E5631",
    colors: [
      { c:"#1E5631" },
      { c:"#A4DE02" },
      { c:"#76BA1B" },
      { c:"#4C9A2A" },
      { c:"#ACDF87" }
    ]
  },
  bubbleGum: {
    name: "Bubble&nbsp;Gum",
    primary: "#297F87",
    colors: [
      { c:"#297F87" }, // double color
      { c:"#FFF7AE" },
      { c:"#F6D167" },
      { c:"#297F87" }, // double color
      { c:"#DF2E2E" }
    ]
  },
  sunset: {
    name: "Mars",
    primary: "#8C0000",
    colors: [
      { c:"#8C0000" }, // double color
      { c:"#BD2000" },
      { c:"#F6D167" },
      { c:"#FA1E0E" }, // double color
      { c:"#FFBE0F" }
    ]
  },
  river: {
    name: "A&nbsp;River&nbsp;Runs &nbsp;&nbsp;Through&nbsp;It",
    primary: "#1E2791",
    colors: [
      { c:"#1E2791" },
      { c:"#2C43B0" },
      { c:"#DDDDDD" },
      { c:"#3364C0" },
      { c:"#427BD2" },
      { c:"#DDDDDD" },
      { c:"#4C9ADD" },
      { c:"#64B6EE" },
    ]
  },
  unicorn: {
    name: "Unicorn",
    primary: "#86007D",
    colors: [
      { c:"#FF0018" },
      { c:"#FFA52V" },
      { c:"#FFFF41" },
      { c:"#008018" },
      { c:"#0000F9" },
      { c:"#86007D" },
      { c:"#ffc0cb" }
    ]
  },
}

const state = {
  transition: 500, //ms
  UI_mode: "light",
  animate: true,
  color_scheme: "greens"
}

window.onload = function() {
  state.color_scheme = window.location.hash.split("#")[1] || state.color_scheme
  state.color_scheme_index = Object.keys(color_scheme).indexOf(state.color_scheme)
  const group = buildInitial()
  rotateColors(group, color_scheme[state.color_scheme].colors, state.transition)
}

window.onclick = function(e) {
  if (e.path[0].id == "lightDarkMode") {
    lightDarkChange()
  }
  else if (e.path[0].id == "startStop") {
    state.animate = !state.animate
    if (state.animate == true) {
      rotateColors(group, color_scheme[state.color_scheme].colors, state.transition)
    }
  }
  else {
    state.color_scheme_index = state.color_scheme_index + 1
    if (state.color_scheme_index >= Object.keys(color_scheme).length) {
      state.color_scheme_index = 0
    }
    state.color_scheme = Object.keys(color_scheme)[state.color_scheme_index]
    const group = buildInitial(color_scheme.greens)
    rotateColors(group, color_scheme[state.color_scheme].colors, state.transition)
  }

}

function lightDarkChange() {
  state.UI_mode = state.UI_mode == "light" ? "dark" : "light"
  buildInitial()
  let size = getComputedStyle(document.body).getPropertyValue('--light_radio_button_size').split("px")[0]
  if (state.UI_mode == "dark") {
    dark_radio_button.style.opacity = "0.9"
    dark_radio_button.style.left =(size*.95)+"px"
    document.body.style.background = 'url("dark_grain.png")';
  } else {
    dark_radio_button.style.opacity = "0"
    dark_radio_button.style.left = "0px"
    document.body.style.background = 'url("light_grain.png")';
  }
}

function buildInitial() {
  const borders = document.querySelectorAll('.borders')
  const titles = document.querySelectorAll('.titles')
  const titleAnchor = document.querySelector('.title-anchor')
  const backgrounds = document.querySelectorAll('.background')
  backgrounds.forEach(b=>b.style.background='url("'+state.UI_mode+'_grain.png")')
  document.body.style.background = 'url("'+state.UI_mode+'_grain.png")'
  titleAnchor.style.color = color_scheme[state.color_scheme].primary
  titleAnchor.innerHTML = color_scheme[state.color_scheme].name
  titles.forEach(t=>t.innerHTML=color_scheme[state.color_scheme].name)
  bodyBackground.style.backgroundColor = color_scheme[state.color_scheme].primary
  const group = [
    { elms: titles, style: "color" },
    { elms: borders, style: "backgroundColor" }
  ]
  setAllColors(group)
  return group
}

function setAllColors(group) {
  group.forEach( group => {
    group.elms.forEach( (elm, i) => {
      elm.style[group.style] = color_scheme[state.color_scheme].colors[i].c
    })
  })
}

function rotateColors(group, colors, delay) {
  const saveDelay = delay
  setAllColors(group)
  rotateArray(colors)
  setTimeout( ()=>{
    if (state.animate) {
      rotateColors(group,colors,delay)
    }
  }, delay )
}

function rotateArray(array) {
  const last = array.shift()
  array.push(last)
}
