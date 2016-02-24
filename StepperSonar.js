var serialport = require('serialport'),
    plotly = require('plotly')('robbobfrh84','q9z6vo9d8u'),
    token = 'z6v5gzjwlj';

var portName = '/dev/cu.usbmodem1421';
var sp = new serialport.SerialPort(portName,{
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

// helper function to get a nicely formatted date string
function getDateString() {
    var time = new Date().getTime();
    // 32400000 is (GMT+9 Japan)
    // for your timezone just multiply +/-GMT by 36000000
    var datestr = new Date(time +32400000).toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}

var initdata = [{x:[], y:[], stream:{token:token, maxpoints: 500}}];
var initlayout = {fileopt : "extend", filename : "Sonar1"};

plotly.plot(initdata, initlayout, function (err, msg) {
    if (err) return console.log(err)

    console.log(msg);
    var stream = plotly.stream(token, function (err, res) {
        console.log(err, res);
    });

    sp.on('data', function(input) {
        if(isNaN(input) || input > 1023) return;

    var streamObject = JSON.stringify({ x : getDateString(), y : input });
    console.log(streamObject);
    stream.write(streamObject+'\n');
    });
});
