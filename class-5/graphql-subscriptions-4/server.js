const { GraphQLServer, PubSub } = require('graphql-yoga')

// Create a schema and a root resolver:
const typeDefs = `
	type Channel {
		name: String!
		posts: [Post!]!
	}

	type Post {
		message: String!
		date: String!
	}

	type Query {
		channels: [Channel!]!
		posts(channel: String!): [Post!]!
	}

	type Mutation {
		addChannel(name: String!): Channel!
		addPost(channel: String!, message: String!): Post!
	}

	type Subscription {
		newChannel: Channel!
		newPost: Post!
	}`

const pubsub = new PubSub();

const data = [
	{ name: 'cats', posts: [] },
	{ name: 'dogs', posts: [] },
]

const resolvers = {
	Query: {
		channels: () => {
			return data
		},
		posts: (_, { channelName }) => {
			return data.filter((item) => item.name === channel)[0]
		}
	},
	Mutation: {
		addChannel: (_, { name }) => {
			const channel = { name, posts:[] }
			data.push(channel)
			pubsub.publish('NEW_CHANNEL', { newChannel: channel })
			return channel
		},
		addPost: (_, { channelName, message }) => {
			const post = { message, date: new Date().toString() }
			pubsub.publish('NEW_POST', { newPost: post })
			date.forEach(channel => {
				if (channel.name === channelName) {
					channel.posts.push(post)
				}
			});
		}
	},
	Subscription: {
		newChannel: {
			subscribe: () => pubsub.asyncIterator("NEW_CHANNEL")
		},
		newPost: {
			subscribe: () => pubsub.asyncIterator('NEW_POST')
		}
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: {
		pubsub,
		data
	}
})

server.start(console.log("gql node server running on local host 4000"))
