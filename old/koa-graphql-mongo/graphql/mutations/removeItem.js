const { GraphQLString } = require('graphql')
const itemGraphQLType = require('../types/itemType')
const Item = require('./../../models/item')

module.exports = {
  type: itemGraphQLType,
  args: {
    id: { type: GraphQLString }
  },
  resolve(parent, args) {
    return Item.findOneAndDelete(args.id)
      .then(item => item.remove())
      .then(deletedItem => deletedItem)
      .catch(err => console.log(err.message))
  }
}