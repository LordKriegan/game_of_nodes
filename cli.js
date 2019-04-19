#!/usr/bin/env node
const { prompt } = require('inquirer');
const chalk = require('chalk');

const attacks = ["Strike!", "Parry!", "Lunge!"]
let totalWalkersLeft, whiteWalker, whiteWalkersKilled, user;

const getRand = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const resetGame = () => {
    totalWalkersLeft = -1;
    whiteWalker = 15;
    whiteWalkersKilled = 0;
    user = 70;
}
const startMenu = () => {
    resetGame();
    prompt([{
        name: "gameType",
        type: "list",
        message: "Choose game mode:",
        choices: ["Easy", "Medium", "Hard", "Endurance"]
    }]).then(({ gameType }) => {
        switch (gameType) {
            case "Easy":
                totalWalkersLeft = 5;
                break;
            case "Medium":
                totalWalkersLeft = 10;
                break;
            case "Hard":
                totalWalkersLeft = 15;
                break;
            case "Endurance":
                totalWalkersLeft = -1;
                break;
            default:
                console.log("uhhh what?")
        }
        fightMenu();
    });
}

const fightMenu = () => {
    prompt([{
        name: "fightMenu",
        type: "list",
        message: "Will you fight or retreat?",
        choices: ["Fight!", "Retreat!", "View Status..."]
    }]).then((answer) => {
        switch (answer.fightMenu) {
            case "Fight!":
                whiteWalker = 15;
                playGame();
                break;
            case "Retreat!":
                endGame();
                break;
            case "View Status...":
                console.log(chalk.green("?"), "Your health:", chalk.red(user));
                if (totalWalkersLeft > 0) console.log(chalk.green("?"), "White Walkers Left:", chalk.gray(totalWalkersLeft));
                console.log(chalk.green("?"), "White Walkers killed:", chalk.gray(whiteWalkersKilled));
                fightMenu();
                break;
            default:
                console.log("how the hell did this even happen? *devnote*");
        }
    });
}

const endGame = () => {
    if ((totalWalkersLeft > 0) || (totalWalkersLeft < 0)) {
        console.log(chalk.green("?"), "You lost...");
        if (user <= 0) {
            console.log(chalk.green("?"), "You died protecting your brothers.");
        } else {
            console.log(chalk.green("?"), "You are a deserter; an oathbreaker! You may not have died now, but you will if you are ever caught.");
        }
    } else if (totalWalkersLeft === 0) {
        console.log(chalk.green("?"), "You survived the battle!");
    }
    console.log(chalk.green("?"), "White Walkers Killed: ", chalk.gray(whiteWalkersKilled));
    if (totalWalkersLeft >= 0) console.log(chalk.green("?"), "White Walkers remaining: ", chalk.gray(totalWalkersLeft));
    prompt([{
        type: "list",
        name: "playAgain",
        message: "Would you like to play again?",
        choices: ["Play Again", "End Game"]
    }]).then(({ playAgain }) => {
        if (playAgain === "Play Again") {
            startMenu();
        } else {
            console.log(chalk.green("?"), "Thanks for playing!");
        }
    })
}

const playGame = () => {
    console.log(chalk.green("?"), "Your health:", chalk.red(user));
    console.log(chalk.green("?"), "White-Walker's health: ", chalk.red(whiteWalker));
    console.log(chalk.green("?"), "White Walkers killed: ", chalk.gray(whiteWalkersKilled));
    if (totalWalkersLeft > 0) console.log(chalk.green("?"), "White Walkers remaining:", chalk.gray(totalWalkersLeft));
    const whiteWalkerAttack = attacks[getRand(0, 2)];
    // const whiteWalkerAttack = "Lunge!"; //enable this line for debugging and disable previous line
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
        console.log(chalk.green("?"), "Congratulations! You just killed a White Walker!");
        whiteWalkersKilled++;
        if (totalWalkersLeft >= 0) {
            totalWalkersLeft--;
            if (totalWalkersLeft === 0) {
                endGame();
                return;
            }
        }
        fightMenu();
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