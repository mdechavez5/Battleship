// Player Class
class Player {
    constructor(){
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
        this.orientation
        this.squares = []
    }
    addSquare(square){
        this.squares.push(square)
        this.length = this.squares.length
    }
    checkOrientation(){
       if( (this.squares[0].value-this.squares[1].value) === 1 ||
            (this.squares[0].value-this.squares[1].value) === -1 ){
                this.orientation = 'horizontal';
       }else {
           this.orientation = 'vertical';
       }
    }
    checkSunk(){
        let i = 0
        this.squares.forEach( square => {
            if(square.isHit === true){
                i++;
            }
        })
        if(i === this.length){
            this.isSunk = true
            gameText.innerHTML = "Ship sunk!"
            console.log("Ship sunk!");
        }
    }
}

// ShipSquare Class
class ShipSquare {
    constructor(square,value){
        this.value = value
        this.boardValue = convertTo(value)
        this.isHit = false
        this.selector = square
    }
}

// DOM Selectors
const div = document.querySelector('div')
const board = document.getElementsByClassName('.board')
const gameText = document.querySelector('#game_text')
const player1Board = document.querySelector('#player1')

// Game Width, Game Height
let gameHeight = 10
let gameWidth = 10
let numSquares = gameWidth * gameHeight;

// Creates grid - has help from css defining width and height
for (let i=0; i<numSquares; i++){
    let square = document.createElement("div");
    square.classList.add('square');
    square.setAttribute('id','square1');
    // Give every new square a unique value
    square.setAttribute('value', i ); 
    // board.appendChild(square);
    // square.innerHTML = `${square.getAttribute('value')}`    // Labels each square (for Testing)
    player1Board.appendChild(square);
}
const squares1 = document.querySelectorAll('.square')

// Create x & y label squares
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let letter = alphabet.split('');
const xLabel = document.querySelector('.x-label')
const yLabel = document.querySelector('.y-label')
for (let i=0; i<gameWidth; i++) {
    let xsquareLabel = document.createElement("div");
    xsquareLabel.classList.add('label');
    xsquareLabel.innerHTML = `${letter[i]}`
    xLabel.appendChild(xsquareLabel);
    let ysquareLabel = document.createElement("div");
    ysquareLabel.classList.add('label')
    ysquareLabel.innerHTML = `${(i+1)}`
    yLabel.appendChild(ysquareLabel);
}

// PLAYER 2 BOARD -----------------------------------
const player2Board = document.querySelector('#player2')
// Creates grid - has help from css defining width and height
for (let i=0; i<numSquares; i++){
    let square = document.createElement("div");
    square.classList.add('square');
    square.setAttribute('id','square2');
    // Give every new square a unique value
    square.setAttribute('value', i ); 
    // board.appendChild(square);
    // square.innerHTML = `${square.getAttribute('value')}`        // Labels each square (for Testing)
    player2Board.appendChild(square);
}
const squares2 = document.querySelectorAll('#square2')

// Create x & y label squares
const xLabel2 = document.querySelector('.x-label2')
const yLabel2 = document.querySelector('.y-label2')
for (let i=0; i<gameWidth; i++) {
    let xsquareLabel = document.createElement("div");
    xsquareLabel.classList.add('label');
    xsquareLabel.innerHTML = `${letter[i]}`
    xLabel2.appendChild(xsquareLabel);
    let ysquareLabel = document.createElement("div");
    ysquareLabel.classList.add('label')
    ysquareLabel.innerHTML = `${(i+1)}`
    yLabel2.appendChild(ysquareLabel);
}
// --------------------------------------------------

// Create a player object
const Marc = new Player();
// console.log(Marc);

// Create a ship object
let ship = new Ship()

// Start button
const startBtn = document.querySelector('#start_btn')
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    activeGame = true;
    console.log(`activeGame: ${activeGame}`);
    gameText.innerHTML = "Pick a square."
})

// Ready button
const board2 = document.getElementById('board2')
const readyBtn = document.querySelector('#ready_btn')
readyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    board2.style.display = "flex"
    gameText.innerHTML = "Pick a square on the Computer's board."
    readyBtn.style.display = 'none';
    playerTurn = true;
})

// Restart button
const restartBtn = document.getElementById('restart_btn')
restartBtn.addEventListener('click', (event) => {
    event.preventDefault();
})

// Initialize Global Variables
let activeGame = false; console.log(`activeGame: ${activeGame}`)
let gameCount = -1; // Something to indicate game status: begining, place first ship, ...
let shipArr = [];   // Keeps track of squares when building a ship
let shipsArr = [];
let mainContainer = []; // All picked square values are stored so there is an overall bank that computer can pick and check from
let oldSquare = -1;     // Variable used to check legal square pick conditions
let sL = [2,3,3,4,5]; //shipLength - currently fixed, could implement function so it can be variable in the future
// let sLL = [2,5,8,12,17] //add current and previous entries into current index, used for keeping up with gameCount

//sumWithPrevious - Function to allow variable ship lengths
function sumWP(arr) {
    let oldArr = arr.slice();
    let arrSize = arr.length;
    let newArr = []
    let newInt = 0;
    for( let i=0; i<arrSize; i++){
        newInt += oldArr.shift();
        newArr.push(newInt);
        // console.log(newArr)
    }
    return newArr;
}
let sLL = sumWP(sL)
// console.log(typeof sumWP(sL)[2]);

// Function to change color of ships
function colorShip(i,sq){
    if(i===0) sq.classList.add('red')
    else if(i===1) sq.classList.add('blue')
    else if(i===2) sq.classList.add('green')
    else if(i===3) sq.classList.add('yellow')
    else if(i===4) sq.classList.add('orange')
    else sq.classList.add('red')
}

// For each square1 event listener
squares1.forEach( square => {
    square.addEventListener('click', (event) => {
        event.preventDefault();

        // Check if game started
        if(activeGame){
            // Get square's value
            // console.log(square)
            
            // Converts and stores the square's attribute 'value'
            let squareValue = parseInt(square.getAttribute('value'));

            // console.log(`squareValue: ${squareValue}`);
            // console.log(`checkLegal: ${checkLegal(squareValue)}`)
            // console.log(`shipArr.length: ${shipArr.length}`)
            // console.log(shipArr)
            // console.log(`oldSquare = ${oldSquare}`)
    
            for(let i=0; i<sLL.length; i++){
                // Only allows legal ship squares to be recorded
                if ( gameCount < sLL[i] && checkLegal(squareValue) ){
                    gameCount++;
                    oldSquare = squareValue;
                    let shipSquare = new ShipSquare(square,squareValue)

                    // Add square to ship object
                    ship.addSquare(shipSquare);
                    shipArr.push(squareValue);

                    mainContainer.push(squareValue);
                    // console.log(`gameCount: ${gameCount} | shipArr.length: ${shipArr.length}`)
                    // console.log("shipArr: "); 
                    // console.log(shipArr);
                    colorShip(i,square);
                    // square.classList.add('red');
                    // console.log(square);
                    gameText.innerHTML = `Select squares to place your ship. (${sL[i]} squares)`
                    // gameText.innerHTML = `Select squares horizontally or vertically to place your ship. (${sL[i]} squares)`
                    
                    
                    // When all shipSquares have been placed, the ship is ready to be created and added to player's array
                    if(shipArr.length === sL[i]){
                        Marc.addShip(ship)
                        Marc.ships[i].checkOrientation();
                        ship = new Ship()
                        shipsArr.push(shipArr)
                        shipArr = [];
                        oldSquare = -2;
                        // console.log(`oldSquare = ${oldSquare} | Pushed out finished ship, ready to record new ship`);
                        if(gameCount===sLL[sLL.length-1]){
                            gameText.innerHTML = "Press the Ready button"
                            readyBtn.style.display = 'block'
                            startBtn.style.display = 'none'
                        } else {
                            gameText.innerHTML = `Place your next ship. (${sL[++i]} squares)`
                        }
                    }
                }
            }
        }
    })
})

// Preset Computer's ship square locations
compShips = [0,1,50,51,52,27,37,47,83,84,85,86,39,49,59,69,79]
console.log(compShips)
let mainContainer2 = []

let compTurn = false;
let playerTurn = false;

// For each square2 event listener
squares2.forEach( square => {
    square.addEventListener('click', (event) => {
        event.preventDefault()

        
        if (activeGame && playerTurn){
            let squareValue = parseInt(square.getAttribute('value'));
            // If square selected has a value already selected
            if(mainContainer2.indexOf(squareValue) === -1 && compShips.length !==0){
                // If square selected has a value among the computer ships
                if(compShips.indexOf(squareValue)> -1){
                    square.classList.add('red');
                    gameText.innerHTML = `Your choice ${convertTo(squareValue)} Hit!`
                    compShips.splice(compShips.indexOf(squareValue),1);
                    mainContainer2.push(squareValue);
                    playerTurn = false;
                    compTurn = true;
                    if(compShips.length === 0){
                        compTurn = false;
                        gameText.innerHTML = "You sank all of Computer's ships! You WIN!";
                        Marc.winsGame();
                        restartBtn.style.display = 'block'
                    }
                } else {
                    gameText.innerHTML = `Your choice ${convertTo(squareValue)} Missed!`
                    square.classList.add('pink');
                    mainContainer2.push(squareValue);
                    playerTurn = false;
                    compTurn = true;
                }
                let compTimer = setTimeout(compShot,1500);

            }
        }
    })
})

// Function to check if square selected is "legal"
function checkLegal(value){
    let check1 = hasNotBeenPickedAlready(value)
    let check2 = isAdjacent(value)
    let check3 = onBorder(value)
    // console.log(`check1: ${check1}`);
    // console.log(`check2: ${check2}`);
    if( check1 && check2 && check3 ){
        return true
    } 
    return false
}

// is squareVal = prevSquareVal - 10       (above)
// is squareVal = prevSquareVal + 10       (below)
// is squareVal = prevSquareVal + 1       (right)
// is squareVal = prevSquareVal + 10       (down)
function isAdjacent(value){
    if(oldSquare === (-1)) {
        return true;
    } else if((oldSquare === (-2) )){
        if(mainContainer.includes(value)){
            return false;
        } else {
            return true;
        }
    }
    // new on the bottom, new on the top
    // new on the right, new on the left
    if( ((value - oldSquare) === gameWidth) || ((oldSquare - value) === gameWidth) ||
        ((value - oldSquare) === 1) || ((oldSquare - value) === 1)){
        return true;
    }
    return false;
}

// Check if square has been picked already
function hasNotBeenPickedAlready(value) {
    // if first pick, no squares have been picked yet
    if(gameCount === (-1)) {
        gameCount++;
        return true;
    } else if (oldSquare === value || mainContainer.includes(value)){
        return false;
    }
    return true;
}

// Check if old square was on border, wont allow square selection across the board
function onBorder(value){
    let temp = (oldSquare/10).toFixed(1)
    let temp2 = temp.toString().split('.')
    if(temp2.indexOf('9') === 1){
        if(value-oldSquare === 1){
            return false;
        }
    }
    else if(temp2.indexOf('0') === 1 ){
        if(oldSquare-value === 1){
            return false
        }
    }
    return true;
}

// Function for random integer between 'min' and 'max'
function randomBetween(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

// Computer calls shot out
let computerShots = [];
let compPrevShot = -1
let compNextShot = -1


function make99() {
    let arr = [];
    for(let i=0; i<100; i++){
        arr.push(i);
    }
    return arr;
}
let compAvailShots = make99();

// console.log(compAvailShots);    // Prints Arr
// console.log(compAvailShots.length);
// let randomShot = compAvailShots[randomBetween(0,compAvailShots.length-1)];  // Returns random number from Arr
// console.log(randomShot);
// let rand = compAvailShots.splice( compAvailShots.indexOf(randomShot), 1 );  // Removes number from Arr
// console.log(rand);
// console.log(compAvailShots);

// Computer calls a shot
function compShot(){
    if (compTurn){

        if(mainContainer.length>0){
            
            let randomShot = compAvailShots[ randomBetween( 0, compAvailShots.length ) ];
            
            // if(compNextShot !== (-1)){
            //      randomShot = compAvailShots.splice(compAvailShots.indexOf(randomShot), 1)[0];
            // }
            // console.log(randomShot);
    
            computerShots.push(randomShot)
            compAvailShots.splice( compAvailShots.indexOf(randomShot), 1 ); 
            // console.log(compAvailShots)
            squares1.forEach(square => {
                if(randomShot=== parseInt(square.getAttribute('value'))){
                    if(mainContainer.includes(randomShot)){
                        gameText.innerHTML = `Computer chose ${convertTo(randomShot)}. It hit something!`;
                        mainContainer.splice(mainContainer.indexOf(randomShot),1)[0];
                        Marc.shipHit(convertTo(randomShot));
                        square.classList.add('gray');

                        if(mainContainer.length === 0){
                            gameText.innerHTML = `Computer sank all your ships!!`;
                            compTurn = false;
                            activeGame = false;
                        }
    
                    } else {
                        gameText.innerHTML = `Computer chose ${convertTo(randomShot)}. Shot missed!`;
                        square.classList.add('lightgray');
                        compNextShot = -1;
                    }
                }
                compTurn = false;
            })
        }
        playerTurn = true;
    }
}

// Convert square's value to Board Value
function convertTo(value){
    let temp = (value/10 + 1).toFixed(1)
    let temp1 = temp.split('.')
    if(temp1[1]==="0") temp1[1]="a"
    else if(temp1[1]==="1") temp1[1]="b"
    else if(temp1[1]==="2") temp1[1]="c"
    else if(temp1[1]==="3") temp1[1]="d"
    else if(temp1[1]==="4") temp1[1]="e"
    else if(temp1[1]==="5") temp1[1]="f"
    else if(temp1[1]==="6") temp1[1]="g"
    else if(temp1[1]==="7") temp1[1]="h"
    else if(temp1[1]==="8") temp1[1]="i"
    else if(temp1[1]==="9") temp1[1]="j"
    return temp1[1].concat(temp1[0])
    // Returns string (i.e. 'e5' from an intial value of 44)
}
// let temp = convertTo(44)
// console.log(typeof temp)
// console.log(temp.split(''))