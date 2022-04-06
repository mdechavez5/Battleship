
PROJECT 1 - Battleship


10x10 grid

2 player (or AI)

5 Ships per player
- Carrier       5 spaces
- Battleship    4 spaces
- Cruiser       3 spaces
- Submarine     3 spaces
- Destroyer     2 spaces


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

See Stats

Randomize Function
Check Legal Square Function
Allow board to be used Function

Armada Class
Ship Class  (can i use preset ships so no changes to ships) 

Function for Player Stats

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
    

