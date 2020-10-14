import React from 'react'
import FormInput from '../components/Form'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_MOVIE } from '../config/query/movieMutation'
import M from  'materialize-css'

export default function Addpage(params) {
  const history = useHistory()
  const [createMovie] = useMutation(CREATE_MOVIE)

  const addMovie = async (data) => {
    const addMovie = await createMovie({
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
    if (addMovie) {
      history.push('/')
      M.toast({html: 'Add success'})
    }
  }

  return (
    <>
      <h2>Input Page</h2>
      <FormInput handleOnSubmit={addMovie} />
    </>
  )
}
