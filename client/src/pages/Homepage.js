import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ENTERTAINME } from '../config/graphqlQuery'
import CardDeck from '../components/CardDeck.js'

export default function Homepage () {
  const { loading, error, data } = useQuery(GET_ENTERTAINME)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>Homepage</h1>
      <p>Movies :</p>
      <CardDeck data={data.movies} />
      <p>TvSeries :</p>
      <CardDeck data={data.series} />
    </>
  )
}