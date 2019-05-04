#!/usr/bin/env node
var inquirer = require('inquirer');
var wordObj = require('./wordObj.js');
var hangmanVisual = require('./hangmanVisual.js');
const { clog } = require('../../helpers/helpers');

var guessWord;
var guessedNum = 0;

function startGame() {
    clog(["How well do you know the great Houses of Westeros?"])
    guessWord = new wordObj();
    inquirer.prompt([{
        name: "gameMenu",
        type: "list",
        choices: ["Play game!", "Exit"],
        message: "What do you want to do?"
    }]).then(function (input) {
        if (input.gameMenu === "Play game!") {
            gameMenu();
        } else {
            require('../../cli')();
        }
    });
}
guessTheWord = () => {
    inquirer.prompt([{
        type: "input",
        name: "userGuess",
        message: "Which House do you think this is?"
    }]).then(({ userGuess }) => {
        if (userGuess.toLowerCase() === guessWord.realWord.toLowerCase()) {
            guessedNum++;
            clog(["You got it!"]);
            startGame();
        } else {
            guessWord.guesses--;
            clog([hangmanVisual[guessWord.guesses]]);
            if (guessWord.guesses <= 0) {//if out of guesses start over
                clog([guessWord.realWord]);
                clog(["Game over!"]);
                startGame();
            } else {
                gameMenu();
            }
        }
    })
}
gameMenu = () => {
    inquirer.prompt([{
        name: "userChoice",
        message: "What would you like to do?",
        type: "list",
        choices: ["Guess a Letter", "Guess the Word", "View Status", "Give Up"]
    }]).then(({ userChoice }) => {
        switch (userChoice) {
            case "Guess a Letter":
                guessLet();
                break;
            case "Guess the Word":
                guessTheWord();
                break;
            case "View Status":
                clog([hangmanVisual[guessWord.guesses]]);
                clog(["Guesses left: ", guessWord.guesses]);
                clog(["How many you've guessed so far: ", guessedNum]);
                gameMenu();
                break;
            case "Give Up":
            default:
                startGame();
        }
    })
}

function guessLet() {
    if (guessWord.checkWord()) {
        clog([guessWord.realWord])
        clog(["You got it!"]);
        guessedNum++;
        clog(["Number of houses you've gotten so far: ", guessedNum])
        startGame();
    } else {
        var viewStr = "";
        for (var i = 0; i < guessWord.realWord.length; i++) {
            viewStr += guessWord.viewWord[i].viewChar + " ";
        }
        clog([viewStr]);
        clog(["Guesses left: " + guessWord.guesses]);
        inquirer.prompt([{
            name: "guessLet",
            type: "input",
            message: "Guess a letter: ",
            validate: function (input) {
                if (input.length > 1 || //if length greater than 1
                    (!input.match(/[a-z]/gi)) || //check to see if its a valid letter
                    (guessWord.guessedLets.includes(input))) { //see if it was already guessed
                    return false; //if any of the above is true mark as invalid
                }
                return true; //otherwise its a valid guess
            }
        }]).then(function (input) {
            guessWord.guessedLets += input.guessLet;
            var state = guessWord.guessLet(input.guessLet); //guessLet returns true if a letter changed and false if not.
            if (!state) { //if incorrect decrement guesses
                guessWord.guesses--;
                clog([hangmanVisual[guessWord.guesses]]);
                if (guessWord.guesses <= 0) {//if out of guesses start over
                    clog([guessWord.realWord]);
                    clog(["Game over!"]);
                    startGame();
                } else {
                    gameMenu();
                }
            } else { //otherwise move on to next letter
                gameMenu();
            }
        });
    }
}

module.exports = startGame;