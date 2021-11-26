import { useState } from "react"


export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false)
    return (
        <div className={flip ? 'card flip' : 'card'} onClick={() => setFlip(!flip)}>
            <div className="front">
                <p><b>{flashcard.question}</b></p>
                <ol className="option">
                    {flashcard.options.map(option =>
                        <li key={option}>{option}</li>    
                    )}
                </ol>
            </div>
            <div className="back">
                <p><strong>{flashcard.answer}</strong></p>
            </div>
        </div>
    )
}