import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_FAVORITE } from './query/graphqlQuery'

const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache()
})

client.writeQuery({
  query: GET_FAVORITE,
  data: {
    favorites: [
    ]
  }
})

export default client