window.onload = ()=>{
  buildBracket(_config)
  entriesInput.value = _config.entries.length
}

const buildBracket = function(config) {
  bracket = new Bracket_object(_config.entries)
  console.log("bracket :", bracket)
  build = new Build_bracket(bracket)
  delete bracket
  delete build
}

const addRemove = function(add) {
  add ? _config.entries.push("unknown") : _config.entries.pop()
  entriesInput.value = _config.entries.length
  buildBracket(_config)
}

const reBuild = function(){
  _config.entries = Array(parseInt(entriesInput.value))
  buildBracket(_config)
}




// PRESERVE

// bracket = new Bracket_object(_config.entries.length)
// build = new Build_bracket().frame(_config.entries, bracket)
// delete bracket
// delete build



// const frame = function(bracket) {
//   if (bracket) {
//     bracketContainer.innerHTML = ""
//     bracket.forEach( match => {
//       bracketContainer.innerHTML += /*html*/`
//         <div class="matchContainer">
//           <div class="matchContestant">
//             ${match[0] || match}
//           </div>
//           (vs)
//           <div class="matchContestant">
//             ${(match[1] || "*bye")}
//           </div>
//         </div>
//       `
//     })
//   }
// }
//
// const reBuild = function(){
//   _state.bracket.entries = entries = parseInt(entriesInput.value)
//   if (_state.bracket.buildFrame()) {
//     frame(_state.bracket.frame)
//   } else {
//     console.log('no rebuild')
//   }
// }
//
//
// const addRemove = function(add) {
//   _state.entries = add ? _state.entries + 1 : _state.entries -1
//   entriesInput.value = _state.entries
//   reBuild()
// }
