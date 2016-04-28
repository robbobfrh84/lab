
var pubnub = require('pubnub').init({
  subscribe_key: 'sub-c-b3fbc6fa-0bf5-11e6-a8fd-02ee2ddab7fe',
  publish_key:   'pub-c-926e03e9-2cbb-4a3d-b17a-2ee47ca078a5'
});
var channel = 'hue-clone';

pubnub.subscribe({
  channel: channel,
  callback: function(m) {

    console.log( 'Change', m );

  },
  error: function(err) {console.log(err);}
});
