const coffeeLink = "https://www.buymeacoffee.com/inVX3reJK"

const coffeeLinkGo = function() {
  window.location.href = coffeeLink
}

let shakes = 3;
let shake = shakes
const delay1 = 150;
const delay2 = 5000;
const shake_RL = function(noStop){
  const delay = noStop ? 1 : delay1
  setTimeout(()=>{
    testy.style.transform = "rotate(-7deg)";
    setTimeout(()=>{
      if (shake > 0) {
        testy.style.transform = "rotate(2deg)";
        shake--
        shake_RL()
      } else {
        testy.style.transform = "rotate(0deg)";
        coffeeContainer.style.width = "65px"
        setTimeout(()=>{
          shake = shakes
          coffeeContainer.style.width = "70px"
          shake_RL(true)
        },delay2)
      }
    },delay1)
  },delay)
}

setTimeout(()=>{
  coffeeContainer.style.width = "70px"
  shake_RL(true)
},1000)
