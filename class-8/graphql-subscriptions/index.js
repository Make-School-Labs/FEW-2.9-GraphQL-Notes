const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

// https://www.apollographql.com/docs/apollo-server/data/subscriptions/

const typeDefs = gql`
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
		addChannel(name: String!): Channel
		addPost(channel: String!, message: String!): Post!
	}

	type Subscription {
		newChannel: Channel!
		newPost: Post!
	}
`


const data = [
	{ name: 'cats', posts: [] },
	{ name: 'dogs', posts: [] },
]

const resolvers = {
	Query: {
		channels: () => {
			return data
		},
		posts: (_, { channel }) => {
			return data.filter((item) => item.name === channel)[0].posts
		}
	},
	Mutation: {
		addChannel: (_, { name }) => {
			const channels = data.filter(item => item.name === name)
			if (channels.length > 0) {
				return channels[0]
			}
			const channel = { name, posts:[] }
			data.push(channel)
			pubsub.publish('NEW_CHANNEL', { newChannel: channel })
			return channel
		},
		addPost: (_, { channel: channelName, message }) => {
			const post = { message, date: new Date().toString() }
			data.forEach(channel => {
				if (channel.name === channelName) {
					channel.posts.push(post)
				}
			});
			pubsub.publish('NEW_POST', { newPost: post })
			return post
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


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


