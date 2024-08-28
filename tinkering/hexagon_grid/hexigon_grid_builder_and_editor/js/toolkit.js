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
function getRadiusSide(fillWidth, alignPointUp, columns) {
    if (alignPointUp) {
      side = fillWidth / ((columns * 2) + 1)
      radius = side / Math.sin(60*(Math.PI/180))  
    } else {
      radius = fillWidth / ((columns * 2) + 1)
      side =  Math.sqrt((radius*radius) - ((radius/2)*(radius/2))) 
    }
    return { side, radius }
  }
function getDiameter(i, alignPointUp) {
  return ( 60 * i + (alignPointUp === true ? -30 : -60 ) )
}
