const readyMatch = function() {
  Match.rolls = []
  Match.top.dice.forEach((die, i)=>{ setRollDie(die, i, 'top') })
  Match.bot.dice.forEach((die, i)=>{ setRollDie(die, i, 'bot')})
  updateRolledDice()
  updateButtonUI('roll')
}  

const fastForward = function() {
  actionButton.click()
  if (
    actionButton.innerHTML == "Score" ||
    actionButton.innerHTML == "Roll"
  ) {
    setTimeout(()=>{
      fastForward()
    }, 150)
  }
}

const setRollDie = function({ id, value, attr }, i, which) {
  const rollObj = { which, id, value, attr, rolled: '?', state: 'in' }
  Match.rolls.push(rollObj)
  const elm = window[which+'-die-roll-'+i]
  elm.id = which+'-die-roll-id'+id
}

const updateRolledDice = function() {
  Match.rolls.forEach( die => {
    const elm = window[die.which+'-die-roll-id'+die.id]
    updateDieUI(die, elm)
  })
}

const roll = function(testValue) { // * 👀 ⚠️ Bob, this is your func that will need to be in a server.
  Match.rolls.forEach( (die, i) => {
    die.rolled = testValue ? testValue[i] : r(1, die.value) 
    const dieIndex = Match[die.which].dice.findIndex(d => d.id === die.id);
    Match[die.which].dice[dieIndex].rolls.push(die.rolled)
  })
  updateRollCntUI()
  updateRolledDice()
  updateButtonUI('score')
}


const scoreRoll = function(rollIndex) {
  // * Keep this as a single function for delays in future ;)
  getLow_s(rollIndex)
}

const getLow_s = function(rollIndex) {
  Match.rolls.sort((a, b) => a.rolled - b.rolled)

  const inRolls = Match.rolls.filter(item => item.state === 'in').sort((a, b) => a.rolled - b.rolled)
  console.log('inRolls:',inRolls)

  let lowRoll_s = Match.rolls.filter(item => item.rolled === inRolls[0].rolled)
  lowRoll_s.sort((a, b) => a.value - b.value)
  if (oneSided(lowRoll_s)) { lowRoll_s = [lowRoll_s[0]] }
  console.log('lowRoll_s:', lowRoll_s)

  if (lowRoll_s.length > 1) {
    lowRoll_s.forEach( lowDie => {
      const { die, elm } = getByRollId(lowDie, 'canceled')
      updateDieUI( die, elm)
    })
    if (lowRoll_s.length == inRolls.length) {
      handleTie()
    }
  } else if (oneSided(inRolls)) { 
    handleTie() 
  } else {
    const { die, elm } = getByRollId(lowRoll_s[0], 'pulled')
    Match.rolls = Match.rolls.filter(d => d.id !== die.id)
    Match.out.push(die) 

    updateDieUI(die, elm)
    updateResultsUI(die)

    const winner = checkWinner()

    if (winner) {
      /* ⭐️ ⭐️ ⭐️ Winner ⭐️ ⭐️ ⭐️ */
      updateButtonUI('disabled')
      updateWinnerResultUI(winner)
    } else {
      updateButtonUI('clear', die, elm)
    }
  }

}

const handleTie = function() {
  updateResultsUI('-')
  updateButtonUI('clear', false, false)
  updateTieResultUI()
}

const oneSided = function(inRolls) {
  const tops = inRolls.filter(d=>d.which=='top').length
  const bots = inRolls.filter(d=>d.which=='bot').length
  return (tops && bots) ? false : true
}

const checkWinner = function() {
  const tops = Match.rolls.filter(d=>d.which=='top').length
  const bots = Match.rolls.filter(d=>d.which=='bot').length
  if (tops < 1) { return 'bot'
  } else if (bots < 1) { return 'top'
  } else { return false }
}

const clearDice = function(pulledDie, elm) {
  Match.rolls.forEach(die => {
    die.rolled = '?'
    die.state = 'in'
  })
  pulledDie.state = 'out'
  updateRolledDice()
  if (pulledDie) { updateDieUI(pulledDie, elm) }
  updateButtonUI('roll')
}

const resetMatch = function() {
  Match.rolls = []
  Match.out = []
  Match.top.dice.forEach(d=>d.rolls=[])
  Match.bot.dice.forEach(d=>d.rolls=[])
  RollCnt = 0
  resetMatchUI()
  updateButtonUI('enable')
}

const getByRollId = function(die, state) {
  const dieIndex = Match.rolls.findIndex(d => d.id === die.id);
  Match.rolls[dieIndex].state = state
  const elm = window[die.which+'-die-roll-id'+die.id]
  return { die: Match.rolls[dieIndex], elm }
}

const r = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}