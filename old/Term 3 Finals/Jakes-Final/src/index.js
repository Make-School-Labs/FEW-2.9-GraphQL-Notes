const { GraphQLServer } = require('graphql-yoga')
// const Query = require('./resolvers/Query')

let ports = [
    {
        id: 1,
        title: 'Project 1',
        description: 'Some graphql stuff',
        url: 'www.howtographql.com'
    },
    {
        id: 2,
        title: 'Project 2',
        description: 'Some graphql stuff 2',
        url: 'www.howtographql2.com'
    }
]

let idCount = ports.length

// 2
const resolvers = {
  Query : {
    about: (parent, args) => {
        return {
            name: args.name,
            course: args.course,
            description: args.description
        }
    },
    
    portfolios: () => {
        return ports
    },
    
    portfolio: (parent, { id }) => {
    
        const data = ports.filter((file) => {
    
            if (file.id == id) {
                return file
            }
        })
        return data[0]
    }
  },

  Mutation: {
    post: (parent, args) => {
        const port = {
            id: idCount++,
            title: args.title,
            description: args.description,
            url: args.url,
        }
        ports.push(port)
        return port
    },

    edit: (parent, args) => {
        const data = ports.filter((file) => {
            if (args.id == file.id) {
                if (args.title) {
                    file.title = args.title
                }
                
                if (args.description) {
                    file.description = args.description
                }
        
                if (args.url) {
                    file.url = args.url
                }
            }
        })
        return data[0]
    },

    delete: (parent, {id}) => {
        var index = ports.map((file, index) => {
            if (file.id == id) {
                return index
            }
        })
        ports = ports.splice(index-1, 1)
        return ports
    }
  },

}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  // typeDefs,
  resolvers,
})


server.start(() => console.log(`Server is running on http://localhost:4000`))