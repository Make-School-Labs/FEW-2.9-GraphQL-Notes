const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

// https://www.apollographql.com/docs/apollo-server/data/subscriptions/

const typeDefs = gql`
	type Channel {
		name: String!
	}

  type Post {
		message: String!
		date: String!
	}

	type Query {
		posts(channel: String!): [Post!]
		channels: [Channel!]!
	}

	type Mutation {
		addPost(channel: String!, message: String!): Post
		addChannel(name: String!): Channel
	}

	type Subscription {
		newPost(channel: String!): Post
		newChannel: Channel
	}
`

// Data Store
const data = {
	Main: [ { message: 'hello world', date: new Date() } ]
}

// Resolvers 
const resolvers = {
	Query: {
		posts: (_, { channel }) => {
			if (data[channel] === undefined) {
				return null
			}
			return data[channel]
		},
		channels: () => {
			return Object.keys(data).map(name => ({ name }))
		}
	},
	Mutation: {
		addPost: (_, { channel, message }) => {
			if (data[channel] === undefined) {
				return null
			}
			const post = { message, date: new Date() }
			data[channel].push(post)
			pubsub.publish(`NEW_POST_${channel}`, { newPost: post })
			return post
		},
		addChannel: (_, { name }) => {
			if (data[name] !== undefined) {
				return null
			}
			data[name] = []
			pubsub.publish('NEW_CHANNEL', { newChannel: { name } })
			return { name }
		}
	},
	Subscription: {
		newChannel: {
			subscribe: () => pubsub.asyncIterator('NEW_CHANNEL')
		},
		newPost: {
			subscribe: (_, { channel }) => { 
				return pubsub.asyncIterator(`NEW_POST_${channel}`) 
			}
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


