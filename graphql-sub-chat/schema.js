const { gql } = require('apollo-server-express')

const typeDefs = gql`
   type Message {
       id: Int!,
       text: String!,
       isFavorite: Boolean!
   }
   type Query {
       allMessages: [Message]
       fetchMessage(id: Int!): Message
   }
   type Mutation {
       createMessage (
           text: String!
       ): Message
       updateMessage (
           id: Int!
           text: String!
           isFavorite: Boolean!
       ): Message
   },
   type Subscription {
       messageCreated: Message
       messageUpdated(id: Int!): Message
   }
`;

module.exports = typeDefs;