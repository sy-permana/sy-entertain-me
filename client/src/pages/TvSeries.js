import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_SERIES } from '../config/query/graphqlQuery'
import CardDeck from '../components/CardDeck.js'

export default function SeriesPage () {
  const { loading, error, data } = useQuery(GET_SERIES)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <h1>Tv Series Page</h1>
      <p>Series:</p>
      <CardDeck data={data.series} group={"tvseries"} />
    </>
  )
}