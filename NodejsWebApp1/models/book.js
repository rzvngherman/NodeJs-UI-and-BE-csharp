const Author = require('../models/author');

class Book { // Name of the class

    //private field:
    #title;

    // The constructor method will take a number of parameters and assign those parameters as properties to the created object.
    constructor (title, author, year) {
        this.#title = title
        this.author = new Author(author, "Romania", 1982);
        this.year = year
    }
    // These will be the object's methods.
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayTitle = () => console.log(this.#title)
}

module.exports = Book