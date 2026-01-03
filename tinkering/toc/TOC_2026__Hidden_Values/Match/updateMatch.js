let match = {}

const finishSimulation = function() {
  round = 0 // * Needed so that if you finish an already started scorceRoundSimulation you start at the begniing next time.
  simulationStarted = false // * Needed so that if you finish an already started scorceRoundSimulation you start at the begniing next time.
  match = startSimulate(topChar, botChar, isOffical)

  window[match.winner+"Winner"].innerHTML = /*html*/`
    ⭐️ <span> <strong>${match.winnerObj.name}</strong> ⭐️ Wins! </span> 
    <em>(${match.score})</em>
  `

  let boxScore = ''
  match.boxScore.forEach( s => {
    boxScore += updateScoreUI(s)
  })

  scoreCard.innerHTML = boxScore

  if (isOffical) {
    updateBothRows(match)
  } else {
    setReDirectUI()
  }

  console.log('isOffical:',isOffical)
  console.log('match:', match)

}

let round = 0
let simulationStarted = false
let scoreRoundMatch = match

const scoreRoundSimulation = function() {
  if (!simulationStarted) {
    match = startSimulate(topChar, botChar, isOffical)
    console.log('isOffical:',isOffical)
    console.log('match:', match)
    console.log('match.boxScore:',match.boxScore)
    scoreCard.innerHTML = ""
    simulationStarted = true
  }
  doScore(match)
}

function doScore(match) {
  const score = updateScoreUI(match.boxScore[round])
  scoreCard.innerHTML += score
  
  if (match.boxScore[round] === "-") {
    round++
    doScore(match)
  } else {
    round++
  }

  if (match.boxScore.length <= round) {
    round = 0
    simulationStarted = false

    window[match.winner+"Winner"].innerHTML = /*html*/`
      ⭐️ <span> <strong>${match.winnerObj.name}</strong> ⭐️ Wins! </span> 
      <em>(${match.score})</em>
    `

    if (isOffical) {
      updateBothRows(match)
    } else {
      setReDirectUI()
    }
  }
  
}

const updateScoreUI = function(s) {
  return /*html*/`
    ${ (s === "t" || s === "b") ? /*html*/`
      <div class="score-col">
        <div class="score-dot-top">
          ${ s === "t" ? /*html*/`
            <div class="score-dot"></div>
          `:/*html*/`
            <div class="lose-dot"></div>
          `}
        </div>
        <div>
          ${ s === "b" ? /*html*/`
            <div class="score-dot"></div>
          `:/*html*/`
            <div class="lose-dot"></div>
          `}
        </div>
      </div>
    `:``}
  `
}

const updateBothRows = function(match) {
  updateLoader.style.display = 'flex'
  Promise.all([
    updateRow(match.winnerObj.rowId, "wins", match.winner),
    updateRow(match.loserObj.rowId, "losses", match.loser)
  ]).finally(() => {
    updateLoader.style.display = 'none'
    setReDirectUI()
  })
}

const updateRow = function( rowId, winLoss, topBot ) {
  return gasup.update.row({
    sheetId: sheetId,
    rowId: rowId,
    type: { 
      increment: winLoss
    }
  })
    .then( response => {
      console.log(response)
      const { wins, losses } = response.data.currentRow.rowObj
      window[topBot+"MatchRecord"].innerHTML = `${wins}-${losses}✨`      
    })
    .catch( error => console.log(error) )

}

const setReDirectUI = function() {
  matchControls.style.display = 'none'
  newMatchBtn.style.display = 'block'
}

const cancelMatch = function() {
  resetInputs()
  selectContainer.style.display = 'flex'
  matchContainer.style.display = 'none'
  charSelect.style.display = 'flex'
}