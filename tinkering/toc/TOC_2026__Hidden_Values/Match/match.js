let sheet = {}
let chars = []
let whichInput = ""
var topChar = false
var botChar = false

window.onload = async ()=>{
  /* To Test: De-note "Test" code */

  /* Test - see config for test objects */
  loader.style.display = 'none'
  topChar = testTop; botChar = testBot; 
  swapViews(false) // * false for spar match
  return

  /* Live */
  sheet = await getSheet()
  console.log('Match sheet:',sheet)
  matchSheetName.innerHTML = sheet.sheetName || ''
  chars = [...sheet.rows]
  setCharSelect(chars)
  whichInput = 'top'
  window[whichInput+"UserInput"].focus({ preventScroll: true })
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
      const region = regionsObj.find(r => r.name === c.region)
      const regionStyle = region ? `background-color: ${region.color};` : 'border: 2px solid rgba(128, 128, 128, 0.5); background-color: transparent;'
      
      charSelect.innerHTML += /*html*/`
        <button 
          onclick="clickedChar('${c.name}')" id="${c.name}"
          class="charButtons"
        >
          <span class="btn-name">${c.name}</span>
          <span class="btn-region-dot" style="${regionStyle}"></span>
        </button>
      `
    })
  } else if (chars.length < 1) {
    charSelect.innerHTML = " * The table is empty. Select [Create] "
  }

}

const clickedChar = function(name) {

  const char = chars.find(c => c.name === name);
  window[whichInput+"Char"] = char
  if (whichInput == "") { alert("Click into input box before selecting character.") }
  
  const region = regionsObj.find(r => r.name === char.region)
  const regionStyle = region ? `background-color: ${region.color}; color: ${region.font};` : 'border: 1px solid rgba(128, 128, 128, 0.25); color: black; background-color: transparent;'
  
  window[whichInput+"Selected"].innerHTML = /*html*/`
    <div class="match-value name">${char.name}</div>
    <div class="match-value region" >
      <span class="pill-box" style="${regionStyle}">${char.region}</span>
    </div>
  `
  window[whichInput+"UserInput"].style.display = 'none'

  requestAnimationFrame(()=>{
    document.getElementById(name).setAttribute('disabled', 'true')
  })
  
  // * Check for set match
  if (topChar && botChar) {
    document.querySelectorAll('.charButtons').forEach(btn => btn.disabled = true)
    officialMatchBtn.removeAttribute('aria-disabled')
    sparBtn.removeAttribute('aria-disabled')
  } else {
    const other = whichInput === "bot" ? "top" : "bot"
    window[other+"UserInput"].focus({ preventScroll: true })
  }

}

const swapViews = function(isOfficalMatch) {
  isOffical = isOfficalMatch
  selectContainer.style.display = 'none'
  matchContainer.style.display = 'block'
  
  // Set match type label
  const label = document.getElementById('matchTypeLabel')
  if (isOfficalMatch) {
    label.textContent = '• OFFICIAL MATCH •'
    label.className = 'match-type-official'
  } else {
    label.textContent = 'Spar'
    label.className = 'match-type-spar'
  }
  
  buildMatch()
  startSimulate(topChar, botChar, isOffical)
}

const buildMatch = function() {

  const topRegion = regionsObj.find(r => r.name === topChar.region)
  const topRegionStyle = topRegion ? `background-color: ${topRegion.color}; color: ${topRegion.font};` : 'border: 1px solid rgba(128, 128, 128, 0.25); color: black; background-color: transparent;'
  
  matchTop.innerHTML = /*html*/`
    <div class="match-row">
      <div class="match-value name">${topChar.name}</div>
      <div class="match-separator">∙</div>
      <div class="match-value record">${topChar.wins}-${topChar.losses}</div>
      <div class="match-separator">∙</div>
      <div class="match-value age-sex">${topChar.age}/${topChar.sex}</div>
      <div class="match-separator">∙</div>
      <div class="match-value region">
        <div class="pill-box" style="${topRegionStyle}">${topChar.region}</div>
      </div>
    </div>
  `

  const botRegion = regionsObj.find(r => r.name === botChar.region)
  const botRegionStyle = botRegion ? `background-color: ${botRegion.color}; color: ${botRegion.font};` : 'border: 1px solid rgba(128, 128, 128, 0.25); color: black; background-color: transparent;'
  
  matchBot.innerHTML = /*html*/`
    <div class="match-row">
      <div class="match-value name">${botChar.name}</div>
      <div class="match-separator">∙</div>
      <div class="match-value record">${botChar.wins}-${botChar.losses}</div>
      <div class="match-separator">∙</div>
      <div class="match-value age-sex">${botChar.age}/${botChar.sex}</div>
      <div class="match-separator">∙</div>
      <div class="match-value region">
        <span class="pill-box" style="${botRegionStyle}">${botChar.region}</span>
      </div>
    </div>
  `
}

const resetInputs = function() {
  topChar = false
  botChar = false
  topUserInput.value = ''
  botUserInput.value = ''
  topUserInput.style.display = 'block'
  botUserInput.style.display = 'block'
  topSelected.innerHTML = ''
  botSelected.innerHTML = ''
  topUserInput.classList.remove('selected-input')
  botUserInput.classList.remove('selected-input')
  officialMatchBtn.setAttribute('aria-disabled', 'true')
  sparBtn.setAttribute('aria-disabled', 'true')
  chars = [...sheet.rows]
  setCharSelect(chars)
  whichInput = 'top'
  topUserInput.focus({ preventScroll: true })
}

const cancelMatch = function() {
  resetInputs()
  selectContainer.style.display = 'flex'
  matchContainer.style.display = 'none'
  charSelect.style.display = 'flex'
}
