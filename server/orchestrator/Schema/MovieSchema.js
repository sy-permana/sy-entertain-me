const { gql } = require('apollo-server')
const { movieAxios } = require('../config/axios')
const redis = require('../config/redis')
const redisInvalidation = require('../helpers/redisInvalidation')

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
      try {
        const cacheMovies = await redis.get('movies')
        if (cacheMovies) {
          return JSON.parse(cacheMovies)
        } else {
          const data = await movieAxios({
            url: '/movies',
            method: 'get'
          })
          await redis.set('movies', JSON.stringify(data.data))
          return data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    movie: async (_, args) => {
      try {
        const data = await movieAxios({
          url: '/movies/' + args.movieId,
          method: 'get'
        })
        return data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const result = await movieAxios({
          url: '/movies',
          method: 'post',
          data: args.payload
        })
        redisInvalidation('movies', 'create', result.data.movies)
        return result.data
      } catch (error) {
        console.log(error)
      }
    },
    delMovie: async (_, args) => {
      try {
        const result = await movieAxios({
          url: '/movies/' + args.movieId,
          method: 'delete'
        })
        redisInvalidation('movies')
        return result.data
      } catch (error) {
        console.log(error)
      }
    },
    putMovie: async (_, args) => {
      try {
        const result = await movieAxios({
          url: '/movies/' + args.movieId,
          method: 'put',
          data: args.payload
        })
        redisInvalidation('movies')
        return result.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = { typeDefs, resolvers }