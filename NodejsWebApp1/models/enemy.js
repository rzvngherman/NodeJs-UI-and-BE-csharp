class Enemy {
    constructor(power) {
        this.power = power
    }

    attack = () => {return `I'm attacking with a power of ${this.power}!`; }
                    //console.log(`I'm attacking with a power of ${this.power}!`)
}

module.exports = Enemy