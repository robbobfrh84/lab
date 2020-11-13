const changePage = function(newPage) {
  const oldpage = page
  page = newPage
  window[oldpage].style.opacity = 0
  window.requestAnimationFrame(()=>{
    window[oldpage].style.display = "none"
    window[newPage].style.display = "block"
    if (page === "pageCustom") {
      query("page=custom&"+ledSets("current", true),(respData)=>{
        updateAllLeds()
        updateCurrentStatus()
      })
    } else {
      query("page=sequence", (respData)=>{
        data = respData
        updateCurrentStatus()
      })
    }
    setStripHighlight()
    window.requestAnimationFrame(()=>{
      window[newPage].style.opacity = 1
    })
  },500)
}

const ledClick = function(i) {
  const cc = window['l-'+i].color // NOTE: cc = CURRENT COLOR
  const color = selectedRGB.c === cc ? cols.black : selectedRGB
  setC(i,color.c)
  const sendCol = color.s ? color.s : color.c
  query("req=custom&"+(i+1)+"="+sendCol,()=>{
    data[i+1] = color.c
  })
}

const changeSequence = function(index) {
  const lastSequence = document.getElementById("lockBox-"+clickedPageIndex)
  const lockBox = document.getElementById("lockBox-"+index)
  const lock = document.getElementById("lock-"+index)
  lockBox.style.display = "inline-block"
  if (clickedPageIndex !== index && lastSequence) {
    const unlock = document.getElementById("lock-"+clickedPageIndex)
    unlock.checked = false
    lastSequence.style.display = "none"
  }
  clickedPageIndex = index
  const endpoint = "lock="+lock.checked+"&sequence="+index
  clearTimeout(updatedDelay)
  query(endpoint, function(respData){
    updatedDelay = setTimeout(function(){
      lock.checked = false
      lockBox.style.display = "none"
    },delay1)
    data = respData
    updateCurrentStatus()
  })
}

const reloadCurrentStatus = function() {
  query("api",(respData)=>{
    data = respData
    updateCurrentStatus()
  })
}

const changeSelectedColor = function(key) {
  selectedRGB = cols[key]
  updateSelectedColor()
}

const updateSelectedColor = function() {
  colorsContainer.style.backgroundColor = "rgb("+selectedRGB.c+")"
  fillBtn.style.backgroundColor = "rgb("+selectedRGB.c+")"
}

const setStripHighlight = function() {
  const stripWidth = stripContainer.style.maxWidth.split("px")[0]
  const stripLeft = (jarsContainer.scrollLeft / jarsContainer.scrollWidth)
    * parseInt(stripContainer.style.maxWidth.split("px")[0])
  const stripRight = ((jarsContainer.scrollLeft+jarsContainer.clientWidth) / jarsContainer.scrollWidth)
    * parseInt(stripContainer.style.maxWidth.split("px")[0])
  const offset = ((document.body.clientWidth - stripWidth) / 2)
  stripHighlighterLeft.style.left = (offset*-1)+"px"
  stripHighlighterLeft.style.width = stripLeft+offset+"px"
  stripHighlighterRight.style.right = (offset*-1)+"px"
  stripHighlighterRight.style.width = stripWidth-stripRight+offset+"px"
}

const invertDirection = function() {
  query("api",(respData)=>{
    inverted = invertedInput.checked
    data = respData
    buildLedStrips()
    updateAllLeds()
    setStripHighlight()
  })
}

jarsContainer.onscroll = function() {
  setStripHighlight()
}
