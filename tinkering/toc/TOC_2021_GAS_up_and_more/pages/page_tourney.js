_page_tourney = ()=>{

  var _tourney = document.getElementById('page-tourney')
  _tourney.innerHTML = `
    <h3 class='title'> TOURNAMENT </h3>
    <input id='tourney-count' value="11">
    <button onclick=(generateBracket())> Generate </button>
    <div id='tourney-main-container' class='main-container'>
      <div id='tourney-bracket-left' class='bracket-half'></div>
      <div id='tourney-bracket-right' class='bracket-half float-right'></div>
    </div>
  `

  buildBracketUI = (bracket)=>{
    console.log(bracket.length*2);
    const left = document.getElementById('tourney-bracket-left')
    const right = document.getElementById('tourney-bracket-right')
    left.innerHTML = ''
    right.innerHTML = ''
    let matchNum = 1
    for (const m of bracket) {
      const side = matchNum-1 < bracket.length/2 ? left : right
      const sideClass = side === left ? '' : 'align-right'
      for (var i = 0; i < m.length; i++) {
        if (!fighters[m[i]]) {
          fighters[m[i]] = {}
          fighters[m[i]].name = '<em>UNKNOWN<em>'
        }
        const bye = m[i] === 'bye'
        const title = bye ? '<em> - bye - </em>' : fighters[m[i]].name
        if (!bye && side === right) {
          m[i] = title+' #'+m[i]
        } else if (!bye) {
          m[i] = '#'+m[i]+' '+title
        }
      }
      side.innerHTML += `
        <div id='tourney-m${matchNum}' class='matchup ${sideClass}'>
          <div> ${m[0]} </div>
          <hr style='margin: 0px'>
          <div> ${m[1]} </div>
        </div>
      `
      matchNum++
    }

  }

  generateBracket = ()=>{
    const num = document.getElementById('tourney-count')
    let bracket = [1,2]
    for (var i = 3; i <= num.value; i++) {
      let lowSeed = bracket[0];
      let lowSeedIndex = 0
      for (var j = 0; j < num.value; j++) {
        if (bracket[j] > lowSeed){
          lowSeed = bracket[j]
          lowSeedIndex = j
        }
      }
      bracket[lowSeedIndex] = [lowSeed, i]
      if (lowSeedIndex === 0 && num.value != i){
        bracket = [].concat.apply([],bracket)
      }
    }
    for (var i = 0; i < bracket.length; i++) {
      if (typeof bracket[i] !== 'object') {
        bracket[i] = [bracket[i], 'bye']
      }
    }
    buildBracketUI(bracket)
  }

  generateBracket()

}
