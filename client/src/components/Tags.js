import React from 'react'

export default (props) => {
  let flexDir = 'column'
  if (props.row) flexDir = 'row'

  return (
    <div style={{
      display: 'flex',
      flexDirection: flexDir
    }}>
      {
        props.data.map(tag => (
          <span className="tags">{ tag }</span>
        ))
      }
    </div>
  )
}
