'use strict'
// YONATAN

const GHOST = `<img src="imgs/ghost1.jpg">`


var gGhosts;
var gIntervalGhosts;
var gDeadGhosts = []
var gNextGhostId = 1

// TODO
function createGhost(board) {
    var ghost = {
        location: {
            i: 2,
            j: 4
        },
        currCellContent: FOOD,
        id: gNextGhostId++
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

// TODO: loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        moveGhost(currGhost)
    }
}

function moveGhost(ghost) {
    if (!gGame.isOn) return;
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j]
        // TODO: return if cannot move
    if (nextCellContent === WALL) return
    if (nextCellContent === GHOST) return
    if (nextCellContent === POWER_FOOD) return;
    if (nextCellContent === CHERRY) return;
    if (nextCellContent === PACMAN) {
        if (gPacman.isSuper) {
            return;
        } else {
            gameOver()
        }
    }


    // TODO: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    // TODO: Move the ghost
    ghost.location = { i: nextLocation.i, j: nextLocation.j }
    
    ghost.currCellContent = nextCellContent
    // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // TODO: update the DOM
    var ghostHTML = getGhostHTML(ghost.id)
    renderCell(nextLocation, ghostHTML)

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(id) {
    if (gPacman.isSuper) return `<img src="imgs/Vulnerable-ghost.jpg">`;
    else return `<img src="imgs/ghost${id}.jpg">`;
}


function removeGhost(pacmanLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        if (ghost.location.i === pacmanLocation.i && ghost.location.j === pacmanLocation.j) {
            var removedGhost = gGhosts.splice(i, 1);
            gDeadGhosts.push(...removedGhost)
        }
    }
}


function addGhost() {
    var addedGhost = gDeadGhosts.pop();

    if (addedGhost.location === gPacman.location) {
        addedGhost.location.i -= 1;
    }
    gGhosts.push(addedGhost);
}