#!/usr/bin/env node
const { prompt } = require('inquirer');
const chalk = require('chalk');

let whiteWalker = 15;
let whiteWalkersKilled = 0;
let user = 70;

const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const attacks = ["Strike!", "Parry!", "Lunge!"]

const startMenu = () => {
    prompt([{
        name: "startMenu",
        type: "list",
        message: "Will you fight or retreat?",
        choices: ["Fight!", "Retreat!", "View Status..."]
    }]).then((answer) => {
        switch (answer.startMenu) {
            case "Fight!":
                whiteWalker = 15;
                playGame();
                break;
            case "Retreat!":
                endGame();
                break;
            case "View Status...":
                console.log("Your health:", chalk.red(user));
                console.log("White Wakers killed:", chalk.gray(whiteWalkersKilled));
                startMenu();
                break;
            default:
                console.log("how the hell did this even happen? *devnote*");
        }
    });
}

const endGame = () => {
    console.log("You killed " + whiteWalkersKilled + " White Walkers before", (user <= 0) ? "dying gloriously!" : "fleeing like a coward!");
}

const playGame = () => {
    console.log(chalk.green("?"), "Your health:", chalk.red(user));
    console.log(chalk.green("?"), "White-Walker's health: ", chalk.red(whiteWalker));
    console.log(chalk.green("?"), "White Walkers killed: ", chalk.gray(whiteWalkersKilled));
    const whiteWalkerAttack = attacks[getRand(0, 2)];
    prompt([{
        type: "list",
        name: "userAttack",
        message: "How will you attack? ",
        choices: attacks
    }]).then(({ userAttack }) => {
        console.log(chalk.green("?"), "The white walker attacked with:", chalk.cyan(whiteWalkerAttack));
        if (userAttack === whiteWalkerAttack) {
            console.log(chalk.green("?"), "Nothing happened!");
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
    console.log(chalk.green("?"), "You struck a blow!");
    whiteWalker -= getRand(1, 5);
    if (whiteWalker <= 0) {
        whiteWalkersKilled++;
        console.log(chalk.green("?"), "Congratulations! You just killed a White Walker!");
        startMenu();
    } else {
        playGame();
    }
}

const lostFight = () => {
    console.log(chalk.green("?"), "You were hit!");
    user -= getRand(1, 5);
    if (user <= 0) {
        endGame();
    } else {
        playGame();
    }
}
console.log(chalk.green("?"), "Welcome to the", chalk.bold.bgWhite.black("Game of Nodes"));
console.log(chalk.green("?"), "You are surrounded by White Walkers. What will you do?");
startMenu();