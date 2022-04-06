# Battleship

Classic battleship board game made playable through HTML, CSS, and Javascript. Allows a player to select squares on a grid for placing ships and calling out shots. Option to play agains Computer AI.

## Link to GitHub Repository
[Battleship Repository](https://github.com/mdechavez5/Battleship)

## Basic User Stories
1. As a user, you have the option to start game, choose vs-Player or vs-Computer. Chose vs-Computer.
2. Player is prompted to mark squares on the board. Marked squares are locations for their ships.
3. After ships are placed, Player can hit the ready button.
4. Player's board is deactivated for anymore inputs. (Can't move pieces after game starts)
5. The game starts by randomly choosing who gets to call a shot out first.
6. Player's turn to call out shot, the opponent's board is activated to let Player mark a square.
7. It hit a ship! The square is marked red. || It missed! The square is marked gray.
8. Player's turn is over.
9. Computer's turn to call out a shot. Computer chooses a square.
10. It hit a ship! The square is marked red. || It missed! The square is marked gray.
11. Player's turn again.
12. Continues until a ship has been fully hit. 
13. Player sank one of Computer's ship!
14. Alternate turns until someone loses all 5 of their ships.
15. Player sank all of Computer's ships! Player wins!

## MVP Tasks
1. As user, I want to be able to Start Game.
2. As user, I want to select the squares to place my ships.
3. As user, I press the Ready Button after placing my ships.
4. As user, I can select the square on the opponent's grid to call a shot on.

## Wireframe
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