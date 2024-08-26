/* 🛠 toolkit 🛠 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function emptyElement(elm) {
  let child = elm.lastElementChild 
  while (child) {
    elm.removeChild(child)
    child = elm.lastElementChild
  }
}
