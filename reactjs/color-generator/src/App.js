import React, { useState } from 'react';
import './style.css';
import Values from 'values.js';
import SingleColor from './SingleColor';
export default function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState('');
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
      setError('');
      console.log(colors);
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };
  return (
    <div className="container">
      <section>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={error ? 'error' : ''}
          />
          <button type="submit">submit</button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => (
          <SingleColor key={index} index={index} {...color} hex={color.hex} />
        ))}
      </section>
    </div>
  );
}
