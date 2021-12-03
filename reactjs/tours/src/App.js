import { useEffect, useState } from 'react';
import './App.css';
import Loading from './components/Loading';
import Tours from './components/Tours';
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState([])

  useEffect(() => {
    fetchTour()
  }, [])
  const fetchTour = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setIsLoading(false)
      setTours(data)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }
  const removeTour = (id) => {
    const newTours = tours.filter(tour => tour.id !== id)
    setTours(newTours)
  }

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <h2>No tours left</h2>
        <button onClick={fetchTour}>refresh</button>
      </main>
    )
  }
  return (
    <main className="App">
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
