inputText.addEventListener("keypress", function (e) { newBracket(e.keyCode) })
const [ w, h ] = [ 1024, 640 ]
const c = new canvasJS
c.new('bracket-canvas', 1024, 640)

function newBracket(clicked, cData) {
  if (inputText.value > 2048) inputText.value = '2048'
  cData ? inputText.value = cData.length : console.log('empty')
  if (clicked === 13) {
    const p = document.getElementById('bracket-shell')
    while (p.childElementCount > 1) { p.removeChild(p.lastChild) } // removes all old content from bracket when size changed.
    c.clear() // clears old canvas like ^^^
    bracket = [1]
    const contenders = inputText.value
    let swap = false
    for (var i = 2; i <= contenders; i++) {
      let lowSeed = bracket[0]
      let lowSeedIndex = 0
      swap = !swap
      for (const j in bracket) {
        if (bracket[j] > lowSeed){
          lowSeed = bracket[j]
          lowSeedIndex = j
        }
      }
      bracket[lowSeedIndex] = swap ? [lowSeed, i] : [i, lowSeed]
      if (lowSeedIndex === 0 && contenders != i){
        bracket = [].concat.apply([], bracket)
      }
    }
    bracket.forEach(function(m, i) {
      if (!m[0]) m = m%2 ? [ m, '* bye *'] : ['* bye *', m]
      bracket[i] = [m[0], m[1]]
    })
    console.log('Contenders: ', inputText.value)
    console.log('Bracket size: ', bracket.length*2)
    console.log('Bracket: ', JSON.stringify(bracket))
    // buildBracket(bracket.length*2)
  }
}

onDOMContentLoaded = (()=>{ newBracket(13) })()
