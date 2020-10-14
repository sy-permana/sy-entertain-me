import React from 'react'
import Tags from './Tags'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DELETE_MOVIE } from '../config/query/movieMutation'

const Detailed = props => {
  const history = useHistory()
  const [delMovie, { data }] = useMutation(DELETE_MOVIE)

  const handleOnClick = () => {
    history.goBack()
  }

  const handleDelete = (id) => {
    delMovie ({
      variables: {
        id
      }
    })
    if (data) history.goBack()
  }

  return (
    <div className="mycard">
      <span>{props.data.__typename}</span>
      <h1>{props.data.title}</h1>
      <p>{props.data.overview}</p>
      <p>{props.data.popularity}</p>
      <Tags data={props.data.tags} row />
      {
        props.data.__typename === 'Movie'
        ?
        <div>
          <button type="button" onClick={handleOnClick}>back</button>
          <button type="button" onClick={(e) => handleDelete (props.data._id)}>delete</button>
          <button type="button" onClick={(e) => history.push(`/edit-movie/${props.data._id}`)}>edit</button>
        </div>
        :
        <div>
          <button type="button" onClick={handleOnClick}>back</button>
        </div>
      }
    </div>
  )
}

export default Detailed
