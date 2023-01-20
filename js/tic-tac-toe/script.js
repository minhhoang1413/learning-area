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
const displayController = (function () {
    const allFields = document.querySelectorAll('.field')
    const messageEle = document.querySelector('#message')

    function addFieldListener(cb) {
        allFields.forEach(ele => ele.addEventListener('click', cb))
    }
    function resetGameboard() {
        for (let i = 0; i < allFields.length; i++) {
            setGameboardField(i, null)
        }
    }
    function setGameboardField(index, value) {
        allFields[index].textContent = value
        allFields[index].dataset.fieldType = value
    }
    function displayMessage(str) {
        messageEle.textContent = str
    }
    return { setGameboardField, resetGameboard, displayMessage, addFieldListener }
})()

const game = (function () {
    let round = 0
    const playerX = createPlayer('X')
    const playerO = createPlayer('O')
    let playerWin
    let isFinish = false

    document.querySelector('#restart-btn').addEventListener('click', restart)
    displayController.addFieldListener(playRound)

    function getPlayerTurn() {
        return (round % 2 === 0 ? playerX : playerO)
    }
    function playRound(event) {
        if (isFinish) {
            return
        }
        const fieldIndex = event.target.dataset.field
        if (gameboard.canSetField(fieldIndex)) {
            gameboard.setField(fieldIndex, getPlayerTurn().getSign())
            displayController.setGameboardField(fieldIndex, getPlayerTurn().getSign())
            round++
            displayController.displayMessage(getPlayerTurn().getSign() + ' turn')
            checkIsFinish()
        }
    }
    function checkIsFinish() {
        playerWin = gameboard.checkWinSign()
        if (playerWin) {
            isFinish = true
            displayController.displayMessage(playerWin + ' win')
        } else if (round === 9) {
            isFinish = true
            displayController.displayMessage('Draw')
        }
    }
    function restart() {
        gameboard.resetField()
        displayController.resetGameboard()
        round = 0
        isFinish = false
        displayController.displayMessage(getPlayerTurn().getSign() + ' turn')
    }
    restart()
})()