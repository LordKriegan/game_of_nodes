#!/usr/bin/env node
const { prompt } = require('inquirer');
const chalk = require('chalk');
const {clog} = require('../helpers/helpers.js');

let whiteWalker = 15;
let whiteWalkersKilled = 0;
let user = 70;

const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const attacks = ["Strike!", "Parry!", "Lunge!"]

const startGame = () => {
    clog(["You are surrounded by White Walkers. What will you do?"]);
    prompt([{
        name: "startGame",
        type: "list",
        message: "Will you fight or retreat?",
        choices: ["Fight!", "Retreat!", "View Status..."]
    }]).then((answer) => {
        switch (answer.startGame) {
            case "Fight!":
                whiteWalker = 15;
                playGame();
                break;
            case "Retreat!":
                endGame();
                break;
            case "View Status...":
                clog(["Your health:", chalk.red(user)]);
                clog(["White Wakers killed:", chalk.gray(whiteWalkersKilled)]);
                startGame();
                break;
            default:
                console.log("how the hell did this even happen? *devnote*");
        }
    });
}

const endGame = () => {
    clog(["You killed " + whiteWalkersKilled + " White Walkers before", (user <= 0) ? "dying gloriously!" : "fleeing like a coward!"]);
    require('../cli')();
}

const playGame = () => {
    clog([chalk.green("?"), "Your health:", chalk.red(user)]);
    clog([chalk.green("?"), "White-Walker's health: ", chalk.red(whiteWalker)]);
    clog([chalk.green("?"), "White Walkers killed: ", chalk.gray(whiteWalkersKilled)]);
    const whiteWalkerAttack = attacks[getRand(0, 2)];
    prompt([{
        type: "list",
        name: "userAttack",
        message: "How will you attack? ",
        choices: attacks
    }]).then(({ userAttack }) => {
        clog(["The white walker attacked with:", chalk.cyan(whiteWalkerAttack)]);
        if (userAttack === whiteWalkerAttack) {
            clog(["Nothing happened!"]);
            playGame();
        } else {
            if (userAttack === "Strike!") {
                if (whiteWalkerAttack === "Parry!") {
                    lostFight();
                } else if (whiteWalkerAttack === "Lunge!") {
                    wonFight();
                }
            } else if (userAttack === "Parry!") {
                if (whiteWalkerAttack === "Lunge!") {
                    lostFight();
                } else if (whiteWalkerAttack === "Strike!") {
                    wonFight();
                }
            } else if (userAttack === "Lunge!") {
                if (whiteWalkerAttack === "Strike!") {
                    lostFight();
                } else if (whiteWalkerAttack === "Parry!") {
                    wonFight();
                }
            }
        }
    });
}
const wonFight = () => {
    clog(["You struck a blow!"]);
    whiteWalker -= getRand(1, 5);
    if (whiteWalker <= 0) {
        whiteWalkersKilled++;
        clog(["Congratulations! You just killed a White Walker!"]);
        startGame();
    } else {
        playGame();
    }
}

const lostFight = () => {
    clog(["You were hit!"]);
    user -= getRand(1, 5);
    if (user <= 0) {
        endGame();
    } else {
        playGame();
    }
}

module.exports = startGame;