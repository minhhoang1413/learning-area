import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import { shuffleArray } from './util';
const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
]
function App() {
  const [cards, setCards] = useState([])
  const [turn, setTurn] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  useEffect(()=>{
   newGame() 
  },[])
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        const newCards = cards.map(card => card.src === choiceOne.src ? { ...card, matched: true } : card)
        setCards(newCards)
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 1000);

      }
    }
  }, [choiceOne, choiceTwo])

  const newGame = () => {
    let shuffledCards = [...cardImages, ...cardImages]

    shuffledCards = shuffleArray(shuffledCards)
      .map(card => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurn(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    //console.log(choiceOne.src === choiceTwo.src);
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(turn + 1)
    setDisabled(false)
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <p>{turn}</p>
      <button onClick={newGame}>New game</button>
      <div className="card-grid">
        {cards.map(card =>
          <SingleCard card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />
        )}
      </div>
    </div>
  );
}

export default App;
