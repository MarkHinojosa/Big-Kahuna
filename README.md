![memoryMatchGame](/gh-assets/memoryMatchGame.png)
Final Project
211 Javascript-Full Stack
12/19/17
"BigKahuna"

## Authors:

### Mark Hinojosa

### Jon Gorman

## Project Idea-

Picture matching game

## Objective:

The object of the game is to match as many sets of faces as possible within a set amount of turns.

## Game layout:

The game will consist of a grid of blank cards that is a 3x10 board.

## Program dynamics:

build a array of cards that shows up on screen using React, and API calls.
Game should be scalable so that when the numerical value of the fetch call is changed the game will adjust entirely.
The order that the API call assigns the face cards to array indexes needs to change every time.
When game loads the cards will only show a logo.
OnClick the selected ?blank card? will ?turn over? to reveal an image from selected API.
If the second click does not reveal the matching card then a turn has been spent and both cards flip back over.
If two matching cards are revealed consecutively then the player is allowed to continue leaving the ?Matched Cards? exposed.
The game will track the Turns and the Matches and provide a ratio of Tuns divided by Matches.
