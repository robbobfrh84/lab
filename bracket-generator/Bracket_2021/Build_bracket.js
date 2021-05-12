class Build_bracket {


  constructor (params) {
    Object.assign(this, params)
    this.bracket = new Bracket_object(_config.entries)
    if (this.bracket.object) {
      bracketContainer.innerHTML = ""
      bracketContainer.onclick = ()=>{ this.testy() } // TEST⚠️
      for (var i = 0; i < this.bracket.object.length; i+=2) {
        this.match(
          bracketContainer,
          this.bracket.object[i],
          this.bracket.object[i+1]
        )
      }
    }
  }


  match (elm, home, away) {
    const homeName = home.info && home.info.name || "<em>unknown</em>"
    elm.innerHTML += /*html*/`

      <div class="matchContainer">

        <div class="matchContestant">
          <div class="matchSeed">${ home.info && home.info.seed || "" }</div>
          ${ home.info && home.info.name || "<em>unknown</em>" }
        </div>

        <div class="matchContestant">
          <div class="matchSeed">${ away.info && away.info.seed || "" }</div>
          ${ away.info && away.info.name || "<em>unknown</em>" }
        </div>

      </div>
    `
  }


  testy () { // TEST⚠️
    console.log('testy')
  }

  clear() {
    delete this.bracket
  }


}



// PRESERVE
//
//

// // frame (entries, { indexKey, seedKey } ) {
// frame (entries, { indexKey, seedKey } ) {
//   // entries.forEach( (entry, i)  => {
//   //   console.log("entry :", entry)
//   //   if (entry.seed) {
//   //     // seedKey[entry.seed - 1].info = entry
//   //     indexKey[seedKey[entry.seed - 1].index].info = entry
//   //   }
//   // })
//   // console.log("indexKey :", indexKey)
//
//   // if (seedKey) {
//   //   bracketContainer.innerHTML = ""
//   //   bracketContainer.onclick = ()=>{ this.testy() }
//   //   for (var i = 0; i < indexKey.length; i+=2) {
//   //     this.match( bracketContainer, indexKey[i], indexKey[i+1])
//   //   }
//
//
//
//
//
//     // seedKey.map( seed => {
//     //   if (seed.seed == )
//     // })
//
//     // for (var i = 0; i < seedKey.length; i+=2) {
//     //   console.log(seedKey[i], seedKey[i+1])
//     // }
//
//     // bracket.forEach( match => {
//     //   this.match( bracketContainer, match )
//     // })
//   // }
// }
