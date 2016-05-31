var five = require('johnny-five');
var led;

five.Board().on('ready', function() {
  console.log('ready');
  // Initialize the RGB LED
  led = new five.Led.RGB({
    pins: { // pin numbers
      red: 6,
      green: 5,
      blue: 3
    }
  });
  // test
  setInterval(function(){testy();}, 500);
  led.color({red: 100, blue: 0, green: 0});
  led.on();
});

function testy(){
  led.color({red: random(1,15), blue: random(1,15), green: random(1,15)});
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
