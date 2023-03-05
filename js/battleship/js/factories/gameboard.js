import createShip from "./ship.js"

function createGameboard(rowcolLength = 10, shipLengthArr) {
    const grid = new Array(rowcolLength)
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rowcolLength)
    }
    const shipCoordMap = new Map()
    resetBoard()

    function resetBoard() {
        shipCoordMap.clear()
        for (const row of grid) {
            row.fill(null)
        }
        if (!shipLengthArr) {
            shipLengthArr = [5, 4, 3, 2, 2, 1, 1]
        }
        randomPlaceShip(...shipLengthArr)
    }
    function placeShip(...coordArr) {
        if (!checkCoordArr(coordArr)) {
            throw new Error()
        }
        const ship = createShip(coordArr.length)
        for (const coord of coordArr) {
            shipCoordMap.set(coord.toString(), ship)
        }
    }
    function receiveAttack(coord) {
        if (isCoordAlreadySet(coord)) {
            throw new Error('')
        }
        if (shipCoordMap.has(coord.toString())) {
            shipCoordMap.get(coord.toString()).hit()
            setCoordAt(coord, 'hit')
            return 'hit'
        } else {
            setCoordAt(coord, 'miss')
            return 'miss'
        }
    }
    function isAllShunk() {
        for (const ship of shipCoordMap.values()) {
            if (!ship.isShunk()) {
                return false
            }
        }
        return true
    }
    function getBoard() {
        const copyGrid = new Array(grid.length)
        for (let i = 0; i < copyGrid.length; i++) {
            copyGrid[i] = [...grid[i]]
        }
        return copyGrid
    }
    function getPlaceShip() {
        return Array.from(shipCoordMap.keys())
    }
    function getCoordAt(coord) {
        if (!checkCoord(coord)) {
            throw new Error(coord)
        }
        return grid[coord[0]][coord[1]]
    }
    function setCoordAt(coord, value) {
        if (isCoordAlreadySet(coord)) {
            throw new Error()
        }
        grid[coord[0]][coord[1]] = value
    }
    function checkCoordArr(coordArr) {
        //[[1,1]]
        if (!coordArr || !Array.isArray(coordArr) || coordArr.length === 0) {
            return false
        }
        if (!coordArr.every(coord => checkCoord(coord) && !isCoordHaveShip(coord))) {
            return false
        }
        if (coordArr.length === 1) {
            return true
        }
        const dx = coordArr[1][0] - coordArr[0][0]
        const dy = coordArr[1][1] - coordArr[0][1]
        if ((dx !== 0 && dy !== 0) || (dx + dy !== 1 && dx + dy !== -1)) {
            return false
        }
        for (let i = 1; i < coordArr.length; i++) {
            const dx2 = coordArr[i][0] - coordArr[i - 1][0]
            const dy2 = coordArr[i][1] - coordArr[i - 1][1]
            if (dx2 !== dx || dy2 !== dy) {
                return false
            }
        }
        return true

    }
    function checkCoord(coord) {
        if (!coord || !Array.isArray(coord) || coord.length !== 2) {
            return false
        }
        return coord.every(num => typeof num === 'number' && num >= 0 && num < rowcolLength)
    }
    function isCoordAlreadySet(coord) {
        return Boolean(getCoordAt(coord))
    }
    function isCoordHaveShip(coord) {
        return shipCoordMap.has(coord.toString())
    }
    function randomPlaceShip(...shipLengthArr) {
        for (let i = 0; i < shipLengthArr.length; i++) {
            const length = shipLengthArr[i]
            const isVertical = Math.random() < 0.5
            if (isVertical) {
                placeVertical(length)
            } else {
                placeHorizontal(length)
            }
        }
    }
    function placeHorizontal(length) {
        let coordArr = new Array(length)
        do {
            const col = Math.floor(Math.random() * (rowcolLength - length))
            const row = Math.floor(Math.random() * rowcolLength)
            for (let i = 0; i < coordArr.length; i++) {
                coordArr[i] = [row, col + i]
            }
        } while (!checkCoordArr(coordArr));
        placeShip(...coordArr)
    }
    function placeVertical(length) {
        let coordArr = new Array(length)
        do {
            const row = Math.floor(Math.random() * (rowcolLength - length))
            const col = Math.floor(Math.random() * rowcolLength)
            for (let i = 0; i < coordArr.length; i++) {
                coordArr[i] = [row + i, col]
            }
        } while (!checkCoordArr(coordArr));
        placeShip(...coordArr)
    }
    return { resetBoard, placeShip, receiveAttack, isAllShunk, getBoard, randomPlaceShip, getPlaceShip }
}

export default createGameboard