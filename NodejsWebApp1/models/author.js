class Author { // Name of the class
    #name
    #countryOfBirth
    #yearOfBirth
    
    // The constructor method will take a number of parameters and assign those parameters as properties to the created object.
    constructor (name, countryOfBirth, yearOfBirth) {
        this.#name = name
        this.#countryOfBirth = countryOfBirth
        this.#yearOfBirth = yearOfBirth
    }
    // These will be the object's methods.
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayName = () => console.log(this.#name)

        //for 'JSON.stringify'
    toJSON() {
      return {
        Name: this.#name, 
        CountryOfBirth: this.#countryOfBirth, 
        YearOfBirth: this.#yearOfBirth
      }
    }

     //getter
     get Name() {
        return this.#name;
      }
    //setter
    set Name(value) {
        this.#name = value;
      }

    //getter
    get CountryOfBirth() {
        return this.#countryOfBirth;
      }
    //setter
    set CountryOfBirth(value) {
        this.#countryOfBirth = value;
      }

    //getter
    get YearOfBirth() {
        return this.#yearOfBirth;
      }
    //setter
    set YearOfBirth(value) {
        this.#yearOfBirth = value;
      }
}

module.exports = Author