newTag (parent, tag, innerHTML) {
  let child = document.createElement(tag.localName)
  child.innerHTML = innerHTML
  parent.appendChild(child)
}

// CREATE new event listener...
