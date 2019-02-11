const _gas = new GAS('https://script.google.com/macros/s/AKfycbwrQkrzfKpFNt7WKKHvjSDzSg3U9ONFNS-3VJ98AxkW7tcohgg/exec')
let coords = {}
let fishCnt = 0
const fishColors = {
  blue: "https://raw.githubusercontent.com/robbobfrh84/lab/master/fishMap/gfx/blue.png",
  brown: "https://raw.githubusercontent.com/robbobfrh84/lab/master/fishMap/gfx/brown.png",
  aqua: "https://raw.githubusercontent.com/robbobfrh84/lab/master/fishMap/gfx/aqua.png",
  red: "https://raw.githubusercontent.com/robbobfrh84/lab/master/fishMap/gfx/red.png"
}

window.onload = function(){

  _gas.crud( "READ" , "sheet", {
    sheetName: 'set1',
  }).then( payload => {
    _mapGo(payload)
  })

}
