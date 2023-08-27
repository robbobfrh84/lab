class Bracket {

  constructor (params) {
    this.entries = params.entries ?? 16 // 2-128
    this.style = params.style ?? "center" // "center" or "left"
    this.outBracket = ![2,4,6,8,16,32,64,128].includes(this.entries)
    this.buildFrame()
  }

  buildFrame () {
    if (this.entries < 2 || this.entries > 128) {
      this.entries = "Must be at least 2 and less than 128"
      this.frame = "no frame"
      return
    }
    this.frame = [1, 2]
    for (var i = 3; i <= this.entries; i++) {
      let lowSeed = this.frame[0];
      let lowSeedIndex = 0;
      for (const j in this.frame) { // Don't think we have to start @ index-0
        if (this.frame[j] > lowSeed){
          lowSeed = this.frame[j]
          lowSeedIndex = j
        }
      }
      this.frame[lowSeedIndex] = [lowSeed, i]
      if (lowSeedIndex === 0 && this.entries !== i){
        this.frame = [].concat.apply([], this.frame)
      }
    }
  }

}
