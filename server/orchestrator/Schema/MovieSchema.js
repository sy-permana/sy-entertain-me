const { gql } = require('apollo-server')
const { movieAxios } = require('../config/axios')

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input inputMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  type successInputMovie {
    msg: String
    movie: Movie
  }

  type successMsgMovie {
    msg: String
  }

  extend type Query {
    movies: [Movie]
    movie(movieId: String): Movie
  }

  extend type Mutation {
    addMovie(payload: inputMovie) : successInputMovie
    delMovie(movieId: String) : successMsgMovie
    putMovie(movieId: String, payload: inputMovie) : successMsgMovie
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      const data = await movieAxios({
        url: '/movies',
        method: 'get'
      })
      return data.data
    },
    movie: async (_, args) => {
      const data = await movieAxios({
        url: '/movies/' + args.movieId,
        method: 'get'
      })
      return data.data
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      const result = await movieAxios({
        url: '/movies',
        method: 'post',
        data: args.payload
      })
      return result.data
    },
    delMovie: async (_, args) => {
      const result = await movieAxios({
        url: '/movies/' + args.movieId,
        method: 'delete'
      })
      return result.data
    },
    putMovie: async (_, args) => {
      const result = await movieAxios({
        url: '/movies/' + args.movieId,
        method: 'put',
        data: args.payload
      })
      return result.data
    }
  }
}

module.exports = { typeDefs, resolvers }