const _respFct = require("./helpers/response_functions");

//1. add reference for 'book_request_processor'
const _bookReqProcess = require("./request_processor/book_request_processor");

const _authorReqProcess = require("./request_processor/author_request_processor");
var URL = require('url');

const Alien = require('./models/alien');
const Animal = require('./models/animals/animal');
const Pig = require('./models/animals/pig');
const Dog = require('./models/animals/dog');

//method 'requestListener'
const requestListener = function (req, res) {
    //Serving JSON
    res.setHeader("Content-Type", "application/json");

    const urlObj = URL.parse(req.url, true);
    var pathname = urlObj.pathname.toLowerCase();
    const query = urlObj.query;

    switch (pathname) {
        case '/':
            if(req.method == "GET")
            {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                
                var builder = GetEndpointDescriptions();
                
                var html = "<ul>"
                builder.forEach(element => {
                    html += "<li>" + element + "</li>"
                });
                html += "</ul>"

                res.end(html);
            }
            else
            {
                _respFct.get404(res);
            }
            break;

        case "/book":
        case "/books":
            _bookReqProcess.ProcessRequest(req,res);
            break

        case "/authors":
            _authorReqProcess.ProcessRequest(req,res);
            break;
        
        case "/date":
            res.writeHead(200);
            var txt = query.year + " " + query.month;
            res.end(txt);
            break

        case "/alien":
            const alien1 = new Alien("Ali", "I'm Ali the alien!", 10)
            const alien2 = new Alien("Lien", "Run for your lives!", 15)
            var attackMessage = alien1.attack() // output: I'm attacking with a power of 10!
            var txt = "Attack: " + attackMessage + "; Power: " + alien2.power;
            _respFct.get200(res, txt);
            break

        case "/animal":
            const myAnimal  = new Animal()
            const myPig  = new Pig()
            const myDog   = new Dog()
            var txt = "animal: '" + myAnimal.GetSound() + "'; pig: '" + myPig.GetSound() + "'; dog: '" + myDog.GetSound() + "'";
            _respFct.get200(res, txt);
            break

        default:
            {
                _respFct.get404(res);
            }
	}
};

function GetEndpointDescriptions() {
    var builder = [];
    builder.push("    GET '/books' -> get all books");
    builder.push("    POST '/books' -> add a book to collection");
    builder.push("    GET '/book?title=...' -> get a book by tile");
    builder.push("    DELETE '/book' -> delete a book by title");
    builder.push("    GET '/authors' -> get all authors");
    builder.push("    GET '/date?year=...&month=...'");
    builder.push("    GET '/alien'");
    builder.push("    GET '/animal'");
    builder.push("    GET '/book?year=...' -> get books by year");

    return builder
}

module.exports = { requestListener , GetEndpointDescriptions};