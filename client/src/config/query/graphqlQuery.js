import { gql } from '@apollo/client'

export const GET_ENTERTAINME = gql`
  query GetEntertainMe {
    movies {
      _id
      title
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
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
      poster_path
      popularity
      tags
    }
  }
`
export const GET_ONE_MOVIE = gql`
  query GetOneMovie($id: String!) {
    movie(movieId: $id) {
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
      poster_path
      popularity
      tags
    }
  }
`
export const GET_ONE_SERIES = gql`
  query GetOneSeries($id: String!) {
    seriesOne(seriesId: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_FAVORITE = gql`
  query {
    favorites {
      _id
      title
      poster_path
      popularity
      tags
    }
  }
`
