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
        let bookToFind = _bookList.find(o => o.Title === book.Title);
        if(bookToFind === undefined)
        {
            _bookList.push(book);
        }
        else
        {
            throw new Error(`Book with title '${book.title}' already exists !`)
        }
    }

    GetAllBooks() {
        return _bookList;
    }

    GetByTitle(title){
        return _bookList.find(o => o.Title === title);
    }

    DeleteByTitle(title){
        let bookToFind = _bookList.find(o => o.Title === title);
        if(bookToFind === undefined)
        {
            throw new Error(`Book with title '${title}' does not exists.`)         
        }
        else
        {
            _bookList.pop(bookToFind);
            //_respFct.get200(res, `Book with title '${result.title}' removed !`);
        }
    }
}
      
module.exports = BookService