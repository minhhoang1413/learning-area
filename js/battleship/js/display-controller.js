import createGameController from "./game-controller.js"
import Board from "./components/board.js"

function createDisplayController() {
    const section = document.createElement('section')
    const container = document.createElement('div')
    container.className = 'container'
    section.appendChild(container)

    const gameController = createGameController()

    updateDisplay()

    function playerAttack(coord) {
        gameController.playerAttack(coord)
        updateDisplay()
    }

    function updateDisplay() {
        container.replaceChildren()
        const playerBoard = Board(gameController.getPlayerBoard(), gameController.getPlayerName(), gameController.getPlayerShip())
        const computerBoard = Board(gameController.getComputerBoard(), gameController.getComputerName(), gameController.getComputerShip(), playerAttack)
        container.appendChild(playerBoard)
        container.appendChild(computerBoard)
        computerBoard.classList.add('hidden')
        if (gameController.getIsFinish()) {
            computerBoard.classList.remove('hidden')
            const messageEle = document.createElement('div')
            container.appendChild(messageEle)
            messageEle.textContent = gameController.getMessage()
            const restartBtn = document.createElement('button')
            messageEle.appendChild(restartBtn)
            restartBtn.textContent = 'Play again'
            restartBtn.addEventListener('click', newGame)
        }
    }
    function newGame() {
        gameController.resetGame()
        updateDisplay()
    }


    

    return section
}

export default createDisplayController