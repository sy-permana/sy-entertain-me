const { gql } = require('apollo-server')
const { seriesAxios } = require('../config/axios')

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
      const data = await seriesAxios({
        url: '/series',
        method: 'get'
      })
      return data.data
    },
    seriesOne: async (_, args) => {
      const data = await seriesAxios({
        url: '/series/' + args.seriesId,
        method: 'get'
      })
      return data.data
    }
  },
  Mutation: {
    addSeries: async (_, args) => {
      const result = await seriesAxios({
        url: '/series',
        method: 'post',
        data: args.payload
      })
      return result.data
    },
    delSeries: async (_, args) => {
      const result = await seriesAxios({
        url: '/series/' + args.seriesId,
        method: 'delete'
      })
      return result.data
    },
    putSeries: async (_, args) => {
      const result = await seriesAxios({
        url: '/series/' + args.seriesId,
        method: 'put',
        data: args.payload
      })
      return result.data
    }
  }
}

module.exports = { typeDefs, resolvers }