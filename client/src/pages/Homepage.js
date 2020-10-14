import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ENTERTAINME } from '../config/query/graphqlQuery'
import CardDeck from '../components/CardDeck.js'
import { useHistory } from 'react-router-dom'

export default function Homepage () {
  const history = useHistory()
  const { loading, error, data, refetch } = useQuery(GET_ENTERTAINME)

  useEffect(() => {
    if (history.action === 'POP') refetch()
  }, [history.action])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <h1>Homepage</h1>
      <p>Movies :</p>
      <CardDeck data={data.movies} group={"movies"} refetch={refetch} />
      <p>TvSeries :</p>
      <CardDeck data={data.series} group={"tvseries"} refetch={refetch} />
    </>
  )
}