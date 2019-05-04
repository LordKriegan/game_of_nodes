#!/usr/bin/env node
const {prompt} = require('inquirer');
const wwrampage = require('./games/wwrampage');
const {clog} = require('./helpers/helpers');
const hangman = require('./games/hangman');
startMenu = () => {
    prompt([{
        name: "startMenu",
        type: "list",
        message: "Pick a game",
        choices: ["White Walker Rampage", "Hangman", "Exit"]
    }]).then(({ startMenu }) => {
            switch (startMenu) {
                case "White Walker Rampage":
                    wwrampage();
                    break;
                case "Hangman":
                    hangman();
                    break;
                case "Exit":
                default:
                    clog(["Thank you for playing!"]);
            }
        });
}
startMenu();
module.exports = startMenu;