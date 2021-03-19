const { GraphQLString } = require('graphql')
const itemGraphQLType = require('../types/itemType')
const Item = require('./../../models/item')

module.exports = {
  type: itemGraphQLType, 
  args: {
    id: { type: GraphQLString }, 
    title: { type: GraphQLString },
    post_date: { type: GraphQLString },
    content: { type: GraphQLString },
    url: { type: GraphQLString }
  }, 
  resolve(parent, args) {
    return Item.findById(args.id)
      .then(item => {
        item.title = args.title
        item.post_date = args.post_date,
        item.content = args.content,
        item.url = args.url
        return item.save()
      })
      .then(updatedItem => updatedItem)
      .catch(err => console.log(err))
  }
}