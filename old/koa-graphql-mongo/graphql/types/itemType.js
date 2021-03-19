const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    post_date: { type: GraphQLString },
    content: { type: GraphQLString }, 
    url: { type: GraphQLString }
  })
})

module.exports = ItemType
