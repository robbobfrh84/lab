const deployId = "AKfycbwu9tQSLZ-AXYs8h6nVuqxb_zdi6gmHnjPKOw4udfGGNybtTGAk8rKiFIHIxkZhog0uIQ"
const id = "1JIXolkM-XXJJdzm33evUv-zXYT6XGuliEZmt4B4UdHw"
const gasup = new Gasup({ deployId, id, app: { name: "My GAS Up App"} })

const defaultSheetId = "1604584153" // * Test sheet
let chars = []
let whichInput = ""
var topChar = false
var botChar = false


window.onload = () => { 
  getSheetId()
  readSheet()
}

const getSheetId = function() {
  if (!localStorage.toc_2025__character_creator_sheetId) {
    console.log('no locals')
    localStorage.setItem("toc_2025__character_creator_sheetId", defaultSheetId)
  }
  sheetIdValue.value = localStorage.toc_2025__character_creator_sheetId
}

const updateSheedId = function() {
  console.log('sheetId.value:',sheetIdValue.value)
  localStorage.setItem("toc_2025__character_creator_sheetId", sheetIdValue.value)
}

const readSheet = function() {
  charSelectLoading.style.display = 'flex'
  gasup.read.sheet({
    sheetId: sheetIdValue.value
  })
    .then( response => {
      console.log(response) 
      chars = response.data.rows
      setCharSelect(response.data.rows)
    })
    .catch( error => console.log(error) )
    .finally( () => charSelectLoading.style.display = 'none')
}

const clickInInput = function(which, other) {
  whichInput = which
  charSelect.style.display = 'flex'
  setCharSelect(chars)
  window[other+"UserInput"].value = ''
}

const clickOutInput = function(which) {
  document.querySelectorAll('.pointerIcons.'+which).forEach(e=>{ e.style.display = 'none'})
}

const filterChars = function(which) {
  let input = document.getElementById(which+'UserInput').value.toLowerCase()
  const filtered = chars.filter(c => c.name.toLowerCase().includes(input))
  charSelect.innerHTML = ''
  setCharSelect(filtered)
}

const setCharSelect = function(currentChars) {
  charSelect.innerHTML = ''
  currentChars.forEach( c => {
    charSelect.innerHTML += /*html*/`
      <button 
        onclick="clickedChar('${c.name}')" id="${c.name}"
        class="charButtons"
      >
        ${c.name}
      </button>
    `
  });
}

const clickedChar = function(name) {
  const char = chars.find(c => c.name === name);
  window[whichInput+"Char"] = char
  window[whichInput+"Selected"].innerHTML = /*html*/`
    ${char.name} : ${char.region} : ${char.age}
  `
  window[whichInput+"UserInput"].style.display = 'none'

  // remove char from chars list
  const index = chars.findIndex(c => c.name === name);
  if (index !== -1) { chars.splice(index, 1) }

  // Check for set match
  if (topChar && botChar) {
    console.log('both selected')
    charSelect.style.display = 'none'
    matchContainer.innerHTML = "OK, built match here!!!"
  } else {
    const other = whichInput === "bot" ? "top" : "bot"
    window[other+"UserInput"].focus()
  }
  console.log('topChar:',topChar)
  console.log('botChar:',botChar)

}
