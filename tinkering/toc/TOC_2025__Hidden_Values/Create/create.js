window.onload = async ()=>{
  const sheet = await getSheet()
  console.log('Create Page sheet:',sheet)
  matchSheetName.innerHTML = sheet.sheetName || ''
}

const createCharecter = function() {
  const name = nameInput.value || ""
  const region = regionInput.value || "no region"
  
  const nameTooShort = name.length < 1
  const nameExceeds = name.length > 16
  const regionExceeds = region.length > 16
  
  if (nameTooShort) {
    alert("Name must be at least 1 character")
    return
  }
  
  if (nameExceeds || regionExceeds) {
    const errors = []
    if (nameExceeds) errors.push("Name")
    if (regionExceeds) errors.push("Region")
    alert(`${errors.join(" and ")} must be 16 characters or less`)
    return
  }
  
  const character = {
    name: name,
    region: region,
    wins: "0",
    losses: "0",
    age: Math.min(...[random(18,50), random(18,50), random(18,50)]),
    sex: sexes[random(0,3)],
    notes: "",
    attributes: encodeObscured(JSON.stringify({
      sp: random(1,6),
      st: random(1,6),
      ex: random(1,6),
      in: random(1,6),
      wp: random(1,6)
    })),
  }

  console.log('Create character:', character)

  loader.style.display = 'flex'
  gasup.create.row({
    sheetId: sheetId,
    row: character
  })
    .then( response => {
      console.log(response) 
      createNote.innerHTML = `Created "${response.data.row.rowObj.name}"`
      nameInput.value = ""
      nameInput.focus()
    })
    .catch( error => console.log(error) )
    .finally( () => {
      loader.style.display = 'none'
    })
}


/* ⚙️ Tools ⚙️ */

random = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function encodeObscured(inputStr) {
  const salt = Math.random().toString(36).slice(2, 6)
  const salted = `${inputStr}::${salt}`
  const scrambled = Array.from(salted)
    .map((char, i) => {
      const saltChar = salt.charCodeAt(i % salt.length)
      return (char.charCodeAt(0) + saltChar).toString(36)
    })
    .join('.')
  return `${salt}|${scrambled}`
}

function decodeObscured(encodedStr) {
  const [salt, scrambled] = encodedStr.split('|')
  if (!salt || !scrambled) return null
  const parts = scrambled.split('.')
  const decoded = parts.map((part, i) => {
    const saltChar = salt.charCodeAt(i % salt.length)
    return String.fromCharCode(parseInt(part, 36) - saltChar)
  }).join('')

  return decoded.split('::')[0]
}
