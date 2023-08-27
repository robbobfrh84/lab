class Bracket_object {


  constructor (entries) {
    this.entries = entries
    this.entriesTotal = entries.length
    this.bracketRange = [2,4,6,8,16,32,64,128]
    this.outBracket = !this.bracketRange.includes(this.entriesTotal)
    this.seedPairs = []
    this.seedKey = []
    this.object = []
    this.orderSeeds()
  }


  orderSeeds () {

    if (this.entriesTotal < 2 || this.entriesTotal > 128) {
      alert("Must be at least 2 and less than 128")
      return false
    } else {
      this.seedPairs = [1,2]
      let isBye = false

      for (var i = 3; i <= this.entriesTotal; i++) {
        let lowSeed = this.seedPairs[0];
        let lowSeedIndex = 0;
        for (const j in this.seedPairs) { // Don't think we have to start @ index-0
          if (this.seedPairs[j] > lowSeed){
            lowSeed = this.seedPairs[j]
            lowSeedIndex = j
          }
        }
        if (isBye) {
          this.seedPairs[lowSeedIndex] = [lowSeed, { seed: i, bye: true } ]
        } else {
          this.seedPairs[lowSeedIndex] = [lowSeed, i]
        }
        if (lowSeedIndex === 0 && this.entriesTotal !== i){
          this.seedPairs = [].concat.apply([], this.seedPairs)
        }
        if (i >= this.entriesTotal && !isBye) {
          const byes = this.seedPairs.filter( p => typeof p === "number" )
          isBye = true
          this.entriesTotal+= byes.length
        }
      }

      this.build_indexKey_and_seedKey()
      return true
    }
  }


  build_indexKey_and_seedKey () {

    this.seedPairs.forEach( (seedMatch, i) => {
      this.object[(i*2)] = typeof seedMatch[0] === "number" ? {
        seed: seedMatch[0],
        index: i*2
      } : seedMatch[0]
      this.object[(i*2)+1] = typeof seedMatch[1] === "number" ? {
        seed: seedMatch[1],
        index: (i*2)+1
      } : { seed: seedMatch[1].seed, bye: true, index: (i*2)+1 }
    })

    this.object.map( (entry, i) => {
      this.seedKey[entry.seed - 1] = entry
    })

    this.entries.forEach( (entry, i) => {
      if (entry.seed) {
        this.object[this.seedKey[entry.seed - 1].index] = {...this.seedKey[entry.seed - 1]}
        this.object[this.seedKey[entry.seed - 1].index].info = entry
      }
    })

  }


}
