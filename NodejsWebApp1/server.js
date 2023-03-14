'use strict';

var http = require('http');
var port = process.env.PORT || 1337;

const routes = require("./routes");

const server = http.createServer(routes)

server.listen(port);

console.log("Use browser to get url 'http://localhost:" + port +"'");
console.log("Available endpoints:");
console.log("    GET and POST '/books'");
console.log("    GET '/book?title=...'");
console.log("    DELETE '/book'");
console.log("    GET '/authors'");
console.log("    GET '/date?year=...&month=...'");
console.log("    GET '/alien'");
console.log("    GET '/animal'");