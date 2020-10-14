import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_FAVORITE } from '../config/query/graphqlQuery'
import CardDeck from '../components/CardDeck.js'

export default function Favorites () {
  const { loading, error, data } = useQuery(GET_FAVORITE)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <h1>Favorites</h1>
      <CardDeck data={data.favorites} group={"favorites"} />
    </>
  )
}