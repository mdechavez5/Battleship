# Battleship

Classic battleship board game made playable through HTML, CSS, and Javascript. Allows a player to select squares on a grid for placing ships and calling out shots. Option to play agains Computer AI.

## Link to GitHub Repository
[Battleship Repository](https://github.com/mdechavez5/Battleship)

## Basic User Stories
1. As user, I want to be able to Start Game.
2. As user, I want to select the squares to place my ships.
3. As user, I press the Ready Button after placing my ships.
4. As user, I can select the square on the opponent's grid to call a shot on.
5. As user, I want to always see my board.
6. As user, I need to know the result of my shot. ( Hit / Miss )
7. As user, I need to know if a ship has sunk.

## MVP Tasks
1. Setup grid layout (Start small: 5x5)
2. Ability to select a square
3. Create a Ship object to record ship properties (length, squares, isSunk, etc.)
4. Ability to select a number of squares equal to one ship's length
5. Record selected squares into Ship object
6. Scale up. Be able to select and create more ships
7. Player ability to select square on opponent's board
8. Add a function that simulates a computer calling a shot
9. Display if one of Player's ships has been hit
10. Display if a shot missed
11. Display if the rest of a ship has been hit - ship has sunk

## Stretch Goals
1. Create a player object to record ships and wins
2. Implementing ability to have a Player 2 as opponent
3. Ability to change the sizes of the ships
4. Ability to change the size of the board

## Wireframe
![Initial Framing](https://user-images.githubusercontent.com/101363667/162599006-203e84f3-87ff-46f1-aceb-65c25cbf5eaf.png)
![ship objects](https://user-images.githubusercontent.com/101363667/162599008-c96eb15d-11c9-471b-9afa-cddbb2815efc.png)

![Wireframe5](https://user-images.githubusercontent.com/101363667/162039194-ed1ab30e-7bfa-4a37-b2e4-98538ac1f791.png)

## Pseudo Code
```
Start Game
    Select [VS Another Player] or [VS Computer]
    
    VS Another Player
        Player 1 Selects

    VS Computer
        Player 1 Selects Squares    (where to place the ships)
            Check to see if Selected Squares are legal  
                Most likely has to form a line (vertical/horizontal, no diagonals, no ship overlapping border, no overlapping each other)
                No overlap
            Check remaining pieces to be placed
            Mark ready to play
        
        Turns
            Randomly choose who goes first
        
        Player 1 Turn
            Allow Computer's board to be marked
            Mark a square on opponent's board
                Check legal
                Display text of marked square
                Gray to mark location 
                Red if hit
                White if missed
            Update a text display
            If sank a ship
                Display sank ship
                Remove ship from Computer's array(?), Armada

        Computer Turn
            Allow Player 1's board to be marked
            Run algorithm for choice
            Mark a square on Player 1's board
                Check legal
                Display text of marked square
                Gray to mark location
                Red if hit
                White if missed
            Update a text display
            If sank a ship
                Display sank ship
                Remove ship from Player 1's array(?), Armada
```
```
Compiling Player Stats Function
Display Stats Function
Randomize Function
Check Legal Square Function
Allow board to be used Function

Armada Class (players ship array(?) w/ their stats(?))
Ship Class  (can i use preset ships so no changes to ships) 

AI Placement Algorithm
    Randomize first mark
        Check if legal for every mark
            Continue vertically or horizontally
    Check inventory (remaining ships)

AI Algorithm
    If none hit
        Randomly Choose
    If has a hit
        go for vertical or horizontal moves
```

## Additional Comments for IAs, Instructors
