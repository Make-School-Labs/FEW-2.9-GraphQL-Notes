
import './App.css';

import { useState } from 'react'

import { gql } from '@apollo/client';
import { client } from './index'



function App() {
  const [ zip, setZip ] = useState('')

  async function getWeather() {
    try {
      const 
    }
  }

  return (
    <div className="App">
      <form onSubmit={() => getWeather()}>
        <input 
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
      <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
