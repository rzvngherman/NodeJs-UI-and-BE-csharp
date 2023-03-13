const Animal = require("../animals/animal");

class Dog extends Animal  // Derived class (child) 
{  
  constructor () {
    super()
  }
  GetSound = () => {return "The dog says: bow wow"; }
}

module.exports = Dog