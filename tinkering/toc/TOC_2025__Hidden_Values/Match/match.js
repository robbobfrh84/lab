let chars = []
let whichInput = ""
var topChar = false
var botChar = false

window.onload = async ()=>{
  const sheet = await getSheet()
  console.log('Match sheet:',sheet)
  matchSheetName.innerHTML = sheet.sheetName || ''
  setCharSelect(sheet.rows)
  whichInput = 'top'
  window[whichInput+"UserInput"].focus()
}

const clickInInput = function(which, other) {
  whichInput = which
  charSelect.style.display = 'flex'
  setCharSelect(chars)
  window[other+"UserInput"].value = ''
  window[which+"UserInput"].classList.add('selected-input')
  window[other+"UserInput"].classList.remove('selected-input')
}

const filterChars = function(which) {
  let input = document.getElementById(which+'UserInput').value.toLowerCase()
  const filtered = chars.filter(c => c.name.toLowerCase().includes(input))
  charSelect.innerHTML = ''
  setCharSelect(filtered)
}

const setCharSelect = function(currentChars) {
  if (currentChars.length > 0) {
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
    })
  } else {
    charSelect.innerHTML = " * This table is empty. Select [Create] "
  }

}

const clickedChar = function(name) {
  const char = chars.find(c => c.name === name);
  window[whichInput+"Char"] = char
  if (whichInput == "") { alert("Click into input box before selecting character.") }
  window[whichInput+"Selected"].innerHTML = /*html*/`
    ${char.name} : ${char.region} : ${char.age}
  `
  window[whichInput+"UserInput"].style.display = 'none'

  // * Remove char from chars list
  const index = chars.findIndex(c => c.name === name);
  if (index !== -1) { chars.splice(index, 1) }

  // * Check for set match
  if (topChar && botChar) {
    charSelect.style.display = 'none'
    matchContainer.innerHTML = "OK, build match here!!!"
  } else {
    const other = whichInput === "bot" ? "top" : "bot"
    window[other+"UserInput"].focus()
  }

}
