import './App.css';
import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'


async function fetchWeather(zip, setter) {
  try {
    // define a query
    const json = await client.query({
      query: gql`
        query {
          getWeather(zip:${zip}) {
            temperature
            description
          }
        }
      `
    })

    console.log(json)
    setter(json)
  } catch(err) {
    console.log(err.message)
  }
}


function App() {
  const [zip, setZip] = useState('') 
  const [weather, setWeather] = useState(null)

  return (
    <div className="App">
      <header className="App-header">
        {weather ? <h1>{weather.data.getWeather.temperature}</h1>: null}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            fetchWeather(zip, setWeather)
          }}
        >
          <input
            type="text" 
            placeholder="zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </form>
      </header>
    </div>
  );
}

export default App;

/**
 * 
 * GraphQL + React 
 * 
 * Start that GraphQL Weather API
 * 
 * Create a new react proiject 
 * 
 * install Apollo 
 * - @apollo/client graphql
 * 
 * https://www.apollographql.com/docs/react/get-started/
 * 
 * Wrap your App in the ApolloProvider
 * Make an instance of the Apollo client
 * Define a GraphQL query
 * 
 * Create a component to render your weather data
 * 
 * Your graphql weather server needs to supprt cors
 * What is cors? 
 * 
 * 
 */
