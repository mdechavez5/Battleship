
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
    console.log(`testBtn1 - shipsArr:`);
    console.log(shipsArr)
})
const testBtn2 = document.querySelector('#test_btn2')
testBtn2.addEventListener('click', (event) => {
    event.preventDefault();
    compShot();
})

let activeGame = false; console.log(`activeGame: ${activeGame}`)
let gameCount = -1; // Something to indicate game status: begining, place first ship, ...
let shipArr = [];
let shipsArr = [];
let mainContainer = [];
let oldSquare = -1;
let sL = [2,3,3,4,5]; //shipLength - currently fixed, could implement function so it can be variable in the future
// let sLL = [2,5,8,12,17] //add current and previous entries into current index, used for keeping up with gameCount

// sL = [5,5,5]
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
}

squares.forEach( square => {
    square.addEventListener('click', (event) => {
        event.preventDefault();

        // Check if game started
        if(activeGame){
            // Get square's value
            console.log(square)
            
            let squareValue = parseInt(square.getAttribute('value'));
            console.log(`squareValue: ${squareValue}`);
            // console.log(`checkLegal: ${checkLegal(squareValue)}`)
            // console.log(`shipArr.length: ${shipArr.length}`)
            // console.log(shipArr)
    
            for(let i=0; i<sLL.length; i++){
                if ( gameCount < sLL[i] && checkLegal(squareValue) ){
                    gameCount++;
                    // console.log(`gameCount: ${gameCount}`);
                    oldSquare = squareValue;
                    shipArr.push(squareValue);
                    mainContainer.push(squareValue);
                    console.log(`gameCount: ${gameCount} | shipArr.length: ${shipArr.length}`)
                    console.log("shipArr: "); 
                    console.log(shipArr);
                    colorShip(i,square);
                    // square.classList.add('red');
                    // console.log(square);
                    if(shipArr.length === sL[i]){
                        shipsArr.push(shipArr);
                        shipArr = [];
                        oldSquare = -2;
                        console.log(`oldSquare = ${oldSquare} | Pushed out finished ship, ready to record new ship`);
                        gameText.innerHTML = `Place your next ship. (${sL[++i]} squares)`
                    }
                }
            }
        }
    })
})

// Start button
const startBtn = document.querySelector('#start_btn')
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    activeGame = true;
    console.log(`activeGame: ${activeGame}`);
    gameText.innerHTML = "Pick squares to place ships."
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

// let arrtest1 = [2,7,12,17,22]
// let arrtest2 = [16,17,18,19,20]
// console.log(arrtest1.length)
// let a = arrtest1.sort(function(a,b){return a-b})
// console.log(a)

// let testcount = 0
// for(let i=arrtest1.length-1; i>0; i--){
//     if( (arrtest1[i] - arrtest1[i-1]) === 5){
//         testcount++;
//         console.log(testcount)
//     }
//     if( testcount === arrtest1.length-1){
//         return true;
//     }
//     console.log(testcount)
//     console.log(`${i}: ${(arrtest1[i] - arrtest1[i-1])}`)
// }



// is squareVal = prevSquareVal - 10       (above)
// is squareVal = prevSquareVal + 10       (below)
// is squareVal = prevSquareVal + 1       (right)
// is squareVal = prevSquareVal + 10       (down)
function isAdjacent(value){
    // let testcount1 = 0
    // let testcount2
    // let testArr = shipArr;
    // testArr.push(value);
    // testArr.sort((a,b)=>{return a-b})
    // //Check Vertical
    // for(let i=testArr.length-1; i>0; i--){
    //     if( (testArr[i] - testArr[i-1]) === gameWidth){
    //         testcount1++;
    //         console.log(testcount1)
    //         if( testcount1 === testArr.length-1){
    //             return true;
    //         }
    //     }else if( (testArr[i] - testArr[i-1]) === 1){
    //         testcount2++;
    //         console.log(testcount2)
    //         if( testcount2 === testArr.length-1){
    //             return true;
    //         }
    //     }
    //     console.log(testcount1)
    //     console.log(`${i}: ${(testArr[i] - testArr[i-1])}`)
    // }
    // return false;

    //     let valBelow = shipArr.includes(value) + gameHeight
    //     let valRight = shipArr.includes(value) + 1
    //     let valLeft = shipArr.includes(value) - 1
    // If first pick for new ship, no previous adjacent square
    if(oldSquare === (-1) && shipsArr.length===0) {
        return true;
    } else if((oldSquare === (-2) )){
        // console.log("check if in overall Ships array")
        // console.log(gameCount)
        // console.log(findInShipsArr(value))
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

function findInShipsArr(value){
    shipsArr.forEach( ship => {
        if(ship.includes(value)){
            console.log(`Found square in shipsArr`);
            console.log(shipsArr)
            // found a square that has been used already
            return true;
        } 
    })
    return false;
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
                // square.classList.add('white')
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
    console.log(test3);
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