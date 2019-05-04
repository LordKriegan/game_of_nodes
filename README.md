When you get bored you may want to smash up some White Walkers. 
Just do a global install:

    npm install --global @lordkriegan/game_of_nodes

Then run it with the following command:

    gameofnodes

Good luck!

To add a new game:

    Create your game in the games folder, and export your main function.
    
    In your end game function, require and execute cli.js to get back to the start menu.

    Ex: require('../cli.js')();

    You can use the clog function in helpers/helpers.js to display info to user. It takes in a single argument of an array of strings.

Changelog:
4.0.0
Seperated cli.js in order to add expandability for more games.
Added hangman game
