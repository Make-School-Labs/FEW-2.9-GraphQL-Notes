// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const petList = require('./petlist')

console.log(petList)

// Define a scheme
const schema = buildSchema(`
enum Species {
	Dog
	Cat
	Mameshiba
	Frog
}

type About {
  message: String!
	species: Species!
}

type Pet {
	name: String!
	species: Species!
}

type Die {
	value: Int!
}

type Meal {
	description: String!
}

type Time {
	hour: Int!
	minute: Int!
	second: Int!
}

type Roll {
	sides: Int!
	rolls: [Int!]!
	total: Int!
}

type Query {
  getAbout: About

	die(sides: Int!): Die
	getRandom(range: Int!): Int!
	getRoll(sides: Int!, rolls: Int!): Roll!

	getPet(id: Int!): Pet
	allPets: [Pet!]!
	firstPet: Pet
	lastPet: Pet

	getmeal(time: String!): Meal
	getTime: Time!
	
	Time: Time!
}

type Mutation {
	addPet(name: String!, species: String!): Pet!
	updatePet(id: Int!, name: String, species: String): Pet
	deletePet(id: Int!): Pet
}
`)

// Define a resolvers

const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  },
	die: ({ sides }) => {
		return { value: Math.floor(Math.random() * sides) + 1 }
	},
	getPet: ({ id }) => {	
		return petList[id]
	},
	allPets: () => {	
		return petList
	},
	getmeal: ({ time }) => {
		const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'fries' }
		const meal = allMeals[time]
		return { description: meal }
	},
	getTime: () => {
		const now = new Date()
		const hour = now.getHours()
		const minute = now.getMinutes()
		const second = now.getSeconds()
		return { hour, minute, second }
	},
	getRandom: ({ range }) => {
		return Math.floor(Math.random() * range) + 1
	},
	getRoll: ({ sides, rolls }) => {
		const results = { sides, rolls: [], total: 0 }
		for (let i = 0; i < rolls; i += 1) {
			const n = Math.floor(Math.random() * sides) + 1
			results.total += n
			results.rolls.push(n)
		}
		return results
	},
	Time: {
		hour: () => new Date().getHours(),
		minute: () => new Date().getMinutes(),
		second: () => new Date().getSeconds()
	},
	addPet: ({ name, species }) => {
		const pet = { name, species }
		petList.push(pet)
		return pet
	}, 
	updatePet: ({ id, name, species }) => {
		const pet = petList[id]
		if (pet === undefined) {
			return null
		}
		pet.name = name || pet.name
		pet.species = species || pet.species
		return pet
	},
	deletePet: ({ id }) => {
		const pet = petList[id]
		if (pet) {
			petList.splice(id, 1)
			return pet
		}
		return null
	}
}

// Create an express app

const app = express()

// Define a route for GraphQL

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start this app

const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})


/**
 * 
 * Assignment 2
 * 
 * Create a GraphQL app that...
 * 
 * Manages your pets
 * Manages your RPG characters
 * Manages die rolls
 * 
*/