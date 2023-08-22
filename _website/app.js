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
      <a class='link btn' href='${page.tweet}'>🐦</a>
    ` : "";
    const medium = page.medium ? /*html*/`
      <a class='link btn' href='${page.medium}'>Ⓜ</a>
    ` : "";
    const youtube = page.youtube ? /*html*/`
      <a class='link btn' href='${page.youtube}'>📺</a>
    ` : "";    
    const threads = page.medium ? /*html*/`
      <a class='link btn' href='${page.threads}'>🧵</a>
    ` : "";

    const mobile = page.mobile ? "📱" : ""

    pagesContainer.innerHTML += /*html*/`
      <div class="link-container">
        <a class="link" href="${page.route+page.folder}">#${page.folder}</a>
        <a class="link btn sm" target="_blank" href="${page.route+page.folder}">↗️</a>
        ${tweet}
        ${medium}
        ${youtube}
        ${threads}
        ${mobile}
      </div>
    `
  })

}
