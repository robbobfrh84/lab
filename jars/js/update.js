const updateAllLeds = function() {
  for (let i = 0; i < data.NUM_LEDS; i++) {
    const led = document.getElementById("l-"+i)
    const stripLed = document.getElementById('s-'+i)
    const adj = colorAdj[data[i+1]]
    const color = adj ? adj.c : data[i+1]
    led.style.backgroundColor = "rgb("+color+")"
    led.color = color || "0,0,0"
    stripLed.style.backgroundColor = "rgb("+color+")"
  }
}

const updateCurrentStatus = function() {
  const lock = data.lock ? "(LOCKED)" : ""
  let current = data.current_sequence
  if (data.lock) {
    if (data.current_sequence === "marker_delay") {
      current = data.sequences[parseInt(data.sequence_index)-1].title
    } else {
      current = data.sequences[parseInt(data.sequence_index)].title
    }
  } else if (data.current_sequence === "marker_delay") {
    current = data.sequences[parseInt(data.sequence_index)+1].title
  }
  if (data.show_sequence) {
    currentStatus.innerHTML = `
      <span class="faint-title"> current sequence: </span>
      ${current}
      ${lock}
    `
    clearTimeout(statusDelay)
    statusDelay = setTimeout(function(){
      currentStatus.style.opacity = 0 // innerHTML = " "
      setTimeout(function(){
        reloadIcon.style.opacity = 0.5
      },500)
    },delay1)
    currentStatus.style.opacity = 1
    reloadIcon.style.opacity = 0
  } else {
    currentStatus.style.opacity = 0
  }
}

const setC = function(i,color){
  const stripLed = document.getElementById('s-'+i)
  const led = document.getElementById('l-'+i)
  stripLed.style.backgroundColor = "rgb("+color+")"
  led.style.backgroundColor = "rgb("+color+")"
  window['l-'+i].color = color
}

const ledSets = function(test, doReturn) {
  let q = ""
  if (test == "pallete") {
    "req=custom"
    const keys = Object.keys(cols)
    let cnt = data.NUM_LEDS || 24
    for (let i = 0; i < cnt; i++) {
      let color = "0,0,0"
      if (cols[keys[i]]) {
        color = cols[keys[i]].c
        if (cols[keys[i]].s) {
          q+="&"+(i+1)+"="+cols[keys[i]].s
        } else {
          q+="&"+(i+1)+"="+cols[keys[i]].c
        }
      } else {
        q+="&"+(i+1)+"="+color
      }
      setC(i,color)
    }
    query("req=custom"+q)
  } else if (test === "current") {
    let cnt = data.NUM_LEDS || 24
    for (let i = 0; i < cnt; i++) {
      let color = data[i+1]
      if (!color || color === "undefined" || color === null) {
        color = "0,0,0"
      }
      q+="&"+(i+1)+"="+color
    }
    return "req=custom"+q
  } else if (test === "fill" || test === "clear") {
    let cnt = data.NUM_LEDS || 24
    for (let i = 0; i < cnt; i++) {
      if (test === "clear") {
        q+="&"+(i+1)+"=0,0,0"
        setC(i,"0,0,0")
      } else if (selectedRGB.s) {
        q+="&"+(i+1)+"="+selectedRGB.s
        setC(i,selectedRGB.c)
      } else {
        q+="&"+(i+1)+"="+selectedRGB.c
        setC(i,selectedRGB.c)
      }
    }
    query("req=custom"+q)
  }
}
