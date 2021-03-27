const fs = require('fs')
const path = require('path')
const { ApolloServer, PubSub } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./utils');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')

const Subscription = require('./resolvers/Subscription')

const pubsub = new PubSub()
const prisma = new PrismaClient()

// GraphQL Schema
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

// ------------

// Resovlers
const resolvers = {
  Query,
  Mutation,
	Subscription,
  User,
  Link,
	Vote
}

// Server
const server = new ApolloServer({
	typeDefs,
	resolvers,
  context: ({ req }) => {
		return {
			...req,
			prisma,
			pubsub,
			userId: req && req.headers.authorization ? getUserId(req) : null
		}
  },
	subscriptions: {
		onConnect: (connectionParams) => {
			if (connectionParams.authToken) {
				return {
					prisma, 
					userId: getUserId(null, connectionParams.authToken)
				}
			} else {
				return { prisma }
			}
		}
	}
})

// Run the server
server
	.listen()
	.then(({ url }) => console.log(`Server running at: ${url}`))