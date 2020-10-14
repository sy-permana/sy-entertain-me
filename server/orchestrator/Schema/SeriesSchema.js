const { gql } = require('apollo-server')
const { seriesAxios } = require('../config/axios')
const redis = require('../config/redis')
const redisInvalidation = require('../helpers/redisInvalidation')

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input inputSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  type successInputSeries {
    msg: String
    tvseries: Series
  }

  type successMsgSeries {
    msg: String
  }

  extend type Query {
    series: [Series]
    seriesOne(seriesId: String): Series
  }

  extend type Mutation {
    addSeries(payload: inputSeries) : successInputSeries
    delSeries(seriesId: String) : successMsgSeries
    putSeries(seriesId: String, payload: inputSeries) : successMsgSeries
  }
`

const resolvers = {
  Query: {
    series: async () => {
      try {
        const cacheSeries = await redis.get('series')
        if (cacheSeries) {
          return JSON.parse(cacheSeries)
        } else {
          const data = await seriesAxios({
            url: '/series',
            method: 'get'
          })
          await redis.set('series', JSON.stringify(data.data))
          return data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    seriesOne: async (_, args) => {
      try {
        const data = await seriesAxios({
          url: '/series/' + args.seriesId,
          method: 'get'
        })
        return data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    addSeries: async (_, args) => {
      try {
        const result = await seriesAxios({
          url: '/series',
          method: 'post',
          data: args.payload
        })
        redisInvalidation('series', 'create', result.data.tvseries)
        return result.data
      } catch (error) {
        console.log(error)
      }
    },
    delSeries: async (_, args) => {
      try {
        const result = await seriesAxios({
          url: '/series/' + args.seriesId,
          method: 'delete'
        })
        redisInvalidation('series')
        return result.data
      } catch (error) {
        console.log(error)
      }
    },
    putSeries: async (_, args) => {
      try {
        const result = await seriesAxios({
          url: '/series/' + args.seriesId,
          method: 'put',
          data: args.payload
        })
        redisInvalidation('series')
        return result.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = { typeDefs, resolvers }