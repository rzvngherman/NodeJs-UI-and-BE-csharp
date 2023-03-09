'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
const host = 'localhost'; 
var qs = require("querystring");

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
    //resp.write("<html><html><head><title>404</title></head><body>404: Resource not found. Go to <a href='/'>Home</a></body></html>");
    //resp.end();
    resp.writeHead(404);
    resp.end(JSON.stringify({ error: "Resource not found" }));
}

function getCalcHtml(req, resp, data) {
    var sb = new StringBuilder({ newline: "\r\n" });
    sb.appendLine("<html>");
    sb.appendLine(" <body>");
    sb.appendLine("     <form method='post'>");
    sb.appendLine("         <table>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Enter First No: </td>");

    if (data && data.txtFirstNo) {
        sb.appendLine("                 <td><input type='text' id='txtFirstNo' name='txtFirstNo' value='{0}'/></td>", data.txtFirstNo);
    }
    else {
        sb.appendLine("                 <td><input type='text' id='txtFirstNo' name='txtFirstNo' /></td>");
    }

    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td>Enter Second No: </td>");

    if (data && data.txtSecondNo) {
        sb.appendLine("                 <td><input type='text' id='txtSecondNo' name='txtSecondNo' value='{0}'/></td>", data.txtSecondNo);
    }
    else {
        sb.appendLine("                 <td><input type='text' id='txtSecondNo' name='txtSecondNo' /></td>");
    }

    sb.appendLine("             </tr>");
    sb.appendLine("             <tr>");
    sb.appendLine("                 <td><input type='submit' value='Calculate' /></td>");
    sb.appendLine("             </tr>");

    if (data && data.txtFirstNo && data.txtSecondNo) {
        var sum = parseInt(data.txtFirstNo) + parseInt(data.txtSecondNo);
        sb.appendLine("             <tr>");
        sb.appendLine("                 <td>Sum: {0}</td>", sum);
        sb.appendLine("             </tr>");
    }

    sb.appendLine("         </table>");
    sb.appendLine("     </form>")
    sb.appendLine(" </body>");
    sb.appendLine("</html>");
    sb.build(function (err, result) {
        resp.write(result);
        resp.end();
    });
}

function getCalcForm(req, resp, data) {
    resp.writeHead(200, { "Content-Type": "text/html" });
    getCalcHtml(req, resp, data);
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
            var reqBody = '';
            req.on('data', function (data) {
                reqBody += data;
                if (reqBody.length > 1e7) { //10MB
                    resp.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
                    resp.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
                }
            });
            req.on('end', function () {
                var pkg = JSON.parse(reqBody);
                //getCalcForm(req, res, formData);
                res.writeHead(200);
                res.end(pkg);
            });
            break

        default:
            get404(req, res);
    }
}

