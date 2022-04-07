
const div = document.querySelector('div')
const board = document.querySelector('.testboard')
console.log(board);

// let square = document.createElement("div");
// square.classList.add('square');
// // console.log(square);
// board.appendChild(square);

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

// class Ship {
//     constructor(num){
//         this.units = num;
//         this.location = []
//     }
//     create() {
//         this.location = [squares[0],squares[1]]
//         this.location.forEach( square => {
//             square.classList.add('red')
//         })
//     }
//     red() {
//         this.location.forEach( square => {
//             square.classList.add('red')
//         })
//     }
// }
// console.log(squares)
// console.log(squares[0])


// let ship1 = new Ship(2);

// const testBtn1 = document.querySelector('#test_btn1')
// testBtn1.addEventListener('click', (event) => {
//     event.preventDefault();
//     ship1.create();
// })
// const testBtn2 = document.querySelector('#test_btn2')
// testBtn2.addEventListener('click', (event) => {
//     event.preventDefault();
// })

let gameCount = 0;
let pickedArr = [];
let sL = [2,3,3,4,5]; //shipLength

//sumWithPrevious
function sumWP(arr) {
    let arrSize = arr.length;
    let newArr = []
    let newInt = 0;
    for( let i=0; i<arrSize; i++){
        newInt += arr.shift();
        newArr.push(newInt);
        console.log(newArr)
    }
    return newArr;
}
console.log(sumWP(sL)[1]);

squares.forEach( square => {
    square.addEventListener('click', (event) => {
        event.preventDefault();

        // Get square's value
        console.log(`gameCount: ${gameCount}`);
        let squareValue = square.getAttribute('value');
        console.log(`squareValue: ${squareValue}`);

        if ( gameCount < (2) && checkLegal(squareValue) ){
            // console.log(square.getAttribute('value'));
            pickedArr.push( square.getAttribute('value'))
            console.log("pickedArr: "); 
            console.log(pickedArr);
            square.classList.add('red');
            // console.log(square)
            gameCount++;

        } else if (gameCount < (5) && checkLegal(squareValue) ){
            pickedArr.push( square.getAttribute('value'))
            console.log("pickedArr: ");
            console.log(pickedArr);
            square.classList.add('blue')
            gameCount++;

        } else if (gameCount < (8) && checkLegal(squareValue) ){
            pickedArr.push( square.getAttribute('value'))
            console.log("pickedArr: ");
            console.log(pickedArr);
            square.classList.add('green')
            gameCount++;
        }
    })
})

function checkLegal(value){
    if(hasBeenPickedAlready(value)){
        return false
    }
    return true
}

//is squareVal = prevSquareVal - 10       (above)
//is squareVal = prevSquareVal + 10       (below)
//is squareVal = prevSquareVal + 1       (right)
//is squareVal = prevSquareVal + 10       (down)
// function isAdjacent(value){
//     // Checking each value in pickedArr for pattern
//     pickedArr.forEach(val => {
        
//     })
//     let valAbove = pickedArr.includes(value) - gameHeight
//     let valBelow = pickedArr.includes(value) + gameHeight
//     let valRight = pickedArr.includes(value) + 1
//     let valLeft = pickedArr.includes(value) - 1
    

//     if(pickedArr.includes(value)){

//     }
// }

// Check if square has been picked already
function hasBeenPickedAlready(value) {
    if( pickedArr.includes(value) ){
        console.log("Has been picked already!");
        return true;
    }
    return false;
}

//is squareVal = prevSquareVal - 10       (above)
//is squareVal = prevSquareVal + 10       (below)
//is squareVal = prevSquareVal + 1       (right)
//is squareVal = prevSquareVal + 10       (down)




