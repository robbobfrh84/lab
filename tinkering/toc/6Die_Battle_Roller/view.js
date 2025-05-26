const updateDieUI = function(die, elm) {
  const canceled = die.state == 'canceled' ? true : false
  const pulled = die.state == 'pulled' ? true : false
  const out = die.state == 'out' ? true : false
  elm.style.opacity =  canceled ? 0.5 : 1 
  elm.style.opacity =  out ? 0.25 : elm.style.opacity 
  elm.innerHTML = /*html*/`
    ${ (pulled || out) ?  '<strong style="color: red;">X</strong>' : ''}

    <em>d${die.value}:</em> &nbsp; 

    ${canceled ? '<s>' : ''}

    <strong>${die.rolled}</strong>
    
    ${canceled ? '</s>' : ''}

    ${ (pulled || out) ?  '<strong style="color: red;">X</strong>' : ''}
  `
}

const updateRollCntUI = function() {
  RollCnt++
  rollCntElm.innerHTML = "Roll # "+RollCnt 
}

const updateButtonUI = function(name, die, elm) {
  if (name == 'enable') {
    actionButton.innerHTML = "Ready"
    actionButton.setAttribute('aria-disabled', 'false')
    actionButton.focus()
    actionButton.onclick = ()=>readyMatch()
    resetMatchButton.setAttribute('aria-disabled', 'true')
  } else if (name == 'roll') {
    actionButton.innerHTML = "Roll"
    actionButton.onclick = ()=>roll()
    resetMatchButton.setAttribute('aria-disabled', 'false')
  } else if (name == 'clear') {
    // actionButton.innerHTML = 'Clear'
    actionButton.innerHTML = 'Next Roll'
    actionButton.onclick = ()=>clearDice(die, elm)
  } else if (name == 'score') {
    actionButton.innerHTML = 'Score'
    actionButton.onclick = ()=>scoreRoll()
  } else if (name == 'disabled') {
    actionButton.innerHTML = 'Ready'
    actionButton.setAttribute('aria-disabled', 'true')
    actionButton.onclick = ()=>readyMatch()
  } 
  // else if (name == 'ready') {
  //   actionButton.disabled = false
  //   actionButton.focus()
  //   actionButton.onclick = ()=>readyMatch()
  // }
}

const updateResultsUI = function({ which, value }) {
  
  if (which == 'top') {
    TopResults.innerHTML += /*html*/`<div class="removed-result-die">d${value}</div>`
    BotResults.innerHTML += /*html*/`<div></div>`
  } else if (which == 'bot') {
    TopResults.innerHTML += /*html*/`<div></div>`
    BotResults.innerHTML += /*html*/`<div class="removed-result-die">d${value}</div>`
  } else {
    TopResults.innerHTML += /*html*/`<div class="result-grid-tie">-</div>`
    BotResults.innerHTML += /*html*/`<div class="result-grid-tie">-</div>`
  }
}


const setDieUI = function(which,keyPlace) {
  const die = window[which+"-die-"+(keyPlace)]
  die.innerHTML = 'd'+Match[which].dice[keyPlace].value
}

const setDieKeyCodesUI = function() {
  top_die_keyCode.innerHTML = Match.top.keyCode+' "'+Match.top.name+'"'
  bot_die_keyCode.innerHTML = Match.bot.keyCode+' "'+Match.bot.name+'"'
}

const resetMatchUI = function() {
  alertMessage.innerHTML = ''
  rollCntElm.innerHTML = "Roll #"
  set_values_containers_UI()
}

const set_initial_values_UI = function() {// * Hard Reset!
  top_keycode_input.value = ''
  bot_keycode_input.value = ''
  top_die_keyCode.innerHTML = ''
  bot_die_keyCode.innerHTML = ''
  top_keycode_input.disabled = false
  bot_keycode_input.disabled = false
  die_values_container.innerHTML = /*html*/`
    <label>Top: </label>
    <div class="die-value" id="top-die-0">d?</div>
    <div class="die-value" id="top-die-1">d?</div>
    <div class="die-value" id="top-die-2">d?</div>
    <label>Bot: </label>
    <div class="die-value" id="bot-die-0">d?</div>
    <div class="die-value" id="bot-die-1">d?</div>
    <div class="die-value" id="bot-die-2">d?</div>
  `
}

const set_values_containers_UI = function() {
  die_roll_container.innerHTML = /*html*/`
    <label>Top: </label>
    <div class="top-die-roll-value" id="top-die-roll-0">?</div>
    <div class="top-die-roll-value" id="top-die-roll-1">?</div>
    <div class="top-die-roll-value" id="top-die-roll-2">?</div>
    <label>Bot: </label>
    <div class="bot-die-roll-value" id="bot-die-roll-0">?</div>
    <div class="bot-die-roll-value" id="bot-die-roll-1">?</div>
    <div class="bot-die-roll-value" id="bot-die-roll-2">?</div>
  `
  results_only_container.innerHTML = /*html*/`
    <label> T </label>
    <div id="TopResults"></div>
    <label> B </label>
    <div id="BotResults"></div> 
    </div>
  `
}

const updateWinnerResultUI = function(which) {
  const winner = which[0].toUpperCase() + which.slice(1)
  const name = Match[which].name
  const score = 3 - Match.rolls.length
  alertMessage.innerHTML = '🌟"'+name+'"('+winner+') WINS 🌟 3-'+score+'('+RollCnt+')'
}

const updateTieResultUI = function() {
  alertMessage.innerHTML = '🪢 Tied Roll 🪢'
}
















