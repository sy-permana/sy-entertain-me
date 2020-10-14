import React from 'react'
import FormInput from '../components/Form'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_MOVIE } from '../config/query/movieMutation'
import M from  'materialize-css'

export default function Addpage(params) {
  const history = useHistory()
  const [createMovie] = useMutation(CREATE_MOVIE)

  const addMovie = data => {
    createMovie({
      variables: {
        payload: {
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          popularity: Number(data.popularity),
          tags: data.tags
        }
      }
    })
    history.goBack()
    M.toast({html: 'I am a toast!'})
  }

  return (
    <>
      <h2>Input Page</h2>
      <FormInput handleOnSubmit={addMovie} />
    </>
  )
}
