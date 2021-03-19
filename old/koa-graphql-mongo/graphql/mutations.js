const { GraphQLObjectType } = require('graphql')

const addGadget = require('./mutations/addGadget')
const updateGadget = require('./mutations/updateGadget')
const removeGadget = require('./mutations/removeGadget')
const addItem = require('./mutations/addItem')
const removeItem = require('./mutations/removeItem')
const updateItem = require('./mutations/updateItem')

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGadget,
    updateGadget,
    removeGadget,
    addItem,
    removeItem,
    updateItem,
  }
})

module.exports = Mutation