var _sortref = { name: 'id', dir: false }
var d6 = ['&#x2680;','&#x2681;','&#x2682;','&#x2683;','&#x2684;','&#x2685;']
var cc = 0
var fighters = []
var _oldPage = 'home'
var SHEET = new Sheet({ sheetName: 'list' })
var _gas = new GAS('https://script.google.com/macros/s/AKfycbz4DQQ27r3AIEc1hWeXGc_aoD_r3Scf4bGQEMf8S3MaMhJfLhHa/exec')

window.onload = ()=>{
  _curate_fighters().then(()=>_page_spar())
  let setPage = window.location.hash
  setPage = setPage.split('#')[1]
  if (setPage) _page(setPage)
}
