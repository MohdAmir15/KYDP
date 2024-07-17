/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

//global variables delcaration
let position;
let mark;
//create an object
let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};
// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    //update the empty position with mark
    board[position] = mark;
}
// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(' ' + board[1] + ' | ' + board[2] + ' | ' + board[3]);
    console.log(' --------- ');
    console.log(' ' + board[4] + ' | ' + board[5] + ' | ' + board[6]);
    console.log(' --------- ');
    console.log(' ' + board[7] + ' | ' + board[8] + ' | ' + board[9]);
}
// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    // Check if position is a valid number between 1 and 9
    if (position < 1 || position > 9) {
        console.log("Invalid input. Please enter a number between 1 and 9.");
        return false;
    }
    // Check if the position is already occupied
    if (board[position] !== ' ') {
        console.log("Position " + position + " is already occupied.");
        return false;
    }
    // If all conditions pass, return true
    return true;
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    //horizontal winCon
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    //vertical winCon
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    //diagonal winCon
    [1, 5, 9],
    [3, 5, 7 ]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let i = 0; i < winCombinations.length; i++) {
        let [a, b, c] = winCombinations[i]; //three input that satisfy the winCon
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true; // current PLayer has won
        }
    }
    return false; // No winning combination found for current player 
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    //let the board range be the condition
    for (let position = 0; position < 9; position++) {
        if (board[position] === ' ') {
            return false; // Board is not full
        }
    }
    return true; // Board is full
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc

//----------------------------------MAIN APP--------------------------------------------------------------
function playTurn(player) {
    // Print whose turn
    console.log("It's player " + player + "'s turn.");
    // Prompt location to be marked for the current player
    let position = parseInt(prompt("Enter your move (1-9): "));
    
    // Validate user input
    while (!validateMove(position)) {
        position = parseInt(prompt("Enter a valid move (1-9): "));
    }

    // Mark the board
    markBoard(position, player);

    // Print the updated board
    printBoard();

    // Check for win
    if (checkWin(player)) {
        console.log("Player " + player + " wins!");
        return false; // End the game
    }

    // Check for tie
    if (checkFull()) {
        console.log("It's a tie!");
        return false; // End the game
    }

    // Switch players (turn order)
    player = (player === 'X') ? 'O' : 'X';

    // Continue the game with the next player
    return player; // Return the updated player to continue the game
}
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');
// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

//-----------------------------------------------------NEW Game------------------------------------------------------------------------
// Restart the game
let resume = true;

while (resume) {
    let winnerIdentified = false;
    let currentPlayer = 'X'; // Initialize with player X

    while (!winnerIdentified) {
        currentPlayer = playTurn(currentPlayer); // Update currentPlayer with the returned value

        // Check if it is a tie or game over)
        if (currentPlayer === false) {
            winnerIdentified = true;
        }
    }
    // Ask the players if they want to play again
    let response = prompt("Do you want to play again? (yes/no): ");
    if (response.toLowerCase() !== 'yes') {
        resume = false;
    } else{
        // Reset the board for a new game
        board = {
            1: ' ', 2: ' ', 3: ' ',
            4: ' ', 5: ' ', 6: ' ',
            7: ' ', 8: ' ', 9: ' '
        };
        console.log('\n\nGame restarted: \n\n' +
            ' 1 | 2 | 3 \n' +
            ' --------- \n' +
            ' 4 | 5 | 6 \n' +
            ' --------- \n' +
            ' 7 | 8 | 9 \n');
    }
}
//last statement if the player dont want to continue
console.log("Thanks for playing! Goodbye!");

/*
KYDP JULY 2024
COHORT 2
MOHAMAD AMIR SALIHIN BIN MUSTAFA
FCSE
*/