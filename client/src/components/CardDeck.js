import React from 'react'
import Card from './Card'

const CardDeck = props => {
  return (
    <>
      <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'stretch', alignItems: 'stretch', flexDirection: 'row' }}>
        {props.data.map(each => (
          <Card
            key={each._id}
            data={each}
            group={props.group}
            refetch={props.refetch}
          />
        ))}
      </div>
    </>
  )
}

export default CardDeck
