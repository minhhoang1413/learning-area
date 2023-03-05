import createGameboard from './gameboard.js'

function createPlayer(name, gameboardLength, shipLengthArr) {
    const gameboard = createGameboard(gameboardLength, shipLengthArr)

    function getName() {
        return name
    }
    function getBoard() {
        return gameboard.getBoard()
    }
    function getPlaceShip() {
        return gameboard.getPlaceShip()
    }
    function receiveAttack(coord) {
        return gameboard.receiveAttack(coord)
    }
    function isAllShunk() {
        return gameboard.isAllShunk()
    }
    function resetBoard() {
        gameboard.resetBoard()
    }
    return { getName, receiveAttack, isAllShunk, resetBoard, getBoard, getPlaceShip }
}


export default createPlayer