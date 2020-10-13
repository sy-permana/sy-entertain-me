import React from 'react'
import Card from './Card'

const CardDeck = props => {
  return (
    <>
      CardDeck:
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {
          props.data.map(each => (
            <Card
              key={each._id}
              data={each}
            />
          ))
        }
      </div>
    </>
  )
}

export default CardDeck
