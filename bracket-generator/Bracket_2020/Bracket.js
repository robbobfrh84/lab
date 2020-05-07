class Bracket {

  constructor (params){
    this.entries = params.entries ?? 16 // 1,2,3,4... MAX 128
    this.style = params.style ?? "center" // "center" or "left"
  }

}
