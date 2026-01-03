window.onload = async ()=>{
  const sheet = await getSheet()
  console.log('Home sheet:',sheet)
  matchSheetName.innerHTML = sheet.sheetName || ''
  window.currentSheetData = sheet
  initializeRegionFilter()
  setTable(sheet)
}