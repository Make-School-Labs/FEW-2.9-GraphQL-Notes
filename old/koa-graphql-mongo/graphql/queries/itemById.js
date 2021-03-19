const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const gadgetGraphQLType = require('../types/itemType')
const Item = require('../../models/item')

module.exports = {
  type: gadgetGraphQLType,
  args: { id: { type: GraphQLString } },
  resolve(parent, args) {
    return Item.findById(args.id)
  }
}
