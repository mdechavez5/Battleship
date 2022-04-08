class Player {
    constructor(){
        this.wins = 0
        this.ships = []
    }
    wins(){
        this.wins++
    }
    addShip(ship){
        this.ships.push(ship)
    }
}

class Ship {
    constructor(){
        this.length = 0
        this.squaresHit = 0
        this.isSunk = false
        this.isVertical = false
        this.isHorizontal = false
        this.squares = []
    }
    addSquare(square){
        this.squares.push(square)
        this.length = this.squares.length
    }
    squareHit(){
        this.squaresHit++;
    }
}

class ShipSquare {
    constructor(square,value){
        this.value = value
        this.boardValue = convertTo(value)
        this.selector = square
        this.isHit = false
    }
}




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
    // Give every new square a unique value
    square.setAttribute('value', i+1); 
    // board.appendChild(square);
    player1Board.appendChild(square);
}

let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let letter = alphabet.split('');
// console.log(letter);
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

// Select all squares and store in variable 'squares'
const squares = document.querySelectorAll('.square')
// console.log(squares);

const testBtn1 = document.querySelector('#test_btn1')
testBtn1.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(`testBtn1 - shipsArr - Marc.ships:`);
    console.log(shipsArr)
    console.log(Marc.ships)
})
const testBtn2 = document.querySelector('#test_btn2')
testBtn2.addEventListener('click', (event) => {
    event.preventDefault();
    compShot();
})

// Create a player object
const Marc = new Player();
console.log(Marc);
// create a ship object
let ship = new Ship()

// Start button
const startBtn = document.querySelector('#start_btn')
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    activeGame = true;
    console.log(`activeGame: ${activeGame}`);
    gameText.innerHTML = "Pick a square."
})

let activeGame = false; console.log(`activeGame: ${activeGame}`)
let gameCount = -1; // Something to indicate game status: begining, place first ship, ...

let shipArr = [];
let shipsArr = [];
let mainContainer = [];
let oldSquare = -1;
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


squares.forEach( square => {
    square.addEventListener('click', (event) => {
        event.preventDefault();

        // Check if game started
        if(activeGame){
            // Get square's value
            // console.log(square)
            
            
            let squareValue = parseInt(square.getAttribute('value'));
            // console.log(`squareValue: ${squareValue}`);
            // console.log(`checkLegal: ${checkLegal(squareValue)}`)
            // console.log(`shipArr.length: ${shipArr.length}`)
            // console.log(shipArr)
            
    
            for(let i=0; i<sLL.length; i++){
                if ( gameCount < sLL[i] && checkLegal(squareValue) ){
                    gameCount++;
                    let shipSquare = new ShipSquare(square,squareValue)

                    // Add square to ship object
                    ship.addSquare(shipSquare)


                    // console.log(`gameCount: ${gameCount}`);
                    oldSquare = squareValue;
                    shipArr.push(squareValue);
                    mainContainer.push(squareValue);
                    // console.log(`gameCount: ${gameCount} | shipArr.length: ${shipArr.length}`)
                    // console.log("shipArr: "); 
                    // console.log(shipArr);
                    colorShip(i,square);
                    // square.classList.add('red');
                    // console.log(square);
                    gameText.innerHTML = `Place your ship. (${sL[i]} squares)`
                    
                    
                    // When all shipSquares have been placed, the ship is ready to be created and added to player's array
                    if(shipArr.length === sL[i]){
                        Marc.addShip(ship)
                        ship = new Ship()
                        shipsArr.push(shipArr)
                        shipArr = [];
                        oldSquare = -2;
                        // console.log(`oldSquare = ${oldSquare} | Pushed out finished ship, ready to record new ship`);
                        if(gameCount===sLL[sLL.length-1]){
                            gameText.innerHTML = "Press the Ready button"
                        } else {
                            gameText.innerHTML = `Place your next ship. (${sL[++i]} squares)`
                        }
                    }
                }
            }
        }
    })
})



function checkLegal(value){
    // if(gameCount = 0 && shipArr.length === 0) return false
    let check1 = hasNotBeenPickedAlready(value)
    let check2 = isAdjacent(value)
    // console.log(`check1: ${check1}`);
    // console.log(`check2: ${check2}`);
    if( check1 && check2 ){
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

// Function for random integer between 'min' and 'max'
function randomBetween(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

// // Computer calls shot out
let computerShots = [];

function compShot(){
    let randomShot = randomBetween(0,100);
    console.log(randomShot);
    if(mainContainer.length>0){
        if(computerShots.includes(randomShot)){
            // gameText.innerHTML = `Computer's shot was called already!`;
            randomShot = randomBetween(0,100)
        }
    
        computerShots.push(randomShot)
        squares.forEach(square => {
            if(randomShot=== parseInt(square.getAttribute('value'))){
                if(mainContainer.includes(randomShot)){
                    gameText.innerHTML = `Computer chose ${convertTo(randomShot)}. It hit something!`;
                    square.classList.add('gray')
                } else {
                    gameText.innerHTML = `Computer chose ${convertTo(randomShot)}. Shot missed!`;
                    square.classList.add('lightgray')
                }
            }
        })
    } else {
        gameText.innerHTML = `Computer sank all your ships`;
    }
}

function convertTo(value){
    let divisionResult = (value)/10;
    let convertResult = divisionResult.toString();
    let test3 = convertResult.split('.')
    // console.log(test3);
    let result = ''
    if(test3[1]==='1') result = "a"+(parseInt(test3[0])+1)
    else if(test3[1]==='2') result = "b"+(parseInt(test3[0])+1)
    else if(test3[1]==='3') result = "c"+(parseInt(test3[0])+1)
    else if(test3[1]==='4') result = "d"+(parseInt(test3[0])+1)
    else if(test3[1]==='5') result = "e"+(parseInt(test3[0])+1)
    else if(test3[1]==='6') result = "f"+(parseInt(test3[0])+1)
    else if(test3[1]==='7') result = "g"+(parseInt(test3[0])+1)
    else if(test3[1]==='8') result = "h"+(parseInt(test3[0])+1)
    else if(test3[1]==='9') result = "i"+(parseInt(test3[0])+1)
    else if(test3[1]==='0') result = "j"+(parseInt(test3[0])+1)
    return result
}