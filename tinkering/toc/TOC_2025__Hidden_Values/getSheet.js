const deployId = "AKfycbwu9tQSLZ-AXYs8h6nVuqxb_zdi6gmHnjPKOw4udfGGNybtTGAk8rKiFIHIxkZhog0uIQ"
const id = "1JIXolkM-XXJJdzm33evUv-zXYT6XGuliEZmt4B4UdHw"
const gasup = new Gasup({ deployId, id, app: { name: "My GAS Up App"} })

const defaultSheetId = "1201186557" // * Test1 sheet
let sheetId = defaultSheetId

const getSheet = () => { 
  getSheetId()
  return readSheet()
}

const getSheetId = function() {
  if (!localStorage.toc_2025__character_creator_sheetId) {
    console.log('* No local sheetId found')
    localStorage.setItem("toc_2025__character_creator_sheetId", sheetId)
  }
  if (window['sheetIdValue']) {
    sheetIdValue.value = localStorage.toc_2025__character_creator_sheetId
  }
  sheetId = localStorage.toc_2025__character_creator_sheetId
}

const updateSheedId = function() {
  console.log('sheetId.value:',sheetIdValue.value)
  localStorage.setItem("toc_2025__character_creator_sheetId", sheetIdValue.value)
  window.location.reload()
}

const readSheet = function() {
 loader.style.display = 'flex'
  return gasup.read.sheet({
    sheetId: sheetId
  })
    .then( response => {
      chars = response.data.rows
      return response.data
    })
    .catch( error => { 
      console.log(error)
      alert(`Oh no! There's been an issue finding your sheet. \n\nerror: ${JSON.stringify(error)}`)
    })
    .finally( () => {
      loader.style.display = 'none'
    })
}
