const cells = document.querySelectorAll('.cell')
let turn
const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function AddEventListener() {
    cells.forEach(cell => {
        cell.addEventListener('click', clicked, {once: true})
    })
    turn = true
}

AddEventListener()

function clicked(e) {
    let clickedCell = e.target
    let messageDiv = document.querySelector('.Message')
    let message = document.querySelector('.winMessage')
    placeLetter(clickedCell)
    if(checkWinX()) {
        messageDiv.innerHTML = 'X Wins'
        message.classList.add('showBtn')
    } else if(checkWinO()) {
        messageDiv.innerHTML = 'O Wins'
        message.classList.add('showBtn')
    } else if(checkDraw()) {
        messageDiv.innerHTML = 'Draw'
        message.classList.add('showBtn')
    }
}

function placeLetter(clickedCell) {
    if (turn) {
        clickedCell.innerHTML = 'X'
    } else {
        clickedCell.innerHTML = 'O'
    }
    swapTurn()
}

function swapTurn() {
    turn = !turn
}

function checkWinX() {
    return winCon.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML.includes('X')
        })
    })
}

function checkWinO() {
    return winCon.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML.includes('O')
        })
    })
}

function checkDraw() {
   return [...cells].every(cell => {
    return cell.innerHTML.length != 0 ? true : false
   })
}

document.querySelector('.btn').addEventListener('click', () => {
    cells.forEach(cell => {
        cell.innerHTML = ''
    })
    let message = document.querySelector('.showBtn')
    message.classList.remove('showBtn')
    cells.forEach(cell => {
        cell.removeEventListener('click', clicked)
    })
    AddEventListener()
})