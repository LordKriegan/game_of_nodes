function gameChar (let) {
    this.realChar = let;
    this.viewChar = (let.match(/[a-z]/i)) ? "_" : let;
};

module.exports = gameChar;