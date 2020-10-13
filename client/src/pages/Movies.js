import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MOVIES } from '../config/graphqlQuery'
import CardDeck from '../components/CardDeck.js'

export default function MoviesPage () {
  const { loading, error, data } = useQuery(GET_MOVIES)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <h1>Movies Page</h1>
      <p>Movies:</p>
      <CardDeck data={data.movies} />
    </>
  )
}