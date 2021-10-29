import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import counterReducer from './reducer'

const store = createStore(counterReducer)
const App = () => (
  <React.StrictMode>
    <div>
      <h2>give feedback</h2>
      <button onClick={()=>store.dispatch({type:'GOOD'})}>good</button>
      <button onClick={()=>store.dispatch({type:'OK'})}>ok</button>
      <button onClick={()=>store.dispatch({type:'BAD'})}>bad</button>
      <h2>statics</h2>
      <p>good:  {store.getState().good}</p>
      <p>ok:  {store.getState().ok}</p>
      <p>bad:  {store.getState().bad}</p>
    </div>
  </React.StrictMode>
  
);
const renderApp = () => {
  ReactDOM.render(<App />,document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

