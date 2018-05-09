var hash = window.location.hash.split('#')[1]
  !hash ? hash = [] : hash = hash.split('/')
var page = hash[0] || 'home'
var oldPage = 'home'
var account
var accounts
var artClone;
var boxData = {}
var boxDataAdj = { x: 0, y: 0 }
var galCanvases = []
var currentColor = 'brown'
var mousedown = false
var initial = true
const g4 = [1,2,5,6]
const g49 = [1,2,4,5]
const g9 = [1,2,3,5,6,7,9,10,11]

if (hash[1]) {
  account = hash[1]
}

window.onload = ()=>{
  ddbGet('accounts', (data)=>{
    accounts = data.Item.accounts
    var user = !account ? '' : '/'+account
    window.location.hash = '#'+page+user
    if (account) setAccount(account)
    pageSwap(page)
    buildPageCreate()
    buildAccounts(accounts)
    initial = false
  })
}

pageSwap = (page)=>{
  var user = !account ? '' : '/'+account
  var newPage = document.getElementById('page-'+page)
  document.getElementById('page-'+oldPage).style.display = 'none'
  newPage.style.display = 'block'
  window.location.hash = '#'+page+user
  oldPage = page
  if ((page === 'create' || page === 'account') && !account) {
    pageSwap('login')
  }
  if (page === 'showcase') {
    buildPageShowcase()
  }
  if (page === 'create') {
    if (boxDataAdj.x != 0 && boxDataAdj.y != 0 ) {
      boxDataAdj = { x: 0, y: 0 }
      buildPageCreate()
    }
    buildPageCreate()
  }
}

logInOut = ()=>{
  account = ''
  boxDataAdj = { x: 0, y: 0 }
  pageSwap('login')
  document.getElementById('navBar-login').innerHTML = "login"
  document.getElementById('navBar-accountHome').innerHTML = ''
  document.getElementById('navBar-create').innerHTML = ''
}

setAccount = (user)=>{
  account = user
  document.getElementById('navBar-login').innerHTML = ""
  document.getElementById('navBar-create').innerHTML = 'create ::'
  document.getElementById('navBar-accountHome').innerHTML = `
    <div id='login-accountHome-btn'>&#x1F464;</div>
    &nbsp;&nbsp;&nbsp;&nbsp; ${account}
  `
  pageSwap('account')
  if (!initial) buildAccount()
  buildPageCreate()
  document.getElementById('account-userName').innerHTML = `User Account: ${account}`
}

document.body.addEventListener('mousedown', ()=>{
  mousedown = true;
})

document.body.addEventListener('mouseup', ()=>{
  mousedown = false;
})
