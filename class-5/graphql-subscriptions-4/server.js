const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, execute, subscribe } = require('graphql');

// Pull in some specific Apollo packages:
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');

// Create a server:
const app = express();

// Create a schema and a root resolver:
const schema = buildSchema(`
	type Book {
		title: String!
		author: String!
	}

	type Query {
		books: [Book]
	}

	type Mutation {
		addBook(title: String!, author: String!): Book!
	}

	type Subscription {
		newBook: Book
	}
`);

const pubsub = new PubSub();

const books = [
	{
		title: "The Name of the Wind",
		author: "Patrick Rothfuss",
	},
	{
		title: "The Wise Man's Fear",
		author: "Patrick Rothfuss",
	}
]

const rootValue = {
	books: () => {
		return books
	},
	addBook: ({ title, author }) => {
		const book = { title, author }
		books.push(book)
		pubsub.publish('NEW_BOOK', { newBook: book })
		return book
	},
	newBook: {
		resolve: () => null,
		subscribe: () => pubsub.asyncIterator("NEW_BOOK")
	}
	// Subscription: {
	// 	newBook: {
	// 		subscribe: () => pubsub.asyncIterator("NEW_BOOK")
	// 	}
	// }
};

app.use('/graphql', graphqlHTTP({
	schema,
	rootValue,
	graphiql: true
}));

const server = app.listen(8080, () => console.log("Server started on port 8080"));

SubscriptionServer.create({ schema, rootValue, execute, subscribe }, {
  server // Listens for 'upgrade' websocket events on the raw server
});

/*

This example based one:
https://httptoolkit.tech/blog/simple-graphql-server-without-apollo/

*/