import React, { useEffect, useState } from "react";
import "./styles.css"
import data from "./data.json"
import CardContainer from "./components/CardContainer";
import { shuffleArray, displayTime } from './utils'

function App() {
    const [imageArray, setImageArray] = useState(() => shuffleArray(data))
    const [score, setScore] = useState({ id: Date.now(), point: 0, time: 0 })
    const [selected, setSelected] = useState([])
    const [isStartGame, setIsStartGame] = useState(false)
    const [scoreHistory, setScoreHistory] = useState(() => {
        const history = localStorage.getItem('memory-game-history')
        if (history) {
            return JSON.parse(history)
        }
        return []
    })

    useEffect(() => {
        if (scoreHistory.length > 0) {
            localStorage.setItem('memory-game-history', JSON.stringify(scoreHistory))
        }
    }, [scoreHistory])

    useEffect(() => {
        if (!isStartGame) {
            return
        }
        const timerId = setTimeout(() => {
            setScore(oldScore => ({ ...oldScore, time: oldScore.time + 100 }))
        }, 100);

        return () => {
            clearInterval(timerId)
        }

    }, [isStartGame, score.time])

    function handleClick(image) {
        if (selected.includes(image)) {
            finishGame()
        } else {
            setSelected(selected.concat(image))
            setScore(oldScore => ({ ...oldScore, point: oldScore.point + 1 }))
            setImageArray(shuffleArray(imageArray))
        }
    }
    function finishGame() {
        setIsStartGame(false)
        const history = scoreHistory.concat(score)
        history.sort((h1, h2) => {
            if (h1.point > h2.point) {
                return -1
            }
            if (h1.point < h2.point) {
                return 1
            }
            if (h1.time > h2.time) {
                return 1
            }
            if (h1.time < h2.time) {
                return -1
            }
        })
        setScoreHistory(history)
    }
    function startNewGame() {
        setSelected([])
        setScore({ id: Date.now(), point: 0, time: 0 })
        setIsStartGame(true)
    }
    const bestScore = scoreHistory.reduce((bestScore, obj) => {
        if (obj.point > bestScore) {
            return obj.point
        }
        return bestScore
    }, 0)
    return (
        <div className="container">
            <h1>Memory Game</h1>
            <div className="">Score {score.point}</div>
            <div className="">Best score {bestScore}</div>
            <div >time {displayTime(score.time)}</div>

            {isStartGame
                ? <CardContainer imageArray={imageArray} handleClick={handleClick} />
                :
                <div>
                    <button onClick={startNewGame}>start</button>
                    <h3>History</h3>
                    <ol>
                        {scoreHistory.map(history =>
                            history.id === score.id
                                ? <li className="bold" key={history.id}>time: {displayTime(history.time)} - score: {history.point}</li>
                                : <li key={history.id}>time: {displayTime(history.time)} - score: {history.point}</li>
                        )}
                    </ol>
                </div>
            }
        </div>
    )
}

export default App