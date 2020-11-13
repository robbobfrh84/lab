const buildLedStrips = function() {
  let leds = 24 // default
  if (data.NUM_LEDS) leds = parseInt(data.NUM_LEDS)

  const width = window.innerWidth
  const pairWidth = width/((leds/2)+2)
  const stripWidth = (pairWidth*(leds/2))+leds

  let stripHtml = ""
  let jarHtml = ""

  for (var i = 0; i < leds; i+=2) {
    const l1 = inverted ? (leds - i - 1) : i
    const l2 = inverted ? (leds - i - 2) : i + 1
    stripHtml += /*html*/`
      <div class="buildStripContainers" style="
        min-width:${pairWidth}px;
      ">
        <div class="stripLedPair" id="s-${l1}"></div>
        <div class="stripLedPair" id="s-${l2}"></div>
      </div>
    `
    jarHtml += /*html*/`
      <div class="jarContainer">

        <div class="ledPair"
          id="l-${l1}"
          onclick="ledClick(${l1})"
        ></div>

        <div class="ledPair right"
          id="l-${l2}"
          onclick="ledClick(${l2})"
        ></div>

        <image src="images/jar.png" class="jarSvg">
      </div>
    `
  }
  jarsContainer.innerHTML = jarHtml


  stripContainer.innerHTML = stripHtml
  stripContainer.innerHTML += /*html*/`
    <div id="stripHighlighterLeft" class="stripHighlighter"></div>
    <div id="stripHighlighterRight" class="stripHighlighter"></div>
  `

  stripContainer.style.maxWidth = stripWidth+"px"

  const stripRight = (jarsContainer.clientWidth / jarsContainer.scrollWidth) * stripWidth
  stripHighlighterLeft.style.width = stripRight+"px"
}

const buildPalleteContainers = function() {
  let html = ""
  let cnt = 1
  const breakEvery = 6
  for (const key in cols) {
    const br = cnt % breakEvery === 0 ? "<br>" : ""
    const saveKey = key
    html += /*html*/`
      <div class="colorButton"
        style="background-color: rgb(${cols[key].c});"
        onclick="changeSelectedColor('${saveKey}')"
      ></div>
      ${br}
    `
    cnt++
  }
  colorsContainer.innerHTML = html
}

const buildColorAdj = function() {
  for (o in cols) {
    if (cols[o].s) {
      colorAdj[cols[o].s] = cols[o]
    }
  }
}

const buildSequences = function() {
  let html = ""
  let num = 0
  data.sequences.forEach( sequence =>{
    const duration = Math.round(sequence.duration/100/60) / 10 
    if (sequence.title !== "marker_delay") {
      num++
      html += `
        <div class="sequence-button"
          onclick="changeSequence('${sequence.index}')">
          ${num} |
          ${sequence.title} &nbsp; | &nbsp;
          ${duration+"m"}
          <div class="sequence-button_duration">
            <div id="lockBox-${sequence.index}" class="lock-container">
              <label class="toggle-switch">
                <input id="lock-${sequence.index}" type="checkbox">
                <span class="toggle-slider toggle-round"></span>
              </label>
            </div>
          </div>
        </div>
      `
    }
  })
  sequencesContainer.innerHTML = html
}
