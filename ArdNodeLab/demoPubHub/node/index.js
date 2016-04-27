var five = require('johnny-five');

var led;
var r = 0;
var b = 0;
var g = 0;

five.Board().on('ready', function() {
  console.log('ready');

  // Initialize the RGB LED
  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });

  // Turn it on and set the initial color
  led.on();
  led.color({red: r, blue: b, green: g});
});

var pubnub = require('pubnub').init({
  subscribe_key: 'sub-c-b3fbc6fa-0bf5-11e6-a8fd-02ee2ddab7fe',
  publish_key:   'pub-c-926e03e9-2cbb-4a3d-b17a-2ee47ca078a5'
});
var channel = 'hue-clone';

pubnub.subscribe({
  channel: channel,
  callback: function(m) {
    if(led) {
      r = (m.color === 'red') ? m.brightness : r;
      g = (m.color === 'green') ? m.brightness : g;
      b = (m.color === 'blue') ? m.brightness : b;

      led.color({red: r, blue: b, green: g});

      console.log( 'color change to...' );
      console.log( led.color() );
    }
  },
  error: function(err) {console.log(err);}
});
