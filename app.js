// Player Class
class Player {
    constructor(name){
        this.name = name
        this.wins = 0
        this.ships = []
    }
    winsGame(){
        this.wins++
    }
    addShip(ship){
        this.ships.push(ship)
    }
    shipHit(bValue){
        // Go through all of this player's ships
        this.ships.forEach( ship => {
            // Go through all of the ship's squares
            ship.squares.forEach( square => {
                // If that square contains the boardValue
                if(bValue === square.boardValue){
                    // Update square's isHit property
                    square.isHit = true;
                    ship.checkSunk();
                }
            })
        })
    }
}

// Ship Class
class Ship {
    constructor(){
        this.length = 0
        this.isSunk = false
        this.squares = []
    }
    addSquare(square){
        this.squares.push(square)
        this.length = this.squares.length
    }
    checkSunk(){
        // Checks if each of the Ship's squares are marked as hit
        let i = 0
        this.squares.forEach( square => {
            if(square.isHit === true){
                i++;
            }
        })
        if(i === this.length){
            this.isSunk = true
            gameText.innerHTML = `The ship has sunk!`
        }
    }
}

// ShipSquare Class
class ShipSquare {
    constructor(square,value){
        this.boardValue = value
        this.isHit = false
        this.selector = square
    }
}

// DOM Selectors
const div = document.querySelector('div')
const gameText = document.getElementById('game_text')
const board1 = document.getElementById('board1')
const board2 = document.getElementById('board2')
const player1Board = document.getElementById('player1')
const player2Board = document.getElementById('player2')
const board1Text = document.getElementById('board1_text')
const board2Text = document.getElementById('board2_text')

// Gameboard Width & Height
let gameHeight = 10
let gameWidth = 10
let numSquares = gameWidth * gameHeight;

// Function create gameboards w/ xaxis and yaxis labels
function createBoard(playerBoard){
    let alphabet = ' abcdefghijklmnopqrstuvwxyz';
    let letter = alphabet.split('');
    // Create a the rows for the game board
    for (let i=0; i<gameHeight+1; i++){
        let gameRow = document.createElement('div')
        gameRow.classList.add('gameRow')
        gameRow.style.height = `40px`
        // The first row of the game board is the x-axis labels
        if(i===0){
            for(let j=0; j<gameWidth+1; j++){
                let labelx = document.createElement('div')
                labelx.classList.add('label');
                labelx.innerHTML = letter[j];
                // labelx.style.width = `${100/(gameWidth+1)}`
                gameRow.appendChild(labelx)
            }
        } else {
            for(let j=0; j<gameWidth+1; j++){
                let square = document.createElement("div");
                // The first square in each row is a y-axis label
                if(j===0){
                    let labely = document.createElement('div')
                    labely.classList.add('label');
                    labely.innerHTML = i;
                    gameRow.appendChild(labely)
                }else {
                    // All the squares after the label are game squares
                    square.classList.add('square');
                    // Give every new square a unique board value (formated 'a.5')
                    square.setAttribute('boardValue', (letter[j]+'.'+(i)) );
                    // square.innerHTML = `${square.getAttribute('boardValue')}`
                    // Append square elements to the row element
                    gameRow.appendChild(square)
                }
            }
        }
        // Append row elements to game board element
        playerBoard.appendChild(gameRow);
    }
    // Return the game squares
    playerBoard.style.width = `${(gameWidth+1) * 40}px`
    const squares = playerBoard.querySelectorAll('.square')
    return squares
}

// Initializations
let activeGame = false;
let gameCount = -1;
let oldSquare = [-1,-1];
let sL = [2,3,3,4,5];
let mainContainer = [];
let shipIndex = 0
let ship = new Ship()
let player1Turn = false;
let computerTurn = false;
const player1 = new Player('Player 1')
const player2 = new Player('Player 2')

// Start Button
const startBtn = document.getElementById('start_btn');
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    startBtn.classList.toggle('hidden')
    startGame();
})

// Ready Button
const readyBtn = document.getElementById('ready_btn');
readyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let squares2 = createBoard(player2Board);
    player1Turn = true;
    board2.classList.toggle('hidden');
    readyBtn.classList.toggle('hidden');
    gameText.innerHTML = `Call a shot on the Computer's board`
    board2Text.innerHTML = `Computer`
    vsComputer(squares2);
})

// Restart Button
const restartBtn = document.getElementById('restart_btn');
restartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // Re-initalize all variables to restart game
    player1Board.innerHTML = ''
    player2Board.innerHTML = ''
    activeGame = false;
    gameCount = -1;
    oldSquare = [-1,-1];
    sL = [2,3,3,4,5];
    mainContainer = [];
    shipIndex = 0
    player1.ships = [];
    ship = new Ship()
    player1Turn = false;
    computerTurn = false;
    computerShots = [];
    compShips = ['a.1','b.1','a.5','b.5','c.5','h.2','h.3','h.4','d.9','e.9','f.9','g.9','j.4','j.5','j.6','j.7','j.8']
    mainContainer2 = [];
    board1Text.innerHTML = `Player Wins: ${player1.wins}<br><br>Place ships on a new board and see if you can win against the computer.`;
    startBtn.classList.toggle('hidden')
    restartBtn.classList.toggle('hidden')
    board2.classList.toggle('hidden')
    gameText.innerHTML = `Press Start to play a new game.`
})

// Function to Start a Game
function startGame(){
    let squares1 = createBoard(player1Board);
    // let squares2 = createBoard(player2Board)
    gameText.innerHTML = 'Select a square to start placing a ship'
    activeGame = true;
    board1Text.innerHTML = player1.name;
    placingShips(player1, squares1);
}

// Function to Place Ships
function placingShips(player,squares) {
    // Gives all squares in player1board an event listener
    squares.forEach( square => {
        square.addEventListener('click', (event) => {
            event.preventDefault();
    
            // If the game is active (turned on)
            if(activeGame){
                // Get the square's board value
                let squareValue = square.getAttribute('boardValue')
                
                // If player does not have the amount of ships needed to move on to the next phase
                if(player.ships.length<sL.length){
                    // Checks if ship fully built, checks if squares selected are "legal"
                    if(ship.length < sL[shipIndex] && checkLegal(squareValue)){
                        // If square is allowed, pushed square's board value into an overall container array for player's squares
                        mainContainer.push(squareValue);
                        
                        // Update the oldSquare to the recently selected one
                        let test = `${squareValue}`
                        let test2 = test.split('.')
                        oldSquare = []
                        oldSquare.push(test2[0])
                        oldSquare.push(test2[1])
                        
                        colorShip(shipIndex,square)
                        // Create new ShipSquare object from selected square
                        let shipSquare = new ShipSquare(square,squareValue)
                        // Add new ShipSquare object to the current ship being built
                        ship.addSquare(shipSquare)
                        gameText.innerHTML = `Select ${(sL[shipIndex]-ship.squares.length)} more to finish the ship`
                    }
                    // If the ship is finished being built
                    if(ship.length === sL[shipIndex]){
                        // Reset the oldSquare so player can select any other square, not needing to meet "legal" square conditions
                        oldSquare = [-1,-1]
                        // Add fully built ship to player's Ships array
                        player.addShip(ship)
                        shipIndex++;
                        // Create new Ship object for next ship
                        gameText.innerHTML = `Select a square to place new ship`
                        ship = new Ship()
                        // If all ships are finished being built
                        if(player.ships.length === sL.length){
                            gameText.innerHTML = `Press the Ready button`
                            readyBtn.classList.remove('hidden')
                        }
                    }
                }
            }

        })
    })
}

// Function to run all the "legal" checks
function checkLegal(value){
    // Convert the string board value into object formatted ['e','5']
    let test = value.split('.')
    let bV = []
    bV.push(test[0])
    bV.push(test[1])
    let check1 = hasNotBeenPickedAlready(bV)
    let check2 = isAdjacent(bV)
    // console.log(`check1: ${check1}  check2: ${check2}`)
    if( check1 && check2 ){
        return true
    } 
    return false
}
// Checks if the newly selected square is adjacent to the previously selected square (oldSquare)
function isAdjacent(boardValue){
    // If newly selected square's board value is the same as the preset for oldSquare
    if( oldSquare[0]===-1 && oldSquare[1]===-1 ){
        return true;
    }
    // if letters match, can only go down or up
    // if numbers match, can only go right or left
    if( (boardValue[0] === oldSquare[0]) && ( (boardValue[1]-oldSquare[1])===1 || (boardValue[1]-oldSquare[1])===-1) ){
        return true
    } else if ( (boardValue[1] === oldSquare[1]) && ( oldSquare[0] === String.fromCharCode(boardValue[0].charCodeAt() + 1) || oldSquare[0] === String.fromCharCode(boardValue[0].charCodeAt() - 1) ) ){
        return true;
    }
    return false;
}
// Checks if newly selected square has been picked already
function hasNotBeenPickedAlready(boardValue) {
    // If first pick, no squares have been picked yet
    let test = ''
    test = boardValue[0] + '.' + boardValue[1]
    // console.log(`hasNotBeenPickedAlready - test: ${test}`)
    if ( (oldSquare === boardValue) || mainContainer.includes(test) ){
        return false;
    }
    return true;
}
// Function to color each new ship
function colorShip(i,sq){
    if(i===0) sq.classList.add('red')
    else if(i===1) sq.classList.add('blue')
    else if(i===2) sq.classList.add('green')
    else if(i===3) sq.classList.add('yellow')
    else if(i===4) sq.classList.add('orange')
    else sq.classList.add('red')
}

// Computer preset Ship Squares
compShips = ['a.1','b.1','a.5','b.5','c.5','h.2','h.3','h.4','d.9','e.9','f.9','g.9','j.4','j.5','j.6','j.7','j.8']
// Container for Player's used picks
let mainContainer2 = [];

function vsComputer(squares) {
    // console.log(squares)
    squares.forEach( square => {
        square.addEventListener('click', (event) =>{
            event.preventDefault();

            if (activeGame && player1Turn){
                let squareValue = square.getAttribute('boardValue')
                // If square selected has not been picked yet
                if(mainContainer2.indexOf(squareValue) === -1 && compShips.length !==0){
                    // If square selected is among the computer's preset ship squares, it will mark a hit on Comp's board
                    if(compShips.indexOf(squareValue)> -1){
                        square.classList.add('red');
                        gameText.innerHTML = `Your choice <span>${squareValue}</span> hit!`
                        // Remove hit square from Computer's preset list
                        compShips.splice(compShips.indexOf(squareValue),1);
                        // Push the selected square board value into Players's used picks array
                        mainContainer2.push(squareValue);
                        // Allow Computer to take it's turn
                        player1Turn = false;
                        computerTurn = true;
                        // If all of Computer's ship squares have been hit and removed
                        if(compShips.length === 0){
                            computerTurn = false;
                            gameText.innerHTML = "You sank all of Computer's ships! You WIN!";
                            restartBtn.classList.toggle('hidden');
                            player1.winsGame();
                        }
                    } else {
                        // If square selected is not among the Computer's preset ship squares, then it is a miss
                        gameText.innerHTML = `Your choice <span>${squareValue}</span> missed!`
                        square.classList.add('pink');
                        // Still add the selected square value into Player's used picks array
                        mainContainer2.push(squareValue);
                        player1Turn = false;
                        computerTurn = true;
                    }
                    // Call back function to allow Computer to call a shot, time delay of 1 second
                    let compTimer = setTimeout(compShot,1000);
                }
            }
        })
    })
}

// Function for random integer between 'min' and 'max'
function randomBetween(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

// Makes 100 entries of Board Values for the computer to choose from
function make99() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let letter = alphabet.split('');
    let arr = [];
    for(let i=0; i<gameHeight; i++){
        for(let j=0; j<gameWidth; j++){
            // Push values formated like 'e.5'
            arr.push( (letter[j]+'.'+(i+1)) )
        }
    }
    return arr;
}

// Computer variable intialization
let computerShots = [];
let compPrevShot = -1   // Hopefully used to better Computer's picking algorithm
let compNextShot = -1   // Hopefully used to better Computer's picking algorithm
// Contains the available shots the Computer can make
let compAvailShots = make99();

// Function for Computer to call a shot
function compShot(){
    // DOM Selector for Player's board
    let squares1 = player1Board.querySelectorAll('.square')

    if (computerTurn){

        if(mainContainer.length>0){
            // Randomly get a value by randomly choosing an index from Computer's Available shots array
            let randomShot = compAvailShots[ randomBetween( 0, compAvailShots.length ) ];
            
            // Record Computer's used shot
            computerShots.push(randomShot)
            // Remove Computer's used shot from Computer's Available shots list
            compAvailShots.splice( compAvailShots.indexOf(randomShot), 1 );

            // Go through each of Player's squares to check for hits/misses
            squares1.forEach( square1 => {
                if( randomShot === square1.getAttribute('boardValue') ){
                    // If Player's main container contains Computer's shot, then it is a hit
                    if( mainContainer.includes(randomShot) ){
                        gameText.innerHTML = `Computer chose <span>${randomShot}</span>.  It hit something!`;
                        mainContainer.splice( mainContainer.indexOf(randomShot),1 );
                        // Use Player class method to update a hit on Player's ships
                        player1.shipHit(randomShot);
                        square1.classList.add('gray');
                        // If player's overall picks array is empty, Computer won
                        if(mainContainer.length === 0){
                            gameText.innerHTML = `Computer sank all your ships!!`;
                            restartBtn.classList.toggle('hidden');
                            computerTurn = false;
                            activeGame = false;
                        }
                    } else {
                        // Computer's shot missed
                        gameText.innerHTML = `Computer chose <span>${randomShot}</span>.  Shot missed!`;
                        square1.classList.add('lightgray');
                        compNextShot = -1;
                    }
                }
                // Finishes Computer's turn
                computerTurn = false;
            }) 
        }
        // Allows Player's turn to start
        player1Turn = true;
    }
}

// New computer presets ['b.3','b.4','b.5','b.6','b.7','c.5','d.5','e.5','e.6','e.7','e.8','h.2','h.3','h.5','h.6','h.7','h.8']