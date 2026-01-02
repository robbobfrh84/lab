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

/* Testing encode / decode */
// const testAttributes = {
//   sp: 1,
//   st: 3,
//   ex: 2,
//   in: 4,
//   wp: 3,
// }
// const stringed = JSON.stringify(testAttributes)
// console.log('stringed:',stringed)
// const encrypted = encodeObscured(stringed)  
// console.log('encrypted:',encrypted)
// const decrypted = decodeObscured(encrypted)
// console.log('decrypted:', decrypted) 