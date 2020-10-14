import React from 'react'
import FormInput from '../components/Form'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_MOVIE } from '../config/query/movieMutation'
import { GET_ONE_MOVIE } from '../config/query/graphqlQuery'
import M from  'materialize-css'

export default function Editpage(props) {
  const history = useHistory()
  const [putMovie] = useMutation(UPDATE_MOVIE)
  const { id } = useParams()
  const { loading, error, data, refetch } = useQuery(GET_ONE_MOVIE, { variables: { id } })

  const updateMovie = async (data) => {
    const editMovie = await putMovie({
      variables: {
        id: id,
        payload: {
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          popularity: Number(data.popularity),
          tags: data.tags
        }
      }
    })
    if (editMovie) {
      M.toast({html: 'Edit success'})
      history.goBack()
    }
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error... {id}</p>

  return (
    <p>
      <h2>Edit Page</h2>
      <FormInput handleOnSubmit={updateMovie} data={data.movie} />
    </p>
  )
}
