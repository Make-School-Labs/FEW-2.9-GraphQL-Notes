
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const gadgetGraphQLType = require('./types/gadgetType')
const Gadget = require('../models/gadget')
const Mutations = require('./mutations')
const RootQuery = require('./queries/rootQuery')

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})