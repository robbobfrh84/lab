const Values = [4,6,8,10,12,20] // * decodes Die value, so 1 is a d6, 6 is a d20

const startSimulate = function(top,bot) { // * 👀 ⚠️ Bob, this is your func that will need to be in a server.

  /* Prep Match Object */
  const Match = { 
    top: JSON.parse(JSON.stringify(top)), 
    bot: JSON.parse(JSON.stringify(bot)), 
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
  const loser = winner === "top" ? "bot" : "top"

  return {
    winner: winner,
    loser: loser,
    winnerObj: winner === "top" ? top : bot,
    loserObj: loser === "top" ? top : bot,
    boxScore: Match.boxScore,
    score: "5-"+Math.min(Match.boxScore.filter(s => s === 't').length, Match.boxScore.filter(s => s === 'b').length) 
  }

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
    // console.log('inRolls:',inRolls)

    let lowRoll_s = Match.rolls.filter(item => item.rolled === inRolls[0].rolled)
    lowRoll_s.sort((a, b) => a.value - b.value)
    if (oneSided(lowRoll_s)) { lowRoll_s = [lowRoll_s[0]] }
    // console.log('lowRoll_s:', lowRoll_s)

    if (lowRoll_s.length > 1) {
      Match.boxScore.push('-')
    } else if (oneSided(inRolls)) { 
      Match.boxScore.push('-')
    } else {
      const { die, elm } = getByRollId(lowRoll_s[0], 'pulled')
      Match.rolls = Match.rolls.filter(d => d.id !== die.id)
      Match.out.push(die) // * PUSH to out. That means loser. lol. I had it reversed
      Match.boxScore.push(die.which === "top" ? "b" : "t")
      
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

  function clearDice() {
    Match.rolls.forEach(die => {
      die.rolled = '?'
      die.state = 'in'
    })
  }

  /* Toolkit */
  function r(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }

}

