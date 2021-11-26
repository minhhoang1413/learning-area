import { useEffect, useState } from 'react';
import './App.css';
import FlashcardList from './components/FlashcardList';
import Form from './components/Form';
import { htmlDecode, shuffleArray } from './utils';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  // useEffect(() => {
  //   fetch('https://opentdb.com/api.php?amount=10')
  //     .then(response => response.json())
  //     .then(data => {
  //       const flashcards = data.results.map((r, index) => {
  //         return {
  //           id: index + Date.now(),
  //           question: htmlDecode(r.question),
  //           answer: r.correct_answer,
  //           options: shuffleArray([...r.incorrect_answers, r.correct_answer])
  //         }
  //       })
  //       setFlashcards(flashcards)
  //     })
  // }, [])
  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        setCategories(data.trivia_categories)
      })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const category = e.target.category.value
    const amount = e.target.amount.value
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}`)
    .then(response => response.json())
    .then(data => {
      const flashcards = data.results.map((r, index) => {
        return {
          id: index + Date.now(),
          question: htmlDecode(r.question),
          answer: r.correct_answer,
          options: shuffleArray([...r.incorrect_answers, r.correct_answer])
        }
      })
      setFlashcards(flashcards)
    })
  }

  return (
    <div className="App">
      <Form categories={categories} handleSubmit={handleSubmit} />
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App;
