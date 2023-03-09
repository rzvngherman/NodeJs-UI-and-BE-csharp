'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
const host = 'localhost'; 
const { parse } = require('querystring');

const booksArr = [
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
];

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
};

const server = http.createServer(requestListener)

server.listen(port);

console.log("Use browser to get url 'http://localhost:" + port +"'");
console.log("Available endpoints:");
console.log("    '/books'");
console.log("    '/authors'");
console.log("    '/date'");

function get405(req, resp) {
	resp.writeHead(405);
    resp.end(JSON.stringify({ error: "Method not supported" }));
}

function get404(req, resp) {
	resp.writeHead(404);
    resp.end(JSON.stringify({ error: "Resource not found" }));
}

function get500(resp, errorMessage){
    resp.writeHead(500);
    resp.end(JSON.stringify({ error: errorMessage }));
}

function get200(resp, message){
    resp.writeHead(200);
    resp.end(JSON.stringify({ success: message }));
}

function ProcessGet(req, res) {
    switch (req.url) {
        case "/books":
            res.writeHead(200);
            res.end(JSON.stringify(booksArr));
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

                let bookToFind = booksArr.find(o => o.title === result.title);
                if(bookToFind !== undefined)
                {
                    get500(res, `Book with title '${result.title}' already exists !`);                    
                }
                else
                {
                    booksArr.push(result);
                    get200(res, `Book with title '${result.title}' added !`);
                }
            });

            break

        default:
            {
                get404(req, res);
            }
	}
}

function collectRequestData(request, callback) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        callback(JSON.parse(body));
    });
}

