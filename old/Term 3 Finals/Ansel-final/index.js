const express = require('express')
const graphqlHTTP = require('express-graphql')
const fetch = require('node-fetch')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type About {
    name: String!
    course: String!
    description: String!
  }

  type Portfolio {
    id: Int!
    title: String!
    description: String!
    url: String!
  }

  type Query {
    about: About!
    portfolio: [Portfolio!]!
    portfolioItem(id: Int!): Portfolio!
  }

  type Mutation {
    newPortfolioItem(title: String!, description: String!, url: String!): Portfolio!
    editPortfolioItem(id: Int!, title: String, description: String, url: String): Portfolio!
    deletePortfolioItem(id: Int!): Portfolio!
  }
`)

const portfolio = [
  { id: 0, title: "Outbook Back End", description: "An API that allows appointees to book appointments on an Outlook Calendar", url: "https://github.com/Outbook-Archive/Back-End" },
  { id: 1, title: "Fake Word Generator API", description: "An API that generates words that seem real, whether or not they actually are.", url: "https://github.com/anselb/fake-word-generator" },
  { id: 2, title: "Elon Musk Tweet Generator", description: "A generator that creates Elon Musk quotes based on a Markov Model", url: "https://github.com/anselb/Tweet-Generator" }
]

const resolvers = {
  // Query
  about: () => {
    return { name: 'Ansel Bridgewater', course: 'FEW 2.9 GraphQL', description: 'Learn GraphQL the better replacement for REST! Invented at Facebook to solve problems imposed by REST.' }
  },
  portfolio: () => {
    return portfolio
  },
  portfolioItem: ({ id }) => {
    for (let i = 0; i < portfolio.length; i+=1) {
      if (portfolio[i].id === id) {
        return portfolio[i]
      }
    }
    throw new Error('portfolio item not found')
  },

  // Mutation
  newPortfolioItem: ({ title, description, url }) => {
    const id = portfolio[portfolio.length - 1].id + 1
    newItem = { id, title, description, url }
    portfolio.push(newItem)
    return newItem
  },
  editPortfolioItem: ({ id, title, description, url }) => {
    for (let i = 0; i < portfolio.length; i+=1) {
      const item = portfolio[i]

      if (item.id === id) {
        if (title) {
          item.title = title
        }
        if (description) {
          item.description = description
        }
        if (url) {
          item.url = url
        }
        return item
      }
    }
    throw new Error('portfolio item not found')
  },
  deletePortfolioItem: ({ id }) => {
    for (let i = 0; i < portfolio.length; i+=1) {
      const item = portfolio[i]
      if (item.id === id) {
        portfolio.splice(i, 1);
        return item
      }
    }
    throw new Error('portfolio item not found')
  },
}

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

const port = 3000
app.listen(port, () => {
  console.log('Running on port: ' + port)
})
