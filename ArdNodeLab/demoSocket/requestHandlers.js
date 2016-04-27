// functions that will be executed when 
// typeoff handle[pathname] === a function in requestHandlers.
// the handle and function are discribed in index.js

var fs = require('fs'),
stats = require('./statistics')
server = require('./server');

function vote(response,request) {
  console.log("Request handler 'vote' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  var html = fs.readFileSync(__dirname + "/pages/vote.html");
  var jQuery = fs.readFileSync(__dirname + "/pages/script/jQuery.js");
  // need to write a custom header / script for somebody who already voted
  response.write('<script>'+ jQuery +'</script>');
  response.end(html);
}

function poll(response) {
  console.log("Request handler 'poll' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  var html = fs.readFileSync(__dirname + "/pages/poll.html")
  var jQuery = fs.readFileSync(__dirname + "/pages/script/jQuery.js");
  response.write('<script>'+ jQuery +'</script>');
  response.end(html);
}

function form(response,request) {
	if (request.method == 'POST') {
    console.log("[200] " + request.method + " to " + request.url);
    request.on('data', function(chunk) {
      console.log("Received body data:");
	  stats.save(chunk.toString());
	  //broadcast information via socket / send new poll data
	  server.updatePollData(); 
    });
    
    request.on('end', function() {
	  response.writeHead(200, "OK", {'Content-Type': 'text/html'});
      response.end();
    }); 
  }
  // Still need a request header for accessing /form w/o POST
}

// Doesn't Play well with JSON... Need to set up a database for this.. 

// function listIPAdress(request)
// {
	// var adress = request.connection.remoteAddress;
	// console.log();
	// var votedData = {
		// ip: "0.0.0.0",
		// hostname: "name"
	// };
	
	// var log = fs.createWriteStream('data/ipadress.json', {'flags': 'a'});
	// log.end(JSON.stringify(votedData));
// }

exports.vote = vote;
exports.poll = poll;
exports.form = form; 