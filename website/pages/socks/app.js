let bg = 7
let matching = 10
let mismatched = 21

window.onload = ()=>{
  pairsInput.value = 1
  insideOutInput.value = 50;
  var img = document.createElement("img");
  img.src = "images/bg/bg"+random(1,bg)+".png";
  img.alt = "A Bunch of Mismatched Socks";
  img.classList.add("socks-image");
  socksImage.appendChild(img);
  setTimeout(function() {socksImage.classList.add("fade-in");}, 1);
}

function calculateOdds() {
  var socks = (parseInt(document.getElementById("pairsInput").value) * 2) - 1;
  var insideOutPercentage = parseInt(document.getElementById("insideOutInput").value);

  var notInsideOutProbability = (1 - (insideOutPercentage / 100)) * (1 - (insideOutPercentage / 100));
  var matchingProbability = 1 / socks;

  var odds = (notInsideOutProbability * matchingProbability);
  var oddsPercent = odds * 100

  document.getElementById("result").innerHTML = `
    Matching socks odds: <strong>${Number(oddsPercent.toFixed(2))}%</strong>
    </br>
    fraction: <strong>${getlowestfraction(odds)}</strong>
  `
}

function putOnSocks() {
  calculateOdds() 
  socksImage.classList.remove("fade-in");
  setTimeout(function() {
    var pairs = parseInt(document.getElementById("pairsInput").value);
    var insideOutPercentage = parseInt(document.getElementById("insideOutInput").value);

    var notInsideOutProbability = 1 - (insideOutPercentage / 100);
    var matchingProbability = 1 / pairs;

    var odds = (notInsideOutProbability * matchingProbability);
    var randomNumber = Math.random();

    console.log('randomNumber, odds:',randomNumber, odds)

    var isMatch = randomNumber <= odds

    var socksImage = document.getElementById("socksImage");
    socksImage.innerHTML = "";

    var img = document.createElement("img");
    img.src = isMatch ? "images/matching/m"+random(1,matching)+".png" : "images/mismatched/x"+random(1,mismatched)+".png";
    img.alt = isMatch ? "Matching Socks" : "Mismatched Socks";
    img.classList.add("socks-image");
    socksImage.appendChild(img);

    var symbol_right = document.createElement("div");
    symbol_right.classList.add("symbol");
    symbol_right.classList.add("right");
    symbol_right.innerHTML = '<img src="' + (isMatch ? "images/check.png" : "images/icon_x.png") + '" alt="' + (randomNumber <= matchingProbability ? "Checkmark" : "X") + '">';
    socksImage.appendChild(symbol_right);

    var symbol_left = document.createElement("div");
    symbol_left.classList.add("symbol");
    symbol_left.classList.add("left");
    symbol_left.innerHTML = '<img src="' + (isMatch ? "images/check.png" : "images/icon_x.png") + '" alt="' + (randomNumber <= matchingProbability ? "Checkmark" : "X") + '">';
    socksImage.appendChild(symbol_left);

    setTimeout(function() {
      socksImage.classList.add("fade-in");
    }, 1);
  }, (500));
}


/* 
    * * * * Toolkit * * * * 
*/
const random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getlowestfraction(x0) {
  var eps = 1.0E-15;
  var h, h1, h2, k, k1, k2, a, x;
  x = x0;
  a = Math.floor(x);
  h1 = 1;
  k1 = 0;
  h = a;
  k = 1;
  while (x-a > eps*k*k) {
    x = 1/(x-a);
    a = Math.floor(x);
    h2 = h1; h1 = h;
    k2 = k1; k1 = k;
    h = h2 + a*h1;
    k = k2 + a*k1;
  }

  return h + "/" + k;
}