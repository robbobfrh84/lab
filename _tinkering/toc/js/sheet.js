class Sheet {

  constructor(params){
    Object.assign(this, params)
  }

  async getFighters() {
    return _gas.crud( "READ" , "sheet", {
      sheetName: this.sheetName,
    }).then(data => {
      return data[this.sheetName]
    })
  }

  async updateFighter(id, obj) {
    return _gas.crud( "UPDATE" , "row", {
      sheetName: this.sheetName,
      _Id: id,
      content: obj
    }).then( data => {
      return "next"
    })
  }

}
