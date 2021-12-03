import { useEffect, useState } from 'react';
import './App.css';
import data from './data'
function App() {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0)

  const handleClick = (value) => {
    if (value < 0) {
      setIndex(people.length - 1)
    } else if (value >= people.length) {
      setIndex(0)
    } else {
      setIndex(value)
    }

  }
  useEffect(()=>{
    let interval = setInterval(() => {
      handleClick(index+1)
    }, 3000);
    return () => clearInterval(interval)
  },[index])
  return (
    <section className="section">
      <div className="title">
        <h2><span>/</span> reviews</h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) =>
          <article key={person.id} style={{ transform: `translateX(${-100 * index}%)` }} className="person">
            <img src={person.image} alt={person.name} className="person-img" />
            <h4>{person.name}</h4>
            <p className="title">{person.title}</p>
            <p className="text">{person.quote}</p>
            <div className="icon">&#10078;</div>
          </article>
        )}
        <button className="prev-btn" onClick={() => handleClick(index - 1)}>&#10094;</button>
        <button className="next-btn" onClick={() => handleClick(index + 1)}>&#10095;</button>
      </div>
    </section>
  );
}

export default App;
