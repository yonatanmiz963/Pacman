'use strict'
// YONATAN


const PACMAN = '<img class="pacman" src="imgs/pacman.jpg">';
var gDirectionOfPac;
var gPacman;
var gIsPowerFood;
// TODO
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
        // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) updateScore(10)

    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    } else if (nextCell === GHOST) {
        removeGhost(nextLocation)
        setTimeout(function() {
            addGhost()
        }, 5000)

    }

    var prevContent = EMPTY;
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) gIsPowerFood = true;
        else {
            gPacman.isSuper = true;
            setTimeout(function() {
                gPacman.isSuper = false;
            }, 5000)
        }
    } else if (gIsPowerFood) {
        prevContent = POWER_FOOD;
        gIsPowerFood = false;
    }

    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = prevContent

    // TODO: update the DOM
    renderCell(gPacman.location, prevContent)

    // TODO: Move the pacman
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }


    // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
        // TODO: update the DOM
    renderCell(nextLocation, PACMAN)

    var elPacman = document.querySelector('.pacman')
        // get pacman icon right direction
    elPacman.style = gDirectionOfPac;

}


// figure out nextLocation
function getNextLocation(eventKeyboard) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
                gDirectionOfPac = 'transform:rotate(270deg);'
            break
        case 'ArrowDown':
            nextLocation.i++
                gDirectionOfPac = 'transform:rotate(90deg);'
            break
        case 'ArrowLeft':
            nextLocation.j--
                gDirectionOfPac = 'transform: rotateY(180deg)'
            break
        case 'ArrowRight':
            nextLocation.j++
                gDirectionOfPac = ''
            break
    }
    return nextLocation;
}