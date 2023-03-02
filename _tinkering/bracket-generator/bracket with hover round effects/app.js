window.onload = function(){
  const contenders = 16
  totalContenders.value = contenders
  buildBracket(contenders)
}

function buildBracket(contenders, focus){
  bracket.innerHTML = ""

  const rounds = getRounds(contenders)
  let columnMatches = 1

  const green = 255
  const width = bracket.clientWidth / ((rounds*2) + 1)

  let style = "width: "+width+"px;"
  style += "height: "+(window.innerHeight-15)+"px;"

  let styleCenter = style + "background-color: rgb(100,"+green+",237);"
  styleCenter += "left: "+(width*rounds)+"px;"

  if (focus && focus[0] === 'c') {
    console.log('focus center', focus[1])
  }

  // Create Final
  bracket.innerHTML += `
    <div class="rd" style="${styleCenter}" onClick="show(event)" index="c-0">
      <div id="final" class="column-container">
        Final<br><br><br>
        <div class="match-container">
          &nbsp;_____ <br>
          |_____|
        </div>
      </div>
    </div>
  `

  for (var i = 1; i <= rounds; i++) {

    const green = 149 + ( (rounds-i) * (146 / rounds) )
    let round = "Round<br>"+(rounds - i + 1)
    if (i === 1) round = "Semi-<br>final"
    else if (i === 2) round = "Quarter-<br>final"

    let stylePlus = style + "background-color: rgb(100,"+green+",237);"
    styleLeft = "left: "+((rounds-i)*width)+"px;" + stylePlus
    styleRight = "right: "+((rounds-i)*width)+"px;" + stylePlus

    if (focus && focus[1] == i ) {
      if (focus[0] === 'l') {
        console.log('focus left', focus[1])
      }
      if (focus[0] === 'r') {
        console.log('focus right', focus[1])
      }
    }

    // LEFT SIDE
    bracket.innerHTML = `
      <div class="rd" style="${styleLeft}" onClick="show(event)" index="l-${i}">
        <div id="left${i}" class="column-container">
          ${round}
        </div>
      </div>
    ` +  bracket.innerHTML

    // RIGHT SIDE
    bracket.innerHTML += `
      <div class="rd" style="${styleRight}" onClick="show(event)" index="r-${i}">
        <div id="right${i}" class="column-container">
          ${round}
        </div>
      </div>
    `

    const leftCol = document.getElementById('left'+i)
    const rightCol = document.getElementById('right'+i)

    for (var m = 0; m < columnMatches; m++) {
      leftCol.innerHTML += `
        <div class="match-container">
          _____ <br>
          _____|
        </div>
      `
      rightCol.innerHTML += `
        <div class="match-container">
          &nbsp; _____ <br>
          |_____
        </div>
      `
    }

    columnMatches *= 2
  }

}

function getRounds(contenders) {
  let rounds = 0
  const nextRound = function(size){
    rounds++
    if ((size*2) >= contenders) {
      return rounds
    } else {
      size *= 2
      nextRound(size)
    }
  }
  if (contenders > 2) nextRound(2, rounds)
  return rounds
}

function reset(param) {
  if (param === "-") totalContenders.value /= 2
  if (param === "+") totalContenders.value *= 2

  if (totalContenders.value <= 2) totalContenders.value = 2
  if (totalContenders.value > 128) totalContenders.value = 128

  const contenders = totalContenders.value
  buildBracket(contenders)
}

function show(event) {
  const rd = event.path.filter(e => e.classList && e.classList.contains("rd"))[0]
  buildBracket(totalContenders.value, rd.getAttribute("index").split("-"))
  // if (!rd.open) {
  //   toggleRd(rd)
  //   rd.onmouseleave = ()=>{if (rd.open) toggleRd(rd)}
  // } else {
  //   toggleRd(rd)
  // }
}

function toggleRd(rd) {
  const width = rd.open ? -100 : 100
  rd.style.width = (parseFloat(rd.style.width.split('px')[0])+width)+"px"
  rd.open = !rd.open
}

/* 📝 NOTES

* cornflowerblue rgb(100,149,237)

*/
