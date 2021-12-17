import './App.css';
import CartContainer from './CartContainer';
import { useGlobalContext } from './context';
import Navbar from './Navbar';

function App() {
  const {isLoading} = useGlobalContext()

  if (isLoading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    )
  }
  return (
    <div className="">
      <Navbar />
      <CartContainer />
    </div>
  );
}

export default App;
