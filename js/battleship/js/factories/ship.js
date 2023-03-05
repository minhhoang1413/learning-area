function createShip(shipLength) {
    if (typeof shipLength !== 'number' || Number.isNaN(shipLength)) {
        throw new Error('ship length must be number')
    }
    const length = shipLength
    let numberOfHits = 0
    function getLength() {
        return length
    }
    function hit() {
        if (isShunk()) {
            throw new Error()
        }
        numberOfHits++
    }
    function isShunk() {
        return numberOfHits === length
    }
    return { hit, isShunk, getLength }
}

export default createShip