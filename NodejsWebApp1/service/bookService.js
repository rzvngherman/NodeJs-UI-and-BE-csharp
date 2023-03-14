const Book = require('../models/book');

const _bookList = [
    new Book("The Alchemist", "Paulo Coelho", 1988, "Romania", 1982)
    ,new Book("The Prophet", "Kahlil Gibran", 1923)
];

class BookService { // Name of the class
    constructor() {
        //this.power = power
    }
      
    AddBook(book) {
        let bookToFind = _bookList.find(o => o.title === book.title);
        if(bookToFind !== undefined)
        {
            // throw error ?
            throw new Error(`Book with title '${book.title}' already exists !`)
            //_respFct.get500(res, `Book with title '${result.title}' already exists !`);
            //return `Book with title '${book.title}' already exists !`
        }
        else{
            _bookList.push(book);
            return ""
        }
    }

    GetAllBooks() {
        return _bookList;
    }

    GetByTitle(title){
        return _bookList.find(o => o.Title === title);
    }

    DeleteByTitle(title){
        let bookToFind = _bookList.find(o => o.title === title);
        if(bookToFind === undefined) {
            //throw error ?
            //_respFct.get500(res, `Book with title '${result.title}' does not exists.`);                    
        }
        else
        {
            _bookList.pop(bookToFind);
            //_respFct.get200(res, `Book with title '${result.title}' removed !`);
        }
    }
}
      
module.exports = BookService