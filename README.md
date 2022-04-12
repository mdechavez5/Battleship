# Battleship

Classic battleship board game made playable through HTML, CSS, and Javascript. Allows a player to select squares on a grid for placing ships and calling out shots. Option to play agains Computer AI.

## Link to GitHub Repository
[Battleship Repository](https://github.com/mdechavez5/Battleship)

[Battleship GitHub Page](https://mdechavez5.github.io/Battleship/)

## Technologies Used
HTML, CSS, JavaScript

## Wireframe
![Battleship 1](https://user-images.githubusercontent.com/101363667/163061644-a64930e9-4f46-4ecc-8090-0665263b8bbd.png)
![Battleship 2](https://user-images.githubusercontent.com/101363667/163061659-885a29ed-cf3f-48e7-bfb0-e60038e21dea.png)
![Battleship 3](https://user-images.githubusercontent.com/101363667/163061670-32ea308d-2101-447f-9fb9-f95935389468.png)

## Getting Started
Navigate to the page on your browser. Click the start button and begin placing ships. 
Instruction text on the top will let you know how many squares are left to pick to complete a ship. 
The ready button will pop up when you're finished placing your ships.
Click any square on your opponent's board to call out a shot.
Play until one player's ships are all sunk!

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

## Additional Comments for IAs, Instructors
