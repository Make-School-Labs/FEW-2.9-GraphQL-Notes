// Import dependancies

// https 
const fs = require("fs");
const https = require("https");
const homedir = require('os').homedir();
const key = fs.readFileSync(`${homedir}/localhost-key.pem`, 'utf-8');
const cert = fs.readFileSync(`${homedir}/localhost.pem`, 'utf-8');



require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors'); 

const fetch = require('node-fetch') 

const schema = buildSchema(`
enum Units {
	standard
	metric
	imperial
}

type Weather {
	temperature: Float
	description: String
	feels_like: Float
	temp_min: Float
	temp_max: Float
	pressure: Int
	humidity: Int
	cod: Int
	message: String
}

type Query {
	getWeather(zip: Int!, units: Units): Weather!
	getWeatherGeo(lat: Float!, lon: Float!, units: Units): Weather!
}
`)

async function getWeather(url) {
	const res = await fetch(url)
		const json = await res.json()
		const cod = parseInt(json.cod)
		const message = json.message

		console.log(json)

		if (cod !== 200) {   // !==  not equal to
			return { cod, message }
		}
		
		const temperature = json.main.temp
		const description = json.weather[0].description
		const feels_like = json.main.feels_like
		const temp_min = json.main.temp_min
		const temp_max = json.main.temp_max
		const pressure = json.main.pressure
		const humidity = json.main.humidity

		return { temperature, description, feels_like, temp_max, temp_min, pressure, humidity, cod, message }
}

const root = {
  getWeather: async ({ zip, units = 'imperial' }) => {
		const apikey = process.env.OPENWEATHERMAP_API_KEY
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${units}`
		return await getWeather(url)
	}, 
	getWeatherGeo: async ({ lat, lon, units = 'imperial' }) => {
		const apikey = process.env.OPENWEATHERMAP_API_KEY
		// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=${units}`
		console.log(url)
		return await getWeather(url)
	}
}

// Create an express app
const app = express()

app.use(cors()); // use cors 
 
// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true // Be sure to use graphiql
}))

// Start this app
const port = 4000
// app.listen(port, () => {
//   console.log('Running on port:'+port)
// })
https.createServer({ key, cert }, app).listen(port);