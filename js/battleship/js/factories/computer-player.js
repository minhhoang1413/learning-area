import createPlayer from "./player.js"

function createComputerPlayer(gameboardLength, shipLengthArr) {
    const prototype = createPlayer('Computer', gameboardLength, shipLengthArr)

    const shipLengthArray = [...shipLengthArr]
    const MOVES_HORIZONTAL = [[0, 1], [0, -1]]
    const MOVES_VERTICAL = [[1, 0], [-1, 0]]
    let nextMovesVertical = []
    let nextMovesHorizontal = []
    let currentDirection = null
    let currentHitMoves = []
    let historyMoves = []

    function attack() {
        let move
        if (nextMovesHorizontal.length !== 0) {
            move = nextMovesHorizontal.pop()
        } else if (nextMovesVertical.length !== 0) {
            move = nextMovesVertical.pop()
        } else {
            resetMoves()
            move = randomMove()
        }
        historyMoves.push(move)
        return move
    }
    function resetMoves() {
        if (currentHitMoves.length > 0) {
            const lengthIndex = shipLengthArray.findIndex(l => l === currentHitMoves.length)
            shipLengthArray.splice(lengthIndex, 1)
            currentDirection = null
            currentHitMoves = []
            nextMovesHorizontal = []
            nextMovesVertical = []
        }
    }
    function generateNextMoves() {
        currentHitMoves.push(historyMoves[historyMoves.length - 1])
        if (currentHitMoves.length === Math.max(...shipLengthArray)) {
            resetMoves()
            return
        }
        if (currentHitMoves.length === 2) {
            const historyMove1 = currentHitMoves[0]
            const historyMove2 = currentHitMoves[1]
            if (historyMove1[0] - historyMove2[0] === 0) {
                currentDirection = 'horizontal'
                nextMovesVertical = []
            } else {
                currentDirection = 'vertical'
                nextMovesHorizontal = []
            }
        }
        if (currentDirection === 'vertical') {
            generateNextMovesVertical()
        } else if (currentDirection === 'horizontal') {
            generateNextMovesHorizontal()
        } else {
            generateNextMovesVertical()
            generateNextMovesHorizontal()
        }
    }
    function generateNextMovesVertical() {
        const currentMove = historyMoves[historyMoves.length - 1]
        for (const move of MOVES_VERTICAL) {
            const row = currentMove[0] + move[0]
            const col = currentMove[1] + move[1]
            if (checkMove(row, col)) {
                console.log(row, col);
                nextMovesVertical.push([row, col])
            }
        }
    }
    function generateNextMovesHorizontal() {
        const currentMove = historyMoves[historyMoves.length - 1]
        for (const move of MOVES_HORIZONTAL) {
            const row = currentMove[0] + move[0]
            const col = currentMove[1] + move[1]
            if (checkMove(row, col)) {
                console.log(row, col);
                nextMovesHorizontal.push([row, col])
            }
        }

    }
    function randomMove() {
        let row, col
        do {
            row = Math.floor(Math.random() * gameboardLength)
            col = Math.floor(Math.random() * gameboardLength)
        } while (!checkMove(row, col));
        const moves = [row, col]
        return moves
    }
    function checkMove(row, col) {
        if (row < 0 || row >= gameboardLength || col < 0 || col >= gameboardLength) {
            return false
        }
        for (const oldCoord of historyMoves) {
            if (row === oldCoord[0] && col === oldCoord[1]) {
                return false
            }
        }
        return true
    }
    function resetBoard() {
        prototype.resetBoard()
        historyMoves = []
    }
    return Object.assign({}, prototype, { attack, resetBoard, generateNextMoves })
}

export default createComputerPlayer