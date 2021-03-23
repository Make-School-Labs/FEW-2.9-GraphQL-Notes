// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require( `cors` );

const fetch = require('node-fetch') 

const schema = buildSchema(`
enum Units {
	standard
	metric
	imperial
}

type Weather {
	temperature: Float!
	description: String!
}

type Query {
	getWeather(zip: Int!, units: Units): Weather!
}
`)

const root = {
  getWeather: async ({ zip, units = 'imperial' }) => {
		const apikey = '467355df4c808dd6134a3b64e9ace282'
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${units}`
		const res = await fetch(url)
		const json = await res.json()
		const temperature = json.main.temp
		const description = json.weather[0].description
		return { temperature, description }
	}
}

// Create an express app
const app = express()
app.use(cors());

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true // Be sure to use graphiql
}))

// Start this app
const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})