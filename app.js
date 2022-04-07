
const div = document.querySelector('div')
const board = document.querySelector('.testboard')
// console.log(board);

// let square = document.createElement("div");
// square.classList.add('square');
// // console.log(square);
// board.appendChild(square);

// Game Width, Game Height
let gameHeight = 5
let gameWidth = 5
let numSquares = gameWidth * gameHeight;

// Creates grid - has help from css defining width and height
for (let i=0; i<numSquares; i++){
    let square = document.createElement("div")
    square.classList.add('square');
    // Give every new square a unique value
    square.setAttribute('value', i+1); 
    board.appendChild(square);
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
// const testBtn2 = document.querySelector('#test_btn2')
// testBtn2.addEventListener('click', (event) => {
//     event.preventDefault();
// })

let gameCount = -1; // Something to indicate game status: begining, place first ship, ...
let shipArr = [];
let shipsArr = [];
let mainContainer = [];
let oldSquare = -1;
let sL = [2,3,3,4,5]; //shipLength
let sLL = [2,5,8,12,17] //add current and previous entries into current index, used for keeping up with gameCount

//sumWithPrevious
function sumWP(arr) {
    let arrSize = arr.length;
    let newArr = []
    let newInt = 0;
    for( let i=0; i<arrSize; i++){
        newInt += arr.shift();
        newArr.push(newInt);
        // console.log(newArr)
    }
    return newArr;
}
// console.log(sumWP(sL)[1]);

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

        // Get square's value
        console.log(square)
        
        let squareValue = parseInt(square.getAttribute('value'));
        console.log(`squareValue: ${squareValue}`);
        // console.log(`checkLegal: ${checkLegal(squareValue)}`)
        // console.log(`shipArr.length: ${shipArr.length}`)
        console.log(shipArr)

        for(let i=0; i<sLL.length; i++){
            if ( gameCount < sLL[i] && checkLegal(squareValue) ){
                gameCount++;
                console.log(`gameCount: ${gameCount}`);
                oldSquare = squareValue;
                shipArr.push(squareValue);
                mainContainer.push(squareValue)
                console.log(`shipArr.length: ${shipArr.length}`)
                console.log("shipArr: "); 
                console.log(shipArr);
                colorShip(i,square)
                // square.classList.add('red');
                console.log(square)
                if(shipArr.length === sL[i]){
                    shipsArr.push(shipArr);
                    shipArr = [];
                    oldSquare = -2;
                    console.log(`oldSquare ${oldSquare}`);
                }
            }
        }



        // if ( gameCount < sLL[0] && checkLegal(squareValue) ){
        //     gameCount++;
        //     console.log(`gameCount: ${gameCount}`);
        //     oldSquare = squareValue;
        //     shipArr.push(squareValue);
        //     mainContainer.push(squareValue)
        //     console.log(`shipArr.length: ${shipArr.length}`)
        //     console.log("shipArr: "); 
        //     console.log(shipArr);
        //     square.classList.add('red');
        //     // console.log(square)
        //     if(shipArr.length === sL[0]){
        //         shipsArr.push(shipArr);
        //         shipArr = [];
        //         oldSquare = -2;
        //         console.log(`oldSquare ${oldSquare}`);
        //     }

        // } else if (gameCount < sLL[1] && checkLegal(squareValue) ){
        //     gameCount++;
        //     console.log(`gameCount: ${gameCount}`);
        //     oldSquare = squareValue;
        //     shipArr.push(squareValue);
        //     mainContainer.push(squareValue)
        //     console.log(`shipArr.length: ${shipArr.length}`)
        //     console.log("shipArr: ");
        //     console.log(shipArr);
        //     square.classList.add('blue');
        //     if(shipArr.length === sL[1]){
        //         shipsArr.push(shipArr);
        //         shipArr = [];
        //         oldSquare = -2;
        //     }

        // } else if (gameCount < sLL[2] && checkLegal(squareValue) ){
        //     gameCount++;
        //     console.log(`gameCount: ${gameCount}`);
        //     oldSquare = squareValue;
        //     shipArr.push(squareValue)
        //     mainContainer.push(squareValue)
        //     console.log(`shipArr.length: ${shipArr.length}`)
        //     console.log("shipArr: ");
        //     console.log(shipArr);
        //     square.classList.add('green');
        //     if(shipArr.length === sL[2]){
        //         shipsArr.push(shipArr);
        //         shipArr = [];
        //         oldSquare = -2;
        //     }
            
        // } else if (gameCount < sLL[3] && checkLegal(squareValue) ){
        //     gameCount++;
        //     console.log(`gameCount: ${gameCount}`);
        //     oldSquare = squareValue;
        //     shipArr.push(squareValue);
        //     console.log(`shipArr.length: ${shipArr.length}`)
        //     console.log("shipArr: ");
        //     console.log(shipArr);
        //     square.classList.add('yellow');
        //     if(shipArr.length === sL[3]){
        //         shipsArr.push(shipArr);
        //         shipArr = [];
        //         oldSquare = -2;
        //     }
            
        // } else if (gameCount < sLL[4] && checkLegal(squareValue) ){
        //     gameCount++;
        //     console.log(`gameCount: ${gameCount}`);
        //     oldSquare = squareValue;
        //     shipArr.push(squareValue);
        //     console.log(`shipArr.length: ${shipArr.length}`)
        //     console.log("shipArr: ");
        //     console.log(shipArr);
        //     square.classList.add('orange');
        //     if(shipArr.length === sL[4]){
        //         shipsArr.push(shipArr);
        //         shipArr = [];
        //         oldSquare = -2;
        //     }
        // }
    })
})

function checkLegal(value){
    // if(gameCount = 0 && shipArr.length === 0) return false
    let check1 = hasNotBeenPickedAlready(value)
    let check2 = isAdjacent(value)
    console.log(`check1: ${check1}`);
    console.log(`check2: ${check2}`);
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
    if(oldSquare === (-1)&& shipsArr.length===0) {
        return true;
    } else if((oldSquare === (-2) )){
        console.log("check if in overall Ships array")
        console.log(gameCount)
        console.log(findInShipsArr(value))
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

