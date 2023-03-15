//includes
var URL = require('url');
const _respFct = require("../helpers/response_functions");

//classes
const Book = require('../models/book');
const Author = require('../models/author');
const Alien = require('../models/alien');
const Enemy = require('../models/enemy');
const Animal = require('../models/animals/animal');
const Pig = require('../models/animals/pig');
const Dog = require('../models/animals/dog');
const BookService = require('../service/bookService');
const { title } = require('process');
const _bookService = new BookService();

const _authorArr = [
    new Author("Paulo Coelho", "Brazil", 1947)
    ,new Author("Kahlil Gibran", "Lebanon", 1883)
];

function ProcessGet(req, res) {
    const urlObj = URL.parse(req.url, true);
    const query = urlObj.query;
    var pathname = urlObj.pathname.toLowerCase();
    
    switch (pathname) {
        case "/books":
            res.writeHead(200);
            var jsonString = JSON.stringify(_bookService.GetAllBooks());
            res.end(jsonString);
            break

        case "/book":
            var title = query.title;

            let bookToFind = _bookService.GetByTitle(title);
            if(bookToFind === undefined)
            {
                _respFct.get500(res, `Book with title '${title}' not found !`);
            }
            else
            {
                res.writeHead(200);
                res.end(JSON.stringify(bookToFind));
            }            
            break

        case "/authors":
            res.writeHead(200);
            res.end(JSON.stringify(_authorArr));
            break

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
            _respFct.get404(res);
    }
}

function ProcessDelete(req, res) {
    switch (req.url) {
        case "/book":
			collectRequestData(req, result =>
            {
                try
                {
                    _bookService.DeleteByTitle(result.title);
                    _respFct.get200(res, `Book with title '${result.title}' removed !`);
                }
                catch(error)
                {
                    _respFct.get500(res, error.message);
                }                
            });

            break

        default:
            {
                _respFct.get404(res);
            }
	}
}

function ProcessPost(req, res) {
    switch (req.url) {
        case "/books":
			collectRequestData(req, result => 
            {
                try
                {
                    var bookToAdd = new Book(result.title, result.author, result.year)
                    _bookService.AddBook(bookToAdd);
                    _respFct.get200(res, `Book with title '${result.title}' added !`);
                }
                catch (error) {
                    _respFct.get500(res, error.message);
                }
            });

            break

        default:
            {
                _respFct.get404(res);
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

module.exports = { ProcessGet, ProcessPost, ProcessDelete };