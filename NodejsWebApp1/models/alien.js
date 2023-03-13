const Enemy = require('../models/enemy');

class Alien extends Enemy {
    constructor (name, phrase, power) {
        super(power)
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayPhrase = () => console.log(this.phrase)
    attack = () => {return "Now I'm doing a different thing, HA!"; }
}

module.exports = Alien