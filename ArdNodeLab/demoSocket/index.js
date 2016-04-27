var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.vote;
handle["/vote"] = requestHandlers.vote;
handle["/poll"] = requestHandlers.poll;
handle["/form"] = requestHandlers.form;

server.start(router.route,handle);