import './SingleCard.css'
export default function SingleCard({card, handleChoice, flipped, disabled}) {
    const handleClick = () => {
        if (disabled) {
            return
        }
        handleChoice(card)
    }
    return (
        <div className={flipped ? 'card flipped' : 'card'}>
            <img className="front" src={card.src} alt="front card" />
            <img onClick={handleClick} className="back" src="/img/cover.png" alt="back card" />
        </div>
    )
}