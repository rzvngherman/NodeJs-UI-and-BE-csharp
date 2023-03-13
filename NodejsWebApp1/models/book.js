const Author = require('../models/author');

class Book { // Name of the class

    //private field:
    #title;
    #author;
    #year;

    a = 1;          // .a is public
    #b = 2;         // .#b is private
    static #c = 3;  // .#c is private and static

    // The constructor method will take a number of parameters and assign those parameters as properties to the created object.
    constructor (title, author, year) {
        this.#title = title
        this.#author = new Author(author, "Romania", 1982);
        this.#year = year
    }
    
    //whin 'JSON.stringify' is used
    toJSON() {
      return {
        Title: this.#title, 
        Year: this.#year, 
        Author: this.#author
      }
    }

    //getter
    get Title() {
        return this.#title;
      }
    //setter
    set Title(value) {
        //[this.name, this.surname] = value.split(" ");
        this.#title = value;
      }

    //getter
    get Author() {
        return this.#author;
      }
    //setter
    set Author(value) {
        this.#author = value;
      }

    //getter
    get Year() {
        return this.#year;
      }
    //setter
    set Year(value) {
        this.#year = value;
      }
}

module.exports = Book