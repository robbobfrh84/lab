var fs = require('fs')
,http = require('http'),
socketio = require('socket.io'),
url = require("url"),
stats = require("./statistics");

var socketServer;

// handle contains locations to browse to (vote and poll); pathnames.
function startServer(route,handle)
{
	// on request event
	function onRequest(request, response) {
	  // parse the requested url into pathname. pathname will be compared
	  // in route.js to handle (var content), if it matches the a page will 
	  // come up. Otherwise a 404 will be given. 
	  var pathname = url.parse(request.url).pathname; 
	  console.log("Request for " + pathname + " received");
	  var content = route(handle,pathname,response,request);
	}
	
	var httpServer = http.createServer(onRequest).listen(1337, function(){
		console.log("Listening at: http://localhost:1337");
		console.log("Server is up");
		stats.initNumbers(); // load previous votes from JSON file
	}); 
	initSocketIO(httpServer);
}

function initSocketIO(httpServer)
{
	socketServer = socketio.listen(httpServer);
	socketServer.on('connection', function (socket) {
	console.log("user connected");
	socket.emit('onconnection', {pollOneValue:stats.pollOne(),pollTwoValue:stats.pollTwo()}); // on connection send poll one and two values
	// when message from a client is recieved, send it to all clients
	socketServer.on('update', function(data) {
		socket.emit('updateData',data);
		console.log(data);
	});
    });
}

function updatePollData()
{
	socketServer.emit('update',{pollOneValue:stats.pollOne(),pollTwoValue:stats.pollTwo()});
}

exports.start = startServer;
exports.updatePollData = updatePollData;