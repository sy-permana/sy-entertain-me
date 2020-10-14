import { gql } from '@apollo/client'

// todo -> createMovie updateMovie deleteMovie
export const CREATE_MOVIE = gql`
  mutation createMovie($payload: inputMovie){
    addMovie (payload: $payload) {
      msg
      movie {
        _id
        title
        poster_path
        popularity
        tags
      }
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation updateMovie($id: String, $payload: inputMovie) {
    putMovie (movieId: $id, payload: $payload) {
      msg
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: String!) {
    delMovie (movieId: $id) {
      msg
    }
  }
`