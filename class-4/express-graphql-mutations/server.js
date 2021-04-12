// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Define a scheme
const schema = buildSchema(`
enum Species {
	Dog
	Cat
	Mameshiba
}

type About {
  message: String!
	species: Species
}

type Pet {
	id: Int!
	name: String!
	species: String!
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
	
	getPet(id: Int!): Pet
	allPets: [Pet!]!

	getTime: Time!
	Time: Time!

	getRandom(range: Int!): Int!
	getRoll(sides: Int!, rolls: Int!): Roll!
	die(sides: Int!): Die
}

type Mutation {
	addPet(name: String!, species: String!): Pet!
	updatePet(id: Int!, name: String, species: String): Pet
	deletePet(id: Int!): Pet
}
`)


// Mock up array for storing data

const petList = [
	{ id: 0, name: 'Fluffy', species: 'Dog' },
	{ id: 1, name: 'Sassy', species: 'Cat' },
	{ id: 2, name: 'Goldberg', species: 'Frog' }
]

let petCount = petList.length

// Define a resolvers

const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  },
	die: ({ sides }) => {
		return { value: Math.floor(Math.random() * sides) + 1 }
	},
	getPet: ({ id }) => {	
		for (let i = 0; i < petList.length; i += 1)  {
			if (petList[i].id === id) {
				return petList[i]
			}
		}
		return null
	},
	allPets: () => {	
		return petList
	},
	getTime: function () {
		return this.Time
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
		const pet = { id: petCount, name, species }
		petCount += 1
		petList.push(pet)
		return pet
	},
	updatePet: ({ id, name, species }) => {
		for (let i = 0; i < petList.length; i += 1)  {
			if (petList[i].id === id) {
				petList[i].name = name || petList[i].name
				petList[i].species = species || petList[i].species
				return petList[i]
			}
		}
		return null
	},
	deletePet: ({ id }) => {
		for (let i = 0; i < petList.length; i += 1) {
			if (petList[i].id === id) {
				return petList.splice(i, 1)[0]
			}
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