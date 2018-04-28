document.getElementById('page-signUp').innerHTML = `
  <br>
  Enter UserName:
  <input id='userName'><br><br>
  <button onClick='addUser()'> Create New Account </button>
`

addUser = ()=>{
  let nameTaken = false
  const newUser = document.getElementById('userName')
  for (const account of accounts) {
    if (account.account == newUser.value) {
      nameTaken = true
    }
  }
  if (nameTaken) {
    newUser.value = ""
    alert('this name is already taken, please select another...')
  } else {
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


}
