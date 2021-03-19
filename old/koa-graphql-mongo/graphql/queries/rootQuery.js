const { GraphQLObjectType } = require('graphql')
const allGadgets = require('./allGadgets')
const gadgetById = require('./gadgetById')
const allItems = require('./allItems')
const itemById = require('./itemById')

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    allGadgets,
    gadgetById,
    allItems,
    itemById,
  }
})

module.exports = RootQuery