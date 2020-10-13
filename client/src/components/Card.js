import React from 'react'
import Tags from './Tags'

const Card = props => {
  return (
    <div className="mycard">
      <h1>{props.data.title}</h1>
      <p>{props.data.overview}</p>
      <p>{props.data.popularity}</p>
      <Tags data={props.data.tags} row />
    </div>
  )
}

export default Card
