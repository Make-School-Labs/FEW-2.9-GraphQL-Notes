const { GraphQLList } = require('graphql')
const gadgetGraphQLType = require('../types/gadgetType')
const Gadget = require('../../models/gadget')

module.exports = {
  type: GraphQLList(gadgetGraphQLType),
  args: {},
  resolve() {
    return Gadget.find()
  }
}