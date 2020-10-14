import React from 'react'
import Tags from './Tags'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_MOVIE } from '../config/query/movieMutation'
import { GET_FAVORITE } from '../config/query/graphqlQuery'
import client from '../config/graphql'
import M from  'materialize-css'

const Card = props => {
  const history = useHistory()
  const [delMovie] = useMutation(DELETE_MOVIE)
  const toCheckFavorites = useQuery( GET_FAVORITE )
  const [isFavorite, setIsFavorite] = React.useState(false)

  const handleOnClick = (e) => {
    e.preventDefault()
    history.push(`/${props.group}/${props.data._id}`)
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    const { favorites } = client.readQuery({ query: GET_FAVORITE })
    client.writeQuery({
      query: GET_FAVORITE,
      data: {
        favorites: [
          ...favorites,
          props.data
        ]
      }
    })
    setIsFavorite(true)
  }

  const handleDelete = async (e, id) => {
    e.preventDefault()
    const deleteMovie = await delMovie({
      variables: {
        id
      }
    })
    if (deleteMovie) {
      await props.refetch()
      M.toast({html: 'Delete success'})
    } else {
      M.toast({html: 'Delete error'})
    }
  }

  // const checkFavorite = () => {
  //   if (!toCheckFavorites.loading) {
  //     const searchFavorite = toCheckFavorites.data.favorites.find(
  //       favorites => favorites._id === props.data._id
  //     )
  //     if (searchFavorite) setIsFavorite(true)
  //   }
  // }

  React.useEffect(() => {
    if (!toCheckFavorites.loading) {
      const searchFavorite = toCheckFavorites.data.favorites.find(
        favorites => favorites._id === props.data._id
      )
      if (searchFavorite) setIsFavorite(true)
    }
  }, [toCheckFavorites])

  return (
    <div className="card" style={{ width: `${90 / 3}%`, marginRight: `${10 / 3}%`, minWidth: '200px'}}>
      <div className="card-image">
        <img src={props.data.poster_path} style={{ height: '200px', objectFit: 'cover' }} alt={props.data.title} />
        {
          props.group !== 'favorites' && !isFavorite && (
            <a
              className="btn-floating halfway-fab waves-effect waves-light teal"
              onClick={handleFavorite}
              href="#"
            >
              <i className="material-icons">favorite</i>
            </a>
          )
        }
      </div>
      <div className="card-content">
        <span className="card-title">{props.data.title}</span>
        <span>{ props.group }</span>
        <p>Popularity: {props.data.popularity}</p>
        <br />
        <Tags data={props.data.tags} row />
      </div>
      <div className="card-action">
        {props.group === 'movies' ? (
          <>
            <a href="#" onClick={handleOnClick}>
              <i className="material-icons red-text teal-text">more</i>
            </a>
            <a
              href="#"
              onClick={e => history.push(`/edit-movie/${props.data._id}`)}
            >
              <i className="material-icons red-text blue-text">edit</i>
            </a>
            <a href="" onClick={e => 
              handleDelete(e, props.data._id)
            }>
              <i className="material-icons red-text">delete</i>
            </a>
          </>
        ) : props.group === 'tvseries' ? (
          <a href="#" onClick={handleOnClick}>
            <i className="material-icons red-text">more</i>
          </a>
        ) : ''}
      </div>
    </div>
  )
}

export default Card
