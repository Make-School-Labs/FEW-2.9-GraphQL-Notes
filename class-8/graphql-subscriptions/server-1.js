const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

// https://www.apollographql.com/docs/apollo-server/data/subscriptions/

const typeDefs = gql`
  type Post {
		message: String!
		date: String!
	}

	type Query {
		posts: [Post!]!
	}

	type Mutation {
		addPost(message: String!): Post!
	}

	type Subscription {
		newPost: Post!
	}
`

// Data Store
const data = [
	{ message: 'hello world', date: new Date() }
]

// Resolvers 
const resolvers = {
	Query: {
		posts: () => {
			return data
		}
	},
	Mutation: {
		addPost: (_, { message }) => {
			const post = { message, date: new Date() }
			data.push(post)
			pubsub.publish('NEW_POST', { newPost: post })
			return post
		}
	},
	Subscription: {
		// newChannel: {
		// 	subscribe: () => pubsub.asyncIterator('NEW_CHANNEL')
		// },
		newPost: {
			subscribe: () => pubsub.asyncIterator('NEW_POST')
		}
	}
}


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


