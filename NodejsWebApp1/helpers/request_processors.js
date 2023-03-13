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

//book array
const _bookArr = [
    new Book("The Alchemist", "Paulo Coelho", 1988, "Romania", 1982)
    ,new Book("The Prophet", "Kahlil Gibran", 1923)
];

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
            var jsonString = JSON.stringify(_bookArr);
            res.end(jsonString);
            break

        case "/book":
            var title = query.title;
            let bookToFind = _bookArr.find(o => o.Title === title);
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
			collectRequestData(req, result => {
				console.log(result);

                let bookToFind = _bookArr.find(o => o.title === result.title);
                if(bookToFind === undefined)
                {
                    _respFct.get500(res, `Book with title '${result.title}' does not exists.`);                    
                }
                else
                {
                    _bookArr.pop(bookToFind);
                    _respFct.get200(res, `Book with title '${result.title}' removed !`);
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
			collectRequestData(req, result => {
				console.log(result);

                let bookToFind = _bookArr.find(o => o.title === result.title);
                if(bookToFind !== undefined)
                {
                    _respFct.get500(res, `Book with title '${result.title}' already exists !`);                    
                }
                else
                {
                    _bookArr.push(result);
                    _respFct.get200(res, `Book with title '${result.title}' added !`);
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