import { gql } from '@apollo/client'

export const GET_ENTERTAINME = gql`
  query GetEntertainMe {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_MOVIES = gql`
query GetMovies {
  movies {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const GET_SERIES = gql`
query GetSeries {
  series {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`
