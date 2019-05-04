#!/usr/bin/env node
const chalk = require('chalk');
const {prompt} = require('inquirer');

module.exports = {
    clog: function (arr) { console.log(chalk.green("?"), ...arr) }
}