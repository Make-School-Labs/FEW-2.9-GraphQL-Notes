const { GraphQLList } = require('graphql')
const itemGraphQLType = require('../types/itemType')
const Item = require('../../models/item')

module.exports = {
  type: GraphQLList(itemGraphQLType),
  args: {},
  resolve() {
    return Item.find()
  }
}