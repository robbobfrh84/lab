var http = require('http');

var cnt = 0

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': req.headers.origin,
  })

  res.end(' '+cnt)
  cnt++

}).listen(8080)
