const Animal = require("../animals/animal");

class Pig extends Animal  // Derived class (child) 
{
  constructor () {
    super()
  }
  GetSound = () => {return "The pig says: wee wee"; }
}

module.exports = Pig