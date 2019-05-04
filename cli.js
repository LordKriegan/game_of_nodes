#!/usr/bin/env node
const { startMenu } = require('./helpers/helpers.js');
const wwrampage = require('./games/wwrampage');
startMenu().then(({startMenu}) => {
    switch (startMenu) {
        case "White Walker Rampage":
            wwrampage();
            break;
        case "Exit":
        default:
            console.log(chalk.green("?"), "Thank you for playing!");
    }
});