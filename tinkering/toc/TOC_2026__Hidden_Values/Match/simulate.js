const startSimulate = function(top,bot,isOffical) { // * 👀 ⚠️ Bob, this is your func that will need to be in a server.
  console.log('isOffical:',isOffical)

  /* Prep Match Object */
  const Match = { 
    top: top, 
    bot: bot, 
    rolls: [],
    out: [],
    boxScore: [], // * 't' = 'top' ,'b' = "bot", '-'="tie"
    score: false, // * 5-0, 5-1, 5-2, ... 5-4
    winner: false, // * "top" or "bot"
  }

  const topDecodeAttr = JSON.parse(decodeObscured(top.attributes))
  const botDecodeAttr = JSON.parse(decodeObscured(bot.attributes))
  Match.top.dice = prepMatch(topDecodeAttr, 1)
  Match.bot.dice = prepMatch(botDecodeAttr, Object.keys(topDecodeAttr).length+1) // * This ensures dyanmic die of any number

  /* Combine Dice into Array for rolling */
  Match.top.dice.forEach((die, i)=>{ setRollDie(die, i, 'top') })
  Match.bot.dice.forEach((die, i)=>{ setRollDie(die, i, 'bot')})

  /* Roll Die... ? */
  let winner = false
  while (!winner) {
    roll()
    getLow_s()
    clearDice()
    winner = checkWinner()
  }
  Match.winner = winner
  Match.score = "5-"+Math.min(Match.boxScore.filter(s => s === 't').length, Match.boxScore.filter(s => s === 'b').length) 

  console.log('Match:', Match)
  console.log('Match.winner:', Match.winner)
  console.log('Match.scoreCard:', Match.boxScore)
  console.log('Match.score:', Match.score)


  /* ✨ Closure Methods ✨ */
  function prepMatch(attributes, iStart, dice = []) {
    Object.keys(attributes).forEach( (k, i) => {
      const idNum = i+iStart
      const keyVal = attributes[k]
      dice.push({
        id: idNum, attr: k, key: keyVal, value: Values[keyVal-1], rolls: []
      })
    })
    return dice
  }

  function setRollDie({ id, value, attr }, i, which) {
    const rollObj = { which, id, value, attr, rolled: '?', state: 'in' }
    Match.rolls.push(rollObj)
  }

  function roll(testValue) { 
    Match.rolls.forEach( (die, i) => {
      die.rolled = testValue ? testValue[i] : r(1, die.value) 
      const dieIndex = Match[die.which].dice.findIndex(d => d.id === die.id);
      Match[die.which].dice[dieIndex].rolls.push(die.rolled)
    })
  }

  function getLow_s() {
    Match.rolls.sort((a, b) => a.rolled - b.rolled)

    const inRolls = Match.rolls.filter(item => item.state === 'in').sort((a, b) => a.rolled - b.rolled)
    console.log('inRolls:',inRolls)

    let lowRoll_s = Match.rolls.filter(item => item.rolled === inRolls[0].rolled)
    lowRoll_s.sort((a, b) => a.value - b.value)
    if (oneSided(lowRoll_s)) { lowRoll_s = [lowRoll_s[0]] }
    // console.log('lowRoll_s:', lowRoll_s)

    if (lowRoll_s.length > 1) {
      console.log('1) Tie lowRoll_s.length > 1')
      lowRoll_s.forEach( lowDie => {
        const { die, elm } = getByRollId(lowDie, 'canceled')
        // updateDieUI( die, elm)
      })
      if (lowRoll_s.length == inRolls.length) {
        console.log('TIE! lowRoll_s.length == inRolls.length')  
        // handleTie()
      }
      Match.boxScore.push('-')
    } else if (oneSided(inRolls)) { 
      console.log('TIE: oneSided(inRolls)')  
      // handleTie() 
      Match.boxScore.push('-')
    } else {
      const { die, elm } = getByRollId(lowRoll_s[0], 'pulled')
      Match.rolls = Match.rolls.filter(d => d.id !== die.id)
      Match.out.push(die) 

      Match.boxScore.push(die.which === "top" ? "t" : "b")

      // updateDieUI(die, elm)
      // updateResultsUI(die)

      // const winner = checkWinner()

      if (checkWinner()) {
        // updateButtonUI('disabled')
        // updateWinnerResultUI(winner)
        console.log('⭐️ WINNER')
      } 
      // else {
      //   // updateButtonUI('clear', die, elm)
      //   console.log('3) no winner yet')
      // }
    }

  }

  function oneSided(inRolls) {
    const tops = inRolls.filter(d=>d.which=='top').length
    const bots = inRolls.filter(d=>d.which=='bot').length
    return (tops && bots) ? false : true
  }

  function getByRollId(die, state) {
    const dieIndex = Match.rolls.findIndex(d => d.id === die.id);
    Match.rolls[dieIndex].state = state
    const elm = window[die.which+'-die-roll-id'+die.id]
    return { die: Match.rolls[dieIndex], elm }
  }

  function checkWinner() {
    const tops = Match.rolls.filter(d=>d.which=='top').length
    const bots = Match.rolls.filter(d=>d.which=='bot').length
    if (tops < 1) { return 'bot'
    } else if (bots < 1) { return 'top'
    } else { return false }
  }

  // function clearDice(pulledDie, elm) {
  function clearDice() {
    Match.rolls.forEach(die => {
      die.rolled = '?'
      die.state = 'in'
    })
    // pulledDie.state = 'out'
    // updateRolledDice()
    // if (pulledDie) { updateDieUI(pulledDie, elm) }
    // updateButtonUI('roll')
  }

  // function handleTie() {
  //   updateResultsUI('-')
  //   updateButtonUI('clear', false, false)
  //   updateTieResultUI()
  // }

  /* Toolkit */
  function r(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }

}

// 🔥 MAYBE MOVE BACK TO match.js
function updateResults() {

}

