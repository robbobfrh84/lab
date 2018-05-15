document.getElementById('page-signUp').innerHTML = `
  <br>
  Enter UserName:
  <input id='userName'><br><br>
  <button onClick='addUser()'> Create New Account </button>
`

addUser = ()=>{
  let nameFail = false
  const newUser = document.getElementById('userName')
  for (const account in accounts) {
    if (account == newUser.value) {
      nameFail = true
      alert('this name is already taken, please select another...')
    }
  }
  if (!/^[a-zA-Z]/.test(newUser.value[0])) {
    nameFail = true
    alert('Username must start with a letter a-z or A-Z')
  }
  if (newUser.value.split(' ').length > 1) {
    nameFail = true
    alert('Username cannot contain a space')
  }
  if (!nameFail) {
    console.log('ok to go')
    ddb('put','signUp',newUser.value,null,()=>{
      account = newUser.value
      pageSwap('account')
      newUser.value = ""
      ddbGet('accounts',()=>{
        setAccount(account)
        buildAccounts()
      })
    })
  }
  newUser.value = ""
}
