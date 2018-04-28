var hash = window.location.hash.split('#')[1]
  !hash ? hash = [] : hash = hash.split('/')
var page = hash[0] || 'home'
var oldPage = 'home'
var account
var accounts
var boxData = {}
var postCanvases = []
var galCanvases = []
var currentColor = 'brown'
var mousedown = false
var initial = true

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
    buildPageCreate()
  }
}

logInOut = ()=>{
  account = ''
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

_rand = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

_rgbR = ()=>{
  return 'rgb('+_rand(0,255)+', '+_rand(0,255)+', '+_rand(0,255)+')';
}
