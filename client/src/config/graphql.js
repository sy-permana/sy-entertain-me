import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_FAVORITE } from './query/graphqlQuery'

const client = new ApolloClient({
  uri: "http://18.141.57.26:5000/",
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