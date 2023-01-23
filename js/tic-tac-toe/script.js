function createPlayer(sign) {
    const getSign = () => sign
    return { getSign }
}
const gameboard = (function () {
    const board = new Array(9)

    function getField(index) {
        return board[index]
    }
    function setField(index, value) {
        index = Number(index)
        if (board[index]) {
            return false
        }
        board[index] = value
        return true
    }
    function canSetField(index) {
        index = Number(index)
        return !board[index]
    }
    function resetField() {
        board.fill(null)
    }
    function checkRow() {
        let winSign = null
        for (let i = 0; i < 3 * 3; i += 3) {
            if (!board[i]) {
                continue
            }
            let j = i + 1
            for (; j < i + 3; j++) {
                if (board[i] !== board[j]) {
                    break
                }
            }
            if (j === i + 3) {
                winSign = board[i]
                break
            }
        }
        return winSign
    }
    function checkCol() {
        let winSign = null
        for (let i = 0; i < 3; i++) {
            if (!board[i]) {
                continue
            }
            let j = i + 3
            for (; j < 3 * 3; j += 3) {
                if (board[i] !== board[j]) {
                    break
                }
            }
            if (j >= 3 * 3) {
                winSign = board[i]
                break
            }
        }
        return winSign
    }
    function checkDiagonal() {
        if (board[0] && board[0] === board[4] && board[0] === board[8]) {
            return board[0]
        }
        if (board[2] && board[2] === board[4] && board[2] === board[6]) {
            return board[2]
        }
        return null
    }
    function checkWinSign() {
        return checkCol() || checkRow() || checkDiagonal()
    }
    return { canSetField, getField, setField, resetField, checkWinSign }
})()
const gameController = (function () {
    let round = 0
    const playerX = createPlayer('X')
    const playerO = createPlayer('O')
    let playerWin = null
    let isFinish = false

    function getIsFinish() {
        return isFinish
    }
    function getPlayerWin() {
        return playerWin
    }
    function getPlayerTurn() {
        return (round % 2 === 0 ? playerX : playerO)
    }
    function playRound(fieldIndex) {
        if (isFinish) {
            return
        }
        if (gameboard.canSetField(fieldIndex)) {
            gameboard.setField(fieldIndex, getPlayerTurn().getSign())
            round++
            checkIsFinish()
        }
    }
    function checkIsFinish() {
        playerWin = gameboard.checkWinSign()
        if (playerWin) {
            isFinish = true
        } else if (round === 9) {
            isFinish = true
        }
    }
    function restart() {
        gameboard.resetField()
        round = 0
        isFinish = false
        playerWin = null
    }
    return { restart, playRound, getPlayerTurn, getIsFinish, getPlayerWin }
})
const displayController = (function () {
    const game = gameController()
    const allFields = document.querySelectorAll('.field')
    const messageEle = document.querySelector('#message')

    document.querySelector('#restart-btn').addEventListener('click', resetDisplay)
    allFields.forEach(ele => ele.addEventListener('click', handleClickField))
    displayMessage(game.getPlayerTurn().getSign() + ' turn')
    function handleClickField(e) {
        if (e.target.textContent) {
            return
        }
        const index = Number(e.target.dataset.field)
        game.playRound(index)
        updateDisplay()
    }
    function updateDisplay() {
        for (let i = 0; i < allFields.length; i++) {
            setGameboardField(i, gameboard.getField(i))
        }
        if (game.getIsFinish()) {
            if (game.getPlayerWin()) {
                displayMessage(game.getPlayerWin() + ' win')
            } else {
                displayMessage('draw')
            }
        } else {
            displayMessage(game.getPlayerTurn().getSign() + ' turn')
        }
    }
    function resetDisplay() {
        game.restart()
        updateDisplay()
    }
    function setGameboardField(index, value) {
        allFields[index].textContent = value
        allFields[index].dataset.fieldType = "field-" + value
    }
    function displayMessage(str) {
        messageEle.textContent = str
    }
})() 