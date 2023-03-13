'use strict';

var http = require('http');
var port = process.env.PORT || 1337;

const _reqProcess = require("./helpers/request_processors.js");
const _respFct = require("./helpers/response_functions");

//method 'requestListener'
const requestListener = function (req, res) {
    //Serving JSON
    res.setHeader("Content-Type", "application/json");
    switch (req.method) {
        case "GET":
            _reqProcess.ProcessGet(req, res);
            break

        case "POST":
            _reqProcess.ProcessPost(req, res);
            break

        case "DELETE":
            _reqProcess.ProcessDelete(req, res);
            break

        default:
            _respFct.get405(res);
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
console.log("    GET '/alien'");
console.log("    GET '/animal'");