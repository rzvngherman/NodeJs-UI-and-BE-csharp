'use strict';

var http = require('http');
var port = process.env.PORT || 1337;

const lib2 = require("./helpers/request_processors.js");
const lib1 = require("./helpers/response_functions");

const requestListener = function (req, res) {
    //Serving JSON
    res.setHeader("Content-Type", "application/json");
    switch (req.method) {
        case "GET":
            lib2.ProcessGet(req, res);
            break

        case "POST":
            lib2.ProcessPost(req, res);
            break

        case "DELETE":
            lib2.ProcessDelete(req, res);
            break

        default:
            lib1.get405(req, res);
            break;
    }
};

const server = http.createServer(requestListener)

server.listen(port);

console.log("Use browser to get url 'http://localhost:" + port +"'");
console.log("Available endpoints:");
console.log("    GET and POST '/books'");
console.log("    GET '/book?title=...'");
console.log("    DELETE '/book'");
console.log("    GET '/authors'");
console.log("    GET '/date?year=...&month=...'");
