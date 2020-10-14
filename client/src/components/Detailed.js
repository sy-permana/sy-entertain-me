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
  <>
    <div className="col s12 m7">
      <h2 className="header">Detail Page</h2>
      <div className="card horizontal">
        <div className="card-image">
          <img src={props.data.poster_path} style={{ width: '15rem' }} alt={props.data.title} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{props.data.title}</span>
            <p>{props.data.overview}</p>
          </div>
          <div className="card-action">
            <span>Popularity: {props.data.popularity}</span>
            <br /><br />
            <Tags data={props.data.tags} row />
          </div>
          <div className="card-action">
          {
            props.data.__typename === 'Movie'
            ?
            <div>
              <button type="button" className="btn" style={{ marginRight: '1rem' }} onClick={handleOnClick}>back</button>
              <button type="button" className="btn" style={{ marginRight: '1rem' }} onClick={(e) => handleDelete (props.data._id)}>delete</button>
              <button type="button" className="btn" onClick={(e) => history.push(`/edit-movie/${props.data._id}`)}>edit</button>
            </div>
            :
            <div>
              <button type="button" className="btn" onClick={handleOnClick}>back</button>
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Detailed
