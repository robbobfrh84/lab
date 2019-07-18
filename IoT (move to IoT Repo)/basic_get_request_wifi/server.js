var http = require('http');

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
    console.log('No request, send default response')
    res.end("Hello From Server!")
  }

}).listen(8080)

var handleReq = function(res, query){
  res.end('server recieved query: '+query)
}

// $ arp -a > lists all ports addresses available good for iphone test.
// $ lsof -n -i4TCP:8080 // get list of 8080 port and use PID to replace 1303
// $ kill -9 1303
