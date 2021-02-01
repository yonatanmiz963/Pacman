'use strict'
// YONATAN

const WALL = '⬜';
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '&#128170';
const CHERRY = '🍒';


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gCherryInterval;



function init() {
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    clearInterval(gCherryInterval)
    gCherryInterval = null
    gGame.score = 0;
    gNextGhostId = 1;

    var elScore = document.querySelector('.score span');
    elScore.innerText = gGame.score;

    gBoard = buildBoard()
    createPacman(gBoard);

    createGhosts(gBoard);

    printMat(gBoard, '.board-container')

    gGame.isOn = true


    gCherryInterval = setInterval(getCherry, 15000);
    // gCherryInterval = setInterval(function() {
    //     getCherry()
    // }, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    // Creating powerFood
    board[1][1] = POWER_FOOD;
    board[SIZE - 2][1] = POWER_FOOD;
    board[SIZE - 2][SIZE - 2] = POWER_FOOD;
    board[1][SIZE - 2] = POWER_FOOD;

    return board;
}



// update model and dom
function updateScore(diff) {
    if (isAllFoodCollected()) victory();

    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

// TODO - gameOver and victory should be in the same function
function gameOver() {
    gGame.isOn = false
    renderCell(gPacman.location, PACMAN)
    setTimeout(function() {
        var elGameOver = document.querySelector('.game-over');
        elGameOver.style.display = 'block';
    }, 1500);
}

function victory() {
    gGame.isOn = false
    renderCell(gPacman.location, PACMAN)
    setTimeout(function() {
        var elVictory = document.querySelector('.victory');
        elVictory.style.display = 'block';
    }, 1500);
}

function restart() {
    init();
    setTimeout(function() {
        var elGameOver = document.querySelector('.game-over');
        elGameOver.style.display = 'none';

        var elVictory = document.querySelector('.victory');
        elVictory.style.display = 'none';
    }, 1500);
}



function isAllFoodCollected() {
    var foodCount = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j]
            if (cell === FOOD) foodCount++;
        }
    }
    return (foodCount === 1)
}

// Generating cherries
function getCherry() {
    var location = getEmptyLocation()
    if (!location) return;
    // Updating model
    gBoard[location.i][location.j] = CHERRY;
    // Updating DOM
    renderCell(location, CHERRY)
        // renderCell({ i: location[0], j: location[1] }, CHERRY)
}



function getEmptyLocation() {
    var emptyLocations = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var location = gBoard[i][j]
            if (location === EMPTY) {
                // console.log(location);
                emptyLocations.push({ i, j });
                // emptyLocations.push([i, j]);
            }
        }
    }
    var randomIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randomIdx];
}