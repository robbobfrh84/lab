function checkHash(page) {
  if ("#"+page.folder === window.location.hash) {
    window.location.href = "/"+page.route+page.folder
  }
}

window.onload = ()=>{  

  pagesContainer.innerHTML = ""
  pages.forEach( page => {
    checkHash(page)


    const tweet = page.tweet ? /*html*/`
      <a class='link btn tweet' href='${page.tweet}'>🐦</a>
    ` : "";
    const medium = page.medium ? /*html*/`
      <a class='link btn sm' href='${page.medium}'>Ⓜ️</a>
    ` : "";
    const mobile = page.mobile ? "📱" : ""


    pagesContainer.innerHTML += /*html*/`
      <div class="link-container">
        <a class="link" href="${page.route+page.folder}">#${page.folder}</a>
        <a class="link btn sm" target="_blank" href="${page.route+page.folder}">↗️</a>
        ${tweet}
        ${medium}
        ${mobile}
      </div>
    `
  })

}
