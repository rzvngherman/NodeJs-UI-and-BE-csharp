'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
const host = 'localhost'; 
const { parse } = require('querystring');

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
    //Serving JSON
    res.setHeader("Content-Type", "application/json");
    switch (req.method) {
        case "GET":
            ProcessGet(req, res);
            break

        case "POST":
            ProcessPost(req, res);
            break

        default:
            get405(req, res);
            break;
    }

    ////Serving JSON
    //res.setHeader("Content-Type", "application/json");
    //res.writeHead(200);
    //res.end('{"message": "This is a JSON response"}');

    ////Serving text
    ////res.writeHead(200, { 'Content-Type': 'text/plain' });
    ////res.end('Hello World\n');
};

const server = http.createServer(requestListener)

server.listen(port);

console.log("Use browser to get url 'http://localhost:" + port +"'");
console.log("Available endpoints:");
console.log("    '/books'");
console.log("    '/authors'");
console.log("    '/date'");

function get405(req, resp) {
    //resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
    //resp.write("<html><html><head><title>405</title></head><body>405: Method not supported</body></html>");
    //resp.end();
    
	resp.writeHead(405);
    resp.end(JSON.stringify({ error: "Method not supported" }));
}

function get404(req, resp) {
    //resp.writeHead(404, "Resource Not Found", { "Content-Type": "text/html" });
    //resp.write("<html><html><head><title>405</title></head><body>404: Resource Not Found</body></html>");
    //resp.end();
    
	resp.writeHead(404);
    resp.end(JSON.stringify({ error: "Resource not found" }));
}

function ProcessGet(req, res) {
    switch (req.url) {
        case "/books":
            res.writeHead(200);
            res.end(books);
            break

        case "/authors":
            res.writeHead(200);
            res.end(authors);
            break

        case "/date":
            res.writeHead(200);
            var q = url.parse(req.url, true).query;
            var txt = q.year + " " + q.month;
            res.end(txt);
            break

        default:
            get404(req, res);
    }
}

function ProcessPost(req, res) {
    switch (req.url) {
        case "/books":
			collectRequestData(req, result => {
				console.log(result);
				res.end(`Book with title '${result.title}' added !`);
            });

            break

        default:
            get404(req, res);
	}
}

function collectRequestData(request, callback) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        //callback(parse(body));
        callback(JSON.parse(body));
    });
}

