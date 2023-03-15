'use strict';

var http = require('http');
var port = process.env.PORT || 1337;

const routes = require("./routes");

const server = http.createServer(routes.requestListener)

server.listen(port);

console.log("Use browser to get url 'http://localhost:" + port +"'");
console.log("Available endpoints:");

var builder = routes.GetEndpointDescriptions()
var result = builder.join("\r\n");
console.log(result);