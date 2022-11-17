function eggFound() {
  window.egg.innerText = '💩'
  egg.style.animationName = "none"
  egg.style.left = random(50, (window.innerWidth-100)) + "px"
  setTimeout(()=>{
    egg.style.animationName = "drop"
  },1)
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
x = random(20,40)
