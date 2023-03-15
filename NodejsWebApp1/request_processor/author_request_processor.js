var URL = require('url');
const BookService = require('../service/bookService');
const _respFct = require("../helpers/response_functions");
//const _reqProcess = require("../../helpers/request_processors.js");
//const Book = require('../../models/book');
//const _bookService = new BookService();

const Author = require('../models/author');

const _authorArr = [
    new Author("Paulo Coelho", "Brazil", 1947)
    ,new Author("Kahlil Gibran", "Lebanon", 1883)
];

function ProcessRequest(req,res) {

    const urlObj = URL.parse(req.url, true);
    var pathname = urlObj.pathname.toLowerCase();
    
    switch (req.method) {
        case "GET":
            switch (pathname) 
            {
                case "/authors":
                    res.writeHead(200);
                    res.end(JSON.stringify(_authorArr));
                    break

                    default:
                        _respFct.get404(res);
            }

            break

        default:
            _respFct.get405(res);
            break;
    }
}

module.exports = { ProcessRequest };