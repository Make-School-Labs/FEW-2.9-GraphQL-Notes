const Koa = require('koa')
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
const schema = require('./graphql/schema')
const initDB = require('./database')

initDB()

const app = new Koa()
app.use(mount('/graphql', graphqlHTTP({
  schema,
  graphiql: true
})))
app.listen(9000)
app.on('error', err => {
  console.log(err.message)
})

// npm run start
// pm2 kill

// https://www.strilliant.com/2019/01/27/how-to-setup-a-powerful-api-with-graphql-koa-and-mongodb/
// https://www.strilliant.com/2019/01/30/how-to-setup-a-powerful-api-with-graphql-koa-and-mongodb-mutatations-fields-resolvers/
