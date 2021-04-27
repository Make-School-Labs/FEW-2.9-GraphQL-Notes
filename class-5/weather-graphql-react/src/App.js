import './App.css';
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { client } from './index'

function App(props) {
  const [zip, setZip] = useState('') 
  const [weather, setWeather] = useState(null)

  async function fetchWeather(query) {
    try {
      // define a query
      const json = await client.query(query)
      return json
    } catch(err) {
      console.log(err.message)
    }
  }

  async function fetchByZip() {
    const json = await fetchWeather({
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
    setWeather(json.data.getWeather)
  }

  async function fetchByGeo(latitude, longitude) {
    const json = await fetchWeather({ 
      query: gql`
        query {
          getWeatherGeo(lat:${latitude}, lon: ${longitude}) {
            temperature
            description
        }
      }
    `})
    console.log(json)
    setWeather(json.data.getWeatherGeo) 
  }

  return (
    <div className="App">
      <header className="App-header">
        {weather ? <h1>{weather.temperature}</h1>: null}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            fetchByZip()
          }}
        >
          <input
            type="text" 
            placeholder="zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
        <button
          onClick={() => {
              const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              };

              function success(pos) {
                const { latitude, longitude } = pos.coords;
                fetchByGeo(latitude, longitude)
              }

              function error(err) {
                console.log(`ERROR(${err.code}): ${err.message}`);
              }

              navigator.geolocation.getCurrentPosition(success, error, options);
          }}
        >Get Geolocation</button>
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
