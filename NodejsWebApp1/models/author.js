class Author { // Name of the class
    // The constructor method will take a number of parameters and assign those parameters as properties to the created object.
    constructor (name, countryOfBirth, yearOfBirth) {
        this.name = name
        this.countryOfBirth = countryOfBirth
        this.yearOfBirth = yearOfBirth
    }
    // These will be the object's methods.
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayName = () => console.log(this.name)
}

module.exports = Author