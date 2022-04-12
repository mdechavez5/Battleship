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


class Ship {
    constructor(){
        this.length = 0
        this.isShips = false
        this.squares = []
    }
    addSquare(square){
        this.squares.push(square)
        this.length = this.squares.length
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


class ShipSquare {
    constructor(square,value){
        this.boardValue = value
        this.isHit = false
        this.selector = square
    }
}


const div = document.querySelector('div')
const board1 = document.getElementById('board1')
const gameText = document.getElementById('game_text')
const player1Board = document.getElementById('player1')
const player2Board = document.getElementById('player2')
const board2 = document.getElementById('board2')


let gameHeight = 10
let gameWidth = 10
let numSquares = gameWidth * gameHeight;


function createBoard(playerBoard){
    let alphabet = ' abcdefghijklmnopqrstuvwxyz';
    let letter = alphabet.split('');
    for (let i=0; i<gameHeight+1; i++){
        let gameRow = document.createElement('div')
        gameRow.classList.add('gameRow')
        gameRow.style.height = `50px`
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
                if(j===0){
                    let labely = document.createElement('div')
                    labely.classList.add('label');
                    labely.innerHTML = i;
                    // labely.style.width = `${100/(gameWidth+1)}`
                    gameRow.appendChild(labely)
                }else {
                    square.classList.add('square');
                    // Give every new square a unique value
                    square.setAttribute('boardValue', (letter[j]+'.'+(i)) );
                    square.innerHTML = `${square.getAttribute('boardValue')}`
                    square.style.width = `${100/(gameWidth)}`
                    gameRow.appendChild(square)
                }
            }
        }
        playerBoard.appendChild(gameRow);
    }
    playerBoard.style.width = `${(gameWidth+1) * 50}px`
    const squares = playerBoard.querySelectorAll('.square')
    return squares
}

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


const startBtn = document.getElementById('start_btn');
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    startBtn.classList.toggle('hidden')
    startGame();
})


const readyBtn = document.getElementById('ready_btn');
readyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let squares2 = createBoard(player2Board);
    player1Turn = true;
    board2.classList.toggle('hidden');
    readyBtn.classList.toggle('hidden');
    gameText.innerHTML = `Call a shot on the Computer's board`
    vsComputer(squares2);
})

const restartBtn = document.getElementById('restart_btn');
restartBtn.addEventListener('click', (event) => {
    event.preventDefault();
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
    startBtn.classList.toggle('hidden')
    restartBtn.classList.toggle('hidden')
    board2.classList.toggle('hidden')

})



function startGame(){
    let squares1 = createBoard(player1Board);
    // let squares2 = createBoard(player2Board)
    gameText.innerHTML = 'Select a square to start placing a ship'
    console.log(`Ready to place ships`);
    activeGame = true;
    placingShips(player1, squares1);
}


function placingShips(player,squares) {
    squares.forEach( square => {
        square.addEventListener('click', (event) => {
            event.preventDefault();
    

            if(activeGame){
                let squareValue = square.getAttribute('boardValue')
    
                if(player.ships.length<sL.length){
                    if(ship.length < sL[shipIndex] && checkLegal(squareValue)){
                        mainContainer.push(squareValue);
                        // console.log(mainContainer)
    
                        let test = `${squareValue}`
                        let test2 = test.split('.')
                        oldSquare = []
                        oldSquare.push(test2[0])
                        oldSquare.push(test2[1])
    
                        colorShip(shipIndex,square)
                        let shipSquare = new ShipSquare(square,squareValue)
                        ship.addSquare(shipSquare)
                        gameText.innerHTML = `Select ${(sL[shipIndex]-ship.squares.length)} more to finish the ship`
                    }
                    if(ship.length === sL[shipIndex]){
                        oldSquare = [-1,-1]
    
                        player.addShip(ship)
                        shipIndex++;
                        gameText.innerHTML = `Select a square to place new ship`
                        ship = new Ship()
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


function checkLegal(value){
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
function isAdjacent(boardValue){
    // console.log(`oldSquare: ${oldSquare}`)
    // console.log(`isAdjacent bv: ${boardValue}`)
    if( oldSquare[0]===-1 && oldSquare[1]===-1 ){
        return true;
    }
    // new on the bottom, new on the top
    // new on the right, new on the left
    if( (boardValue[0] === oldSquare[0]) && ( (boardValue[1]-oldSquare[1])===1 || (boardValue[1]-oldSquare[1])===-1) ){
        return true
    } else if ( (boardValue[1] === oldSquare[1]) && ( oldSquare[0] === String.fromCharCode(boardValue[0].charCodeAt() + 1) || oldSquare[0] === String.fromCharCode(boardValue[0].charCodeAt() - 1) ) ){
        return true;
    }
    return false;
}
function hasNotBeenPickedAlready(boardValue) {
    // if first pick, no squares have been picked yet
    let test = ''
    test = boardValue[0] + '.' + boardValue[1]
    // console.log(`hasNotBeenPickedAlready - test: ${test}`)
    if ( (oldSquare === boardValue) || mainContainer.includes(test) ){
        return false;
    }
    return true;
}
function colorShip(i,sq){
    if(i===0) sq.classList.add('red')
    else if(i===1) sq.classList.add('blue')
    else if(i===2) sq.classList.add('green')
    else if(i===3) sq.classList.add('yellow')
    else if(i===4) sq.classList.add('orange')
    else sq.classList.add('red')
}

compShips = ['a.1','b.1','a.5','b.5','c.5','h.2','h.3','h.4','d.9','e.9','f.9','g.9','j.4','j.5','j.6','j.7','j.8']
let mainContainer2 = [];

function vsComputer(squares) {
    // console.log(squares)
    squares.forEach( square => {
        square.addEventListener('click', (event) =>{
            event.preventDefault();

            if (activeGame && player1Turn){
                let squareValue = square.getAttribute('boardValue')
                // If square selected has a value already selected
                if(mainContainer2.indexOf(squareValue) === -1 && compShips.length !==0){
                    // If square selected has a value among the computer ships
                    if(compShips.indexOf(squareValue)> -1){
                        square.classList.add('red');
                        gameText.innerHTML = `Your choice <span>${squareValue}</span> Hit!`
                        compShips.splice(compShips.indexOf(squareValue),1);
                        mainContainer2.push(squareValue);
                        player1Turn = false;
                        computerTurn = true;
                        if(compShips.length === 0){
                            computerTurn = false;
                            gameText.innerHTML = "You sank all of Computer's ships! You WIN!";
                            restartBtn.classList.toggle('hidden');
                            player1.winsGame();
                            
                            // restartBtn.style.display = 'block'
                        }
                    } else {
                        gameText.innerHTML = `Your choice <span>${squareValue}</span> Missed!`
                        square.classList.add('pink');
                        mainContainer2.push(squareValue);
                        player1Turn = false;
                        computerTurn = true;
                    }
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

// Computer calls shot out
let computerShots = [];
let compPrevShot = -1
let compNextShot = -1


function make99() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let letter = alphabet.split('');
    let value = '';
    let arr = [];
    for(let i=0; i<gameHeight; i++){
        for(let j=0; j<gameWidth; j++){
            arr.push( (letter[j]+'.'+(i+1)) )
        }
    }
    return arr;
}
let compAvailShots = make99();

function compShot(){
    let squares1 = player1Board.querySelectorAll('.square')

    if (computerTurn){

        if(mainContainer.length>0){
            
            let randomShot = compAvailShots[ randomBetween( 0, compAvailShots.length ) ];
            
    
            computerShots.push(randomShot)
            compAvailShots.splice( compAvailShots.indexOf(randomShot), 1 );
            // console.log(`randomShot: ${randomShot}`);

            squares1.forEach( square1 => {
                if( randomShot === square1.getAttribute('boardValue') ){
                    if( mainContainer.includes(randomShot) ){
                        gameText.innerHTML = `Computer chose <span>${randomShot}</span> . It hit something!`;
                        mainContainer.splice( mainContainer.indexOf(randomShot),1 );
                        player1.shipHit(randomShot);
                        square1.classList.add('gray');

                        if(mainContainer.length === 0){
                            gameText.innerHTML = `Computer sank all your ships!!`;
                            computerTurn = false;
                            activeGame = false;
                        }
                    } else {
                        gameText.innerHTML = `Computer chose <span>${randomShot}</span> . Shot missed!`;
                        square1.classList.add('lightgray');
                        compNextShot = -1;
                    }
                }
                computerTurn = false;
            }) 
        }
        player1Turn = true;
    }
}