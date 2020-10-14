import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MOVIES } from '../config/query/graphqlQuery'
import CardDeck from '../components/CardDeck.js'
import { useHistory } from 'react-router-dom'

export default function MoviesPage () {
  const { loading, error, data, refetch } = useQuery(GET_MOVIES)
  const history = useHistory()

  useEffect(() => {
    if (history.action === 'POP') refetch()
  }, [history.action, refetch])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <h1>Movies Page</h1>
      <p>Movies:</p>
      <CardDeck data={data.movies} group={"movies"} refetch={refetch} />
    </>
  )
}