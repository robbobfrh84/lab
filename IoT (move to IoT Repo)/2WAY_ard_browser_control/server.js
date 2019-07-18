var http = require('http');
var data = {
	ardActive: false,
	browserActive: false,
	ardLastCommunication: 0,
  ardLastDelay: 0,
	browserLastCommunication: 0,
	r: 0,
	g: 0,
	b: 0,
	p: 0,
}

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': req.headers.origin || true
  })

  var query = req.url.split('/?')[1]

  if (query) {
    console.log('query recieved', query)
    handleReq(res, query)
  } else {
    res.end("Hello From Server, Your query was not found/handled.")
  }

}).listen(8080)

var handleReq = function(res, query){
  [ user, val ] = query.split('&')
  if (user) user = user.split('=')[1]
  if (val) val = val.split('=')[1]
  if (user === 'browser') {
    const rgb = val.split('-')
    data.r = parseInt(rgb[0])
    data.g = parseInt(rgb[1])
    data.b = parseInt(rgb[2])
    data.browserLastCommunication = Date.now()
    res.end(JSON.stringify(data))
  }
  if (user === 'ard') {
    data.p = parseInt(val)
    data.ardLastDelay = Date.now() - data.ardLastCommunication
    data.ardLastCommunication = Date.now()
    res.end("["+data.r+","+data.g+","+data.b+"]")
  }
  console.log(data)
}

// $ arp -a > lists all ports addresses available good for iphone test.
// $ lsof -n -i4TCP:8080 // get list of 8080 port and use PID to replace 1303
// $ kill -9 1303
