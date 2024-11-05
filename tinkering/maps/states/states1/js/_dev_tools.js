function _toggleStateAbr() { 
  STATE.showStateNames = !STATE.showStateNames 
  const labels = document.querySelectorAll('.stateLabel')
  labels.forEach(e => e.style.display = STATE.showStateNames ? 'block' : 'none')
}

function _toggleBubbles() {
  STATE.showBubbles = !STATE.showBubbles 
  const bubbles = document.querySelectorAll('.bubbles-show-hide')
  bubbles.forEach(e => e.style.display = STATE.showBubbles ? 'block' : 'none')
}

function _dev_tools_set_DC() {
  // if (!STATE.showDC) { 
  //   SESH.filteredStates = SESH.filteredStates.filter(s=>s.id!="DC")
  //   document.querySelectorAll('.dev-tools-toggleDC').forEach(e => e.checked = false)
  //   _toggleDC(STATE.showDC) 
  // }
}

function _toggleDC(holdToggle, holdTableBuild) {
  STATE.showDC = holdToggle ? STATE.showDC : !STATE.showDC
  let dc = document.querySelectorAll('.DC-all')
  dc.forEach(e => e.style.display = STATE.showDC ? 'block' : 'none')
  document.querySelectorAll('.dev-tools-toggleDC').forEach(e => e.checked = STATE.showDC ? true : false)
  if (!STATE.showDC) {
    console.log('❌ DC is OFF')
    // SESH.filteredStates = tk_removeByID(SESH.filteredStates, "DC")
    SESH.filteredStates =  SESH.filteredStates.filter(s => s.id != "DC")

    // 🚨 use tk????? maybe, i'm actually thinking of removing it....
    STATE.groups.forEach(g => g.states = g.states.filter(s => s.id != "DC"))

    window['DistrictOfColumbia'].style.fill = STATE.unselectedGroup.color
  } else {
    console.log('🟢 DC is ON')
    // if (!tk_getByID(SESH.filteredStates, "DC")) {
    if (!SESH.filteredStates.filter(s=>s.id == "DC")[0]) {
      // SESH.filteredStates.push( tk_getByID(CONFIG.states, "DC") )
      SESH.filteredStates.push(CONFIG.states.filter(s=>s.id == "DC")[0])

    }
  }
  if (!holdTableBuild) {
    tables_build_allStates()
    tables_build()
  }
}

window["dev_tools_container"].innerHTML = /*html*/`

<hr>

<div class="dev-tools-wrapper">
  <span class="dev-tools-key">State Abr:</span>
  <label class="switch">
    <input type="checkbox" onclick="_toggleStateAbr()" checked>
    <span class="slider round"></span>
  </label>
</div>

&nbsp; | &nbsp; 
<div class="dev-tools-wrapper">
  <span class="dev-tools-key">Bubbles:</span>
  <label class="switch">
    <input type="checkbox" onclick="_toggleBubbles()" checked>
    <span class="slider round"></span>
  </label>
</div>

&nbsp; | &nbsp; 
<div class="dev-tools-wrapper">
  <span class="dev-tools-key">DC:</span>
  <label class="switch">
    <input type="checkbox" class="dev-tools-toggleDC" onclick="_toggleDC()" checked>
    <span class="slider round"></span>
  </label>
</div>

<hr>

<style>
.dev-tools-wrapper {
  display: inline-flex;
  align-items: center;
}

.dev-tools-key {
  margin-right: 10px; /* Optional: Add some space between the span and the switch */
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(15px);
}
</style>
`
