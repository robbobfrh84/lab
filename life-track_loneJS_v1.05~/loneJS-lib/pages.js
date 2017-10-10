var _OLD_HASH = window.location.hash.split('#')[1]

document.onreadystatechange = ()=>{
  if (document.readyState === 'complete') {
    _PAGE_SET(window.location.hash.split('#')[1], true)
  }
}

_PAGE_SET = (dir, initial, hash = '')=>{
  event.preventDefault()
  let active = document.querySelectorAll('[activePage]')
  for (page of active) _PAGE_Display(page.getAttribute('pageName'))
  if (dir) {
    for (page of dir.split('/')) {
      _PAGE_Display(page)
      hash += '/' + page
    }
    _OLD_HASH = hash.slice(1)
    window.location.href = '#' + hash.slice(1)
    if (!initial) _UPDATE_COMPONENTS(hash)
  }
}

_PAGE_Display = (page)=>{
  pageGroup = document.querySelector("[pageName='"+page+"']")
  pages = document.getElementsByTagName(pageGroup.tagName)
  for (var i = 0; i < pages.length; i++) { // iOS does not like (i of arr) here... for some reason
     if (page === pages[i].getAttribute('pageName')) {
      pages[i].setAttribute('style', 'display: intial;')
    } else {
      pages[i].setAttribute('style', 'display: none;')
    }
  }
}

_UPDATE_COMPONENTS = (hash)=>{
  for (const component of _COMPONENTS_STORED_GLOBALLY) {
    component.setAttribute('directory', hash)
  }
}

window.onhashchange = function() {
  const hash = window.location.hash.split('#')[1]
  if (_OLD_HASH !== hash) _PAGE_SET(hash)
}

_GO_BACK = ()=>{ window.history.back() }
