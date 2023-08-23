function checkHash(page) {
  if ("#"+page.folder === window.location.hash) {
    window.location.href = "/"+page.route+page.folder
  }
}

function buildLists(elm, list) {
  elm.innerHTML = ""
  list.forEach( link => {
    checkHash(link)
    const name = link.name || "#"+link.folder
    const href = link.folder ? link.route+link.folder : link.route

    const tweet = link.tweet ? /*html*/`
      <a class='link btn' href='${link.tweet}'>🐦</a>
    ` : "";
    const medium = link.medium ? /*html*/`
      <a class='link btn' href='${link.medium}'>Ⓜ</a>
    ` : "";
    const youtube = link.youtube ? /*html*/`
      <a class='link btn' href='${link.youtube}'>📺</a>
    ` : "";    
    const threads = link.threads ? /*html*/`
      <a class='link btn' href='${link.threads}'>🧵</a>
    ` : "";

    const mobile = link.mobile ? "📱" : ""

    elm.innerHTML += /*html*/`
      <div class="link-container">
        <a class="link" href="${href}">${name}</a>
        <a class="link btn sm" target="_blank" href="${href}">↗️</a>
        ${tweet}
        ${medium}
        ${youtube}
        ${threads}
        ${mobile}
      </div>
    `
  })

}
