const { GraphQLObjectType, GraphQLString } = require('graphql')
const itemGraphQLType = require('../types/itemType')
const Item = require('./../../models/item')

module.exports = {
  type: itemGraphQLType,
  args: {
    title: { type: GraphQLString },
    post_date: { type: GraphQLString },
    content: { type: GraphQLString },
    url: { type: GraphQLString }
  },
  resolve(parent, args) {
    const newItem = new Item({
      title: args.title,
      post_date: args.post_date,
      content: args.content,
      url: args.url
    })
    return newItem.save()
  }
}