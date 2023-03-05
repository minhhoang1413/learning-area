import createPlayer from "./factories/player.js"
import createComputerPlayer from "./factories/computer-player.js"

function createGameController() {
    const shipLengthArr = [5, 4, 3, 2, 2, 1, 1]
    const gameboardLength = 10
    const player = createPlayer('Player', gameboardLength, shipLengthArr)
    const computerPlayer = createComputerPlayer(gameboardLength, shipLengthArr)
    let isFinish = false
    let playerWin = null

    function getIsFinish() {
        return isFinish
    }
    function getMessage() {
        if (isFinish) {
            if (playerWin) {
                return playerWin.getName() + ' win'
            } else {
                return 'Draw'
            }
        }
    }
    function checkIsfinished() {
        const shink1 = player.isAllShunk()
        const shink2 = computerPlayer.isAllShunk()
        if (shink1 || shink2) {
            isFinish = true
            if (shink1) {
                if (shink2) {
                    playerWin = null
                } else {
                    playerWin = computerPlayer
                }
            } else {
                playerWin = player
            }
        }
    }

    function playerAttack(coord) {
        if (isFinish) {
            return
        }
        computerPlayer.receiveAttack(coord)
        computerPlayerAttack()
        checkIsfinished()
    }
    function computerPlayerAttack() {
        const result = player.receiveAttack(computerPlayer.attack())
        console.log('result', result);
        if (result === 'hit') {
            computerPlayer.generateNextMoves()
        }
    }
    function getPlayerBoard() {
        return player.getBoard()
    }
    function getPlayerShip() {
        return player.getPlaceShip()
    }
    function getComputerShip() {
        return computerPlayer.getPlaceShip()
    }
    function getComputerBoard() {
        return computerPlayer.getBoard()
    }
    function getPlayerName() {
        return player.getName()
    }
    function getComputerName() {
        return computerPlayer.getName()
    }
    function resetGame() {
        player.resetBoard()
        computerPlayer.resetBoard()
        isFinish = false
        playerWin = null
    }

    return { playerAttack, resetGame, getMessage, getIsFinish, getPlayerBoard, getComputerBoard, getPlayerName, getComputerName, getPlayerShip, getComputerShip }
}
export default createGameController