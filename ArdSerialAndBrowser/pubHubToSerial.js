var serialport = require('/dev/cu.usbmodem1411');// include serialPort library
   SerialPort = serialport.SerialPort; // make a local instance of it
   portName = process.argv[2];

var myPort = new SerialPort(portName, {
   baudRate: 9600,
   parser: serialport.parsers.readline("\n")
 });

 myPort.on('open', function() {
   console.log('Port open');
 });

 myPort.on('data', function(data) {
   console.log(data);
 });

var pubnub = require('pubnub').init({
  subscribe_key: 'sub-c-b3fbc6fa-0bf5-11e6-a8fd-02ee2ddab7fe',
  publish_key:   'pub-c-926e03e9-2cbb-4a3d-b17a-2ee47ca078a5'
});
var channel = 'hue-clone';

pubnub.subscribe({
  channel: channel,
  callback: function(m) {
    console.log('Change',m);
    myPort.write(m.ledNum+'L'+m.col[0]+'R'+m.col[1]+'G'+m.col[2]+'B');
  },
  error: function(err) {console.log(err);}
});
