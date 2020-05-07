let entries = 14
let bracket

const start = function() {
  bracket = new Bracket({
    entries: entries,
    style: "center"
  })
  frame()
}

const frame = function() {
  bracketContainer.innerHTML = ""
  bracketContainer.innerHTML = `
  <textArea width="100%">
    ${JSON.stringify(bracket, null, 2)}
  </textArea>
  `
}

const reBuild = function(){
  console.log("entries.value :", entriesInput.value)
  bracket.entries = entries = parseInt(entriesInput.value)
  bracket.buildFrame()
  frame()
  console.log("bracket :", bracket)
}

const addRemove = function(add) {
  entries = add ? entries + 1 : entries -1
  entriesInput.value = entries
  reBuild()
}

window.onload = ()=>{ start() }
