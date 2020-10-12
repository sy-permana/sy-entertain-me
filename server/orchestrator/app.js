const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const movieSchema = require('./Schema/MovieSchema')
const seriesSchema = require('./Schema/SeriesSchema')
const PORT = process.env.PORT || 5000

const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs : [
    typeDefs,
    movieSchema.typeDefs,
    seriesSchema.typeDefs
  ],
  resolvers : [
    movieSchema.resolvers,
    seriesSchema.resolvers
  ]
})

const server = new ApolloServer({
  schema
})

server
  .listen({
    port: PORT
  })
  .then(({ url }) => {
    console.log('GraphQL server listening on ', url)
  })
