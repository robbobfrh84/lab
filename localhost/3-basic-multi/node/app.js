var http = require('http');

var game = {}

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': req.headers.origin
  })

  var query = req.url.split('/?')[1]

  if (query) {
    console.log('query recieved', query)
    handleReq(res, query)
  } else {
    console.log('No request, send base html and .end()')
    res.end('hello from server')
  }

}).listen(8080)

var handleReq = function(res, query){
  const [ key, value ] = query.split('=')
  if (key === 'createUser') {
    game[value] = ''
  }
  if (key === 'value') {
    const [ val, name ] = value.split('&')
    game[name] = val
  }
  res.end(JSON.stringify(game))
}
