import React, { useState, useEffect } from 'react'
import { GET_ONE_MOVIE, GET_ONE_SERIES } from '../config/query/graphqlQuery'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Detailed from '../components/Detailed'

export default function Detail (props) {
  const { id } = useParams()
  const [query, setQuery] = useState(GET_ONE_MOVIE)

  const { loading, error, data } = useQuery(query, { variables: { id } })

  useEffect(() => {
    switch(props.group) {
      case 'movies':
        setQuery(GET_ONE_MOVIE)
        break
      default:
        setQuery(GET_ONE_SERIES)
    }
  }, [query])

  if (loading) return <p>loading</p>
  if(error) {
    console.log(error)
    return <p>Error...</p>
  }

  return (
    <div>
      <p>Detail Page {id}</p>
      <Detailed data={data.movie ? data.movie : data.seriesOne} />
    </div>
  )
}
