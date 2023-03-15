var URL = require('url');
const BookService = require('../service/bookService');
const _respFct = require("../helpers/response_functions");
const Book = require('../models/book');

const _bookService = new BookService();

function ProcessRequest(req,res) {

    const urlObj = URL.parse(req.url, true);
    const query = urlObj.query;
    var pathname = urlObj.pathname.toLowerCase();
    
    //GET
    if(req.method == "GET" && pathname == "/books")
    {
        res.writeHead(200);
        var jsonString = JSON.stringify(_bookService.GetAllBooks());
        res.end(jsonString);
        return;
    }

    if(req.method == "GET" && pathname == "/book" && query.title != null)
    {
        var title = query.title;
        let bookToFind = _bookService.GetByTitle(title);
        if(bookToFind == null){
            _respFct.get500(res, `Book with title '${title}' not found !`);
        }
        else{
            res.writeHead(200);
            res.end(JSON.stringify(bookToFind));
        }
        
        return
    }

    if(req.method == "GET" && pathname == "/book" && query.year != null)
    {
        var year = parseInt(query.year)
        let booksToFind = _bookService.GetByYear(year);
        if(booksToFind == null || booksToFind.length === 0){
            _respFct.get500(res, `No book found for year '${year}' !`);
        }
        else{
            res.writeHead(200);
            res.end(JSON.stringify(booksToFind));
        }
        
        return
    }

    //POST
    if(req.method == "POST" && pathname == "/books")
    {
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

            return;
    }

    //DELETE
    if(req.method == "DELETE" && pathname == "/book")
    {
        collectRequestData(req, result => 
            {
                try
                {
                    _bookService.DeleteByTitle(result.title);
                    _respFct.get200(res, `Book with title '${result.title}' removed !`);
                }
                catch(error){
                    _respFct.get500(res, error.message);
                }
            });

        return;
    }

    _respFct.get404(res);
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

module.exports = { ProcessRequest };